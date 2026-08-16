"use client";

import "../globals.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LockKeyhole, Mail } from "lucide-react";
import GoogleIcon from "../../components/GoogleIcon";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    
    if (!email.includes("@")) {
      alert("Por favor, insira um email válido com @");
      return;
    }
    
    router.push("/dashboard");
  };

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
          <p className="auth-brand">EduFinance</p>
          <p className="auth-subtitle">Painel Administrativo</p>
        </div>

        <div className="auth-card">
          <button type="button" className="auth-google-btn">
            <GoogleIcon />
            Continuar com Google
          </button>

          <div className="auth-divider">ou</div>

          <form onSubmit={handleSubmit}>
            <div className="auth-field">
              <label className="bolso-label" htmlFor="email">
                E-mail
              </label>
              <div className="auth-input-wrap">
                <Mail size={16} strokeWidth={2} />
                <input
                  className="auth-input"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="voce@email.com"
                  required
                />
              </div>
            </div>

            <div className="auth-field">
              <div className="auth-label-row">
                <label className="bolso-label" htmlFor="senha">
                  Senha
                </label>
                <Link className="bolso-link" href="/recuperar-senha" style={{ fontSize: "12px" }}>
                  Esqueceu a senha?
                </Link>
              </div>
              <div className="auth-input-wrap">
                <LockKeyhole size={16} strokeWidth={2} />
                <input
                  className="auth-input"
                  id="senha"
                  name="senha"
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button className="auth-btn" type="submit">
              Entrar
            </button>
          </form>
        </div>

        <p className="bolso-footnote">
  Ainda não tem conta? <Link className="bolso-link" href="/cadastro">Criar conta</Link>
</p>
      </div>
    </main>
  );
}
