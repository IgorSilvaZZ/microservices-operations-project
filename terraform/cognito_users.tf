resource "aws_cognito_user" "worker_dev" {
    user_pool_id = aws_cognito_user_pool.main.id
    username = "worker_dev@test.local"

    attributes = {
        nickname = "worker_dev"
        email = "worker_dev@test.local"
        email_verified = "true"
    }

    password = "Senha@2025"
}

resource "aws_cognito_user" "manager_dev" {
    user_pool_id = aws_cognito_user_pool.main.id
    username = "manager_dev@test.local"

    attributes = {
        nickname = "manager_dev"
        email = "manager_dev@test.local"
        email_verified = "true"
    }

    password = "Senha@2025"

    message_action = "SUPPRESS"
}

resource "aws_cognito_user" "finance_dev" {
    user_pool_id = aws_cognito_user_pool.main.id
    username = "finance_dev@test.local"

    attributes = {
        nickname = "finance_dev"
        email = "finance_dev@test.local"
        email_verified = "true"
    }

    password = "Senha@2025"
}