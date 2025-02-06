import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
assignments:Assignment[] = [
    {
      id:1,
      nom: 'TP Angular',
      dateDeRendu: new Date('2024-3-17'),
      rendu: false
    },
    {
      id:2,
      nom: 'TP Mr Galli',
      dateDeRendu: new Date('2023-12-17'),
      rendu: true
    },
    {
      id:3,
      nom: 'Projet J2EE',
      dateDeRendu: new Date('2024-4-15'),
      rendu: false
    }
  ];
  
  constructor() { }

  getAssignments():Observable<Assignment[]> {
    console.log("Service:getAssignments appelée !");
    // plus tard on enverra une requête 
    // ASYNCHRONE vers un Web Service RESTful

    // of transforme un objet JavaScript en un Observable
    return of(this.assignments);
  }

  getAssignment(id:number):Observable<Assignment|undefined> {
    // On récupère l'assignment dont l'id est égal à id
    const assignment:Assignment|undefined = this.assignments.find(a => {
      if (a.id === id) 
        return a;
      else 
        return null;
   });

   return of(assignment);
  }

  addAssignment(assignment:Assignment):Observable<string> {
    this.assignments.push(assignment);

    return of("Service:addAssignment: Assignment ajouté !");
  }

  updateAssignment(assignment:Assignment):Observable<string> {
    // Pour le moment, tant qu'on est avec des données
    // dans un tableau, il n'y a rien à faire, l'assignment
    // passé en paramètres est déjà dans le tableau, si on a modifié
    // par exemple son nom, c'est déjà modifié dans le tableau
    return of("Service:updateAssignment: Assignment mis à jour !");
  }

  deleteAssignment(assignment:Assignment):Observable<string> {
    // On supprime l'assignment passé en paramètres
    // du tableau des assignments
    const index = this.assignments.indexOf(assignment);
    this.assignments.splice(index, 1);

    return of("Service:deleteAssignment: Assignment supprimé !");
  }
}
