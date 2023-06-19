// src/app/usecases/consultar/ConsultarContaOutput.ts

import { Conta } from "../../../domain/entities/Conta";

export interface ConsultarContaOutput {
  conta: Conta;
}