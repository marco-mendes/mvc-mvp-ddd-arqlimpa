// src/infrastructure/repositories/ContaRepositoryMemory.ts

import { Conta } from "../../domain/entities/Conta";
import { ContaRepository } from "../../domain/repositories/ContaRepository";

export class ContaRepositoryMemory implements ContaRepository {
  private contas: Conta[] = [];

  async criar(conta: Conta): Promise<Conta> {
    this.contas.push(conta);
    return conta;
  }

  async buscarPorId(id: string): Promise<Conta | undefined> {
    return this.contas.find((conta) => conta.id === id);
  }

  async atualizar(conta: Conta): Promise<Conta> {
    const index = this.contas.findIndex((c) => c.getId() === conta.getId());
    this.contas[index] = conta;
    return conta;
  }
}