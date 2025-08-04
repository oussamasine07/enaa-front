import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Interface simple pour un brief
export interface Brief {
  id: number;
  title: string;
  engagement: string;
}

@Injectable({
  providedIn: 'root'
})
export class BriefService {
  // URL de l'API backend
  private apiUrl = 'http://localhost:8080/briefs';

  constructor(private http: HttpClient) { }

  // Récupérer tous les briefs
  getAllBriefs() {
    return this.http.get<Brief[]>(this.apiUrl);
  }
} 