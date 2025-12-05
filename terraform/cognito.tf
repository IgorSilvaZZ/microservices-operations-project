# Criando User Pool
resource "aws_cognito_user_pool" "main" {
    name = "operations-project-users-${terraform.workspace}"
    
    # Configurações basicas

    # Atributos a serem verificados
    auto_verified_attributes = ["email"]

    email_configuration {
      email_sending_account = "COGNITO_DEFAULT"
    }

    mfa_configuration = "OFF"

    lifecycle {
      # Evita destruição acidental
      prevent_destroy = true
    }

}

resource "aws_cognito_user_pool_client" "web_app" {
    name = "ms-authentication"

    user_pool_id = aws_cognito_user_pool.main.id

    generate_secret = true

    explicit_auth_flows = ["ALLOW_USER_PASSWORD_AUTH", "ALLOW_USER_SRP_AUTH", "ALLOW_REFRESH_TOKEN_AUTH"]

    # Configurações de token
    refresh_token_validity = 5

    # Configuração se o cliente tem permissão para fazer OAuth 2.0
    allowed_oauth_flows_user_pool_client = false

}

resource "aws_cognito_user_pool_domain" "main" {
  domain = "ms-authentication-${terraform.workspace}"
  user_pool_id = aws_cognito_user_pool.main.id
}