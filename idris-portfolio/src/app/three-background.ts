import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  viewChild,
} from '@angular/core';
import * as THREE from 'three';

/**
 * Full-viewport animated 3D scene rendered behind the page content:
 * a particle starfield, a central wireframe icosahedron "core", and
 * floating geometric shapes. Reacts to mouse movement (parallax) and
 * page scroll (camera drift + slow color shift).
 */
@Component({
  selector: 'app-three-background',
  template: '<canvas #canvas aria-hidden="true"></canvas>',
  styles: [
    `
      :host {
        position: fixed;
        inset: 0;
        z-index: 0;
        display: block;
        pointer-events: none;
      }
      canvas {
        display: block;
        width: 100%;
        height: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThreeBackground implements AfterViewInit, OnDestroy {
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  private renderer?: THREE.WebGLRenderer;
  private scene?: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private frameId = 0;
  private disposables: { dispose(): void }[] = [];

  private stars?: THREE.Points;
  private core?: THREE.Group;
  private floaters: THREE.Mesh[] = [];

  private mouseX = 0;
  private mouseY = 0;
  private scrollRatio = 0;
  private reducedMotion = false;

  private readonly onMouseMove = (e: MouseEvent) => {
    this.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouseY = (e.clientY / window.innerHeight) * 2 - 1;
  };

  private readonly onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollRatio = max > 0 ? window.scrollY / max : 0;
  };

  private readonly onResize = () => {
    if (!this.renderer || !this.camera) return;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };

  constructor(private readonly zone: NgZone) {}

  ngAfterViewInit(): void {
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.zone.runOutsideAngular(() => {
      this.initScene();
      window.addEventListener('mousemove', this.onMouseMove, { passive: true });
      window.addEventListener('scroll', this.onScroll, { passive: true });
      window.addEventListener('resize', this.onResize);
      if (this.reducedMotion) {
        this.renderFrame(0);
      } else {
        this.frameId = requestAnimationFrame(this.loop);
      }
    });
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.frameId);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
    this.disposables.forEach((d) => d.dispose());
    this.renderer?.dispose();
  }

  private track<T extends { dispose(): void }>(item: T): T {
    this.disposables.push(item);
    return item;
  }

  private initScene(): void {
    const canvas = this.canvasRef().nativeElement;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x050816, 0.035);

    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    this.camera.position.set(0, 0, 14);

    this.buildStars();
    this.buildCore();
    this.buildFloaters();

    const ambient = new THREE.AmbientLight(0x8888ff, 0.6);
    const point = new THREE.PointLight(0x22d3ee, 40, 60);
    point.position.set(6, 4, 8);
    const point2 = new THREE.PointLight(0xa78bfa, 30, 60);
    point2.position.set(-8, -4, 6);
    this.scene.add(ambient, point, point2);
  }

  private buildStars(): void {
    const count = 1800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const cyan = new THREE.Color(0x67e8f9);
    const violet = new THREE.Color(0xc4b5fd);
    const white = new THREE.Color(0xe2e8f0);
    const palette = [cyan, violet, white, white];

    for (let i = 0; i < count; i++) {
      // Spread points in a large flat-ish box so scrolling feels like drifting through space
      positions[i * 3] = (Math.random() - 0.5) * 90;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 70;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60 - 10;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geometry = this.track(new THREE.BufferGeometry());
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = this.track(
      new THREE.PointsMaterial({
        size: 0.09,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      }),
    );

    this.stars = new THREE.Points(geometry, material);
    this.scene!.add(this.stars);
  }

  private buildCore(): void {
    this.core = new THREE.Group();

    const wireGeo = this.track(new THREE.IcosahedronGeometry(3.4, 1));
    const wireMat = this.track(
      new THREE.MeshBasicMaterial({ color: 0x22d3ee, wireframe: true, transparent: true, opacity: 0.35 }),
    );
    const wire = new THREE.Mesh(wireGeo, wireMat);

    const innerGeo = this.track(new THREE.IcosahedronGeometry(1.9, 0));
    const innerMat = this.track(
      new THREE.MeshStandardMaterial({
        color: 0x312e81,
        emissive: 0x6d28d9,
        emissiveIntensity: 0.55,
        metalness: 0.75,
        roughness: 0.25,
        flatShading: true,
      }),
    );
    const inner = new THREE.Mesh(innerGeo, innerMat);

    const ringGeo = this.track(new THREE.TorusGeometry(4.6, 0.03, 12, 120));
    const ringMat = this.track(
      new THREE.MeshBasicMaterial({ color: 0xa78bfa, transparent: true, opacity: 0.45 }),
    );
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.4;
    const ring2 = new THREE.Mesh(ringGeo, ringMat);
    ring2.rotation.x = Math.PI / 1.7;
    ring2.rotation.y = Math.PI / 3;

    this.core.add(wire, inner, ring, ring2);
    // Sit to the right of the hero text on wide screens, centered-ish otherwise
    this.core.position.set(5.5, 0.4, 0);
    this.scene!.add(this.core);
  }

  private buildFloaters(): void {
    const geometries = [
      this.track(new THREE.OctahedronGeometry(0.55)),
      this.track(new THREE.TorusKnotGeometry(0.4, 0.12, 64, 12)),
      this.track(new THREE.TetrahedronGeometry(0.6)),
      this.track(new THREE.DodecahedronGeometry(0.5)),
    ];
    const material = this.track(
      new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        emissive: 0x0891b2,
        emissiveIntensity: 0.35,
        metalness: 0.8,
        roughness: 0.3,
        flatShading: true,
      }),
    );

    for (let i = 0; i < 14; i++) {
      const mesh = new THREE.Mesh(geometries[i % geometries.length], material);
      mesh.position.set(
        (Math.random() - 0.5) * 34,
        (Math.random() - 0.5) * 26,
        (Math.random() - 0.5) * 18 - 4,
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      mesh.userData['spin'] = 0.15 + Math.random() * 0.35;
      mesh.userData['bobOffset'] = Math.random() * Math.PI * 2;
      this.floaters.push(mesh);
      this.scene!.add(mesh);
    }
  }

  private readonly loop = (time: number) => {
    this.renderFrame(time);
    this.frameId = requestAnimationFrame(this.loop);
  };

  private renderFrame(time: number): void {
    if (!this.renderer || !this.scene || !this.camera) return;
    const t = time * 0.001;

    if (this.stars) {
      this.stars.rotation.y = t * 0.012;
      this.stars.rotation.x = this.scrollRatio * 0.25;
    }

    if (this.core) {
      this.core.rotation.y = t * 0.18 + this.scrollRatio * Math.PI * 1.5;
      this.core.rotation.x = t * 0.07;
      // Core recedes and drifts left as the visitor scrolls into the content
      this.core.position.x = 5.5 - this.scrollRatio * 9;
      this.core.position.z = -this.scrollRatio * 10;
    }

    for (const mesh of this.floaters) {
      const spin = mesh.userData['spin'] as number;
      mesh.rotation.x += 0.002 * spin * 10;
      mesh.rotation.y += 0.0016 * spin * 10;
      mesh.position.y += Math.sin(t * 0.8 + (mesh.userData['bobOffset'] as number)) * 0.0035;
    }

    // Smooth mouse parallax + gentle downward drift with scroll
    const targetX = this.mouseX * 1.4;
    const targetY = -this.mouseY * 1.0 - this.scrollRatio * 3.5;
    this.camera.position.x += (targetX - this.camera.position.x) * 0.04;
    this.camera.position.y += (targetY - this.camera.position.y) * 0.04;
    this.camera.lookAt(0, -this.scrollRatio * 3, 0);

    this.renderer.render(this.scene, this.camera);
  }
}
