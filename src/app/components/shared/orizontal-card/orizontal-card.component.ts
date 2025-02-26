import { Component, Input } from '@angular/core';
import { Icv } from '../../../utility/modelResponse/modelResp';
import { Router } from '@angular/router';
import { CvService } from '../../../services/cv.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-orizontal-card',
  standalone: false,
  templateUrl: './orizontal-card.component.html',
  styleUrl: './orizontal-card.component.scss',
})
export class OrizontalCardComponent {
  @Input() cv: Icv | undefined;

  constructor(
    private router: Router,
    private cvService: CvService,
    private authService: AuthService
  ) {}
  public scaricaPdf(cv: Icv) {
    this.cvService.downloadFile(cv.id_cv, this.authService.getName());
  }

  public goToModificaCv(id_cv: number) {
    this.router.navigateByUrl(`/home/modifica-cv/${id_cv}`);
  }

  public goToVisualizzaCv(id_cv: number) {
    this.router.navigateByUrl(`/home/visualizza-cv/${id_cv}`);
  }
}
