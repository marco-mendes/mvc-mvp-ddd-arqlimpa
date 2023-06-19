// src/infrastructure/server/Server.ts

import express, { Application } from "express";
import { ContaController } from "../controllers/ContaController";
import { ContaRepository } from "../../domain/repositories/ContaRepository";
import { ContaRepositoryMemory } from "../repositories/ContaRepositoryMemory";
import { CreditarConta } from "../../app/usecases/creditar/CreditarConta";
import { ConsultarConta } from "../../app/usecases/consultar/ConsultarConta";
import { DefinirLimiteCreditoConta } from "../../app/usecases/definirLimiteCredito/DefinirLimiteCreditoConta";

export class Server {
  private app: Application;
  private port: number;
  private contaController: ContaController;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    const contaRepository: ContaRepository = new ContaRepositoryMemory();
    this.contaController = new ContaController(
      contaRepository,
      new CreditarConta(contaRepository),
      new ConsultarConta(contaRepository),
      new DefinirLimiteCreditoConta(contaRepository)
    );

    this.configure();
    this.routes();
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }

  private configure(): void {
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.post("/contas", this.contaController.criarConta.bind(this.contaController));
    this.app.get("/contas/:id", this.contaController.consultarConta.bind(this.contaController));
    this.app.post("/contas/:id/creditos", this.contaController.creditarConta.bind(this.contaController));
    this.app.put("/contas/:id/limite-credito", this.contaController.definirLimiteCreditoConta.bind(this.contaController));
  }
}
