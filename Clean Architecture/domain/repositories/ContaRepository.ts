// src/domain/repositories/ContaRepository.ts

import { Conta } from "../entities/Conta";

export interface ContaRepository {
  criar(conta: Conta): Promise<Conta>;
  buscarPorId(id: string): Promise<Conta | undefined>;
  atualizar(conta: Conta): Promise<Conta>;
}