import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  public messaggio = new BehaviorSubject<string | null>(null);
  public invitaCreazioneCv = new BehaviorSubject<true | null>(null);
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
}
