import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  backendURL = 'http://localhost:8010/api/assignments';

assignments:Assignment[] = [];
  
  constructor(private http:HttpClient) { }

  getAssignments():Observable<Assignment[]> {
    console.log("Service:getAssignments appelée !");
    
    // On utilise la methode get du service HttpClient
    // pour récupérer les données depuis le backend
    return this.http.get<Assignment[]>(this.backendURL);
  }

  getAssignment(id:number):Observable<Assignment|undefined> {
    console.log("Service:getAssignment appelée avec id = " + id);
    // route = /api/assignments/:id côté serveur !
    let backendURL = 'http://localhost:8010/api/assignments' + '/' + id;

    return this.http.get<Assignment>(backendURL);
  }

  addAssignment(assignment:Assignment):Observable<string> {
    // On ajoute l'assignment passé en paramètres
    // en l'envoyant par POST au backend
     return this.http.post<string>(this.backendURL, assignment);
  }

  updateAssignment(assignment:Assignment):Observable<string> {
    // On met à jour l'assignment passé en paramètres
    // en l'envoyant par PUT au backend
    return this.http.put<string>(this.backendURL, assignment);
  }

  deleteAssignment(assignment:Assignment):Observable<string> {
    // On supprime l'assignment passé en paramètres
    // en l'envoyant par DELETE au backend
    return this.http.delete<string>(this.backendURL + '/' + assignment.id);
  }
}
