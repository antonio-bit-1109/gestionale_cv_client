import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../services/toast.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-modifica-img-profilo',
  standalone: false,
  templateUrl: './modifica-img-profilo.component.html',
  styleUrl: './modifica-img-profilo.component.scss',
})
export class ModificaImgProfiloComponent {
  @Output() closeModal = new EventEmitter();

  @Output() notifySuccess = new EventEmitter<string>();

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private subjectService: SubjectService
  ) {}

  public form = new FormGroup({
    file: new FormControl(null, [Validators.required]),
  });

  public emitClose() {
    this.closeModal.emit(false);
    this.form.controls.file.patchValue(null);
  }

  public onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.form.controls.file.setValue(input.files[0]);
    }
  }

  public onSubmit() {
    if (this.form.controls.file.value === null) {
      console.error("inserisci un file per l'upload della foto.");
      return;
    }
    console.log(this.form.controls.file.value);

    const formData = new FormData();
    formData.append('file', this.form.controls.file.value);
    formData.append('id_utente', this.authService.getIdUser());

    console.log(formData);

    this.userService.changeImageProfile(formData).subscribe({
      next: (resp: { message: string }) => {
        console.log(resp);
        this.emitClose();
        this.notifySuccess.emit(`${resp.message}/success`);
        this.subjectService.notify_reload_img_profile_ON();
      },
      error: (err: HttpErrorResponse) => {
        console.error(err.error);
        this.emitClose();
        this.notifySuccess.emit(
          "impossibile caricare l'immagine. Riprova più tardi/error"
        );
      },
    });
  }

  public formIsValid() {
    return this.form.valid;
  }
}
