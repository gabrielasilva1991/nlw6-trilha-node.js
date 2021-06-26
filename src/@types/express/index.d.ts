declare namespace Express {
  export interface Request {
    user_id: string;
  }
}
//posso sobrescrever a biblioteca, 
//ele pega toda a tipagem do node_modules + o que for passado aqui
//adicionar config no tsconfig.json "typeRoots": ["./src/@types"]
