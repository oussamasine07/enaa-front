import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BriefService, Brief } from '../../../services/brief.service';

@Component({
  selector: 'app-rendu',
  imports: [CommonModule, FormsModule],
  templateUrl: './rendu.html',
  styleUrl: './rendu.css'
})
export class Rendu implements OnInit {
  // Liste des briefs récupérés depuis le backend
  briefs: Brief[] = [];
  
  // Brief sélectionné par l'utilisateur
  selectedBriefId: number = 0;
  
  // Message et lien saisis par l'utilisateur
  message: string = '';
  link: string = '';

  constructor(private briefService: BriefService) {}

  // Cette méthode s'exécute quand le composant se charge
  ngOnInit(): void {
    this.loadBriefs();
  }

  // Récupérer les briefs depuis le backend
  loadBriefs(): void {
    this.briefService.getAllBriefs().subscribe({
      next: (briefs) => {
        // Si la requête réussit, on stocke les briefs
        this.briefs = briefs;
        console.log('Briefs chargés:', briefs);
      },
      error: (error) => {
        // Si il y a une erreur, on l'affiche
        console.error('Erreur:', error);
        alert('Erreur lors du chargement des briefs');
      }
    });
  }

  // Quand l'utilisateur change de brief dans la select
  onBriefSelected(event: any): void {
    this.selectedBriefId = Number(event.target.value);
    console.log('Brief sélectionné:', this.selectedBriefId);
  }

  // Quand l'utilisateur soumet le formulaire
  onSubmit(): void {
    // Vérifier qu'un brief est sélectionné
    if (this.selectedBriefId === 0) {
      alert('Veuillez sélectionner un brief');
      return;
    }

    // Vérifier qu'un message est saisi
    if (this.message.trim() === '') {
      alert('Veuillez saisir un message');
      return;
    }

    // Afficher les données soumises
    console.log('Rendu soumis:', {
      briefId: this.selectedBriefId,
      message: this.message,
      link: this.link
    });

    alert('Rendu soumis avec succès !');

    // Réinitialiser le formulaire
    this.selectedBriefId = 0;
    this.message = '';
    this.link = '';
  }
}
