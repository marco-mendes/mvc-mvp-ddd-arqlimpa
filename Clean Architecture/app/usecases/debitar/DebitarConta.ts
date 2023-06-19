// src/app/usecases/debitar/DebitarConta.ts

import { Conta } from "../../../domain/entities/Conta";
import { Dinheiro } from "../../../domain/value-objects/Dinheiro";
import { Transacao } from "../../../domain/value-objects/Transacao";
import { ContaRepository } from "../../../domain/repositories/ContaRepository";
import { DebitarContaInput } from "./DebitarContaInput";
import { DebitarContaOutput } from "./DebitarContaOutput";

export class DebitarConta {
  private contaRepository: ContaRepository;

  constructor(contaRepository: ContaRepository) {
    this.contaRepository = contaRepository;
  }

  public async execute(
    input: DebitarContaInput
  ): Promise<DebitarContaOutput> {
    const conta = await this.contaRepository.buscarPorId(input.id);
    if (!conta) {
      throw new Error("Conta não encontrada");
    }

    conta.debitar(input.valor);

    await this.contaRepository.atualizar(conta);

    const transacao = conta
      .getTransacoes()
      .find((t) => t.getValor().igual(input.valor))!;

    return { conta, transacao };
  }
}