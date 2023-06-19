// src/domain/entities/Conta.ts

import { Dinheiro } from "../value-objects/Dinheiro";
import { Transacao } from "../value-objects/Transacao";

export class Conta {
  private id: string;
  private saldo: Dinheiro;
  private limiteCredito: Dinheiro;
  private transacoes: Transacao[];

  constructor(
    id: string,
    saldo: Dinheiro,
    limiteCredito: Dinheiro,
    transacoes: Transacao[]
  ) {
    this.id = id;
    this.saldo = saldo;
    this.limiteCredito = limiteCredito;
    this.transacoes = transacoes;
  }

  public getId(): string {
    return this.id;
  }

  public getSaldo(): Dinheiro {
    return this.saldo;
  }

  public getLimiteCredito(): Dinheiro {
    return this.limiteCredito;
  }

  public getTransacoes(): Transacao[] {
    return this.transacoes;
  }

  public debitar(valor: Dinheiro): void {
    if (this.saldo.menorQue(valor)) {
      throw new Error("Saldo insuficiente");
    }

    this.saldo = this.saldo.subtrair(valor);
    this.transacoes.push(new Transacao(valor, new Date(), "D"));
  }

  public creditar(valor: Dinheiro): void {
    this.saldo = this.saldo.somar(valor);
    this.transacoes.push(new Transacao(valor, new Date(), "C"));
  }

  public definirLimiteCredito(limite: Dinheiro): void {
    this.limiteCredito = limite;
  }
}