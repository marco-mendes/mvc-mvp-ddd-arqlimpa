// src/domain/value-objects/Dinheiro.ts

export class Dinheiro {
  private valor: number;
  private moeda: string;

  constructor(valor: number, moeda: string) {
    this.valor = valor;
    this.moeda = moeda;
  }

  public getValor(): number {
    return this.valor;
  }

  public getMoeda(): string {
    return this.moeda;
  }

  public somar(dinheiro: Dinheiro): Dinheiro {
    if (this.moeda !== dinheiro.moeda) {
      throw new Error("Moedas diferentes");
    }

    return new Dinheiro(this.valor + dinheiro.valor, this.moeda);
  }

  public subtrair(dinheiro: Dinheiro): Dinheiro {
    if (this.moeda !== dinheiro.moeda) {
      throw new Error("Moedas diferentes");
    }

    return new Dinheiro(this.valor - dinheiro.valor, this.moeda);
  }

  public igual(dinheiro: Dinheiro): boolean {
    return this.valor === dinheiro.valor && this.moeda === dinheiro.moeda;
  }

  public maiorQue(dinheiro: Dinheiro): boolean {
    if (this.moeda !== dinheiro.moeda) {
      throw new Error("Moedas diferentes");
    }

    return this.valor > dinheiro.valor;
  }

  public menorQue(dinheiro: Dinheiro): boolean {
    if (this.moeda !== dinheiro.moeda) {
      throw new Error("Moedas diferentes");
    }

    return this.valor < dinheiro.valor;
  }
}