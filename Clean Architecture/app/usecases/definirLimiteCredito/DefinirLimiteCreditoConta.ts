// src/app/usecases/definirLimiteCredito/DefinirLimiteCreditoConta.ts

import { Conta } from "../../../domain/entities/Conta";
import { Dinheiro } from "../../../domain/value-objects/Dinheiro";
import { ContaRepository } from "../../../domain/repositories/ContaRepository";
import { DefinirLimiteCreditoContaInput } from "./DefinirLimiteCreditoContaInput";
import { DefinirLimiteCreditoContaOutput } from "./DefinirLimiteCreditoContaOutput";

export class DefinirLimiteCreditoConta {
  private contaRepository: ContaRepository;

  constructor(contaRepository: ContaRepository) {
    this.contaRepository = contaRepository;
  }

  public async execute(
    input: DefinirLimiteCreditoContaInput
  ): Promise<DefinirLimiteCreditoContaOutput> {
    const conta = await this.contaRepository.buscarPorId(input.id);
    if (!conta) {
      throw new Error("Conta não encontrada");
    }

    conta.definirLimiteCredito(input.limiteCredito);

    await this.contaRepository.atualizar(conta);

    return { conta };
  }
}
