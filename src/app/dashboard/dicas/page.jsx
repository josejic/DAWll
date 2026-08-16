"use client";

import { useState } from "react";
import clsx from "clsx";
import { FileText, Play, HelpCircle, BookOpen, Plus, Pencil, Trash2, X } from "lucide-react";

const tiposInfo = {
  artigo: { label: "Artigo", icon: FileText, cor: "var(--ballpoint)", bg: "admin-tips-stat-icon--blue" },
  video: { label: "Vídeo", icon: Play, cor: "#C24469", bg: "admin-tips-stat-icon--pink" },
  quiz: { label: "Quiz", icon: HelpCircle, cor: "#7A4EC2", bg: "admin-tips-stat-icon--purple" },
  licao: { label: "Lição", icon: BookOpen, cor: "#B8862E", bg: "admin-tips-stat-icon--yellow" },
};

// Modelo de uma dica "vazia", usado quando o usuário clica em "Nova Dica"
const dicaVazia = {
  id: null,
  tipo: "artigo",
  titulo: "",
  desc: "",
  categoria: "",
  dificuldade: "baixa",
  ativa: true,
};

const dicasIniciais = [
  {
    id: 1,
    tipo: "artigo",
    titulo: "Controle seus gastos",
    desc: "Anote todas as suas despesas por pelo menos 30 dias. Você vai se surpreender com para onde seu dinheiro vai.",
    categoria: "Ed. Financeira",
    dificuldade: "baixa",
    ativa: true,
  },
  {
    id: 2,
    tipo: "video",
    titulo: "Evite dívidas no cartão",
    desc: "O cartão de crédito pode ter juros acima de 300% ao ano. Pague sempre o valor total da fatura.",
    categoria: "Dívidas",
    dificuldade: "media",
    ativa: true,
  },
];

const abas = ["Todos", "Artigos", "Vídeos", "Quizzes", "Lições"];

export default function DicasPage() {
  // A lista de dicas agora é ESTADO — pode ser alterada em tempo de execução
  const [dicas, setDicas] = useState(dicasIniciais);

  // Controla o modal: null = fechado. Um objeto = aberto (novo ou edição)
  const [dicaEmEdicao, setDicaEmEdicao] = useState(null);

  const [abaAtiva, setAbaAtiva] = useState("Todos");

  function abrirNovaDica() {
    setDicaEmEdicao(dicaVazia);
  }

  function abrirEdicao(dica) {
    setDicaEmEdicao(dica); // já vem preenchido com os dados atuais
  }

  function fecharModal() {
    setDicaEmEdicao(null);
  }

  function excluirDica(id) {
    setDicas((atual) => atual.filter((d) => d.id !== id));
  }

  function salvarDica(dadosDoForm) {
    const jaExiste = dicaEmEdicao.id !== null;

    if (jaExiste) {
      // Edição: troca só o item que tem esse id, mantém o resto igual
      setDicas((atual) =>
        atual.map((d) => (d.id === dicaEmEdicao.id ? { ...dadosDoForm, id: d.id } : d))
      );
    } else {
      // Criação: gera um id novo e adiciona no fim da lista
      const novoId = Math.max(0, ...dicas.map((d) => d.id)) + 1;
      setDicas((atual) => [...atual, { ...dadosDoForm, id: novoId }]);
    }

    fecharModal();
  }

  const ativas = dicas.filter((d) => d.ativa).length;
  const contagemPorTipo = (tipo) => dicas.filter((d) => d.tipo === tipo).length;

  return (
    <>
      <div className="admin-page-header-row">
        <div>
          <h1 className="admin-page-title">Dicas Financeiras</h1>
          <p className="admin-page-subtitle">Gerencie as dicas exibidas no app</p>
        </div>
        <button className="admin-btn-primary" type="button" onClick={abrirNovaDica}>
          <Plus size={16} />
          Nova Dica
        </button>
      </div>

      <div className="admin-tips-stats">
        {Object.entries(tiposInfo).map(([key, info]) => {
          const Icon = info.icon;
          return (
            <div className="admin-tips-stat-card" key={key}>
              <div className={clsx("admin-tips-stat-icon", info.bg)}>
                <Icon size={16} />
              </div>
              <div className="admin-tips-stat-label">{info.label}</div>
              <div className="admin-tips-stat-value">{contagemPorTipo(key)}</div>
            </div>
          );
        })}
      </div>

      <div className="admin-tabs-row">
        <div className="admin-tabs">
          {abas.map((aba) => (
            <button
              key={aba}
              type="button"
              className={clsx("admin-tab", abaAtiva === aba && "admin-tab--active")}
              onClick={() => setAbaAtiva(aba)}
            >
              {aba === "Todos" ? `Todos (${dicas.length})` : aba}
            </button>
          ))}
        </div>
        <span className="admin-tabs-meta">
          {ativas} ativas · {dicas.length - ativas} inativas
        </span>
      </div>

      <div className="admin-tips-grid">
        {dicas.map((d) => {
          const info = tiposInfo[d.tipo];
          const Icon = info.icon;
          return (
            <div className="admin-tip-card" key={d.id} style={{ "--tip-accent": info.cor }}>
              <div className="admin-tip-top">
                <div className="admin-tip-icon-badges">
                  <div className={clsx("admin-tip-icon", info.bg)}>
                    <Icon size={15} />
                  </div>
                  <span className="admin-tip-type-badge" style={{ color: info.cor }}>
                    {info.label}
                  </span>
                  <span className="admin-tip-tag">{d.categoria}</span>
                  <span className={clsx("admin-tip-tag", `admin-tip-tag--${d.dificuldade}`)}>
                    {d.dificuldade === "baixa" && "Baixa"}
                    {d.dificuldade === "media" && "Média"}
                    {d.dificuldade === "alta" && "Alta"}
                  </span>
                </div>
                <div className="admin-tip-actions">
                  <button
                    className={clsx("admin-toggle", !d.ativa && "admin-toggle--off")}
                    type="button"
                    aria-label="Ativar/desativar"
                    onClick={() =>
                      setDicas((atual) =>
                        atual.map((x) => (x.id === d.id ? { ...x, ativa: !x.ativa } : x))
                      )
                    }
                  />
                  <button className="admin-table-action-btn" type="button" aria-label="Editar" onClick={() => abrirEdicao(d)}>
                    <Pencil size={14} />
                  </button>
                  <button
                    className="admin-table-action-btn admin-table-action-btn--danger"
                    type="button"
                    aria-label="Excluir"
                    onClick={() => excluirDica(d.id)}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <h3 className="admin-tip-title">{d.titulo}</h3>
              <p className="admin-tip-desc">{d.desc}</p>
            </div>
          );
        })}
      </div>

      {dicaEmEdicao && (
        <ModalDica
          dica={dicaEmEdicao}
          onCancelar={fecharModal}
          onSalvar={salvarDica}
        />
      )}
    </>
  );
}

function ModalDica({ dica, onCancelar, onSalvar }) {
  // Estado LOCAL do formulário — só existe enquanto o modal está aberto
  const [form, setForm] = useState(dica);

  function handleChange(campo, valor) {
    setForm((atual) => ({ ...atual, [campo]: valor }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSalvar(form);
  }

  return (
    <div className="admin-modal-overlay" onClick={onCancelar}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <span className="admin-modal-title">
            {dica.id ? "Editar dica" : "Nova dica"}
          </span>
          <button className="admin-modal-close" type="button" onClick={onCancelar}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bolso-field">
            <label className="bolso-label">Título</label>
            <input
              className="bolso-input"
              value={form.titulo}
              onChange={(e) => handleChange("titulo", e.target.value)}
              required
            />
          </div>

          <div className="bolso-field">
            <label className="bolso-label">Descrição</label>
            <input
              className="bolso-input"
              value={form.desc}
              onChange={(e) => handleChange("desc", e.target.value)}
              required
            />
          </div>

          <div className="admin-modal-row">
            <div className="bolso-field">
              <label className="bolso-label">Tipo</label>
              <select
                className="bolso-select"
                value={form.tipo}
                onChange={(e) => handleChange("tipo", e.target.value)}
              >
                <option value="artigo">Artigo</option>
                <option value="video">Vídeo</option>
                <option value="quiz">Quiz</option>
                <option value="licao">Lição</option>
              </select>
            </div>

            <div className="bolso-field">
              <label className="bolso-label">Dificuldade</label>
              <select
                className="bolso-select"
                value={form.dificuldade}
                onChange={(e) => handleChange("dificuldade", e.target.value)}
              >
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
              </select>
            </div>
          </div>

          <div className="bolso-field">
            <label className="bolso-label">Categoria</label>
            <input
              className="bolso-input"
              value={form.categoria}
              onChange={(e) => handleChange("categoria", e.target.value)}
              required
            />
          </div>

          <div className="admin-modal-actions">
            <button type="button" className="admin-modal-btn-cancel" onClick={onCancelar}>
              Cancelar
            </button>
            <button type="submit" className="admin-btn-primary">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}