export interface MessageResp {
  message: string;
}

export interface ValidationRespError {
  [key: string]: string;
}

export interface ITokenResp {
  token: string;
}

// durata token 1 giorno
export interface TOKEN_PAYLOAD {
  sub: string; //username
  jti: string; // id
  role: string; //ruolo
  iat: number; //createdAt
  exp: number; // expireAt
}

export interface IRespListaCV {
  message: string | null;
  listaCV: Icv[];
}

export interface Icv {
  titolo: string;
  esperienze_Precedenti: string;
  competenze: string;
  istruzione: string;
  lingueConosciute: string;
  descrizioneGenerale: string;
  created_at: Date;
  updated_at: Date;
  proprietarioCV: string;
  Path_file_System_pdf: string;
}
