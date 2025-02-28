import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  public messaggio = new BehaviorSubject<string | null>(null);
  public invitaCreazioneCv = new BehaviorSubject<true | null>(null);

  public showModalChangeImgProfilo = new BehaviorSubject<null | boolean>(null);
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

  // gestione modale per visualizzare il modale
  //  che mi consente di fare una chiamata
  // per cambiare l'immagine del profilo dell'utente
  public setShowModal_change_img_Visible() {
    this.showModalChangeImgProfilo.next(true);
  }

  public setShowModal_change_img_Invisible() {
    this.showModalChangeImgProfilo.next(null);
  }

  public getShowModal_changeImgProfile() {
    return this.showModalChangeImgProfilo.asObservable();
  }
}
