// src/infrastructure/controllers/ContaController.ts

import { Request, Response } from "express";
import { Conta } from "../../domain/entities/Conta";
import { Dinheiro } from "../../domain/value-objects/Dinheiro";
import { ContaRepository } from "../../domain/repositories/ContaRepository";
import { CreditarConta } from "../../app/usecases/creditar/CreditarConta";
import { CreditarContaInput } from "../../app/usecases/creditar/CreditarContaInput";
import { ConsultarConta } from "../../app/usecases/consultar/ConsultarConta";
import { ConsultarContaInput } from "../../app/usecases/consultar/ConsultarContaInput";
import { DefinirLimiteCreditoConta } from "../../app/usecases/definirLimiteCredito/DefinirLimiteCreditoConta";
import { DefinirLimiteCreditoContaInput } from "../../app/usecases/definirLimiteCredito/DefinirLimiteCreditoContaInput";

export class ContaController {
  private contaRepository: ContaRepository;
  private creditarContaUseCase: CreditarConta;
  private consultarContaUseCase: ConsultarConta;
  private definirLimiteCreditoContaUseCase: DefinirLimiteCreditoConta;

  constructor(
    contaRepository: ContaRepository,
    creditarContaUseCase: CreditarConta,
    consultarContaUseCase: ConsultarConta,
    definirLimiteCreditoContaUseCase: DefinirLimiteCreditoConta
  ) {
    this.contaRepository = contaRepository;
    this.creditarContaUseCase = creditarContaUseCase;
    this.consultarContaUseCase = consultarContaUseCase;
    this.definirLimiteCreditoContaUseCase = definirLimiteCreditoContaUseCase;
  }

  public async criarConta(req: Request, res: Response): Promise<void> {
    const { saldo, limiteCredito } = req.body;
    const conta = new Conta("", saldo, limiteCredito, []);

    const createdConta = await this.contaRepository.criar(conta);

    res.status(201).json(createdConta);
  }

  public async consultarConta(req: Request, res: Response): Promise<void> {
    const input: ConsultarContaInput = { id: req.params.id };
    const output = await this.consultarContaUseCase.execute(input);

    res.json(output.conta);
  }

  public async creditarConta(req: Request, res: Response): Promise<void> {
    const input: CreditarContaInput = {
      id: req.params.id,
      valor: new Dinheiro(req.body.valor, "BRL"),
    };
    const output = await this.creditarContaUseCase.execute(input);

    res.json(output.conta);
  }

  public async definirLimiteCreditoConta(
    req: Request,
    res: Response
  ): Promise<void> {
    const input: DefinirLimiteCreditoContaInput = {
      id: req.params.id,
      limiteCredito: new Dinheiro(req.body.limiteCredito, "BRL"),
    };
    const output = await this.definirLimiteCreditoContaUseCase.execute(input);

    res.json(output.conta);
  }
}
