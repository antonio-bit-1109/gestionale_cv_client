import { Component, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { UserService } from '../../services/user.service';

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

  constructor(
    private config: PrimeNGConfig,
    private messageService: MessageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // fai la get di tutti gli utenti
  }

  public uploadDataToServer() {
    console.log('sto inviando robe');
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
}
