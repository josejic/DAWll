"use client";

import "../../ledger.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
          <div className="auth-logo">E</div>
          <p className="auth-brand">EduFinance</p>
          <p className="auth-subtitle">Painel Administrativo</p>
        </div>

        <div className="auth-card">
          <button type="button" className="auth-google-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.67-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.1a6.94 6.94 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            Continuar com Google
          </button>

          <div className="auth-divider">ou</div>

          <form onSubmit={handleSubmit}>
            <div className="auth-field">
              <label className="bolso-label" htmlFor="email">
                E-mail
              </label>
              <div className="auth-input-wrap">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M2 6l10 7 10-7" />
                </svg>
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="4" y="10" width="16" height="10" rx="2" />
                  <path d="M8 10V7a4 4 0 1 1 8 0v3" />
                </svg>
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