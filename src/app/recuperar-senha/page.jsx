"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function RecuperarSenhaPage() {
    const [email, setEmail] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");
    const [mensagem, setMensagem] = useState("");

    async function recuperarSenha(event) {
        event.preventDefault();

        setErro("");
        setMensagem("");

        const emailLimpo = email.trim();

        if (!emailLimpo) {
            setErro("Informe seu e-mail.");
            return;
        }

        setCarregando(true);

        const { error } = await supabase.auth.resetPasswordForEmail(emailLimpo, {
            redirectTo: `${window.location.origin}/redefinir-senha`,
        });

        setCarregando(false);

        if (error) {
            setErro("Não foi possível enviar o e-mail de recuperação.");
            return;
        }

        setMensagem(
            "Se esse e-mail estiver cadastrado, enviaremos um link para redefinir sua senha."
        );
    }

    return (
        <main className="bolso-page">
            <div className="auth-shell">
                <Image
                    className="auth-logo"
                    src="/imagens/logo-simbolo.png"
                    alt="Logo da EduFinance"
                    width={64}
                    height={64}
                    priority
                />
                <header className="auth-header">
                    <h1 className="auth-brand">EduFinance</h1>
                    <p className="auth-subtitle">Painel Administrativo</p>
                </header>

                <section className="auth-card">
                    <h2 className="auth-card-title">Recuperar senha</h2>

                    <p className="auth-card-subtitle">
                        Digite o e-mail da sua conta para receber o link de recuperação.
                    </p>

                    <form onSubmit={recuperarSenha}>
                        <div className="auth-field">

                            <div className="auth-label-row">
                                <label htmlFor="email">E-mail</label>
                            </div>

                            <div className="auth-input-wrap">
                                <Mail size={18} />

                                <input
                                    id="email"
                                    type="email"
                                    className="auth-input"
                                    placeholder="seu@email.com"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                />
                            </div>

                        </div>

                        {erro && (
                            <p className="auth-message auth-message--error">
                                {erro}
                            </p>
                        )}

                        {mensagem && (
                            <p className="auth-message auth-message--success">
                                {mensagem}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="auth-btn"
                            disabled={carregando}
                        >
                            {carregando ? "Enviando..." : "Enviar link de recuperação"}
                        </button>
                    </form>

                    <Link href="/login" className="auth-back-link">
                        <ArrowLeft size={16} />
                        Voltar para o login
                    </Link>
                </section>

            </div>
        </main>
    );
}