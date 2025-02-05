import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenduDirective } from '../shared/rendu.directive';
import { NonRenduDirective } from '../shared/non-rendu.directive';

@Component({
  selector: 'app-assignments',
  imports: [CommonModule, RenduDirective, NonRenduDirective],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})
export class AssignmentsComponent {
  titre = 'Liste des assignments';
  assignments = [
    {
      nom: 'TP Angular',
      dateDeRendu: '2024-3-17',
      rendu: false
    },
    {
      nom: 'TP Mr Galli',
      dateDeRendu: '2023-12-17',
      rendu: true
    },
    {
      nom: 'Projet J2EE',
      dateDeRendu: '2024-4-15',
      rendu: false
    }
  ]

  getColor(a:any):string {
    if(a.rendu) return 'green';
    else
      return 'red';
  }
}
