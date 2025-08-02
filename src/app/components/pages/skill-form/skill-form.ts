import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { skillForm } from '../../../models/types/skill-form';
import { SkillService } from '../../../services/skill/SkillService';
import { Skill } from '../../../models/interfaces/skill';

@Component({
  selector: 'app-skill-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './skill-form.html',
  styleUrls: ['./skill-form.css'] 
})
export class SkillForm {

  skillService: SkillService = inject(SkillService);

  skillFormObj: skillForm = {
    name: ""
  }

  onSubmitSkill ( form: FormsModule ) {
    this.skillService.createSkill(this.skillFormObj).subscribe({
      next: ( res: Skill ) => {
        // clear input
        this.skillFormObj = {
          name: ""
        }
        console.log(res)
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  
}
