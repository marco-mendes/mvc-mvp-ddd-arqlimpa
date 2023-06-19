// models/TransacaoModel.ts

export interface Transacao {
    tipo: "debito" | "credito";
    valor: number;
    data: Date;
  }