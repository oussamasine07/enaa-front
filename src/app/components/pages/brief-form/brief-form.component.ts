import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brief-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './brief-form.component.html',
  styleUrl: './brief-form.component.css'
})
export class BriefFormComponent {
  briefForm: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder) {
    this.briefForm = this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(3)]],
      engagement: ['', [Validators.required]],
      dateDebut: ['', [Validators.required]],
      dateFin: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      duree: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.briefForm.valid) {
      this.isSubmitting = true;
      
      // Simulate API call
      setTimeout(() => {
        console.log('Brief créé:', this.briefForm.value);
        this.isSubmitting = false;
        // Reset form after successful submission
        this.briefForm.reset();
      }, 1500);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.briefForm.controls).forEach(key => {
        this.briefForm.get(key)?.markAsTouched();
      });
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.briefForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} est requis`;
      if (field.errors['minlength']) return `${fieldName} doit contenir au moins ${field.errors['minlength'].requiredLength} caractères`;
      if (field.errors['min']) return `${fieldName} doit être supérieur à 0`;
    }
    return '';
  }

  getFormProgress(): number {
    const fields = ['titre', 'engagement', 'dateDebut', 'dateFin', 'description', 'duree'];
    const filledFields = fields.filter(field => {
      const value = this.briefForm.get(field)?.value;
      return value && value.toString().trim() !== '';
    });
    return Math.round((filledFields.length / fields.length) * 100);
  }

  resetForm(): void {
    this.briefForm.reset();
    Object.keys(this.briefForm.controls).forEach(key => {
      this.briefForm.get(key)?.setErrors(null);
    });
  }
}