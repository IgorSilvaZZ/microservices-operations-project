# Estrutura de pastas

```
src/
  domain/
    entities/        # Entidades de negócio (User, Expense, etc.)
    ports/           # Interfaces de dominio precisa (ex: UserRepo, Notifier) e de casos de uso (CreateUser, ApproveExpense)
  application/
    useCases/        # Implementações dos casos de uso (ex.: CreateUserService)
    adapters/        # Adaptadores de entrada (HTTP, CLI, EventListeners, etc.) e de saída (DB, APIs externas, Notificações)
  config/            # Injecção de dependências, instâncias, variáveis de ambiente
  main.ts            # Composition root (monta tudo e inicia a aplicação)
```
