// views/ContaView.ts

import { ContaViewModel } from "../viewmodels/ContaViewModel";
import { Transacao } from "../models/TransacaoModel";
import { Request, Response } from "express";

export class ContaView {
  private contaViewModel: ContaViewModel;

  constructor(contaViewModel: ContaViewModel) {
    this.contaViewModel = contaViewModel;
  }

  public renderConta(req: Request, res: Response) {
    const saldo = this.contaViewModel.getSaldo();
    const limiteCredito = this.contaViewModel.getLimiteCredito();
    const transacoes = this.contaViewModel.getTransacoes();
    res.json({ saldo, limiteCredito, transacoes });
  }

  public realizarTransacao(req: Request, res: Response) {
    const { tipo, valor } = req.body;
    if (tipo === "debito") {
      const sucesso = this.contaViewModel.realizarDebito(valor);
      if (!sucesso) {
        return res.status(400).json({ mensagem: "Saldo insuficiente" });
      }
    } else {
      this.contaViewModel.realizarCredito(valor);
    }

    const saldo = this.contaViewModel.getSaldo();
    const limiteCredito = this.contaViewModel.getLimiteCredito();
    const transacoes = this.contaViewModel.getTransacoes();
    res.json({ saldo, limiteCredito, transacoes });
  }

  public definirLimiteCredito(req: Request, res: Response) {
    const { limiteCredito } = req.body;
    this.contaViewModel.definirLimiteCredito(limiteCredito);
    const saldo = this.contaViewModel.getSaldo();
    const limiteCreditoAtualizado = this.contaViewModel.getLimiteCredito();
    const transacoes = this.contaViewModel.getTransacoes();
    res.json({ saldo, limiteCredito: limiteCreditoAtualizado, transacoes });
  }
}
