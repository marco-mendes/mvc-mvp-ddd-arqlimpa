// src/app/usecases/creditar/CreditarContaInput.ts

import { Dinheiro } from "../../../domain/value-objects/Dinheiro";

export interface CreditarContaInput {
  id: string;
  valor: Dinheiro;
}