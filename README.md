🚀 Tecnologias Utilizadas

    Framework: Next.js 14+ (App Router & API Routes)

    Linguagem: TypeScript

    Estilização: Tailwind CSS

    Animações: Framer Motion

    Banco de Dados: Firebase Firestore

    Driver de Conexão: firebase-admin (via src/lib/firebase.ts)

📦 Funcionalidades Implementadas

    [x] Layout Responsivo Premium: Design fluido adaptado para dispositivos móveis e desktops, utilizando uma paleta Dark/Gold elegante.

    [x] Vetorização de Identidade: Componente de Logo nativo renderizado puramente em SVG transparente.

    [x] Validação Anti-Duplicação: API Route que checa a existência de conflitos no banco de dados antes de validar qualquer reserva.

    [x] Bloqueio de Horários Ocupados: Interface reativa que consome a API e desabilita automaticamente os botões de horários já reservados para o dia selecionado.

    [x] Seções Estruturadas: Hero com métricas, Seção de Serviços detalhada, Formulário de Agendamento por Etapas e Bloco de Contatos com mapa integrado.

🔧 Configuração e Instalação
1. Clonar o Repositório
Bash

git clone https://github.com/SEU_USUARIO/Alreen-Pointer.git
cd Alreen-Pointer

2. Instalar as Dependências
Bash

npm install

3. Configurar o Banco de Dados (Firebase Firestore)

Este projeto usa Firebase Firestore para armazenar agendamentos. Você pode criar um novo projeto no Firebase Console e utilizar as credenciais do serviço para autenticar o backend.

4. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as credenciais do Firebase e o telefone de contato do barbeiro. Exemplo:

```env
FIREBASE_PROJECT_ID=seu-project-id
FIREBASE_CLIENT_EMAIL=seu-client-email@seu-project-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
BARBER_CONTACT=8791787690
```

Se preferir usar a variável JSON completa:

```env
FIREBASE_SERVICE_ACCOUNT={"type":"service_account","project_id":"seu-project-id",...}
BARBER_CONTACT=8791787690
```

### Configuração do Firebase Localmente

1. **Obter credenciais do Firebase:**
   - Acesse [Google Cloud Console](https://console.cloud.google.com/iam-admin/serviceaccounts)
   - Selecione seu projeto Firebase
   - Crie ou selecione uma Service Account
   - Gere uma chave privada em formato JSON
   - Copie: `project_id`, `client_email` e `private_key`

2. **Configurar `.env` local:**
   - Copie as credenciais do JSON para as variáveis de ambiente
   - **IMPORTANTE:** O `.env` está em `.gitignore` — nunca faça commit de credenciais
   - Veja `.env.local.example` para instruções detalhadas

3. **Teste localmente:**
   ```bash
   npm run dev
   # Acesse http://localhost:3000/api/agendamentos?data=2024-12-25
   ```

### Configuração no Vercel (Production)

No dashboard do Vercel, adicione estas variáveis de ambiente:

- `FIREBASE_PROJECT_ID` — seu Firebase project ID
- `FIREBASE_CLIENT_EMAIL` — email da service account
- `FIREBASE_PRIVATE_KEY` — chave privada (com `\n` literais para newlines)
- Alternativamente: `FIREBASE_SERVICE_ACCOUNT` — JSON completo
- `BARBER_CONTACT` — número de contato do barbeiro
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` — config de email

**Dica:** Em variáveis com quebras de linha (como `FIREBASE_PRIVATE_KEY`), use `\n` literal (não escape sequences).

> ⚠️ **Segurança:** Nunca exponha credenciais no código ou logs. Use sempre `process.env` para ler variáveis.

### Debugging: "Firebase app does not exist"

Se receber este erro:
- Verifique que `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL` e `FIREBASE_PRIVATE_KEY` estão definidos
- Confirme que a chave privada tem as quebras de linha corretas (`\n`)
- Teste localmente com `.env` preenchido: `npm run dev`
- Verifique logs do Vercel para mensagens de inicialização

5. Rodar em Ambiente de Desenvolvimento
Bash

npm run dev

🤖 Créditos e Desenvolvimento Inteligente

Este projeto comercial foi construído, estruturado e refinado utilizando ferramentas de Inteligência Artificial de última geração, unindo engenharia de prompt e desenvolvimento ágil:

    Google Gemini: Responsável pelo planejamento da arquitetura do projeto, modelagem lógica e scripts do banco de dados MySQL, codificação das rotas de API com validações de segurança contra duplicidade, vetorização da identidade visual da marca em componentes SVG puros e escrita da documentação do sistema.

    Codex (OpenAI): Utilizado diretamente no ambiente de desenvolvimento integrado para a co-criação rápida, auto-complete de blocos de códigos estruturais, agilidade na escrita de tipagens TypeScript e aplicação prática das classes utilitárias do Tailwind CSS nos componentes visuais.

    🔒 Licença Comercial e Direitos Privados

PROPRIEDADE INTELECTUAL E SOFTWARE PROPRIETÁRIO

Este software e todo o seu código-fonte, elementos visuais, identidade gráfica e estrutura lógica são confidenciais e de propriedade exclusiva do desenvolvedor e da barbearia Alreen Pointer.

    Proibição de Cópia e Distribuição: É expressamente proibida a cópia, reprodução, modificação, distribuição, engenharia reversa ou sublicenciamento deste repositório, no todo ou em parte, sem a autorização prévia e por escrito dos detentores dos direitos autorais.

    Uso Exclusivo: O uso comercial desta aplicação é restrito única e exclusivamente à operação oficial da marca Alreen Pointer. Qualquer uso não autorizado em outros estabelecimentos ou domínios constituirá infração de direitos de propriedade intelectual e direitos autorais, ficando o infrator sujeito às penalidades civis e criminais cabíveis de acordo com a legislação de proteção ao software.

Todos os direitos reservados © 2026 Alreen Pointer.