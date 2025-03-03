import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SubjectService } from '../../services/subject.service';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  @Output() public emitVal = new EventEmitter();

  public nomeUtente: string | undefined;
  public ruolo: string | undefined;
  public invitoAttivo: boolean | null = null;
  public profileImage: string | undefined;
  constructor(
    private authService: AuthService,
    private router: Router,
    private subjectService: SubjectService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.nomeUtente = this.authService.getName();
    this.ruolo = this.authService.getRole();

    this.subjectService.getInvitoCreazione().subscribe({
      next: (invitoIsAttivo: boolean | null) => {
        console.log('il valore di invito è :', invitoIsAttivo);
        this.invitoAttivo = invitoIsAttivo;
      },
    });

    // prendere dal server l'immagine del profilo dell'utente e mostrarlo in navbar
    this.getImageProfile();

    this.subjectService.getNotify_change_img().subscribe({
      next: (reload: null | boolean) => {
        if (reload) {
          this.getImageProfile();
        }
      },
    });
  }

  public getImageProfile() {
    this.userService.getProfileImage(this.authService.getIdUser()).subscribe({
      next: (resp: { message: string }) => {
        this.profileImage = resp.message;
      },
      error: (err: HttpErrorResponse) => {
        console.error('errore nel reperire immagine utente dal server');
        this.profileImage = 'assets/images/logo1.webp';
      },
    });
  }

  public emitBoolean() {
    this.emitVal.emit((prev: boolean) => !prev);
  }

  public doLogout() {
    this.authService.logout();
  }

  public goHome() {
    this.router.navigateByUrl('home');
  }
}
