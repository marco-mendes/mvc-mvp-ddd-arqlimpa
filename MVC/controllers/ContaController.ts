// controllers/ContaController.ts

import { Request, Response } from "express";
import { Conta, Transacao } from "../models/Conta";
import { ContaView } from "../views/ContaView";

export class ContaController {
  private conta: Conta;
  private contaView: ContaView;

  constructor(conta: Conta, contaView: ContaView) {
    this.conta = conta;
    this.contaView = contaView;
  }

  public getConta(req: Request, res: Response) {
    const saldo = this.conta.getSaldo();
    const limiteCredito = this.conta.getLimiteCredito();
    const transacoes = this.conta.getTransacoes();
    this.contaView.render(res, { saldo, limiteCredito, transacoes });
  }

  public realizarTransacao(req: Request, res: Response) {
    const { tipo, valor } = req.body;

    if (tipo === "debito") {
      const sucesso = this.conta.realizarDebito(valor);
      if (!sucesso) {
        return res.status(400).json({
          error: "Limite de crédito excedido",
        });
      }
    } else if (tipo === "credito") {
      this.conta.realizarCredito(valor);
    } else {
      return res.status(400).json({
        error: "Tipo de transação inválido",
      });
    }

    const saldo = this.conta.getSaldo();
    const limiteCredito = this.conta.getLimiteCredito();
    const transacoes = this.conta.getTransacoes();
    this.contaView.render(res, 
      { saldo, limiteCredito, transacoes });
  }

  public definirLimiteCredito(req: Request, res: Response) {
    const { limiteCredito } = req.body;
    this.conta.definirLimiteCredito(limiteCredito);
    const saldo = this.conta.getSaldo();
    const limiteCreditoAtualizado = this.conta.getLimiteCredito();
    const transacoes = this.conta.getTransacoes();
    this.contaView.render(res, { saldo, limiteCredito: limiteCreditoAtualizado, transacoes });
  }
}