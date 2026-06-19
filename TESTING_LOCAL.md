# 🚀 Instruções para Testar Localmente

## 1. Preparar Credenciais Firebase

### Obter credenciais do Firebase:
1. Acesse [Google Cloud Console](https://console.cloud.google.com/iam-admin/serviceaccounts)
2. Selecione seu projeto Firebase
3. Vá para "Service Accounts"
4. Clique em uma service account existente ou crie uma nova
5. Abra a aba "Keys" (Chaves)
6. Clique "Add Key" → "Create new key" → escolha "JSON"
7. Salve o arquivo JSON (contém `project_id`, `client_email`, `private_key`)

### Configurar `.env` local:
1. Na raiz do projeto, crie um arquivo `.env` (será ignorado pelo git)
2. Preencha com as credenciais do JSON:

```env
# Firebase Configuration
FIREBASE_PROJECT_ID=seu-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@seu-project-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG...\n-----END PRIVATE KEY-----\n

# Email Configuration (opcional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-app-do-google

# Barber Contact
BARBER_CONTACT=8791787690
```

**⚠️ IMPORTANTE:** 
- O `.env` está no `.gitignore` — ele NÃO será commitado (seguro!)
- Copie a chave privada exatamente como aparece no JSON
- As quebras de linha na chave devem ser `\n` literal (o Node.js converte automaticamente)

## 2. Rodar Localmente

```bash
# Instalar dependências (se necessário)
npm install

# Rodar servidor de desenvolvimento
npm run dev
```

Você verá:
```
> alreen-pointer-next@1.0.0 dev
> next dev

  ▲ Next.js 15.5.19
  - Local:        http://localhost:3000
```

## 3. Testar a API

### Teste GET (listar horários reservados):
```bash
curl "http://localhost:3000/api/agendamentos?data=2024-12-25"
```

Resposta esperada:
```json
{
  "data": "2024-12-25",
  "horariosReservados": ["09:00", "14:00"]
}
```

### Teste POST (criar agendamento):
```bash
curl -X POST http://localhost:3000/api/agendamentos \
  -H "Content-Type: application/json" \
  -d '{
    "nome_cliente": "João Silva",
    "email": "joao@example.com",
    "telefone": "87987654321",
    "data": "2024-12-25",
    "horario": "15:00",
    "servico": "Corte"
  }'
```

Resposta esperada (sucesso):
```json
{
  "message": "Agendamento confirmado com sucesso.",
  "id": "XXXXXXXXXXXX",
  "barbeiro": "87 91787690"
}
```

Respostas possíveis de erro:
- `400` - Dados inválidos (nome < 3 chars, email inválido, etc)
- `409` - Horário já reservado
- `500` - Erro ao salvar (Firebase não configurado corretamente)

## 4. Verificar Logs do Firebase

Se receber erro "Firebase app does not exist":
1. Verifique no console do Next.js se vê `[Firebase] App initialized successfully`
2. Se vir `[Firebase] Deferred initialization - credentials not available at module load time`:
   - Significa que `.env` não foi lido corretamente
   - Verifique se o arquivo `.env` existe na raiz do projeto
   - Reinicie o servidor: Ctrl+C e `npm run dev`

## 5. Verificar Build Production

```bash
npm run build
```

Se passar sem erros: ✅ Seu código está pronto para produção no Vercel!

## 6. Configurar no Vercel

Após confirmar que funciona localmente:

1. Acesse [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecione seu projeto
3. Vá para "Settings" → "Environment Variables"
4. Adicione as mesmas variáveis do `.env`:
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_PRIVATE_KEY`
   - `BARBER_CONTACT`
   - (opcionais) `SMTP_*` para email

5. **Redeploy** o projeto (vai usar as novas env vars)

## 🔧 Troubleshooting

### "Firebase app does not exist"
- ❌ `.env` não existe ou não está preenchido
- ✅ Crie `.env` com credenciais válidas e reinicie o servidor

### "FIREBASE_PRIVATE_KEY must be valid JSON"
- ❌ Você usou `FIREBASE_SERVICE_ACCOUNT` mas o valor está inválido
- ✅ Use as 3 variáveis individuais (`PROJECT_ID`, `CLIENT_EMAIL`, `PRIVATE_KEY`) em vez disso

### "Nao foi possivel salvar o agendamento agora"
- ❌ Firestore não está acessível (rede, credenciais, ou permissões)
- ✅ Verifique que a collection `agendamentos` existe no Firestore
- ✅ Verifique que as credenciais têm permissão de leitura/escrita

### Email não é enviado
- ❌ `SMTP_*` não está configurado
- ✅ Isso é opcional — a API vai criar o agendamento mesmo sem email
- ✅ Logs do servidor mostrarão `[agendamentos POST] email notification failed` se houver erro

---

**Precisa de ajuda?** Verifique os logs no terminal do `npm run dev` para mensagens de erro detalhadas.
