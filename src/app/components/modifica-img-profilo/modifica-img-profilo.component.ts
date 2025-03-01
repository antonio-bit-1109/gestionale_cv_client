import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../services/toast.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modifica-img-profilo',
  standalone: false,
  templateUrl: './modifica-img-profilo.component.html',
  styleUrl: './modifica-img-profilo.component.scss',
})
export class ModificaImgProfiloComponent {
  @Output() closeModal = new EventEmitter();

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  public form = new FormGroup({
    file: new FormControl(null, [Validators.required]),
  });

  public emitClose() {
    this.closeModal.emit(false);
  }

  public onSubmit() {
    if (this.form.controls.file.value === null) {
      console.error("inserisci un file per l'upload della foto.");
      return;
    }
    // console.log(this.form.controls.file.value);

    const formData = new FormData();
    formData.append('file', this.form.controls.file.value);
    formData.append('id_utente', this.authService.getIdUser());

    console.log(formData);

    this.userService.changeImageProfile(formData).subscribe({
      next: (resp) => {
        console.log(resp);
      },
      error: (err: HttpErrorResponse) => {
        console.error(err.error);
      },
    });
  }

  public formIsValid() {
    return this.form.valid;
  }
}
