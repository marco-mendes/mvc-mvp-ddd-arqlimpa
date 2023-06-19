
// src/interfaces/controllers/ContaController.ts

import { Request, Response } from "express";
import { ContaService } from "../../application/services/ContaService";
import { Dinheiro } from "../../domain/value-objects/Dinheiro";

export class ContaController {
  private contaService: ContaService;

  constructor(contaService: ContaService) {
    this.contaService = contaService;
  }

  public renderConta(req: Request, res: Response): void {
    
    if (req.query.id) {
      const idString = req.query.id;
      const id = +idString;
      try {

        const saldoConta = this.contaService.getSaldo(id);
        const limiteCredito = this.contaService.getLimiteCredito(id);
        const transacoes = this.contaService.getTransacoes(id);
  
        res.json({ saldo: saldoConta, limiteCredito, transacoes });
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
    }

  
  }
}
