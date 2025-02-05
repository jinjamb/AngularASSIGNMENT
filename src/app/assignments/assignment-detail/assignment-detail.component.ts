import { Component, Input } from '@angular/core';
import { Assignment } from '../assignment.model';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';


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
  assignmentTransmis!:Assignment;

}
