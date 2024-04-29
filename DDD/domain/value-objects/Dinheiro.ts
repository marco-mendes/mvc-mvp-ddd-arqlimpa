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
      if (this.moeda !== dinheiro.getMoeda()) {
        throw new Error("Não é possível somar dinheiro de moedas diferentes");
      }
  
      return new Dinheiro(this.valor + dinheiro.getValor(), this.moeda);
    }
  
    public subtrair(dinheiro: Dinheiro): Dinheiro {
      if (this.moeda !== dinheiro.getMoeda()) {
        throw new Error("Não é possível subtrair dinheiro de moedas diferentes");
      }
  
      return new Dinheiro(this.valor - dinheiro.getValor(), this.moeda);
    }
  }