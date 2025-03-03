import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  public messaggio = new BehaviorSubject<string | null>(null);
  public invitaCreazioneCv = new BehaviorSubject<true | null>(null);

  public notifyChangeImg = new BehaviorSubject<null | boolean>(null);

  // public showModalChangeImgProfilo = new BehaviorSubject<null | boolean>(null);
  constructor() {}

  public setMessage(msg: string) {
    this.messaggio.next(msg);
  }

  public getMessage() {
    return this.messaggio.value;
  }

  public clearMessage() {
    this.messaggio.next(null);
  }

  //-----------------------------------------------------------//

  public InvitaCreazioneOn() {
    this.invitaCreazioneCv.next(true);
  }

  public InvitaCreazioneOff() {
    this.invitaCreazioneCv.next(null);
  }
  public getInvitoCreazione() {
    return this.invitaCreazioneCv.asObservable();
  }

  //-----------------------------------------------------------//

  //subject che notifica che l'immagine del profilo è stata cambiata con successo

  public notify_reload_img_profile_ON() {
    this.notifyChangeImg.next(true);
  }

  public notify_reload_img_profile_OFF() {
    this.notifyChangeImg.next(null);
  }

  public getNotify_change_img() {
    return this.notifyChangeImg.asObservable();
  }
}
