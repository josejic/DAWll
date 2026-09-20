"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import {
    User,
    Mail,
    Lock,
    ArrowLeft,
} from "lucide-react";

import { supabase } from "../lib/supabase";

export default function CriarContaPage() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");
    const [mensagem, setMensagem] = useState("");

    async function criarConta(event) {
        event.preventDefault();

        setErro("");
        setMensagem("");

        // CONFERE SE AS SENHAS SÃO IGUAIS
        if (senha !== confirmarSenha) {
            setErro("As senhas não coincidem.");
            return;
        }

        // CONFERE O TAMANHO DA SENHA
        if (senha.length < 6) {
            setErro("A senha deve possuir pelo menos 6 caracteres.");
            return;
        }

        setCarregando(true);

        // CRIA A CONTA NO SUPABASE AUTH
        const { data, error } = await supabase.auth.signUp({
            email: email.trim(),
            password: senha,
        });

        if (error) {
            setErro("Não foi possível criar a conta.");
            setCarregando(false);
            return;
        }

        // PEGA O ID DO USUÁRIO CRIADO
        const userId = data.user?.id;

        if (!userId) {
            setErro("Não foi possível identificar a conta criada.");
            setCarregando(false);
            return;
        }

        // CADASTRA O ADMINISTRADOR COMO PENDENTE
        const { error: erroAdmin } = await supabase
            .from("administradores")
            .insert({
                id: userId,
                nome: nome.trim(),
                status: "pendente",
            });

        if (erroAdmin) {
            console.error(erroAdmin);

            setErro("A conta foi criada, mas não foi possível enviar a solicitação.");
            setCarregando(false);
            return;
        }

        setMensagem(
            "Solicitação enviada. Aguarde a aprovação de um administrador."
        );

        setNome("");
        setEmail("");
        setSenha("");
        setConfirmarSenha("");

        setCarregando(false);
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
                    <h1 className="auth-brand">
                        EduFinance
                    </h1>

                    <p className="auth-subtitle">
                        Painel Administrativo
                    </p>
                </header>

                <section className="auth-card">

                    <h2 className="auth-card-title">
                        Solicitar conta
                    </h2>

                    <p className="auth-card-subtitle">
                        Solicite acesso ao painel administrativo.
                    </p>

                    <form onSubmit={criarConta}>

                        {/* NOME */}
                        <div className="auth-field">
                            <div className="auth-label-row">
                                <label htmlFor="nome">
                                    Nome
                                </label>
                            </div>

                            <div className="auth-input-wrap">
                                <User size={18} />

                                <input
                                    id="nome"
                                    type="text"
                                    className="auth-input"
                                    placeholder="Seu nome"
                                    value={nome}
                                    onChange={(event) =>
                                        setNome(event.target.value)
                                    }
                                    required
                                />
                            </div>
                        </div>

                        {/* E-MAIL */}
                        <div className="auth-field">
                            <div className="auth-label-row">
                                <label htmlFor="email">
                                    E-mail
                                </label>
                            </div>

                            <div className="auth-input-wrap">
                                <Mail size={18} />

                                <input
                                    id="email"
                                    type="email"
                                    className="auth-input"
                                    placeholder="voce@email.com"
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    required
                                />
                            </div>
                        </div>

                        {/* SENHA */}
                        <div className="auth-field">
                            <div className="auth-label-row">
                                <label htmlFor="senha">
                                    Senha
                                </label>
                            </div>

                            <div className="auth-input-wrap">
                                <Lock size={18} />

                                <input
                                    id="senha"
                                    type="password"
                                    className="auth-input"
                                    placeholder="Digite uma senha"
                                    value={senha}
                                    onChange={(event) =>
                                        setSenha(event.target.value)
                                    }
                                    required
                                />
                            </div>
                        </div>

                        {/* CONFIRMAR SENHA */}
                        <div className="auth-field">
                            <div className="auth-label-row">
                                <label htmlFor="confirmarSenha">
                                    Confirmar senha
                                </label>
                            </div>

                            <div className="auth-input-wrap">
                                <Lock size={18} />

                                <input
                                    id="confirmarSenha"
                                    type="password"
                                    className="auth-input"
                                    placeholder="Digite a senha novamente"
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
                                ? "Enviando..."
                                : "Solicitar conta"}
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