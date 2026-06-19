import 'dotenv/config';

const apiUrl = process.env.API_URL || 'http://localhost:3000/api/agendamentos';

const payload = {
  nome_cliente: 'Teste Automático',
  email: 'teste@exemplo.com',
  telefone: '87912345678',
  data: '2026-06-20',
  horario: '10:00',
  servico: 'Corte de cabelo',
};

async function run() {
  try {
    console.log('POST', apiUrl);
    console.log('Payload:', payload);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => null);
    console.log('Status:', response.status);
    console.log('Response:', data);
  } catch (error) {
    console.error('Test request failed:', error);
    process.exit(1);
  }
}

run();
