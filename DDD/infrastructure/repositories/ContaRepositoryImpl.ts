// src/infrastructure/repositories/ContaRepositoryImpl.ts

import { ContaRepository } from "../../domain/repositories/ContaRepository";
import { Conta } from "../../domain/entities/Conta";
import { Dinheiro } from "../../domain/value-objects/Dinheiro";

export class ContaRepositoryImpl implements ContaRepository {
  private contas: Conta[];

  constructor() {
    this.contas = [];
  }

  public save(conta: Conta): boolean {
    this.contas.push(conta);
    return true;
  }

  public findById(id: number): Conta | undefined {
    return this.contas.find((conta) => conta.getId());
  }

  public findAll(): Conta[] {
    return this.contas;
  }
}