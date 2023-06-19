// src/domain/value-objects/Transacao.ts

import { Dinheiro } from "./Dinheiro";

export class Transacao {
  private valor: Dinheiro;
  private data: Date;
  private tipo: "C" | "D";

  constructor(tipo: "C" | "D", valor: Dinheiro, data: Date, ) {
    this.valor = valor;
    this.data = data;
    this.tipo = tipo;
}

  public getValor(): Dinheiro {
    return this.valor;
  }

  public getData(): Date {
    return this.data;
  }

  public getTipo(): "C" | "D" {
    return this.tipo;
  }
}