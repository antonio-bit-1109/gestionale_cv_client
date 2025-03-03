export interface IRegistrationReq {
  nome: string | null;
  cognome: string | null;
  email: string | null;
  telefono: string | null;
  password: string | null;
  consensoTrattamentoDati: boolean | null;
}

export interface IGetSIngolo_cv {
  id_utente: number;
  id_cv: number;
}

export interface IEdit_Create_Cv {
  idCv?: number;
  idUtente: number;
  titolo: string;
  competenze: string;
  istruzione: string;
  esperienzePrecedenti: string;
  lingueConosciute?: string;
  descrizioneGenerale: string;
}
