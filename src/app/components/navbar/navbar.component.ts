import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SubjectService } from '../../services/subject.service';

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
  constructor(
    private authService: AuthService,
    private router: Router,
    private subjectService: SubjectService
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
