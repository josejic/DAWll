"use client";

import { useEffect, useState } from "react";
import {
  MessageSquare,
  Save,
  Send,
  UserRound,
  Camera,
  Pencil,
} from "lucide-react";
import { supabase } from "../lib/supabase";

export default function PainelGestao() {

  const [solicitacoes, setSolicitacoes] = useState([]);
  const [nomePerfil, setNomePerfil] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState("");
  const [enviandoFoto, setEnviandoFoto] = useState(false);
  const [editandoPerfil, setEditandoPerfil] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);

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



  function salvarDados() {
    alert("Dados salvos com sucesso!");
  }

  useEffect(() => {
    buscarSolicitacoes();
    buscarPerfil();
    buscarFeedbacks();
  }, []);


  async function buscarFeedbacks() {
   const { data, error } = await supabase
    .from("feedback")
    .select("id, usuario_id, mensagem, categoria, criada_em")
    .order("criada_em", { ascending: false });

  if (error) {
    console.error("Erro ao buscar feedbacks:", error);
    return;
  }

  setFeedbacks(
    (data ?? []).map((feedback) => ({
      ...feedback,
      rascunho: "",
    }))
  );
  }


  async function buscarPerfil() {
    const { data: usuario, error: erroUsuario } =
      await supabase.auth.getUser();

    if (erroUsuario || !usuario.user) {
      console.error("Erro ao identificar usuário:", erroUsuario);
      return;
    }

    const userId = usuario.user.id;

    const { data, error } = await supabase.from("administradores").select("nome, foto_url").eq("id", userId).single();

    if (error) {
      console.error("Erro ao buscar perfil:", error);
      return;
    }

    setNomePerfil(data.nome ?? "");
    setFotoPerfil(data.foto_url ?? "");
  }


  async function salvarPerfil() {
    if (!nomePerfil.trim()) {
      return;
    }

    const { data: usuario, error: erroUsuario } =
      await supabase.auth.getUser();

    if (erroUsuario || !usuario.user) {
      console.error("Erro ao identificar usuário:", erroUsuario);
      return;
    }

    const userId = usuario.user.id;

    const { error } = await supabase.from("administradores").update({
        nome: nomePerfil.trim(),
      }).eq("id", userId);

    if (error) {
      console.error("Erro ao salvar perfil:", error);
      return;
    }

    setEditandoPerfil(false);
  }

  async function alterarFoto(event) {
    const input = event.currentTarget;//um gatilho depois de marcar arquivo
    const arquivo = input.files?.[0];

    if (!arquivo || enviandoFoto) return;

    const extensoes = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
    };
    const extensao = extensoes[arquivo.type];

    if (!extensao || arquivo.size > 5 * 1024 * 1024) {
      alert("Selecione uma imagem JPG, PNG ou WebP de até 5 MB.");
      input.value = "";
      return;
    }

    setEnviandoFoto(true);
    let etapa = "verificar sua sessão";

    try {
      const { data: usuario, error: erroUsuario } =
        await supabase.auth.getUser();

      if (erroUsuario) throw erroUsuario;
      if (!usuario.user) throw new Error("Faça login novamente para alterar a foto.");

      const caminho = `${usuario.user.id}/${crypto.randomUUID()}.${extensao}`;//geração de um identificador aleatório unico
      etapa = "enviar a imagem para o bucket avatars";
      const { error: erroUpload } = await supabase.storage.from("avatars").upload(caminho, arquivo, { contentType: arquivo.type });

      if (erroUpload) throw erroUpload;

      const { data: foto } = supabase.storage.from("avatars").getPublicUrl(caminho);

      etapa = "salvar a URL da foto no perfil";
      const { data: perfil, error: erroPerfil } = await supabase.from("administradores").update({ foto_url: foto.publicUrl }).eq("id", usuario.user.id).select("foto_url").single();

      if (erroPerfil) {
        try {
          const { error: erroLimpeza } = await supabase.storage.from("avatars").remove([caminho]);

          if (erroLimpeza) console.error("Erro ao remover foto não salva:", erroLimpeza);
        } catch (erroLimpeza) {
          console.error("Erro ao remover foto não salva:", erroLimpeza);
        }
        throw erroPerfil;
      }

      setFotoPerfil(perfil.foto_url);
    } catch (error) {
      console.error(`Erro ao ${etapa}:`, error);
      const mensagem = error?.message || "Erro inesperado. Tente novamente.";
      alert(`Não foi possível ${etapa}.\n\n${mensagem}`);
    } finally {
      setEnviandoFoto(false);
      input.value = "";
    }
  }

  async function buscarSolicitacoes() {
    const { data, error } = await supabase.from("administradores").select("*").eq("status", "pendente");

    if (error) {
      console.error("Erro ao buscar solicitações:", error);
      return;
    }

    setSolicitacoes(data);
  }

  async function alterarStatus(id, status) {
    try {
      const { data, error } = await supabase.from("administradores").update({ status }).eq("id", id).eq("status", "pendente").select("id").single();

      if (error) throw error;

      setSolicitacoes((listaAtual) =>
        listaAtual.filter((solicitacao) => solicitacao.id !== data.id)
      );
    } catch (error) {
      console.error("Erro ao alterar solicitação:", error);
      alert("Não foi possível atualizar a solicitação. Tente novamente.");
    }
  }


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

      {/* MEU PERFIL */}

      <section className="perfil-card">

        <div className="perfil-card-header">

          <div>
            <h3>Meu perfil</h3>
            <p>Edite seu nome e foto</p>
          </div>

          <button
            type="button"
            className="perfil-edit-btn"
            aria-label="Editar perfil"
            onClick={() => setEditandoPerfil(true)}
          >
            <Pencil size={16} />
          </button>

        </div>


        <div className="perfil-card-content">

          <div className="perfil-avatar">
            {fotoPerfil ? (
              <img
                src={fotoPerfil}
                alt="Foto de perfil"
                className="perfil-avatar-img"
              />
            ) : (
              <UserRound size={28} />
            )}

            <label
              className="perfil-camera-btn"
              aria-label={enviandoFoto ? "Enviando foto" : "Alterar foto"}
              aria-busy={enviandoFoto}
            >
              <Camera size={13} />

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={alterarFoto}
                disabled={enviandoFoto}
                hidden
              />
            </label>
          </div>

          {enviandoFoto && <span role="status">Enviando foto...</span>}

          <div className="perfil-info">

            {editandoPerfil ? (
              <>
                <input
                  className="dicas-input"
                  type="text"
                  value={nomePerfil}
                  onChange={(event) =>
                    setNomePerfil(event.target.value)
                  }
                />

                <button
                  type="button"
                  className="dicas-btn-primary"
                  onClick={salvarPerfil}
                >
                  <Save size={14} />
                  Salvar
                </button>
              </>
            ) : (
              <>
                <strong>{nomePerfil}</strong>
                <span>Administrador</span>
              </>
            )}

          </div>

        </div>

      </section>


      {/* SOLICITAÇÕES DE ADM */}

      {solicitacoes.length === 0 ? (
        <section className="admin-request-box">
          <p>Nenhuma solicitação pendente.</p>
        </section>
      ) : (
        solicitacoes.map((solicitacao) => (
          <section
            className="admin-request-box"
            key={solicitacao.id}
          >
            <div className="admin-request-info">
              <h3>Solicitação de administrador</h3>

              <p>
                <strong>Nome:</strong> {solicitacao.nome}
              </p>

              <span className="admin-request-status">
                Pendente
              </span>
            </div>

            <div className="admin-request-actions">
              <button
                type="button"
                className="admin-request-deny"
                onClick={() =>
                  alterarStatus(solicitacao.id, "negado")
                }
              >
                Negar
              </button>

              <button
                type="button"
                className="admin-request-approve"
                onClick={() =>
                  alterarStatus(solicitacao.id, "aprovado")
                }
              >
                Aceitar
              </button>
            </div>
          </section>
        ))
      )}


      {/* FEEDBACKS*/}

      <section className="admin-card painel-secao">

        <div className="painel-secao-titulo">

          <MessageSquare size={20} />

          <h2 className="admin-card-title">
            Comentários e feedbacks
          </h2>

        </div>


        <div className="painel-lista">

          {feedbacks.map((feedback, index) => (

            <article
              className="painel-feedback"
              key={index}
            >

              <strong>
                {feedback.categoria}
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