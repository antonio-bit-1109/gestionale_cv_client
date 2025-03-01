import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profilo-utente',
  standalone: false,
  templateUrl: './profilo-utente.component.html',
  styleUrl: './profilo-utente.component.scss',
})
export class ProfiloUtenteComponent implements OnInit {
  public profileImage: string | undefined;
  public showModal = false;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getImageProfile();
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

  public openModal() {
    this.showModal = true;
  }

  public closeModalEvent(event: boolean) {
    this.showModal = event;
  }
}
