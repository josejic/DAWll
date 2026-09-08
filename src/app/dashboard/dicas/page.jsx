"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import {
  FileText,
  Plus,
  Pencil,
  Trash2,
  X,
  AlertTriangle,
  Tag,
} from "lucide-react";


const TOTAL_CORES = 8;

const DICA_VAZIA = {
  titulo: "",
  categoria: "",
  descricao: "",
  conteudo: "",
};

const CAMPOS_DICA =
  "id, titulo, categoria, descricao, conteudo, created_at";


// Gera sempre a mesma cor para a mesma categoria
function getCorCategoria(categoria = "") {
  let valor = 0;

  for (const letra of categoria) {
    valor += letra.charCodeAt(0);
  }

  return (valor % TOTAL_CORES) + 1;
}


function DicaCard({ dica, onEdit, onDelete }) {
  const cor = getCorCategoria(dica.categoria);

  return (
    <div className={`dica-card dica-card--cor-${cor}`}>
      <div className="dica-card-top">

        <div className="dica-card-meta">
          <div className="dica-icon">
            <FileText size={18} />
          </div>

          <span className="dica-tag dica-tag--categoria">
            {dica.categoria}
          </span>
        </div>

        <div className="dica-card-actions">
          <button
            className="dica-action-btn"
            onClick={() => onEdit(dica)}
            aria-label={`Editar "${dica.titulo}"`}
          >
            <Pencil size={15} />
          </button>

          <button
            className="dica-action-btn dica-action-btn--delete"
            onClick={() => onDelete(dica.id)}
            aria-label={`Excluir "${dica.titulo}"`}
          >
            <Trash2 size={15} />
          </button>
        </div>

      </div>

      <div className="dica-title">
        {dica.titulo}
      </div>

      <div className="dica-desc">
        {dica.descricao}
      </div>

      {dica.conteudo && (
        <details className="dica-conteudo">
          <summary>Ver conteúdo completo</summary>
          <p>{dica.conteudo}</p>
        </details>
      )}
    </div>
  );
}



function DicaModal({ modal, onClose, onSave }) {
  const [form, setForm] = useState({
    ...DICA_VAZIA,
    ...modal.dica,
  });

  const [salvando, setSalvando] = useState(false);


  function handleChange(event) {
    const { name, value } = event.target;

    setForm((formAnterior) => ({
      ...formAnterior,
      [name]: value,
    }));
  }


  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.titulo.trim()) {
      return;
    }

    setSalvando(true);

    try {
      await onSave(
        form,
        modal.mode,
        modal.id
      );
    } finally {
      setSalvando(false);
    }
  }


  return (
    <div
      className="dicas-modal-overlay"
      onClick={onClose}
    >
      <form
        className="dicas-modal"
        onClick={(event) => event.stopPropagation()}
        onSubmit={handleSubmit}
      >

        <div className="dicas-modal-head">
          <h2 className="dicas-modal-title">
            {modal.mode === "novo"
              ? "Nova Dica"
              : "Editar Dica"}
          </h2>

          <button
            type="button"
            className="dicas-modal-close"
            onClick={onClose}
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>


        <div className="dicas-field">
          <label htmlFor="categoria">
            Categoria
          </label>

          <input
            id="categoria"
            name="categoria"
            className="dicas-input"
            placeholder="Ex.: Investimento..."
            value={form.categoria}
            onChange={handleChange}
          />
        </div>


        <div className="dicas-field">
          <label htmlFor="titulo">
            Título
          </label>

          <input
            id="titulo"
            name="titulo"
            className="dicas-input"
            placeholder="Título da dica"
            value={form.titulo}
            onChange={handleChange}
            required
          />
        </div>


        <div className="dicas-field">
          <label htmlFor="descricao">
            Descrição curta
          </label>

          <textarea
            id="descricao"
            name="descricao"
            className="dicas-textarea"
            placeholder="Texto curto..."
            value={form.descricao}
            onChange={handleChange}
          />
        </div>


        <div className="dicas-field">
          <label htmlFor="conteudo">
            Conteúdo completo
          </label>

          <textarea
            id="conteudo"
            name="conteudo"
            className="dicas-textarea"
            placeholder="Conteúdo completo..."
            value={form.conteudo}
            onChange={handleChange}
          />
        </div>


        <div className="dicas-modal-actions">

          <button
            type="button"
            className="dicas-btn-secondary"
            onClick={onClose}
            disabled={salvando}
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="dicas-btn-primary"
            disabled={salvando}
          >
            {salvando
              ? "Salvando..."
              : modal.mode === "novo"
                ? "Criar dica"
                : "Salvar alterações"}
          </button>

        </div>
      </form>
    </div>
  );
}


export default function DicasPage() {
  const [dicas, setDicas] = useState([]);

  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const [filtro, setFiltro] = useState("todos");

  const [modal, setModal] = useState(null);
  const [excluirId, setExcluirId] = useState(null);

  useEffect(() => {
    let ativo = true;

    async function buscarDicas() {
      const { data, error } = await supabase
        .from("dicas")
        .select(CAMPOS_DICA)
        .order("created_at", {
          ascending: false,
        });

      if (!ativo) return;

      if (error) {
        setErro(error.message);
      } else {
        setDicas(data ?? []);
      }

      setCarregando(false);
    }

    buscarDicas();

    return () => {
      ativo = false;
    };
  }, []);



  const categorias = [
    ...new Set(
      dicas
        .map((dica) => dica.categoria)
        .filter(Boolean)
    ),
  ];


  const dicasFiltradas =
    filtro === "todos"
      ? dicas
      : dicas.filter(
          (dica) => dica.categoria === filtro
        );



  async function salvarDica(form, mode, id) {
    setErro("");

    const dadosDica = {
      titulo: form.titulo.trim(),
      categoria: form.categoria.trim(),
      descricao: form.descricao.trim(),
      conteudo: form.conteudo.trim(),
    };


    if (mode === "novo") {

      const { data, error } = await supabase
        .from("dicas")
        .insert(dadosDica)
        .select(CAMPOS_DICA)
        .single();


      if (error) {
        setErro(
          `Não foi possível criar a dica: ${error.message}`
        );
        return;
      }


      setDicas((dicasAnteriores) => [
        data,
        ...dicasAnteriores,
      ]);

    } else {

      const { data, error } = await supabase
        .from("dicas")
        .update(dadosDica)
        .eq("id", id)
        .select(CAMPOS_DICA)
        .single();


      if (error) {
        setErro(
          `Não foi possível editar a dica: ${error.message}`
        );
        return;
      }


      setDicas((dicasAnteriores) =>
        dicasAnteriores.map((dica) =>
          dica.id === id
            ? data
            : dica
        )
      );
    }


    setModal(null);
  }



  async function excluirDica(id) {
    setErro("");


    const { data, error } = await supabase
      .from("dicas")
      .delete()
      .eq("id", id)
      .select("id")
      .single();


    if (error) {
      setErro(
        `Não foi possível excluir a dica: ${error.message}`
      );
      return;
    }


    setDicas((dicasAnteriores) =>
      dicasAnteriores.filter(
        (dica) => dica.id !== data.id
      )
    );


    setExcluirId(null);
  }

  if (carregando) {
    return (
      <div>
        <h1 className="admin-page-title">
          Dicas Financeiras
        </h1>

        <p className="admin-page-subtitle">
          Carregando...
        </p>
      </div>
    );
  }


  const dicaParaExcluir = dicas.find(
    (dica) => dica.id === excluirId
  );


  return (
    <div>

      {/* CABEÇALHO */}

      <div className="dicas-page-head">

        <div>
          <h1 className="admin-page-title">
            Dicas Financeiras
          </h1>

          <p
            className="admin-page-subtitle admin-page-subtitle--compact"
          >
            Gerencie as dicas exibidas no app
          </p>

          {erro && (
            <p className="admin-page-subtitle">
              {erro}
            </p>
          )}
        </div>


        <button
          className="dicas-add-btn"
          onClick={() =>
            setModal({
              mode: "novo",
            })
          }
        >
          <Plus size={17} />
          Nova Dica
        </button>

      </div>


      {/* ESTATÍSTICAS */}

      <div className="admin-stats-grid">

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <FileText size={17} />
          </div>

          <div className="admin-stat-value">
            {dicas.length}
          </div>

          <div className="admin-stat-label">
            Total de dicas
          </div>
        </div>


        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <Tag size={17} />
          </div>

          <div className="admin-stat-value">
            {categorias.length}
          </div>

          <div className="admin-stat-label">
            Categorias
          </div>
        </div>

      </div>


      {/* FILTROS */}

      <div className="dicas-tabs">

        <button
          className={`dicas-tab ${
            filtro === "todos"
              ? "dicas-tab--active"
              : ""
          }`}
          onClick={() => setFiltro("todos")}
        >
          Todos ({dicas.length})
        </button>


        {categorias.map((categoria) => {

          const cor =
            getCorCategoria(categoria);

          return (
            <button
              key={categoria}
              className={`dicas-tab ${
                filtro === categoria
                  ? "dicas-tab--active"
                  : ""
              }`}
              onClick={() =>
                setFiltro(categoria)
              }
            >

              <span
                className={`dicas-tab-dot dicas-tab-dot--cor-${cor}`}
                aria-hidden="true"
              />

              {categoria}

            </button>
          );
        })}

      </div>


      {/* LISTA */}

      <div className="dicas-grid">

        {dicasFiltradas.length === 0 ? (

          <div className="dicas-empty">
            Nenhuma dica encontrada.
          </div>

        ) : (

          dicasFiltradas.map((dica) => (

            <DicaCard
              key={dica.id}
              dica={dica}
              onEdit={(dica) =>
                setModal({
                  mode: "editar",
                  id: dica.id,
                  dica,
                })
              }
              onDelete={setExcluirId}
            />

          ))

        )}

      </div>


      {/* MODAL DE CRIAÇÃO / EDIÇÃO */}

      {modal && (
        <DicaModal
          modal={modal}
          onClose={() => setModal(null)}
          onSave={salvarDica}
        />
      )}


      {/* MODAL DE EXCLUSÃO */}

      {excluirId && (

        <div
          className="dicas-modal-overlay"
          onClick={() =>
            setExcluirId(null)
          }
        >

          <div
            className="dicas-modal dicas-confirm"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="dicas-confirm-icon">
              <AlertTriangle size={20} />
            </div>


            <h2 className="dicas-modal-title">
              Excluir dica?
            </h2>


            <p className="dicas-confirm-text">
              Tem certeza que deseja excluir{" "}
              &quot;{dicaParaExcluir?.titulo}&quot;?
            </p>


            <div className="dicas-modal-actions">

              <button
                className="dicas-btn-secondary"
                onClick={() =>
                  setExcluirId(null)
                }
              >
                Cancelar
              </button>


              <button
                className="dicas-btn-danger"
                onClick={() =>
                  excluirDica(excluirId)
                }
              >
                Excluir
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
