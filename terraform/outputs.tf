output "user_pool_name" {
  description = "Name the user pool"
  value = aws_cognito_user_pool.main.name
}

output "user_pool_id" {
  description = "ID User Pool created"
  value = aws_cognito_user_pool.main.id
}

output "user_pool_arn" {
    description = "ARN User Pool"
    value = aws_cognito_user_pool.main.arn
}

output "app_client_id" {
  description = "ID App Client"
  value = aws_cognito_user_pool_client.web_app.id
}

output "app_client_secret_id" {
    description = "App Client Secret"
    value = aws_cognito_user_pool_client.web_app.client_secret
    sensitive = true
}