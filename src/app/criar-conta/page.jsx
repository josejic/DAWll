"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import {
    User,
    Mail,
    Lock,
    ShieldCheck,
    ArrowLeft,
} from "lucide-react";

const CONTA_VAZIA = {
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    tipo: "adm",
};

export default function CriarContaPage() {
    const [form, setForm] = useState(CONTA_VAZIA);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");
    const [mensagem, setMensagem] = useState("");

    function handleChange(event) {
        const { name, value } = event.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function criarConta(event) {
        event.preventDefault();

        setErro("");
        setMensagem("");

        const nome = form.nome.trim();
        const email = form.email.trim();

        if (!nome || !email || !form.senha) {
            setErro("Preencha todos os campos.");
            return;
        }

        if (form.senha.length < 6) {
            setErro("A senha deve possuir pelo menos 6 caracteres.");
            return;
        }

        if (form.senha !== form.confirmarSenha) {
            setErro("As senhas não coincidem.");
            return;
        }

        setCarregando(true);

        try {
            const resposta = await fetch("/api/admin/criar-conta", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    nome,
                    email,
                    senha: form.senha,
                    tipo: form.tipo,
                }),
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                setErro(dados.erro || "Não foi possível criar a conta.");
                return;
            }

            setMensagem("Conta criada com sucesso.");
            setForm(CONTA_VAZIA);
        } catch {
            setErro("Não foi possível se comunicar com o servidor.");
        } finally {
            setCarregando(false);
        }
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
                        Criar nova conta
                    </h2>

                    <p className="auth-card-subtitle">
                        Cadastre uma nova conta de acesso ao painel administrativo.
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
                                    name="nome"
                                    type="text"
                                    className="auth-input"
                                    placeholder="Nome do administrador"
                                    value={form.nome}
                                    onChange={handleChange}
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
                                    name="email"
                                    type="email"
                                    className="auth-input"
                                    placeholder="admin@email.com"
                                    value={form.email}
                                    onChange={handleChange}
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
                                    name="senha"
                                    type="password"
                                    className="auth-input"
                                    placeholder="Digite uma senha"
                                    value={form.senha}
                                    onChange={handleChange}
                                    minLength={6}
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
                                    name="confirmarSenha"
                                    type="password"
                                    className="auth-input"
                                    placeholder="Digite a senha novamente"
                                    value={form.confirmarSenha}
                                    onChange={handleChange}
                                    minLength={6}
                                    required
                                />

                            </div>
                        </div>

                        {/* TIPO DE CONTA */}
                        <div className="auth-field">

                            <div className="auth-label-row">
                                <label htmlFor="tipo">
                                    Tipo de conta
                                </label>
                            </div>

                            <div className="auth-input-wrap">

                                <ShieldCheck size={18} />

                                <select
                                    id="tipo"
                                    name="tipo"
                                    className="auth-input auth-select"
                                    value={form.tipo}
                                    onChange={handleChange}
                                >
                                    <option value="adm">
                                        Administrador
                                    </option>

                                    <option value="superadm">
                                        Super Administrador
                                    </option>

                                </select>

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
                                ? "Criando conta..."
                                : "Criar conta"}
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