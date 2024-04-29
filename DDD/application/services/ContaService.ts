// src/application/services/ContaService.ts

import { Conta } from "../../domain/entities/Conta";
import { Dinheiro } from "../../domain/value-objects/Dinheiro";
import { Transacao } from "../../domain/value-objects/Transacao";
import { ContaRepository } from "../../domain/repositories/ContaRepository";

export class ContaService {
  private contaRepository: ContaRepository;

  constructor(contaRepository: ContaRepository) {
    this.contaRepository = contaRepository;
  }

  public realizarDebito(id: number, valor: Dinheiro): boolean {
    const conta = this.contaRepository.findById(id);
    if (!conta) {
      throw new Error("Conta não encontrada");
    }

    conta.realizarDebito(valor); //Delegation! (Gof)
    return this.contaRepository.save(conta);
  }

  public realizarCredito(id: number, valor: Dinheiro): void {
    const conta = this.contaRepository.findById(id);
    if (!conta) {
      throw new Error("Conta não encontrada");
    }

    conta.realizarCredito(valor);
    this.contaRepository.save(conta);
  }

  public definirLimiteCredito(id: number, limiteCredito: Dinheiro): void {
    const conta = this.contaRepository.findById(id);
    if (!conta) {
      throw new Error("Conta não encontrada");
    }

    conta.definirLimiteCredito(limiteCredito);
    this.contaRepository.save(conta);
  }

  public getSaldo(id: number): Dinheiro {
    const conta = this.contaRepository.findById(id);
    if (!conta) {
      throw new Error("Conta não encontrada");
    }

    return conta.getSaldo();
  }

  public getLimiteCredito(id: number): Dinheiro {
    const conta = this.contaRepository.findById(id);
    if (!conta) {
        throw new Error("Conta não encontrada");
    }

    return conta.getLimiteCredito();
}
    
    public getTransacoes(id: number): Transacao[] {
        const conta = this.contaRepository.findById(id);
        if (!conta) {
        throw new Error("Conta não encontrada");
        }
        return conta.getTransacoes();
    }
}
