"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { LockKeyhole, ArrowLeft } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function RedefinirSenhaPage() {
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");
    const [mensagem, setMensagem] = useState("");

    async function redefinirSenha(event) {
        event.preventDefault();

        setErro("");
        setMensagem("");

        if (novaSenha !== confirmarSenha) {
            setErro("As senhas não coincidem.");
            return;
        }

        if (novaSenha.length < 6) {
            setErro("A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        setCarregando(true);

        const { error } = await supabase.auth.updateUser({
            password: novaSenha,
        });

        setCarregando(false);

        if (error) {
            setErro("Não foi possível redefinir sua senha.");
            return;
        }

        setMensagem("Senha alterada com sucesso.");

        setNovaSenha("");
        setConfirmarSenha("");
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
                    <p className="auth-subtitle">
                        Painel Administrativo
                    </p>
                </header>

                <section className="auth-card">

                    <h2 className="auth-card-title">
                        Redefinir senha
                    </h2>

                    <p className="auth-card-subtitle">
                        Digite sua nova senha.
                    </p>

                    <form onSubmit={redefinirSenha}>

                        <div className="auth-field">

                            <div className="auth-label-row">
                                <label htmlFor="novaSenha">
                                    Nova senha
                                </label>
                            </div>

                            <div className="auth-input-wrap">
                                <LockKeyhole size={18} />

                                <input
                                    id="novaSenha"
                                    type="password"
                                    className="auth-input"
                                    placeholder="••••••••"
                                    value={novaSenha}
                                    onChange={(event) =>
                                        setNovaSenha(event.target.value)
                                    }
                                    required
                                />
                            </div>

                        </div>

                        <div className="auth-field">

                            <div className="auth-label-row">
                                <label htmlFor="confirmarSenha">
                                    Confirmar nova senha
                                </label>
                            </div>

                            <div className="auth-input-wrap">
                                <LockKeyhole size={18} />

                                <input
                                    id="confirmarSenha"
                                    type="password"
                                    className="auth-input"
                                    placeholder="••••••••"
                                    value={confirmarSenha}
                                    onChange={(event) =>
                                        setConfirmarSenha(event.target.value)
                                    }
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
                            {carregando
                                ? "Alterando..."
                                : "Alterar senha"}
                        </button>

                    </form>

                    <Link
                        href="/login"
                        className="auth-back-link"
                    >
                        <ArrowLeft size={16} />
                        Voltar para o login
                    </Link>

                </section>
            </div>
        </main>
    );
}