# Plano: Sistema de Acesso, Painel Admin e Relatórios

## Objetivo
Adicionar uma camada completa de controle de acesso e administração sobre o app MAP360 existente, sem alterar o teste Neurocomunicacional, os componentes Step1–Step4 nem o algoritmo S/R/V/P.

## Escopo geral

### Preservar (não tocar na lógica):
- `Step1Form`, `Step2Info`, `Step3Test`, `Step4Result`
- Cálculo de scores S/R/V/P
- Identidade visual atual

### Adicionar:
- Autenticação de administradores
- Sistema de tokens de uso único
- Tela unificada Token + Cadastro
- Painel `/admin` completo
- Persistência de leads e resultados
- Geração de PDF (apenas admin)
- Auditoria de acesso
- Compartilhamento seguro por WhatsApp

---

## 1. Banco de Dados (Lovable Cloud)

Migração única criando:

**Enum `app_role`**: `admin`, `user`

**Tabela `user_roles`** — vinculada a `auth.users`, com função `has_role()` SECURITY DEFINER (padrão seguro anti-recursão)

**Trigger `handle_new_user`** — o primeiro usuário cadastrado recebe automaticamente role `admin`; demais recebem `user`

**Tabela `access_tokens`**
- token (texto único), status (`active`|`used`|`expired`|`revoked`)
- expires_at (default now + 24h), created_by (admin), created_at
- used_at, revoked_at
- audit: ip, user_agent, browser, device

**Tabela `participants`**
- token_id (FK), nome, email, whatsapp, profissão, escolaridade
- empresa, cargo, cidade, estado, origem (opcionais)
- lgpd_accepted, created_at

**Tabela `test_results`**
- participant_id (FK), answers (JSONB)
- score_s, score_r, score_v, score_p
- dominant_profile, completed_at

**RLS**: admins veem tudo; endpoints públicos usam Edge Functions com service_role para validar/inserir sem expor dados.

---

## 2. Edge Functions (validação server-side)

- `validate-token`: recebe token, verifica status/expiração, retorna ok/erro
- `register-participant`: valida token + salva participante + marca token como `used` + registra auditoria (IP, UA)
- `submit-result`: recebe respostas, calcula scores no servidor, salva resultado
- `generate-pdf-report`: gera PDF completo (apenas admin autenticado)
- `expire-tokens` (cron opcional): marca tokens vencidos como `expired`

---

## 3. Fluxo Público (novo)

```
/ (Landing atual - Step2Info como intro pública)
    ↓
/acesso (Token + Cadastro - tela nova unificada)
    ↓
/teste (Step3Test - protegido por sessão de participante)
    ↓
/resultado (Step4Result - resumo, sem botão de refazer)
```

Sessão do participante armazenada em `sessionStorage` com ID do participante retornado pela edge function (não expõe token nem dados sensíveis).

---

## 4. Painel Administrativo `/admin`

**Rotas:**
- `/admin/login` — email + senha (Lovable Cloud Auth)
- `/admin` — dashboard com métricas (total leads, tokens ativos/usados, resultados por perfil)
- `/admin/tokens` — gerar individual, gerar em lote, listar (com filtros de status), revogar, regenerar, configurar validade padrão
- `/admin/leads` — listar participantes com busca (nome/email/WhatsApp/profissão/empresa/token), exportar CSV/Excel
- `/admin/resultados` — ver resultado detalhado, baixar PDF, ver dados de auditoria

Login protegido por `ProtectedAdminRoute` que verifica `has_role(uid, 'admin')`.

---

## 5. Relatório PDF

Gerado via edge function com jsPDF ou pdf-lib, contendo:
- Cabeçalho com logo Tutor's Tech
- Dados do participante e data
- Perfil predominante + scores S/R/V/P
- Interpretação, pontos fortes, pontos de atenção, recomendações
- Orientação para devolutiva, observação ética
- Rodapé obrigatório: "Este relatório não possui finalidade clínica..."

Disponível apenas via botão no `/admin/resultados`.

---

## 6. WhatsApp (mantido)

Manter `Step4Result` com botão de compartilhar resumo (sem link para PDF). Enviar para WhatsApp do participante e admin (+55 11 98587-0689). Assinatura: "Gerado via Neurocomunicacional MAP360."

Remover botão de "refazer teste".

---

## 7. Segurança
- Todas validações no servidor (edge functions)
- RLS ativo em todas tabelas
- Erros amigáveis (sem tela branca) — ErrorBoundary global
- Nenhum secret ou service_role exposto no frontend

---

## Estrutura de arquivos novos

```
supabase/functions/
  validate-token/index.ts
  register-participant/index.ts
  submit-result/index.ts
  generate-pdf-report/index.ts

src/
  pages/
    Acesso.tsx              (Token + Cadastro)
    Teste.tsx               (wrapper do Step3Test)
    Resultado.tsx           (wrapper do Step4Result)
    admin/
      Login.tsx
      Dashboard.tsx
      Tokens.tsx
      Leads.tsx
      Resultados.tsx
  components/
    admin/
      AdminLayout.tsx
      ProtectedAdminRoute.tsx
      TokenGenerator.tsx
      LeadsTable.tsx
      ResultsTable.tsx
  hooks/
    useAdminAuth.ts
    useParticipantSession.ts
  lib/
    exportCsv.ts
```

O `Index.tsx` atual será refatorado para orquestrar o novo fluxo por rotas, mas mantendo os 4 componentes Step originais intactos.

---

## Ordem de execução

1. Migração do banco (tabelas + RLS + roles + trigger)
2. Edge functions de validação
3. Refatoração de rotas (`App.tsx`) + páginas públicas novas
4. `/admin` completo (login, dashboard, tokens, leads, resultados)
5. Geração de PDF
6. Ajustes no `Step4Result` (remover refazer, manter WhatsApp)
7. Auditoria de IP/UA nos edge functions

---

## Perguntas antes de começar

1. **Exportação**: CSV basta, ou você quer também XLSX (Excel real)?
2. **PDF**: gerar server-side (edge function) ou client-side no painel (mais rápido, mesmo resultado visual)?
3. **Primeiro admin**: confirma que o primeiro email a se cadastrar em `/admin/login` (via signup) vira admin automaticamente? Ou você prefere me passar um email específico para eu já promover?
4. **Textos de interpretação do PDF** (pontos fortes, atenção, recomendações, devolutiva): usar os textos que já existem em `charismaData.ts` (`characteristics`, `challenges`, `developmentTips`) ou você quer fornecer conteúdo novo/mais aprofundado?
