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
