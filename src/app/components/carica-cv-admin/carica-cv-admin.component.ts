import { Component, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { UserService } from '../../services/user.service';
import { filter, map, Observable, take } from 'rxjs';
import { IGetAllUsers, IUser } from '../../utility/modelResponse/modelResp';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-carica-cv-admin',
  standalone: false,
  templateUrl: './carica-cv-admin.component.html',
  styleUrl: './carica-cv-admin.component.scss',
})
export class CaricaCvAdminComponent implements OnInit {
  files = [];

  totalSize: number = 0;

  totalSizePercent: number = 0;

  listaUtenti: IUser[] | undefined;
  candidatoSelected: string | undefined;
  constructor(
    private config: PrimeNGConfig,
    private messageService: MessageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService
      .getAllUsers()
      .pipe(
        take(1),
        map((resp: IGetAllUsers) =>
          resp.listaUtenti.filter((user) => user.ruolo !== 'ADMIN')
        )
      )
      .subscribe({
        next: (resp: IUser[]) => {
          this.listaUtenti = resp;
          console.log(resp);
        },
        error: (err: HttpErrorResponse) => {
          console.error(err.error);
        },
      });
  }

  public uploadDataToServer() {
    console.log('sto inviando robe');
    console.log(this.candidatoSelected, 'id candidato selezionato');
  }

  choose(event, callback) {
    callback();
  }

  onRemoveTemplatingFile(event, file, removeFileCallback, index) {
    removeFileCallback(event, index);
    this.totalSize -= parseInt(this.formatSize(file.size));
    this.totalSizePercent = this.totalSize / 10;
  }

  onClearTemplatingUpload(clear) {
    clear();
    this.totalSize = 0;
    this.totalSizePercent = 0;
  }

  onTemplatedUpload() {
    this.messageService.add({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded',
      life: 3000,
    });
  }

  onSelectedFiles(event) {
    this.files = event.currentFiles;
    this.files.forEach((file) => {
      this.totalSize += parseInt(this.formatSize(file.size));
    });
    this.totalSizePercent = this.totalSize / 10;
  }

  // uploadEvent(callback: Function) {
  //   if (typeof callback === 'function') {
  //     callback();
  //   } else {
  //     console.error('la callback passata non è una funzione');
  //   }
  // }

  formatSize(bytes) {
    const k = 1024;
    const dm = 3;
    const sizes = this.config.translation.fileSizeTypes;
    if (bytes === 0) {
      return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes[i]}`;
  }

  public UpperFirstLetter(parola: string) {
    const parolaLower = parola.toLowerCase();
    return parolaLower.charAt(0).toUpperCase().concat(parolaLower.slice(1));
  }
}
