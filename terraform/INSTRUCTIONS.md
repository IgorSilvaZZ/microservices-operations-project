# Iniciar o Terraform
```sh
    terraform init
```
Isso baixara o provedor AWS e prepará o projeto
> Executa esse comando na pasta onde contém os arquivos do terraform

# Verificar o plano de execução
```sh
    terraform plan
```
Verifique o que será criado antes de aplicar.

# Aplicar a configuração
```sh
    terraform apply
    terraform apply -auto-approve
```

# Ver os outputs
```sh
    terraform output
```

# Formatar código
```sh
    terraform fmt
```

# Validar sintaxe
```sh
    terraform validate
```

# Verificar estado atual
```sh
    terraform show
```

# Ver detalhes de um recurdo específico
```sh
    terraform state show aws_cognito_user_pool.main
```

# Refresh do estado (sincroniza com AWS real)
```sh
    terraform refresh
```


# Destruir recursos
```sh
    terraform destroy
```

# Tipos de Alterações que o Terraform Detecta
```
    # + (mais verde) - Recurso será CRIADO
    # - (menos vermelho) - Recurso será DESTRUÍDO
    # ~ (til amarelo) - Recurso será ATUALIZADO no lugar
    # -/+ (vermelho/verde) - Recurso será RECRIADO (tear down/up)
```