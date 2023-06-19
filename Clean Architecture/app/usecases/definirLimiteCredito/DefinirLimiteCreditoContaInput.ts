// src/app/usecases/definirLimiteCredito/DefinirLimiteCreditoContaInput.ts

import { Dinheiro } from "../../../domain/value-objects/Dinheiro";

export interface DefinirLimiteCreditoContaInput {
  id: string;
  limiteCredito: Dinheiro;
}