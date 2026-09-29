# 🏥 VitaPerformance - Lead Generation & Automation System

Sistema desacoplado de captação, qualificação e direcionamento de leads para clínicas de alta performance. 

Este projeto foi construído focando em uma arquitetura leve no Front-End e automação no Back-End via Webhook, integrando o fluxo diretamente a um CRM no Google Sheets e roteamento inteligente para o WhatsApp.

---

## 🛠️ Arquitetura e Tecnologias

- **Front-End:** HTML5, CSS3 (CSS Grid/Flexbox, CSS Variables), JavaScript puro (ES6+).
- **Integração Assíncrona:** API Fetch, requisições HTTP `POST`, payload estruturado em JSON.
- **Back-End & Automação:** Make.com (Webhook customizado e parsing de dados).
- **Banco de Dados / CRM:** Google Sheets API com tratamento dinâmico de fuso horário (`America/Sao_Paulo`).
- **Comunicação:** WhatsApp URL API (`wa.me`) com sanitização e encoding de mensagens (`encodeURIComponent`).

---

## 🔄 Fluxo de Dados (End-to-End)

```text
[ Usuário ] 
    │
    ▼
[ Formulário HTML/JS ] ──( Fetch POST / JSON )──► [ Webhook Make.com ]
    │                                                      │
    ▼                                                      ▼
[ Redirecionamento WhatsApp ]                     [ Google Sheets CRM ]
(Mensagem personalizada)                          (Data/Hora formatada Brasil)
