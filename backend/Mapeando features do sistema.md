# Mapeamento de Requisitos GoBarber

> RF: Requisitos Funcionais
  - São quais funcionalidades vai existir dentro da funcionalidade macro ex.: Recuperação de Senha
> RNF: Requisitos Não-Funcionais
  - São coisas que não são diretamente ligadas com a regra de negócio da aplicação ex.: O envio de email tem que usar a biblioteca nodemailer. Ou seja Requisitos técnicos
> RN: Regras de Negócio
  -

## Recuperação de senha

**RF**

- O usuário deve poder recuperar sua senha informando o e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF**

- Utilizar [Mailtrap](https://mailtrap.io/) para testar envios em ambiente de desenvolvimento;
- Utilizar [Amazon SES](https://aws.amazon.com/pt/ses/) para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN**

- O link enviado por email para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha para resetar sua senha;

## Atualização do Perfil

**RF**

- O usuário deve poder atualizar seu nome, email e senha;

**RN**

- O usuário não pode alterar seu email para um já existente;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

## Painel do Prestador

**RF**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados no cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- Ad notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN**

- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

## Agendamento de Serviços

**RF**

- O usuário deve poder listar todos prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelomenos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 8h às 18h (Primeiro às 8h, Último às 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar em um horário consigo mesmo;

