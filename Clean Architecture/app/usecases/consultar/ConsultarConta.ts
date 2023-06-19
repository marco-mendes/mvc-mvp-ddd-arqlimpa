// src/app/usecases/consultar/ConsultarConta.ts

import { Conta } from "../../../domain/entities/Conta";
import { ContaRepository } from "../../../domain/repositories/ContaRepository";
import { ConsultarContaInput } from "./ConsultarContaInput";
import { ConsultarContaOutput } from "./ConsultarContaOutput";

export class ConsultarConta {
  private contaRepository: ContaRepository;

  constructor(contaRepository: ContaRepository) {
    this.contaRepository = contaRepository;
  }

  public async execute(
    input: ConsultarContaInput
  ): Promise<ConsultarContaOutput> {
    const conta = await this.contaRepository.buscarPorId(input.id);
    if (!conta) {
      throw new Error("Conta não encontrada");
    }

    return { conta };
  }
}