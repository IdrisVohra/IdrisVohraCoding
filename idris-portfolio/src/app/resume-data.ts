export interface SkillGroup {
  category: string;
  icon: string;
  skills: string[];
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
}

export interface Project {
  name: string;
  tag: string;
  description: string[];
  tech: string[];
}

export interface Education {
  degree: string;
  institute: string;
  period: string;
}

export const PROFILE = {
  name: 'Idris Vohra',
  role: 'Senior Frontend Engineer',
  tagline: 'Angular | TypeScript | Product Engineering',
  email: 'idrees786.iv@gmail.com',
  phone: '+91 81087 19787',
  // Update with your actual LinkedIn profile URL
  linkedin: 'https://www.linkedin.com/',
  summary:
    'Frontend engineer with 4.5+ years designing, building, and owning production-grade web applications ' +
    'end-to-end — from architecture and state management to performance, accessibility, and release. ' +
    'Improved Lighthouse performance scores from ~60 to 90+ and cut page load time by ~30% on ' +
    'enterprise-scale Angular applications. Designed and shipped 40+ reusable, WCAG/ARIA-compliant ' +
    'components adopted across 3 product streams. MBA (IT) adds product and business thinking to ' +
    'engineering depth, enabling close collaboration with product, design, and cross-functional stakeholders.',
  stats: [
    { value: '4.5+', label: 'Years Experience' },
    { value: '90+', label: 'Lighthouse Score' },
    { value: '40+', label: 'Reusable Components' },
    { value: '20+', label: 'REST APIs Integrated' },
  ],
};

export const SKILL_GROUPS: SkillGroup[] = [
  { category: 'Languages', icon: '⌨', skills: ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3'] },
  { category: 'Frontend', icon: '◈', skills: ['Angular 14+', 'Angular Signals', 'React.js'] },
  { category: 'State Management', icon: '⟳', skills: ['NgRx', 'RxJS', 'Redux', 'Zustand'] },
  { category: 'Backend & APIs', icon: '⚙', skills: ['Node.js', 'REST APIs'] },
  { category: 'Styling', icon: '✦', skills: ['Tailwind CSS', 'SCSS'] },
  { category: 'Testing', icon: '✓', skills: ['Jest', 'React Testing Library', 'Cypress'] },
  { category: 'Auth & Security', icon: '🛡', skills: ['JWT', 'RBAC'] },
  { category: 'DevOps & Tools', icon: '🛠', skills: ['AWS CI/CD', 'Git', 'Agile/Scrum', 'Postman', 'Bruno'] },
  { category: 'Databases', icon: '🗄', skills: ['MongoDB', 'SQL Server'] },
  {
    category: 'Performance & A11y',
    icon: '⚡',
    skills: ['OnPush Change Detection', 'Lazy Loading', 'Code Splitting', 'Lighthouse Audits', 'WCAG', 'ARIA'],
  },
];

export const EXPERIENCES: Experience[] = [
  {
    role: 'Application Developer Analyst',
    company: 'Accenture Solutions Pvt. Ltd.',
    location: 'Mumbai, India',
    period: 'Dec 2021 – Present',
    highlights: [
      'Owned performance and architecture for high-traffic Angular modules used by enterprise product teams, improving Lighthouse scores from ~60 to 90+ and reducing page load time by ~30% through lazy loading, code splitting, and OnPush change detection.',
      'Designed and built 40+ reusable, WCAG/ARIA-compliant TypeScript components adopted across 3 product streams, using Angular Signals for fine-grained reactivity and reduced re-renders.',
      'Owned application state strategy using RxJS and NgRx while integrating 20+ REST APIs with JWT authentication and role-based access control (RBAC), maintaining 95%+ on-time delivery across releases.',
      'Partnered with product managers, designers, and UI/UX stakeholders to ship responsive, accessible interfaces across desktop and mobile.',
      'Automated releases through AWS CI/CD pipelines, reducing manual deployment overhead and release risk.',
    ],
  },
  {
    role: 'Application Development Associate',
    company: 'LTI Mindtree Solutions Pvt. Ltd.',
    location: 'Mumbai, India',
    period: 'Jun 2021 – Sep 2021',
    highlights: [
      'Built and optimized Node.js APIs supporting 500+ daily active users, improving query performance by ~20%.',
      'Identified and resolved 30+ defects pre-release, strengthening release quality and stability.',
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    name: 'Master Link',
    tag: 'Full-Stack Product · MEAN Stack',
    description: [
      'Designed and shipped an end-to-end product from scratch, including JWT authentication, multi-role RBAC, and a real-time dashboard.',
      'Deployed on Vercel with automated CI/CD, achieving 99%+ uptime; implemented lazy-loaded routes and optimistic UI updates for a fast, native-app-like experience.',
    ],
    tech: ['MongoDB', 'Express', 'Angular', 'Node.js', 'JWT', 'RBAC', 'Vercel'],
  },
  {
    name: 'TypeScript Component Library',
    tag: 'Open Source · Design System',
    description: [
      'Building a reusable, documented component library (forms, data tables, modals) with Storybook.',
      'Unit-tested using Jest and React Testing Library, designed for reuse across multiple product teams.',
    ],
    tech: ['TypeScript', 'Storybook', 'Jest', 'React Testing Library'],
  },
];

export const EDUCATION: Education[] = [
  { degree: 'MBA – Information Technology (Distance)', institute: 'NMIMS Mumbai', period: '2023 – 2025' },
  { degree: 'B.E. – Computer Engineering', institute: "St. Xavier's Institute of Engineering", period: '2019 – 2021' },
  { degree: 'Diploma – Computer Engineering', institute: 'BGI Mumbai', period: '2017 – 2019' },
];
