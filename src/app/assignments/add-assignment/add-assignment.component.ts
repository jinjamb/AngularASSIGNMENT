import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { Assignment } from '../assignment.model';

@Component({
  providers: [provideNativeDateAdapter()],
  selector: 'app-add-assignment',
  imports: [FormsModule, MatInputModule, MatDatepickerModule, 
    MatButtonModule, MatFormFieldModule],
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css'
})
export class AddAssignmentComponent {
  // nouvelAssignmentEvent est un événement que l'on va envoyer vers 
  // le père. Le nom de l'événement c'est nouvelAssignmentEvent
  // et c'est aussi la variable qui va émettre l'événement
  @Output()
  nouvelAssignmentEvent = new EventEmitter<Assignment>();
  
  // Pour le formulaire d'ajout
  nomDevoir = "";
  dateDeRendu!:Date;
  
onSubmit(event:any) {
    console.log(`On a soumis le formulaire nom = ${this.nomDevoir}, 
      dateDeRendu = ${this.dateDeRendu}`);

      // On ne crée un nouvel assignment que si le formulaire est valide
      // c'est-à-dire si le nom du devoir n'est pas vide et si la date de rendu est bien définie
      if(this.nomDevoir == "" || this.dateDeRendu == null) {
        console.log("Formulaire invalide");
        return;
      }

      let a = new Assignment();
      a.nom = this.nomDevoir;
      a.dateDeRendu = this.dateDeRendu;
      a.rendu = false;

      // On ajoute le nouvel assignment au tableau
      //this.assignments.push(nouvelAssignment);

      // On envoie un événement vers le père, et l'event
      // va contenir le nouvel assignment que l'on veut ajouter
      this.nouvelAssignmentEvent.emit(a);
  }

}
