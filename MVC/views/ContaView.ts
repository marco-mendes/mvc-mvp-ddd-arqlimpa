// views/ContaView.ts

import { Response } from "express";
import { Conta, Transacao } from "../models/Conta";


interface ContaData {
  saldo: number;
  limiteCredito: number;
  transacoes: Transacao[];
}

export class ContaView {
  public render(res: Response, contaData: ContaData) {
    res.json(contaData);
  }
}