import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Rental, RentalCreateRequest } from '../models/rental.model';

@Injectable({ providedIn: 'root' })
export class RentalService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/rentals`;

  private readonly rentals = signal<Rental[]>([]);
  readonly all = this.rentals.asReadonly();

  fetchAll(): Observable<Rental[]> {
    return this.http
      .get<Rental[]>(this.baseUrl)
      .pipe(tap((rentals) => this.rentals.set(rentals)));
  }

  create(payload: RentalCreateRequest): Observable<Rental> {
    return this.http.post<Rental>(this.baseUrl, payload);
  }

  remove(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(tap(() => this.rentals.update((list) => list.filter((rental) => rental.id !== id))));
  }
}
