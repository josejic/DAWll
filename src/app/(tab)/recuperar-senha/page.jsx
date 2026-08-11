"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import "../../ledger.css";

// ── Ponto único de contato com o backend ──────────────────────────
// Hoje é "fake" (mock): só espera um pouco e finge que deu certo.
// Quando tiver banco de verdade (ex: Supabase), você troca SÓ o
// interior dessa função por uma chamada real — nada mais na tela
// precisa mudar, porque o resto do código só chama essa função.
async function solicitarRecuperacaoSenha(email) {
  void email;
  //await new Promise((resolve) => setTimeout(resolve, 800)); // simula espera de rede
  return { sucesso: true };

  // Exemplo de como ficaria com Supabase, no futuro:
  // const { error } = await supabase.auth.resetPasswordForEmail(email);
  // return { sucesso: !error, erro: error?.message };
}

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setEnviando(true);

    const resultado = await solicitarRecuperacaoSenha(email);

    setEnviando(false);

    if (resultado.sucesso) {
      setEnviado(true);
    } else {
      setErro("Não foi possível enviar o e-mail. Tenta de novo em instantes.");
    }
  }

  return (
    <main className="bolso-page bolso-page--plain">
      <div className="auth-shell">
        <div className="auth-header">
          <img
            className="auth-logo"
            src="/imagens/logo-simbolo.png"
            alt="Logo da EduFinance"
            width={64}
            height={64}
          />
          <p className="auth-brand">Esqueceu a senha?</p>
          <p className="auth-subtitle">
            {enviado
              ? "Verifique sua caixa de entrada"
              : "Enviamos um link de recuperação pro seu e-mail"}
          </p>
        </div>

        <div className="auth-card">
          {enviado ? (
            <div style={{ textAlign: "center", padding: "12px 0" }}>
              <CheckCircle size={40} color="var(--stamp-green)" style={{ marginBottom: 14 }} />
              <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.6 }}>
                Se existir uma conta com o e-mail <strong>{email}</strong>,
                você vai receber um link pra criar uma nova senha.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="auth-field">
                <label className="bolso-label" htmlFor="email">
                  E-mail
                </label>
                <div className="auth-input-wrap">
                  <Mail size={16} />
                  <input
                    className="auth-input"
                    id="email"
                    type="email"
                    placeholder="voce@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {erro && (
                <p style={{ color: "var(--stamp-red)", fontSize: 13, marginBottom: 12 }}>
                  {erro}
                </p>
              )}

              <button className="auth-btn" type="submit" disabled={enviando}>
                {enviando ? "Enviando..." : "Enviar link de recuperação"}
              </button>
            </form>
          )}
        </div>

        <p className="bolso-footnote">
          <Link className="bolso-link" href="/login" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <ArrowLeft size={14} />
            Voltar para o login
          </Link>
        </p>
      </div>
    </main>
  );
}
