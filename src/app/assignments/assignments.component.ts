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
import { FormsModule } from '@angular/forms';
import { Assignment } from './assignment.model';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import { AssignmentsService } from '../shared/assignments.service';
import { RouterLink } from '@angular/router';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-assignments',
  imports: [CommonModule, RenduDirective, NonRenduDirective,
    MatListModule, MatDividerModule, MatButtonModule,
    MatInputModule,MatFormFieldModule,FormsModule,
    MatTableModule,
    RouterLink],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})

export class AssignmentsComponent implements OnInit {
  titre = 'Liste des assignments';
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
  displayedColumns: string[] = ['nom', 'dateDeRendu', 'rendu', '_id'];
  dataSource = this.assignments;


  // Attention, pour l'injection de service, mettre en private !!! Sinon
  // ça ne marche pas
  constructor(private assignementsService: AssignmentsService) {}

  ngOnInit() {
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
        this.assignments = data.docs;
        this.page = data.page;
        this.limit = data.limit;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.pagingCounter = data.pagingCounter;
        this.hasPrevPage = data.hasPrevPage;
        this.hasNextPage = data.hasNextPage;
        this.prevPage = data.prevPage;
        this.nextPage = data.nextPage;

        console.log("Données reçues dans le subscribe");
      });
    console.log("APRES L'APPEL AU SERVICE");
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

  getColor(a: any): string {
    if (a.rendu) return 'green';
    else
      return 'red';
  }
}
