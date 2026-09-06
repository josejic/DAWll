"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  HelpCircle,
  MessageSquare,
  Plus,
  Trash2,
  Save,
  Send,
} from "lucide-react";
import { supabase } from "../../lib/supabase";

export default function AdminPainelPage() {
  // 1. ESTADOS DO SUPORTE E TERMOS
  const [emailSuporte, setEmailSuporte] = useState("suporte@edufinance.com");
  const [whatsappSuporte, setWhatsappSuporte] = useState("(83) 90000-0000");
  const [termosUso, setTermosUso] = useState("Bem-vindo ao EduFinance...");

  // 2. ESTADO DAS PERGUNTAS FREQUENTES (FAQ)
  const [faqs, setFaqs] = useState([
    { id: 1, pergunta: "Como adicionar uma receita?", resposta: "Vá em Transações e clique em +." },
    { id: 2, pergunta: "Meus dados estão seguros?", resposta: "Sim, utilizamos criptografia." },
  ]);

  // 3. ESTADO DOS FEEDBACKS DOS USUÁRIOS
  const [feedbacks, setFeedbacks] = useState([
    { id: 1, usuario: "Pretinho", mensagem: "Acho bom ter gráfico de metas.", resposta: "" },
    { id: 2, usuario: "Maria S.", mensagem: "O aplicativo é ótimo!", resposta: "" },
  ]);

  // Armazena temporariamente o texto que o admin digita para responder
  const [textoResposta, setTextoResposta] = useState({});

  // --- FUNÇÕES DE MANIPULAÇÃO (LÓGICA SIMPLES) ---

  // Adiciona um novo FAQ na lista
  const adicionarFaq = () => {
    const novoFaq = { id: Date.now(), pergunta: "Nova Pergunta", resposta: "" };
    setFaqs([...faqs, novoFaq]);
  };

  // Remove um FAQ pelo ID
  const removerFaq = (id) => {
    setFaqs(faqs.filter((faq) => faq.id !== id));
  };

  // Atualiza pergunta ou resposta de um FAQ específico
  const atualizarFaq = (id, campo, valor) => {
    setFaqs(
      faqs.map((faq) => (faq.id === id ? { ...faq, [campo]: valor } : faq))
    );
  };

  // Salva a resposta dada a um feedback de usuário
  const responderFeedback = (id) => {
    const texto = textoResposta[id];
    if (!texto) return;

    setFeedbacks(
      feedbacks.map((item) =>
        item.id === id ? { ...item, resposta: texto } : item
      )
    );
  };

  const salvarDados = () => {
    alert("Dados salvos com sucesso!");
  };

  return (
    <div className="admin-content" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1 className="admin-page-title">Painel de Gestão</h1>
      <p className="admin-page-subtitle">
        Gerencie suporte, FAQ e respostas de feedbacks.
      </p>

      {/* ================= SEÇÃO 1: SUPORTE E FAQ ================= */}
      <div className="admin-card" style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <HelpCircle size={20} color="var(--primary)" />
          <h2 className="admin-card-title">Suporte e Termos</h2>
        </div>

        {/* Canais de Atendimento */}
        <div className="dicas-field">
          <label className="bolso-label">Canais de Contato</label>
          <div className="auth-input-wrap" style={{ marginBottom: "0.5rem" }}>
            <Mail size={16} />
            <input
              className="auth-input"
              value={emailSuporte}
              onChange={(e) => setEmailSuporte(e.target.value)}
            />
          </div>
          <div className="auth-input-wrap">
            <Phone size={16} />
            <input
              className="auth-input"
              value={whatsappSuporte}
              onChange={(e) => setWhatsappSuporte(e.target.value)}
            />
          </div>
        </div>

        {/* Termos */}
        <div className="dicas-field">
          <label className="bolso-label">Termos de Uso</label>
          <textarea
            className="dicas-textarea"
            value={termosUso}
            onChange={(e) => setTermosUso(e.target.value)}
          />
        </div>

        {/* FAQs */}
        <div className="dicas-field">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <label className="bolso-label">Perguntas Frequentes (FAQ)</label>
            <button type="button" onClick={adicionarFaq} className="dica-action-btn">
              <Plus size={16} color="var(--primary)" />
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {faqs.map((faq) => (
              <div
                key={faq.id}
                style={{
                  border: "1px solid var(--border-color)",
                  padding: "0.75rem",
                  borderRadius: "var(--radius-lg)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <input
                  className="dicas-input"
                  value={faq.pergunta}
                  onChange={(e) => atualizarFaq(faq.id, "pergunta", e.target.value)}
                  placeholder="Pergunta"
                />
                <textarea
                  className="dicas-textarea"
                  value={faq.resposta}
                  onChange={(e) => atualizarFaq(faq.id, "resposta", e.target.value)}
                  placeholder="Resposta"
                />
                <button
                  type="button"
                  onClick={() => removerFaq(faq.id)}
                  style={{
                    color: "var(--color-danger)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    fontSize: "0.8rem",
                    alignSelf: "flex-end",
                  }}
                >
                  <Trash2 size={14} /> Excluir
                </button>
              </div>
            ))}
          </div>
        </div>

        <button type="button" onClick={salvarDados} className="dicas-btn-primary" style={{ width: "100%", marginTop: "1rem" }}>
          <Save size={16} /> Salvar Suporte
        </button>
      </div>

      {/* ================= SEÇÃO 2: FEEDBACKS ================= */}
      <div className="admin-card">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <MessageSquare size={20} color="var(--primary)" />
          <h2 className="admin-card-title">Comentários e Feedbacks</h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {feedbacks.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid var(--border-color)",
                padding: "0.85rem",
                borderRadius: "var(--radius-lg)",
                background: "var(--bg-app)",
              }}
            >
              <p style={{ fontWeight: "bold", fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                {item.usuario}
              </p>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                {item.mensagem}
              </p>

              {item.resposta ? (
                <div style={{ background: "var(--primary-light)", padding: "0.5rem", borderRadius: "var(--radius-md)", fontSize: "0.8rem", color: "var(--primary-dark)" }}>
                  <strong>Resposta Enviada:</strong> {item.resposta}
                </div>
              ) : (
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <input
                    className="dicas-input"
                    style={{ flex: 1 }}
                    placeholder="Escreva uma resposta..."
                    value={textoResposta[item.id] || ""}
                    onChange={(e) =>
                      setTextoResposta({ ...textoResposta, [item.id]: e.target.value })
                    }
                  />
                  <button type="button" onClick={() => responderFeedback(item.id)} className="dicas-btn-primary">
                    <Send size={14} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}