// src/app/usecases/debitar/DebitarContaOutput.ts

import { Conta } from "../../../domain/entities/Conta";
import { Transacao } from "../../../domain/value-objects/Transacao";

export interface DebitarContaOutput {
  conta: Conta;
  transacao: Transacao;
}