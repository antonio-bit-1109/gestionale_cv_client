export interface IRegistrationReq {
  nome: string | null;
  cognome: string | null;
  email: string | null;
  telefono: string | null;
  password: string | null;
  consensoTrattamentoDati: boolean | null;
}
