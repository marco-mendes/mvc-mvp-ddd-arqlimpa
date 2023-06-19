// src/domain/repositories/ContaRepository.ts

import { Conta } from "../entities/Conta";
import { Dinheiro } from "../value-objects/Dinheiro";

export interface ContaRepository {
  save(conta: Conta): boolean;
  findById(id: number): Conta | undefined;
  findAll(): Conta[];
}