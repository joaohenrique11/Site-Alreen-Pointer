import { NextRequest, NextResponse } from 'next/server';
import { db, serverTimestamp } from '@/lib/firebase';
import { Resend } from 'resend';

// Inicializa o Resend com a chave que você colocará no .env.local
const resend = new Resend(process.env.RESEND_API_KEY);

const HORARIOS_VALIDOS = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

export const dynamic = 'force-dynamic';

type AgendamentoRequestBody = {
  id?: string;
  nome_cliente?: string;
  email?: string;
  telefone?: string;
  data?: string;
  horario?: string;
  servico?: string;
  observacoes?: string;
};

function isValidDate(value: string | null): boolean {
  return Boolean(value && /^\d{4}-\d{2}-\d{2}$/.test(value));
}

function normalizePhone(value: unknown): string {
  return String(value ?? '').replace(/\D/g, '');
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const data = request.nextUrl.searchParams.get("data");
  if (!isValidDate(data)) return NextResponse.json({ agendamentos: [], horariosReservados: [] });

  try {
    const snapshot = await db.collection("agendamentos").where("data", "==", data).get();
    const agendamentos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const horariosReservados = agendamentos.map(a => (a as any).horario);
    return NextResponse.json({ agendamentos, horariosReservados });
  } catch (error) {
    return NextResponse.json({ agendamentos: [], horariosReservados: [] }, { status: 500 });
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.json().catch(() => ({}));
  
  const payload = {
    nome_cliente: String(body.nome_cliente || "").trim(),
    email: String(body.email || "").trim().toLowerCase(),
    telefone: normalizePhone(body.telefone),
    data: String(body.data || ""),
    horario: String(body.horario || ""),
    servico: String(body.servico || ""),
    observacoes: String(body.observacoes || ""),
    criado_em: serverTimestamp(),
  };

  if (!payload.nome_cliente || !payload.email || payload.telefone.length < 10 || !isValidDate(payload.data) || !HORARIOS_VALIDOS.includes(payload.horario)) {
    return NextResponse.json({ message: "Dados inválidos." }, { status: 400 });
  }

  const reserved = await db.collection("agendamentos").where("data", "==", payload.data).where("horario", "==", payload.horario).limit(1).get();
  if (!reserved.empty) return NextResponse.json({ message: "Horário ocupado." }, { status: 409 });

  // Salva no Firestore
  const docRef = await db.collection('agendamentos').add(payload);

  // Tenta enviar o e-mail de notificação para o barbeiro
  try {
    await resend.emails.send({
      from: 'Sistema de Agendamentos <onboarding@resend.dev>', // Verifique este remetente no seu painel Resend
      to: 'Alvi14@gmail.com', // Coloque aqui o e-mail real do barbeiro
      subject: `📅 Novo Agendamento: ${payload.data} às ${payload.horario}`,
      text: `Olá! Um novo agendamento foi realizado.\n\nCliente: ${payload.nome_cliente}\nTelefone: ${payload.telefone}\nServiço: ${payload.servico}\nData/Hora: ${payload.data} às ${payload.horario}\nObs: ${payload.observacoes}`,
    });
  } catch (emailError) {
    console.error("Erro ao enviar e-mail:", emailError);
    // Não impedimos a resposta positiva, pois o agendamento no banco já foi um sucesso.
  }

  return NextResponse.json({ message: 'Agendamento confirmado.', id: docRef.id }, { status: 201 });
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  const { id } = await request.json();
  if (!id) return NextResponse.json({ message: "ID necessário." }, { status: 400 });
  await db.collection("agendamentos").doc(id).delete();
  return NextResponse.json({ message: "Excluído." });
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  try {
    const { id, ...updateData } = await request.json();
    if (!id) return NextResponse.json({ message: "ID necessário." }, { status: 400 });

    delete updateData.id;
    delete updateData.criado_em;

    await db.collection("agendamentos").doc(id).update(updateData);
    return NextResponse.json({ message: "Atualizado com sucesso." });
  } catch (error) {
    return NextResponse.json({ message: "Erro ao atualizar." }, { status: 500 });
  }
}