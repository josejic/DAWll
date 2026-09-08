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
  },
  {
    id: 2,
    usuario: "Maria S.",
    mensagem: "O aplicativo é ótimo!",
    resposta: "",
  },
];


export default function AdminPainelPage() {

  const [emailSuporte, setEmailSuporte] =
    useState("suporte@edufinance.com");

  const [whatsappSuporte, setWhatsappSuporte] =
    useState("(83) 90000-0000");

  const [termosUso, setTermosUso] =
    useState("Bem-vindo ao EduFinance...");


  const [faqs, setFaqs] =
    useState(FAQS_INICIAIS);


  const [feedbacks, setFeedbacks] =
    useState(FEEDBACKS_INICIAIS);

  const [respostasDigitadas, setRespostasDigitadas] =
    useState({});

  function adicionarFaq() {
    const novoFaq = {
      id: Date.now(),
      pergunta: "Nova Pergunta",
      resposta: "",
    };

    setFaqs((faqsAnteriores) => [
      ...faqsAnteriores,
      novoFaq,
    ]);
  }


  function removerFaq(id) {
    setFaqs((faqsAnteriores) =>
      faqsAnteriores.filter(
        (faq) => faq.id !== id
      )
    );
  }


  function atualizarFaq(id, campo, valor) {
    setFaqs((faqsAnteriores) =>
      faqsAnteriores.map((faq) => {

        if (faq.id !== id) {
          return faq;
        }

        return {
          ...faq,
          [campo]: valor,
        };
      })
    );
  }



  function atualizarResposta(id, texto) {
    setRespostasDigitadas((respostasAnteriores) => ({
      ...respostasAnteriores,
      [id]: texto,
    }));
  }


  function responderFeedback(id) {
    const resposta =
      respostasDigitadas[id]?.trim();

    if (!resposta) {
      return;
    }

    setFeedbacks((feedbacksAnteriores) =>
      feedbacksAnteriores.map((feedback) => {

        if (feedback.id !== id) {
          return feedback;
        }

        return {
          ...feedback,
          resposta: resposta,
        };
      })
    );

    // Limpa o campo depois de responder
    atualizarResposta(id, "");
  }


  function salvarDados() {
    alert("Dados salvos com sucesso!");
  }

  return (
    <div
      className="admin-content"
      style={{
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >

      <h1 className="admin-page-title">
        Painel de Gestão
      </h1>

      <p className="admin-page-subtitle">
        Gerencie suporte, FAQ e respostas de feedbacks.
      </p>


      {/* SUPORTE E FAQ*/}

      <div
        className="admin-card"
        style={{ marginBottom: "1.5rem" }}
      >

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "0.5rem",
          }}
        >
          <HelpCircle
            size={20}
            color="var(--primary)"
          />

          <h2 className="admin-card-title">
            Suporte e Termos
          </h2>
        </div>


        {/* CONTATOS */}

        <div className="dicas-field">

          <label className="bolso-label">
            Canais de Contato
          </label>

          <div
            className="auth-input-wrap"
            style={{ marginBottom: "0.5rem" }}
          >
            <Mail size={16} />

            <input
              className="auth-input"
              value={emailSuporte}
              onChange={(event) =>
                setEmailSuporte(
                  event.target.value
                )
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
            Termos de Uso
          </label>

          <textarea
            className="dicas-textarea"
            value={termosUso}
            onChange={(event) =>
              setTermosUso(
                event.target.value
              )
            }
          />

        </div>


        {/* FAQ */}

        <div className="dicas-field">

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.5rem",
            }}
          >

            <label className="bolso-label">
              Perguntas Frequentes (FAQ)
            </label>

            <button
              type="button"
              className="dica-action-btn"
              onClick={adicionarFaq}
            >
              <Plus
                size={16}
                color="var(--primary)"
              />
            </button>

          </div>


          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >

            {faqs.map((faq) => (

              <div
                key={faq.id}
                style={{
                  border:
                    "1px solid var(--border-color)",
                  padding: "0.75rem",
                  borderRadius:
                    "var(--radius-lg)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
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
                  onClick={() =>
                    removerFaq(faq.id)
                  }
                  style={{
                    color:
                      "var(--color-danger)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    alignSelf: "flex-end",
                  }}
                >
                  <Trash2 size={14} />
                  Excluir
                </button>

              </div>

            ))}

          </div>
        </div>


        <button
          type="button"
          className="dicas-btn-primary"
          onClick={salvarDados}
          style={{
            width: "100%",
            marginTop: "1rem",
          }}
        >
          <Save size={16} />
          Salvar Suporte
        </button>

      </div>


      {/* FEEDBACKS*/}

      <div className="admin-card">

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <MessageSquare
            size={20}
            color="var(--primary)"
          />

          <h2 className="admin-card-title">
            Comentários e Feedbacks
          </h2>
        </div>


        {feedbacks.map((feedback) => (

          <div key={feedback.id}>

            <p>
              <strong>
                {feedback.usuario}
              </strong>
            </p>

            <p>
              {feedback.mensagem}
            </p>


            {feedback.resposta ? (

              <div>
                <strong>
                  Resposta Enviada:
                </strong>

                {" "}
                {feedback.resposta}
              </div>

            ) : (

              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                }}
              >

                <input
                  className="dicas-input"
                  placeholder="Escreva uma resposta..."
                  value={
                    respostasDigitadas[
                      feedback.id
                    ] ?? ""
                  }
                  onChange={(event) =>
                    atualizarResposta(
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
                >
                  <Send size={14} />
                </button>

              </div>

            )}

          </div>

        ))}

      </div>

    </div>
  );
}