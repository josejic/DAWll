"use client";

import { useState } from "react";
import {
  Users,
  Mail,
  Phone,
  HelpCircle,
  MessageSquare,
  Plus,
  Trash2,
  Save,
  Send,
  UserRound,
  Camera,
  Pencil,
} from "lucide-react";


/* DADOS INICIAIS*/

const FAQS_INICIAIS = [
  {
    id: 1,
    pergunta: "Como adicionar uma receita?",
    resposta: "Vá em Transações e clique em +.",
  },
  {
    id: 2,
    pergunta: "Meus dados estão seguros?",
    resposta: "Sim, utilizamos criptografia.",
  },
];

const FEEDBACKS_INICIAIS = [
  {
    id: 1,
    usuario: "Pretinho",
    mensagem: "Acho bom ter gráfico de metas.",
    resposta: "",
    rascunho: "",
  },
  {
    id: 2,
    usuario: "Maria S.",
    mensagem: "O aplicativo é ótimo!",
    resposta: "",
    rascunho: "",
  },
];


export default function PainelGestao({ totalUsuarios }) {

  /*ESTADOS*/

  // Suporte
  const [emailSuporte, setEmailSuporte] = useState(
    "suporte@edufinance.com"
  );

  const [whatsappSuporte, setWhatsappSuporte] = useState(
    "(83) 90000-0000"
  );

  const [termosUso, setTermosUso] = useState(
    "Bem-vindo ao EduFinance..."
  );

  // FAQ
  const [faqs, setFaqs] = useState(FAQS_INICIAIS);

  // Feedbacks
  const [feedbacks, setFeedbacks] = useState(
    FEEDBACKS_INICIAIS
  );


  /* FUNÇÕES DA FAQ*/

  function adicionarFaq() {
    const novaFaq = {
      id: Date.now(),
      pergunta: "Nova pergunta",
      resposta: "",
    };

    setFaqs((listaAtual) => [
      ...listaAtual,
      novaFaq,
    ]);
  }


  function removerFaq(id) {
    setFaqs((listaAtual) =>
      listaAtual.filter((faq) => faq.id !== id)
    );
  }


  function atualizarFaq(id, campo, valor) {
    setFaqs((listaAtual) =>
      listaAtual.map((faq) => {

        if (faq.id === id) {
          return {
            ...faq,
            [campo]: valor,
          };
        }

        return faq;
      })
    );
  }


  /*FUNÇÕES DOS FEEDBACKS*/

  function atualizarRascunho(id, texto) {
    setFeedbacks((listaAtual) =>
      listaAtual.map((feedback) => {

        if (feedback.id === id) {
          return {
            ...feedback,
            rascunho: texto,
          };
        }

        return feedback;
      })
    );
  }


  function responderFeedback(id) {
    setFeedbacks((listaAtual) =>
      listaAtual.map((feedback) => {

        if (
          feedback.id !== id ||
          !feedback.rascunho.trim()
        ) {
          return feedback;
        }

        return {
          ...feedback,
          resposta: feedback.rascunho.trim(),
          rascunho: "",
        };
      })
    );
  }


  /* SUPORTE*/

  function salvarDados() {
    alert("Dados salvos com sucesso!");
  }


  /*PÁGINA*/

  return (
    <main className="admin-content painel-gestao">

      {/*CABEÇALHO*/}

      <header>
        <h1 className="admin-page-title">
          Painel de Gestão
        </h1>

        <p className="admin-page-subtitle">
          Gerencie seu perfil, solicitações administrativas,
          suporte, perguntas frequentes e feedbacks.
        </p>
      </header>

      {/* MEU PERFIL*/}

      <section className="perfil-card">

        <div className="perfil-card-header">

          <div>
            <h3>Meu perfil</h3>

            <p>
              Edite seu nome e foto
            </p>
          </div>

          <button
            type="button"
            className="perfil-edit-btn"
            aria-label="Editar perfil"
          >
            <Pencil size={16} />
          </button>

        </div>


        <div className="perfil-card-content">

          <div className="perfil-avatar">

            <UserRound size={28} />

            <button
              type="button"
              className="perfil-camera-btn"
              aria-label="Alterar foto"
            >
              <Camera size={13} />
            </button>

          </div>


          <div className="perfil-info">

            <strong>
              Administrador
            </strong>

            <span>
              Editar nome e foto
            </span>

          </div>

        </div>

      </section>


      {/*SOLICITAÇÕES DE ADM*/}

      <section className="admin-request-box">

        <div className="admin-request-info">

          <h3>
            Solicitações de administradores
          </h3>

          <p>
            <strong>Nome:</strong> João Silva
          </p>

          <p>
            <strong>E-mail:</strong> joao@email.com
          </p>

          <span className="admin-request-status">
            Pendente
          </span>

        </div>


        <div className="admin-request-actions">

          <button
            type="button"
            className="admin-request-deny"
          >
            Negar
          </button>

          <button
            type="button"
            className="admin-request-approve"
          >
            Aceitar
          </button>

        </div>

      </section>


      {/*SUPORTE E TERMOS*/}

      <section className="admin-card painel-secao">

        <div className="painel-secao-titulo">

          <HelpCircle size={20} />

          <h2 className="admin-card-title">
            Suporte e Termos
          </h2>

        </div>


        {/* CONTATOS */}

        <div className="dicas-field">

          <label className="bolso-label">
            Canais de contato
          </label>


          <div className="auth-input-wrap">

            <Mail size={16} />

            <input
              className="auth-input"
              value={emailSuporte}
              onChange={(event) =>
                setEmailSuporte(event.target.value)
              }
            />

          </div>


          <div className="auth-input-wrap">

            <Phone size={16} />

            <input
              className="auth-input"
              value={whatsappSuporte}
              onChange={(event) =>
                setWhatsappSuporte(
                  event.target.value
                )
              }
            />

          </div>

        </div>


        {/* TERMOS */}

        <div className="dicas-field">

          <label className="bolso-label">
            Termos de uso
          </label>

          <textarea
            className="dicas-textarea"
            value={termosUso}
            onChange={(event) =>
              setTermosUso(event.target.value)
            }
          />

        </div>


        <button
          type="button"
          className="dicas-btn-primary painel-botao-salvar"
          onClick={salvarDados}
        >
          <Save size={16} />
          Salvar suporte
        </button>

      </section>


      {/*PERGUNTAS FREQUENTES*/}

      <section className="admin-card painel-secao">

        <div className="painel-secao-titulo painel-titulo-dividido">

          <div className="painel-secao-titulo">

            <HelpCircle size={20} />

            <h2 className="admin-card-title">
              Perguntas frequentes
            </h2>

          </div>


          <button
            type="button"
            className="dica-action-btn"
            onClick={adicionarFaq}
            aria-label="Adicionar pergunta"
          >
            <Plus size={16} />
          </button>

        </div>


        <div className="painel-lista">

          {faqs.map((faq) => (

            <div
              className="painel-item"
              key={faq.id}
            >

              <input
                className="dicas-input"
                value={faq.pergunta}
                placeholder="Pergunta"
                onChange={(event) =>
                  atualizarFaq(
                    faq.id,
                    "pergunta",
                    event.target.value
                  )
                }
              />


              <textarea
                className="dicas-textarea"
                value={faq.resposta}
                placeholder="Resposta"
                onChange={(event) =>
                  atualizarFaq(
                    faq.id,
                    "resposta",
                    event.target.value
                  )
                }
              />


              <button
                type="button"
                className="painel-botao-excluir"
                onClick={() =>
                  removerFaq(faq.id)
                }
              >
                <Trash2 size={14} />
                Excluir
              </button>

            </div>

          ))}

        </div>

      </section>


      {/* FEEDBACKS*/}

      <section className="admin-card painel-secao">

        <div className="painel-secao-titulo">

          <MessageSquare size={20} />

          <h2 className="admin-card-title">
            Comentários e feedbacks
          </h2>

        </div>


        <div className="painel-lista">

          {feedbacks.map((feedback) => (

            <article
              className="painel-feedback"
              key={feedback.id}
            >

              <strong>
                {feedback.usuario}
              </strong>

              <p>
                {feedback.mensagem}
              </p>


              {feedback.resposta ? (

                <p className="painel-resposta">

                  <strong>
                    Resposta enviada:
                  </strong>{" "}

                  {feedback.resposta}

                </p>

              ) : (

                <div className="painel-responder">

                  <input
                    className="dicas-input"
                    placeholder="Escreva uma resposta..."
                    value={feedback.rascunho}
                    onChange={(event) =>
                      atualizarRascunho(
                        feedback.id,
                        event.target.value
                      )
                    }
                  />


                  <button
                    type="button"
                    className="dicas-btn-primary"
                    onClick={() =>
                      responderFeedback(
                        feedback.id
                      )
                    }
                    aria-label="Enviar resposta"
                  >
                    <Send size={14} />
                  </button>

                </div>

              )}

            </article>

          ))}

        </div>

      </section>

    </main>
  );
}