import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { skillForm } from '../../models/types/skill-form';
import { catchError, Observable, throwError } from 'rxjs';
import { Skill } from '../../models/interfaces/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  httpClient: HttpClient = inject(HttpClient);

  createSkill (body: skillForm): Observable<Skill> {
    return this.httpClient.post<Skill>("http://localhost:8082/api/v1/skill", body)
            .pipe(
              catchError((err: HttpErrorResponse) => {
                return throwError(() => err);
              })
            );
  }
  
  
}
