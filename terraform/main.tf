# Configurando provedor AWS
terraform {
    required_version = ">= 1.0"

    required_providers {
      aws = {
        source = "hashicorp/aws"
        version = "~> 5.0"
      }
    }
}

# Configurando provedor AWS
provider "aws" {
    region = "us-east-1"
}