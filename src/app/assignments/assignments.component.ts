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
import { AssignmentsService } from '../shared/assignments.service';
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
  assignments:Assignment[] = [];

  // Attention, pour l'injection de service, mettre en private !!! Sinon
  // ça ne marche pas
  constructor(private assignementsService:AssignmentsService) {}

  ngOnInit() {
    console.log("ngOnInit appelé lors de l'instanciation du composant");

    // On récupère les assignments depuis le service
    this.assignementsService.getAssignments()
    .subscribe(assignments => {
      this.assignments = assignments;
      console.log("Données reçues dans le subscribe");
    });
    console.log("APRES L'APPEL AU SERVICE");

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
    nouvel assignment été ajouté par le fils: ${newAssignment.nom}, 
    on peut cacher le formulaire et afficher la liste`;
    console.log(message);

    this.formVisible = false; 
  }

  getColor(a:any):string {
    if(a.rendu) return 'green';
    else
      return 'red';
  }
}
