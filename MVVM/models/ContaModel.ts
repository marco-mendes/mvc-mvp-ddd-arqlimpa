// models/ContaModel.ts

import { Transacao } from "./TransacaoModel";

export class ContaModel {
  private saldo: number;
  private limiteCredito: number;
  private transacoes: Transacao[];

  constructor(saldo: number, limiteCredito: number) {
    this.saldo = saldo;
    this.limiteCredito = limiteCredito;
    this.transacoes = [];
  }

  public realizarDebito(valor: number): boolean {
    const saldoComLimite = this.saldo + this.limiteCredito;
    if (saldoComLimite - valor < 0) {
      return false;
    }

    this.saldo -= valor;
    const transacao: Transacao = { tipo: "debito", valor, data: new Date() };
    this.transacoes.push(transacao);

    return true;
  }

  public realizarCredito(valor: number) {
    this.saldo += valor;
    const transacao: Transacao = { tipo: "credito", valor, data: new Date() };
    this.transacoes.push(transacao);
  }

  public definirLimiteCredito(limiteCredito: number): void {
    this.limiteCredito = limiteCredito;
  }

  public getSaldo(): number {
    return this.saldo;
  }

  public getLimiteCredito(): number {
    return this.limiteCredito;
  }

  public getTransacoes(): Transacao[] {
    return this.transacoes;
  }
}