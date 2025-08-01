import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Brief, BriefDTO } from '../../models/interfaces/brief';

@Injectable({
  providedIn: 'root'
})
export class BriefService {
  private apiUrl = 'http://localhost:8081/briefs';

  constructor(private http: HttpClient) {}

  // Add proper logging and error handling
  addBrief(briefData: BriefDTO): Observable<Brief> {
    console.log('Sending brief data:', JSON.stringify(briefData, null, 2));

    return this.http.post<Brief>(this.apiUrl, briefData).pipe(
      tap(response => console.log('Brief created successfully:', response)),
      catchError(error => {
        console.error('Error creating brief:', error);
        if (error.error) {
          console.error('Server error details:', error.error);
        }
        throw error;
      })
    );
  }

  // Other methods remain the same...
  getAllBriefs(): Observable<Brief[]> {
    return this.http.get<Brief[]>(this.apiUrl);
  }

  getBriefById(id: number): Observable<Brief> {
    return this.http.get<Brief>(`${this.apiUrl}/${id}`);
  }

  getBriefId(id: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/get-brief-by-id/${id}`);
  }

  updateBrief(id: number, briefData: BriefDTO): Observable<Brief> {
    return this.http.put<Brief>(`${this.apiUrl}/${id}`, briefData);
  }

  deleteBrief(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
