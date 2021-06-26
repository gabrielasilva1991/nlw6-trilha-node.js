import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
 
  // Receber o token
  const authToken = request.headers.authorization;

  // Validar se token está preenchido
  if (!authToken) {
    return response.status(401).end();
  }
  
  //Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
  //eyJlbWFpbCI6ImRhbmlAZGFuaS5jb20uYnIiLCJpYXQiOjE2MjQ1NTgxMTEsImV4cCI6MTYyNDY0NDUxMSwic3ViIjoiODc2ZDJkNGItNTczNC00MTk3LWJhMjYtN2MyYmRjZTU2ZDYzIn0.
  //FCeihE2Vn12bJN-skfejR7tH2mnTrYghMdFSy-jvby0

  const [, token] = authToken.split(" ") 
  //divide a string em um array(está vindo bearer e o token)
  //o que separa as 2 é um espaço, então passo um espaço entre as ""
  //2ª posição do array vai pra dentro da variável token, 1ª posição(bearer) ignorada

  //valida se token é válido
  try {
    //const decode = verify(token, "63214cdad7ece7a1599b07db85181b63");
    //console.log(decode);
    const { sub } = verify(token, "63214cdad7ece7a1599b07db85181b63") as IPayload;

    //recupera informações do usuário
    request.user_id = sub;

    return next();
  }
  catch(err) {
    return response.status(401).end();
  }

}
