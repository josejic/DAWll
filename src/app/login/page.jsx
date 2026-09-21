"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LockKeyhole, Mail } from "lucide-react";

import { supabase } from "../lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErro("");
    setCarregando(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: senha,
    });

    if (error) {
      setErro("E-mail ou senha incorretos.");
      setCarregando(false);
      return;
    }

    const userId = data.user.id;

    const {
      data: administrador,
      error: erroAdmin,
    } = await supabase.from("administradores").select("status").eq("id", userId).single();

    if (erroAdmin || !administrador) {
      console.error("Erro ao buscar administrador:", erroAdmin);

      await supabase.auth.signOut();

      setErro("Esta conta não possui acesso administrativo.");
      setCarregando(false);
      return;
    }

    if (administrador.status !== "aprovado") {
      await supabase.auth.signOut();

      if (administrador.status === "pendente") {
        setErro("Sua solicitação de acesso ainda está em análise.");
      } else if (administrador.status === "negado") {
        setErro("Sua solicitação de acesso foi negada.");
      } else {
        setErro("Esta conta não possui acesso administrativo.");
      }

      setCarregando(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();//pede pro next atualizar os dados atuais do servidor sem recarregar a página toda
  };

  return (
    <main className="bolso-page bolso-page--plain">
      <div className="auth-shell">

        {/* CABEÇALHO */}
        <div className="auth-header">
          <Image
            className="auth-logo"
            src="/imagens/logo-simbolo.png"
            alt="Logo da EduFinance"
            width={64}
            height={64}
            priority
          />

          <p className="auth-brand">EduFinance</p>
          <p className="auth-subtitle">
            Painel Administrativo
          </p>
        </div>

        <div className="auth-card">

          {/* FORMULÁRIO */}
          <form onSubmit={handleSubmit}>

            {/* CAMPO DE E-MAIL */}
            <div className="auth-field">
              <label
                className="bolso-label"
                htmlFor="email"
              >
                E-mail
              </label>

              <div className="auth-input-wrap">
                <Mail size={16} />

                <input
                  className="auth-input"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="voce@email.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />
              </div>
            </div>

            {/* CAMPO DE SENHA */}
            <div className="auth-field">

              <div className="auth-label-row">
                <label
                  className="bolso-label"
                  htmlFor="senha"
                >
                  Senha
                </label>

                <Link
                  href="/recuperar-senha"
                  className="auth-forgot-link"
                >
                  Esqueceu sua senha?
                </Link>
              </div>

              <div className="auth-input-wrap">
                <LockKeyhole size={16} />

                <input
                  className="auth-input"
                  id="senha"
                  name="senha"
                  type="password"
                  placeholder="••••••••"
                  value={senha}
                  onChange={(e) =>
                    setSenha(e.target.value)
                  }
                  required
                />
              </div>
            </div>

            {/* MENSAGEM DE ERRO */}
            {erro && (
              <p className="auth-error">
                {erro}
              </p>
            )}

            {/* BOTÃO DE LOGIN */}
            <button
              className="auth-btn"
              type="submit"
              disabled={carregando}
            >
              {carregando
                ? "Entrando..."
                : "Entrar"}
            </button>

          </form>
        </div>

        {/* RODAPÉ */}
        <p className="bolso-footnote">
          Ainda não tem conta?{" "}
          <Link
            className="bolso-link"
            href="/criar-conta"
          >
            Criar conta
          </Link>
        </p>

      </div>
    </main>
  );
}