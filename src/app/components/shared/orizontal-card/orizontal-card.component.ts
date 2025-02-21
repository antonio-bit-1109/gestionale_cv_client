import { Component, Input } from '@angular/core';
import { Icv } from '../../../utility/modelResponse/modelResp';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orizontal-card',
  standalone: false,
  templateUrl: './orizontal-card.component.html',
  styleUrl: './orizontal-card.component.scss',
})
export class OrizontalCardComponent {
  @Input() cv: Icv | undefined;

  constructor(private router: Router) {}
  public scaricaPdf(cv: Icv) {}

  public goToModificaCv(id_cv: number) {
    this.router.navigateByUrl(`/home/modifica-cv/${id_cv}`);
  }
}
