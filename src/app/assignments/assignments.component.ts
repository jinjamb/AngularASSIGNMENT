import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenduDirective } from '../shared/rendu.directive';
import { NonRenduDirective } from '../shared/non-rendu.directive';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import {provideNativeDateAdapter} from '@angular/material/core';
import { Assignment } from './assignment.model';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';

@Component({
  selector: 'app-assignments',
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule, RenduDirective, NonRenduDirective, 
    MatButtonModule, MatFormFieldModule, MatInputModule,
    MatListModule, MatDividerModule,
    FormsModule, MatDatepickerModule, AssignmentDetailComponent],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})
export class AssignmentsComponent implements OnInit {
  titre = 'Liste des assignments';
  //ajoutActive = false;
  // Pour le formulaire d'ajout
  nomDevoir = "";
  dateDeRendu!:Date;
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
  onSubmit(event:any) {
    console.log(`On a soumis le formulaire nom = ${this.nomDevoir}, 
      dateDeRendu = ${this.dateDeRendu}`);

      // On ne crée un nouvel assignment que si le formulaire est valide
      // c'est-à-dire si le nom du devoir n'est pas vide et si la date de rendu est bien définie
      if(this.nomDevoir == "" || this.dateDeRendu == null) {
        console.log("Formulaire invalide");
        return;
      }

      let nouvelAssignment = new Assignment();
      nouvelAssignment.nom = this.nomDevoir;
      nouvelAssignment.dateDeRendu = this.dateDeRendu;
      nouvelAssignment.rendu = false;

      // On ajoute le nouvel assignment au tableau
      this.assignments.push(nouvelAssignment);
  }

  onAssignmentClique(assignmentClique:Assignment) {
    console.log("On a cliqué sur " + assignmentClique.nom);
    this.assignmentSelectionne = assignmentClique;

  }

  getColor(a:any):string {
    if(a.rendu) return 'green';
    else
      return 'red';
  }
}
