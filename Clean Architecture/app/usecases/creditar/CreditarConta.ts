// src/app/usecases/creditar/CreditarConta.ts

import { Conta } from "../../../domain/entities/Conta";
import { Dinheiro } from "../../../domain/value-objects/Dinheiro";
import { Transacao } from "../../../domain/value-objects/Transacao";
import { ContaRepository } from "../../../domain/repositories/ContaRepository";
import { CreditarContaInput } from "./CreditarContaInput";
import { CreditarContaOutput } from "./CreditarContaOutput";

export class CreditarConta {
  private contaRepository: ContaRepository;

  constructor(contaRepository: ContaRepository) {
    this.contaRepository = contaRepository;
  }

  public async execute(
    input: CreditarContaInput
  ): Promise<CreditarContaOutput> {
    const conta = await this.contaRepository.buscarPorId(input.id);
    if (!conta) {
      throw new Error("Conta não encontrada");
    }

    conta.creditar(input.valor);

    await this.contaRepository.atualizar(conta);

    const transacao = conta
      .getTransacoes()
      .find((t) => t.getValor().igual(input.valor))!;

    return { conta, transacao };
  }
}