// src/app/usecases/debitar/DebitarContaInput.ts

import { Dinheiro } from "../../../domain/value-objects/Dinheiro";

export interface DebitarContaInput {
  id: string;
  valor: Dinheiro;
}