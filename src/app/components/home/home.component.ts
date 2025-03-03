import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public booleanEmitted: boolean = false;

  public getBoolean(event: boolean) {
    this.booleanEmitted = event;
  }
}
