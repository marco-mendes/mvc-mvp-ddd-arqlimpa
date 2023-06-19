/src
  /app
    /usecases
      /debitar
        DebitarConta.ts
        DebitarContaInput.ts
        DebitarContaOutput.ts
      /creditar
        CreditarConta.ts
        CreditarContaInput.ts
        CreditarContaOutput.ts
      /definir-limite-credito
        DefinirLimiteCredito.ts
        DefinirLimiteCreditoInput.ts
        DefinirLimiteCreditoOutput.ts
      /consultar-conta
        ConsultarConta.ts
        ConsultarContaInput.ts
        ConsultarContaOutput.ts
    /controllers
      ContaController.ts
  /domain
    /entities
      Conta.ts
    /repositories
      ContaRepository.ts
    /value-objects
      Dinheiro.ts
      Transacao.ts
  /infrastructure
    /repositories
      ContaRepositoryImpl.ts
  /interfaces
    /http
      Server.ts
  /main.ts

  +---------------------------------+
|                                 |
|    DOMAIN LAYER (Entidades)     |
|                                 |
+---------------------------------+
              ↑
+---------------------------------+
|                                 |
|  USE CASES LAYER (Casos de uso) |
|                                 |
+---------------------------------+
              ↑
+---------------------------------+
|                                 |
|   INFRASTRUCTURE LAYER (Adaptadores) |
|                                 |
+---------------------------------+
              ↑
+---------------------------------+
|                                  |
|     MAIN LAYER (Interfaces)     |
|                                 |
+---------------------------------+
