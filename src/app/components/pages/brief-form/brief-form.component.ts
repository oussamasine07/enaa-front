import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BriefService } from '../../../services/brief/brief-service';
import { Engagement } from '../../../models/interfaces/brief';

@Component({
  selector: 'app-brief-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './brief-form.component.html',
  styleUrls: ['./brief-form.component.css']
})
export class BriefFormComponent {
  briefForm: FormGroup;
  isSubmitting = false;
  engagements = Object.values(Engagement);

  constructor(private fb: FormBuilder, private briefService: BriefService) {
    this.briefForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      engagement: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      duration: ['', [Validators.required, Validators.min(1), Validators.max(365)]]
    });
  }

  onSubmit() {
    if (this.briefForm.valid) {
      this.isSubmitting = true;

      // Validate that endDate is after startDate
      const startDate = new Date(this.briefForm.value.startDate);
      const endDate = new Date(this.briefForm.value.endDate);
      
      if (endDate <= startDate) {
        this.isSubmitting = false;
        return;
      }

      // Create request data
      const requestData = {
        title: this.briefForm.value.title?.toString().trim() || '',
        description: this.briefForm.value.description?.toString().trim() || '',
        startDate: this.convertToBackendDate(this.briefForm.value.startDate),
        endDate: this.convertToBackendDate(this.briefForm.value.endDate),
        duration: parseInt(this.briefForm.value.duration) || 0,
        engagement: this.briefForm.value.engagement?.toString() || ''
      };

      this.briefService.addBrief(requestData).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.resetForm();
        },
        error: (error) => {
          this.isSubmitting = false;
        }
      });
    } else {
      Object.keys(this.briefForm.controls).forEach(key => {
        this.briefForm.get(key)?.markAsTouched();
      });
    }
  }

  convertToBackendDate(dateString: string): string {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return '';
      }
      
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      
      return `${year}-${month}-${day}`;
    } catch (error) {
      return '';
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.briefForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['minlength']) return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
      if (field.errors['maxlength']) return `${fieldName} must be less than ${field.errors['maxlength'].requiredLength} characters`;
      if (field.errors['min']) return `${fieldName} must be greater than 0`;
      if (field.errors['max']) return `${fieldName} must be less than ${field.errors['max'].max}`;
    }
    return '';
  }

  getFormProgress(): number {
    const fields = ['title', 'engagement', 'startDate', 'endDate', 'description', 'duration'];
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