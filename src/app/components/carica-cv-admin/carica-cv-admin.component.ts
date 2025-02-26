import { Component, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { UserService } from '../../services/user.service';
import { filter, map, Observable, take } from 'rxjs';
import { IGetAllUsers, IUser } from '../../utility/modelResponse/modelResp';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../services/toast.service';
import { FormGroup } from '@angular/forms';

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

  lingue: string = '';
  istruzione = '';
  esperienze = '';
  descrizione = '';
  competenze = '';
  titolo = '';
  constructor(
    private config: PrimeNGConfig,
    private messageService: MessageService,
    private userService: UserService,
    private toastService: ToastService
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

  // metodo pirncipale per inviare il file e i dati aggiuntivi sul server.
  public uploadDataToServer() {
    console.log('sto inviando robe');
    console.log(this.candidatoSelected, 'id candidato selezionato');
    console.log(this.files, 'files');

    // se nessun file risulta caricato, toast di errore
    if (this.files.length <= 0 || this.files === undefined) {
      this.toastService.show(
        'error',
        'devi caricare un file in formato PDF prima di poter proseguire.',
        'upload file',
        'toastCaricaCv',
        2000
      );
      return;
    }

    // se nessun candidato è stato selezionato, toast di errore
    if (!this.candidatoSelected) {
      this.toastService.show(
        'error',
        'seleziona un utente a cui assegnare il curriculum.',
        'upload file',
        'toastCaricaCv',
        2000
      );
      return;
    }

    // se i campi aggiuntivi del candidato non sono stati compilati, toast di errore.
    this.checkIfDatiCandidatoFilled();

    const form_data = new FormData();
  }

  // metodo per assicurarsi che tutti i dati necessari per il salvataggio del cv siano presenti.
  private checkIfDatiCandidatoFilled(): boolean {
    // se uno dei campi necessari alla compilazione del cv non viene riempito non si può proseguire
    if (!this.lingue || this.lingue === '') {
      this.toastService.show(
        'error',
        "inserisci le lingue conosciute dall'utente",
        'upload file',
        'toastCaricaCv',
        2000
      );
      return false;
    }

    if (!this.istruzione || this.istruzione === '') {
      this.toastService.show(
        'error',
        'inserisci il livello di istruzione del candidato',
        'upload file',
        'toastCaricaCv',
        2000
      );
      return false;
    }

    if (!this.esperienze || this.esperienze === '') {
      this.toastService.show(
        'error',
        'inserisci le precedenti esperienze effettuate dal candidato.',
        'upload file',
        'toastCaricaCv',
        2000
      );
      return false;
    }

    if (!this.descrizione || this.descrizione === '') {
      this.toastService.show(
        'error',
        'inserisci una descrizione per il candidato.',
        'upload file',
        'toastCaricaCv',
        2000
      );
      return false;
    }

    if (!this.competenze || this.competenze === '') {
      this.toastService.show(
        'error',
        'inserisci le competenze del candidato.',
        'upload file',
        'toastCaricaCv',
        2000
      );
      return false;
    }

    if (!this.titolo || this.titolo === '') {
      this.toastService.show(
        'error',
        'inserisci un titolo per il cv.',
        'upload file',
        'toastCaricaCv',
        2000
      );
      return false;
    }

    return true;
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
