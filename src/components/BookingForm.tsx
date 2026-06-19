"use client";

import { FormEvent, useEffect, useMemo, useState, useCallback } from "react";
import { services } from "@/data/services";

const horarios = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

type Status = {
  type: "success" | "error" | "idle";
  message: string;
};

type Agendamento = {
  id: string;
  nome_cliente: string;
  horario: string;
  servico: string;
  email: string;
  telefone: string;
  observacoes?: string;
};

export default function BookingForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [data, setData] = useState(() => new Date().toISOString().split("T")[0]);
  const [horario, setHorario] = useState("");
  const [servico, setServico] = useState(services[0].name);
  const [reservados, setReservados] = useState<string[]>([]);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<Status>({ type: "idle", message: "" });
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Agendamento | null>(null);

  const minDate = useMemo(() => new Date().toISOString().split("T")[0], []);

  const loadData = useCallback(async () => {
    setLoadingSlots(true);
    try {
      const response = await fetch(`/api/agendamentos?data=${encodeURIComponent(data)}`, { cache: 'no-store' });
      const result = await response.json();
      setReservados(result.horariosReservados || []);
      setAgendamentos(result.agendamentos || []);
    } catch (error) {
      console.error("Erro ao buscar:", error);
    } finally {
      setLoadingSlots(false);
    }
  }, [data]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir este agendamento?")) return;
    await fetch("/api/agendamentos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    loadData();
  }

  function startEdit(ag: Agendamento) {
    setEditingId(ag.id);
    setEditData({ ...ag });
  }

  async function saveEdit() {
    if (!editData) return;
    await fetch("/api/agendamentos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });
    setEditingId(null);
    setEditData(null);
    loadData();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/agendamentos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome_cliente: nome, email, telefone, observacoes, data, horario, servico }),
      });

      if (!response.ok) throw new Error("Erro ao salvar.");

      setStatus({ type: "success", message: "Agendamento confirmado!" });
      setNome(""); setEmail(""); setTelefone(""); setObservacoes(""); setHorario("");
      loadData();
    } catch (error) {
      setStatus({ type: "error", message: "Erro ao confirmar." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-white/10 bg-ink p-5 shadow-2xl shadow-black/30 sm:p-7">
      <div className="flex flex-col items-center text-center">
        <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-gold">Agende seu horário</p>
        <h3 className="mt-3 font-title text-3xl text-ivory">Escolha dia, horário e serviço</h3>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-bold text-ivory/75">
          Nome <input value={nome} onChange={(e) => setNome(e.target.value)} required className="min-h-12 rounded-md border border-white/10 bg-graphite px-4 text-ivory outline-none ring-gold/40 transition focus:ring-2" placeholder="Seu nome" />
        </label>
        <label className="flex flex-col gap-2 text-sm font-bold text-ivory/75">
          E-mail <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="min-h-12 rounded-md border border-white/10 bg-graphite px-4 text-ivory outline-none ring-gold/40 transition focus:ring-2" placeholder="exemplo@email.com" />
        </label>
        <label className="flex flex-col gap-2 text-sm font-bold text-ivory/75">
          Telefone <input value={telefone} onChange={(e) => setTelefone(e.target.value)} required className="min-h-12 rounded-md border border-white/10 bg-graphite px-4 text-ivory outline-none ring-gold/40 transition focus:ring-2" placeholder="(87) 91787-690" />
        </label>
        <label className="flex flex-col gap-2 text-sm font-bold text-ivory/75">
          Serviço <select value={servico} onChange={(e) => setServico(e.target.value)} className="min-h-12 rounded-md border border-white/10 bg-graphite px-4 text-ivory outline-none ring-gold/40 transition focus:ring-2">
            {services.map((s) => <option key={s.name} value={s.name}>{s.name} - R$ {s.price}</option>)}
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm font-bold text-ivory/75 sm:col-span-2">
          Data <input type="date" min={minDate} value={data} onChange={(e) => setData(e.target.value)} required className="min-h-12 rounded-md border border-white/10 bg-graphite px-4 text-ivory outline-none ring-gold/40 transition focus:ring-2" />
        </label>
        <label className="flex flex-col gap-2 text-sm font-bold text-ivory/75 sm:col-span-2">
          Observações (opcional) 
          <textarea value={observacoes} onChange={(e) => setObservacoes(e.target.value)} className="min-h-20 rounded-md border border-white/10 bg-graphite px-4 py-3 text-ivory outline-none ring-gold/40 transition focus:ring-2" placeholder="Ex: Gostaria de um corte mais curto nas laterais..." />
        </label>
      </div>

      <fieldset className="mt-6">
        <legend className="text-sm font-bold text-ivory/75">Horários {loadingSlots ? "carregando..." : ""}</legend>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {horarios.map((item) => {
            const disabled = !data || loadingSlots || reservados.includes(item);
            return (
              <button key={item} type="button" disabled={disabled} onClick={() => setHorario(item)} className={`min-h-12 rounded-md border px-3 text-sm font-extrabold transition ${horario === item ? "border-gold bg-gold text-ink" : "border-white/12 bg-graphite text-ivory"} ${disabled ? "opacity-30 cursor-not-allowed line-through" : ""}`}>
                {item}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-6 border-t border-white/10 pt-4">
        <h4 className="text-sm font-bold text-ivory mb-3">Reservas para {data}:</h4>
        {agendamentos.length > 0 ? (
          <ul className="space-y-3">
            {agendamentos.map((ag) => (
              <li key={ag.id} className="bg-graphite p-4 rounded-md border border-white/10 space-y-2">
                <div className="flex justify-between items-center">
                  {editingId === ag.id && editData ? (
                    <div className="flex flex-col gap-2 w-full">
                      <input value={editData.nome_cliente} onChange={(e) => setEditData({...editData, nome_cliente: e.target.value})} className="bg-black text-white px-2 py-1 rounded text-sm border border-gold" placeholder="Nome" />
                      <input value={editData.email} onChange={(e) => setEditData({...editData, email: e.target.value})} className="bg-black text-white px-2 py-1 rounded text-sm border border-gold" placeholder="Email" />
                      <input value={editData.telefone} onChange={(e) => setEditData({...editData, telefone: e.target.value})} className="bg-black text-white px-2 py-1 rounded text-sm border border-gold" placeholder="Telefone" />
                      <select value={editData.servico} onChange={(e) => setEditData({...editData, servico: e.target.value})} className="bg-black text-white px-2 py-1 rounded text-sm border border-gold">
                        {services.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                      </select>
                      <button onClick={saveEdit} className="text-green-400 font-bold text-xs uppercase bg-green-400/10 py-1 rounded">Salvar Alterações</button>
                    </div>
                  ) : (
                    <>
                      <span className="text-gold font-bold text-base">{ag.horario} - {ag.nome_cliente}</span>
                      <div className="flex gap-2">
                        <button type="button" onClick={() => startEdit(ag)} className="text-[10px] text-blue-400 font-bold uppercase">Editar</button>
                        <button type="button" onClick={() => handleDelete(ag.id)} className="text-[10px] text-red-400 font-bold uppercase">Excluir</button>
                      </div>
                    </>
                  )}
                </div>
                
                {editingId !== ag.id && (
                  <div className="flex flex-col gap-1 text-xs text-ivory/80 mt-2">
                    <p><span className="font-bold text-ivory/40">EMAIL:</span> {ag.email}</p>
                    <p><span className="font-bold text-ivory/40">TELEFONE:</span> {ag.telefone}</p>
                    <p className="mt-1 font-bold text-gold">{ag.servico}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : <p className="text-xs text-ivory/40">Nenhum agendamento marcado neste dia.</p>}
      </div>

      {status.message && (
        <p className={`mt-5 rounded-md border px-4 py-3 text-sm font-bold ${status.type === "success" ? "border-green-400/30 bg-green-400/10 text-green-200" : "border-red-400/30 bg-red-400/10 text-red-200"}`}>
          {status.message}
        </p>
      )}

      <button type="submit" disabled={submitting || !horario} className="mt-6 min-h-12 w-full rounded-full bg-gold px-6 text-sm font-extrabold uppercase text-ink shadow-gold transition hover:bg-[#e6c65a] disabled:opacity-50">
        {submitting ? "Confirmando..." : "Confirmar agendamento"}
      </button>
    </form>
  );
}