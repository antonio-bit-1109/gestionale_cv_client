import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../services/toast.service';
import { SubjectService } from '../../services/subject.service';

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
    private authService: AuthService,
    private toastService: ToastService,
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
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

  public openModal() {
    this.showModal = true;
  }

  public closeModalEvent(event: boolean) {
    this.showModal = event;
  }

  // quando nel componente figlio app-modifica-img-profilo il caricamento del file avviene con successo o con errore viene notificato questo componente padre che chiama il toast message e mostra il messaggio ritornato dal server.
  public showToast(event: string) {
    const index = event.indexOf('/');
    const severity = event.substring(index + 1);

    this.toastService.show(
      severity,
      event.substring(0, index),
      'modifica immagine profilo',
      'toast'
    );
  }
}
