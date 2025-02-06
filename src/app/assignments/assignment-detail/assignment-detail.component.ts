import { Component, Input } from '@angular/core';
import { Assignment } from '../assignment.model';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AssignmentsService } from '../../shared/assignments.service';


@Component({
  selector: 'app-assignment-detail',
  imports: [MatCardModule, CommonModule, MatButtonModule, MatCheckboxModule],
  templateUrl: './assignment-detail.component.html',
  styleUrl: './assignment-detail.component.css'
})
export class AssignmentDetailComponent {
  // Passé sous forme d'attribut dynamique par le composant père
  // dans la déclaration HTML du fils :
  // <assignment-detail [assignmentTransmis]="assignmentSelectionne"></assignment-detail>
  @Input()
  assignmentTransmis?:Assignment;

  constructor(private assignmentsService:AssignmentsService) {}

  assignmentRendu() {
    if(!this.assignmentTransmis) return;

    // On utilise le service pour mettre à jour l'assignment
    this.assignmentTransmis.rendu = true;

    // on demande au service de faire l'update
    this.assignmentsService.updateAssignment(this.assignmentTransmis)
    .subscribe(message => {
      console.log(message);
    });
  }

  onDeleteAssignment() {
    if(!this.assignmentTransmis) return;
    
    // On utilise le service pour supprimer l'assignment
    this.assignmentsService.deleteAssignment(this.assignmentTransmis)
    .subscribe(message => {
      console.log(message);
      // on cache la vue de détail puisque
      // l'assignment a été supprimé
      this.assignmentTransmis = undefined;
    });
  }

}
