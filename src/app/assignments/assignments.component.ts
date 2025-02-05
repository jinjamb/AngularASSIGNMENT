import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenduDirective } from '../shared/rendu.directive';
import { NonRenduDirective } from '../shared/non-rendu.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { Assignment } from './assignment.model';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';
@Component({
  selector: 'app-assignments',
  imports: [CommonModule, RenduDirective, NonRenduDirective, 
    MatListModule, MatDividerModule,
   AssignmentDetailComponent, MatButtonModule,
    AddAssignmentComponent],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})
export class AssignmentsComponent implements OnInit {
  titre = 'Liste des assignments';
  // Visibilité du formulaire d'ajout
  formVisible = false;
  
  // Pour le détail, on mémorise l'assignment sélectionné
  assignmentSelectionne!:Assignment;

  assignments:Assignment[] = [
    {
      nom: 'TP Angular',
      dateDeRendu: new Date('2024-3-17'),
      rendu: false
    },
    {
      nom: 'TP Mr Galli',
      dateDeRendu: new Date('2023-12-17'),
      rendu: true
    },
    {
      nom: 'Projet J2EE',
      dateDeRendu: new Date('2024-4-15'),
      rendu: false
    }
  ]

  ngOnInit() {
    console.log("ngOnInit appelé lors de l'instanciation du composant");
    /*
    // on veut passer la propriété ajoutActive à true au bout de 3 secondes
    setTimeout(() => {
      this.ajoutActive = true;
    }, 3000);
    */
  }
  
  onAssignmentClique(assignmentClique:Assignment) {
    console.log("On a cliqué sur " + assignmentClique.nom);
    this.assignmentSelectionne = assignmentClique;

  }

  // Ecouteur de l'événement envoyé par le fils
  onAddAssignment(newAssignment:Assignment) {
    const message = `Dans l'écouteur de (nouvelAssignmentEvent) un 
    nouvel assignment été reçu du fils: ${newAssignment.nom}`;
    console.log(message);

    this.assignments.push(newAssignment);

    // On canche le formulaire d'ajout et on rend la liste
    // des assignments visible
    this.formVisible = false;
  }

  getColor(a:any):string {
    if(a.rendu) return 'green';
    else
      return 'red';
  }
}
