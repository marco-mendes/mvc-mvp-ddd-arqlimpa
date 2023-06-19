// src/app/usecases/creditar/CreditarContaOutput.ts

import { Conta } from "../../../domain/entities/Conta";
import { Transacao } from "../../../domain/value-objects/Transacao";

export interface CreditarContaOutput {
  conta: Conta;
  transacao: Transacao;
}