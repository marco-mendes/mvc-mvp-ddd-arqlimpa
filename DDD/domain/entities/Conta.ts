// src/domain/entities/Conta.ts

import { Transacao } from "../value-objects/Transacao";
import { Dinheiro } from "../value-objects/Dinheiro";

export class Conta {
  private id: number;
  private saldo: Dinheiro;
  private limiteCredito: Dinheiro;
  private transacoes: Transacao[];

  constructor(saldo: Dinheiro, limiteCredito: Dinheiro) {
    this.saldo = saldo;
    this.limiteCredito = limiteCredito;
    this.transacoes = [];
  }

  public realizarDebito(valor: Dinheiro): boolean {
    const saldoComLimite = this.saldo.somar(this.limiteCredito);
    if (saldoComLimite.subtrair(valor).getValor() < 0) {
      return false;
    }

    this.saldo = this.saldo.subtrair(valor);
    const tipo: "C" | "D" = "D";
    const data: Date = new Date();
    const transacao = new Transacao(tipo, valor, data);
    this.transacoes.push(transacao);

    return true;
  }

  public realizarCredito(valor: Dinheiro): void {
    const tipo: "C" | "D" = "C";
    const data: Date = new Date();
    const transacao = new Transacao(tipo, valor, data);
    this.transacoes.push(transacao);
  }

  public definirLimiteCredito(limiteCredito: Dinheiro): void {
    this.limiteCredito = limiteCredito;
  }

  public getId(): number {
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
}