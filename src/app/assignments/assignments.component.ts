import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenduDirective } from '../shared/rendu.directive';
import { NonRenduDirective } from '../shared/non-rendu.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { Assignment } from './assignment.model';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import { AssignmentsService } from '../shared/assignments.service';
import { Router, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-assignments',
  imports: [CommonModule,
    MatListModule, MatDividerModule, MatButtonModule,
    MatInputModule, MatFormFieldModule, FormsModule,
    MatTableModule, MatPaginatorModule,
    RouterLink],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})

export class AssignmentsComponent implements OnInit {
  titre = 'Liste des assignments';
  formVisible = false;
  assignmentSelectionne: Assignment | undefined;
  assignments: Assignment[] = [];

  // Pour la pagination
  page = 1;
  limit = 4;
  totalDocs = 2000;
  totalPages = 667;
  pagingCounter = 1;
  hasPrevPage = false;
  hasNextPage = true;
  prevPage = null;
  nextPage = 2;
  // Pour la data table angular
  displayedColumns: string[] = ['nom', 'dateDeRendu', 'rendu'];

  // Attention, pour l'injection de service, mettre en private !!! Sinon
  // ça ne marche pas
  constructor(private assignementsService: AssignmentsService,
    private router: Router) { }

  ngOnInit(): void {
    console.log("ngOnInit appelé lors de l'instanciation du composant");

    // On récupère les assignments depuis le service
    this.getAssignments();

    /*
    // on veut passer la propriété ajoutActive à true au bout de 3 secondes
    setTimeout(() => {
      this.ajoutActive = true;
    }, 3000);
    */
  }

  getAssignments() {
    this.assignementsService.getAssignmentsPagines(this.page, this.limit)
      .subscribe(data => {
        console.log(data);
        this.assignments = data.docs;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.pagingCounter = data.pagingCounter;
        this.hasPrevPage = data.hasPrevPage;
        this.hasNextPage = data.hasNextPage;
        this.prevPage = data.prevPage;
        this.nextPage = data.nextPage
      });
  }

  pageSuivante() {
    this.page++;
    this.getAssignments();
  }

  pagePrecedente() {
    this.page--;
    this.getAssignments();
  }

  dernierePage() {
    this.page = this.totalPages;
    this.getAssignments();
  }
  premierePage() {
    this.page = 1;
    this.getAssignments();
  }

  // Pour le composant material paginator
  onPageEvent(event: any) {
    console.log(event);
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getAssignments();
  }

  getColor(a: any): string {
    if (a.rendu) return 'green';
    else
      return 'red';
  }

  afficheDetail(assignment: Assignment) {
    // Make sure assignment and assignment._id are defined before navigating
    if (assignment && assignment._id) {
      this.router.navigate(['/assignment', assignment._id]);
    } else {
      console.error('Cannot navigate: assignment or assignment._id is undefined', assignment);
    }
  }

  generateId(): string {
    return (this.assignments.length + 1).toString();
  }

  addAssignment(nom: string, dateDeRendu: Date, rendu: boolean) {
    const newAssignment: Assignment = {
      _id: this.generateId(),
      nom,
      dateDeRendu,
      rendu,
      id: this.generateId()
    };
    this.assignments.push(newAssignment);
  }
}
