import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { AssignmentsService } from './shared/assignments.service';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  titre = 'Gestion de rendu des devoirs';
  opened = false; // For sidebar state

  constructor(
    private assignmentsService: AssignmentsService,
    private authService: AuthService
  ) { }

  async toggleAdmin(arg0: any) {
    if (await this.authService.isAdmin()) {
      console.log("Pas admin !");
      this.authService.setAdmin(false);
    } else {
      console.log("Admin !");
      this.authService.setAdmin(true);
    };
  }

  toggleSidebar() {
    this.opened = !this.opened;
  }

  genererDonneesDeTest() {
    console.log("Génération des données de test");

    this.assignmentsService.peuplerBDavecForkJoin()
      .subscribe(() => {
        console.log("Toutes les données de test ont été insérées");
        window.location.href = '/home';
      });
  }
}
