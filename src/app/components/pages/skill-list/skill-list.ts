import { Component, inject, OnInit } from '@angular/core';
import { Skill } from '../../../models/interfaces/skill';
import { SkillService } from '../../../services/skill/SkillService';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-skill-list',
  imports: [
    NgFor,
    RouterLink
  ],
  templateUrl: './skill-list.html',
  styleUrl: './skill-list.css'
})
export class SkillList implements OnInit {

  skillService: SkillService = inject(SkillService);

  skills: Skill[] = [];


  ngOnInit(): void {
      this.skillService.listAllSkills().subscribe({
        next: (res: Skill[]) => {
          this.skills = res;
        }
      })
  }

  deleteSkill (id: number | null) {
    this.skills = this.skills.filter( s => s.id != id );
    this.skillService.deleteSkill( id ).subscribe({
      next: (res) => {
        console.log( res );
      }
    })
  }

}
