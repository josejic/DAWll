"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Settings,
  Mail,
  MessageCircle,
  FileText,
  HelpCircle,
  MessageSquare,
  ChevronDown,
  Plus,
  Trash2,
  Save,
  Send,
  Moon,
  Sun,
  User,
  Lock,
  Camera,
} from "lucide-react";
import { usePerfil } from "../perfil-context";

// Paleta alinhada com a identidade EduFinance
const COLORS = {
  navy: "#0f1f2e",
  green: "#1f8a52",
  greenLight: "#e6f4ec",
  border: "#e5e7eb",
  muted: "#6b7280",
};

function SectionCard({ children }) {
  return (
    <div
      className="bg-white rounded-2xl border shadow-sm p-5 mb-4"
      style={{ borderColor: COLORS.border }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <p
      className="text-xs font-semibold tracking-widest uppercase mb-2"
      style={{ color: COLORS.muted }}
    >
      {children}
    </p>
  );
}

export default function AdminConfigPage() {
  const { perfil: perfilAtual, atualizarPerfil } = usePerfil();
  const [darkMode, setDarkMode] = useState(
    () => typeof window !== "undefined" && localStorage.getItem("admin-dark-mode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("admin-dark-mode", String(darkMode));
    window.dispatchEvent(new Event("admin-dark-mode-change"));
  }, [darkMode]);

  const [perfil, setPerfil] = useState(perfilAtual);
  const [senha, setSenha] = useState({ atual: "", nova: "", confirmar: "" });
  const [perfilSalvo, setPerfilSalvo] = useState(true);
  const [erroSenha, setErroSenha] = useState("");

  const [contato, setContato] = useState({
    email: "contato@edufinance.com",
    whatsapp: "(83) 90000-0000",
  });
  const [contatoSalvo, setContatoSalvo] = useState(true);

  const [termos, setTermos] = useState(
    "Bem-vindo ao EduFinance. Ao utilizar este aplicativo, você concorda com nossos termos de uso e política de privacidade..."
  );
  const [termosSalvo, setTermosSalvo] = useState(true);

  const [faqs, setFaqs] = useState([
    { id: 1, pergunta: "Como adicionar uma nova receita/despesa?", resposta: "Vá em Transações e toque no botão +." },
    { id: 2, pergunta: "Os meus dados financeiros estão seguros?", resposta: "Sim, todos os dados são criptografados." },
    { id: 3, pergunta: "Como funcionam os relatórios mensais?", resposta: "Os relatórios são gerados automaticamente todo início de mês." },
    { id: 4, pergunta: "Como redefinir minha senha?", resposta: "Acesse Perfil > Segurança > Redefinir senha." },
  ]);
  const [faqAberta, setFaqAberta] = useState(null);

  const [feedbacks, setFeedbacks] = useState([
    { id: 1, usuario: "Pretinho", mensagem: "Seria bom ter gráfico de metas por categoria.", resposta: "", respondido: false },
    { id: 2, usuario: "Maria S.", mensagem: "App trava ao abrir relatórios às vezes.", resposta: "", respondido: false },
  ]);
  const [respostaAtual, setRespostaAtual] = useState({});

  const bg = darkMode ? COLORS.navy : "#f5f6f8";
  const textColor = darkMode ? "#f5f6f8" : COLORS.navy;

  useEffect(() => {
    const sincronizacao = window.setTimeout(() => setPerfil(perfilAtual), 0);
    return () => window.clearTimeout(sincronizacao);
  }, [perfilAtual]);

  function atualizarFaq(id, campo, valor) {
    setFaqs(faqs.map((f) => (f.id === id ? { ...f, [campo]: valor } : f)));
  }

  function removerFaq(id) {
    setFaqs(faqs.filter((f) => f.id !== id));
  }

  function adicionarFaq() {
    const novoId = Math.max(0, ...faqs.map((f) => f.id)) + 1;
    setFaqs([...faqs, { id: novoId, pergunta: "Nova pergunta", resposta: "" }]);
    setFaqAberta(novoId);
  }

  function alterarFoto(e) {
    const arquivo = e.target.files?.[0];
    if (!arquivo) return;
    const leitor = new FileReader();
    leitor.onload = () => {
      setPerfil((perfilAnterior) => ({ ...perfilAnterior, foto: leitor.result }));
      setPerfilSalvo(false);
    };
    leitor.readAsDataURL(arquivo);
  }

  function salvarPerfil() {
    if (senha.nova || senha.confirmar || senha.atual) {
      if (!senha.atual) {
        setErroSenha("Informe a senha atual para alterá-la.");
        return;
      }
      if (senha.nova.length < 6) {
        setErroSenha("A nova senha deve ter pelo menos 6 caracteres.");
        return;
      }
      if (senha.nova !== senha.confirmar) {
        setErroSenha("As senhas não coincidem.");
        return;
      }
    }
    setErroSenha("");
    atualizarPerfil(perfil);
    setSenha({ atual: "", nova: "", confirmar: "" });
    setPerfilSalvo(true);
  }

  function enviarResposta(id) {
    const texto = respostaAtual[id];
    if (!texto) return;
    setFeedbacks(
      feedbacks.map((f) =>
        f.id === id ? { ...f, resposta: texto, respondido: true } : f
      )
    );
  }

  return (
    <div
      className={`admin-config-page min-h-screen w-full flex justify-center py-8 px-4 transition-colors${darkMode ? " admin-config-page--dark" : ""}`}
      style={{ backgroundColor: bg }}
    >
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-6">
          <Settings size={20} color={COLORS.green} />
          <h1 className="text-lg font-bold" style={{ color: textColor }}>
            Configurações — Administrador
          </h1>
        </div>

        {/* Aparência / Tema */}
        <SectionCard>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {darkMode ? <Moon size={18} color={COLORS.green} /> : <Sun size={18} color={COLORS.green} />}
              <div>
                <p className="font-semibold text-sm" style={{ color: COLORS.navy }}>
                  Aparência / Tema
                </p>
                <p className="text-xs" style={{ color: COLORS.muted }}>
                  Alternar entre Modo Claro e Modo Escuro
                </p>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-11 h-6 rounded-full relative transition-colors"
              style={{ backgroundColor: darkMode ? COLORS.green : "#d1d5db" }}
            >
              <span
                className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform"
                style={{ transform: darkMode ? "translateX(22px)" : "translateX(2px)" }}
              />
            </button>
          </div>
        </SectionCard>

        {/* Perfil do Administrador */}
        <SectionCard>
          <div className="flex items-center gap-2 mb-3">
            <User size={16} color={COLORS.green} />
            <p className="font-semibold text-sm" style={{ color: COLORS.navy }}>
              Perfil do Administrador
            </p>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: COLORS.greenLight }}
              >
                {perfil.foto ? (
                  <Image src={perfil.foto} alt="Foto do admin" width={64} height={64} unoptimized className="w-full h-full object-cover" />
                ) : (
                  <User size={26} color={COLORS.green} />
                )}
              </div>
              <label
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer"
                style={{ backgroundColor: COLORS.green }}
              >
                <Camera size={12} color="#fff" />
                <input type="file" accept="image/*" className="hidden" onChange={alterarFoto} />
              </label>
            </div>
            <div className="flex-1">
              <p className="text-xs" style={{ color: COLORS.muted }}>
                Foto de perfil
              </p>
              <p className="text-sm font-medium" style={{ color: COLORS.navy }}>
                Toque no ícone para alterar
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2" style={{ borderColor: COLORS.border }}>
              <User size={16} color={COLORS.green} />
              <input
                className="flex-1 text-sm outline-none"
                value={perfil.nome}
                placeholder="Nome"
                onChange={(e) => {
                  setPerfil({ ...perfil, nome: e.target.value });
                  setPerfilSalvo(false);
                }}
              />
            </div>
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2" style={{ borderColor: COLORS.border }}>
              <Mail size={16} color={COLORS.green} />
              <input
                className="flex-1 text-sm outline-none"
                value={perfil.email}
                placeholder="E-mail de acesso"
                onChange={(e) => {
                  setPerfil({ ...perfil, email: e.target.value });
                  setPerfilSalvo(false);
                }}
              />
            </div>

            <p className="text-xs font-semibold tracking-wide uppercase pt-1" style={{ color: COLORS.muted }}>
              Alterar senha
            </p>
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2" style={{ borderColor: COLORS.border }}>
              <Lock size={16} color={COLORS.green} />
              <input
                type="password"
                className="flex-1 text-sm outline-none"
                placeholder="Senha atual"
                value={senha.atual}
                onChange={(e) => {
                  setSenha({ ...senha, atual: e.target.value });
                  setPerfilSalvo(false);
                }}
              />
            </div>
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2" style={{ borderColor: COLORS.border }}>
              <Lock size={16} color={COLORS.green} />
              <input
                type="password"
                className="flex-1 text-sm outline-none"
                placeholder="Nova senha"
                value={senha.nova}
                onChange={(e) => {
                  setSenha({ ...senha, nova: e.target.value });
                  setPerfilSalvo(false);
                }}
              />
            </div>
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2" style={{ borderColor: COLORS.border }}>
              <Lock size={16} color={COLORS.green} />
              <input
                type="password"
                className="flex-1 text-sm outline-none"
                placeholder="Confirmar nova senha"
                value={senha.confirmar}
                onChange={(e) => {
                  setSenha({ ...senha, confirmar: e.target.value });
                  setPerfilSalvo(false);
                }}
              />
            </div>

            {erroSenha && (
              <p className="text-xs" style={{ color: "#dc2626" }}>
                {erroSenha}
              </p>
            )}

            <button
              onClick={salvarPerfil}
              className="w-full flex items-center justify-center gap-2 text-white text-sm font-semibold py-2 rounded-lg"
              style={{ backgroundColor: COLORS.green }}
            >
              <Save size={14} /> {perfilSalvo ? "Salvo" : "Salvar perfil"}
            </button>
          </div>
        </SectionCard>

        {/* Canais de Contato */}
        <SectionCard>
          <SectionLabel>Canais de Contato</SectionLabel>
          <div className="space-y-3">
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2" style={{ borderColor: COLORS.border }}>
              <Mail size={16} color={COLORS.green} />
              <input
                className="flex-1 text-sm outline-none"
                value={contato.email}
                onChange={(e) => {
                  setContato({ ...contato, email: e.target.value });
                  setContatoSalvo(false);
                }}
              />
            </div>
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2" style={{ borderColor: COLORS.border }}>
              <MessageCircle size={16} color={COLORS.green} />
              <input
                className="flex-1 text-sm outline-none"
                value={contato.whatsapp}
                onChange={(e) => {
                  setContato({ ...contato, whatsapp: e.target.value });
                  setContatoSalvo(false);
                }}
              />
            </div>
            <button
              onClick={() => setContatoSalvo(true)}
              className="w-full flex items-center justify-center gap-2 text-white text-sm font-semibold py-2 rounded-lg"
              style={{ backgroundColor: COLORS.green }}
            >
              <Save size={14} /> {contatoSalvo ? "Salvo" : "Salvar contato"}
            </button>
          </div>
        </SectionCard>

        {/* Termos de Uso */}
        <SectionCard>
          <div className="flex items-center gap-2 mb-2">
            <FileText size={16} color={COLORS.green} />
            <p className="font-semibold text-sm" style={{ color: COLORS.navy }}>
              Termos de Uso e Política de Privacidade
            </p>
          </div>
          <textarea
            className="w-full text-sm border rounded-lg p-3 outline-none resize-none"
            style={{ borderColor: COLORS.border, minHeight: 90 }}
            value={termos}
            onChange={(e) => {
              setTermos(e.target.value);
              setTermosSalvo(false);
            }}
          />
          <button
            onClick={() => setTermosSalvo(true)}
            className="mt-2 w-full flex items-center justify-center gap-2 text-white text-sm font-semibold py-2 rounded-lg"
            style={{ backgroundColor: COLORS.green }}
          >
            <Save size={14} /> {termosSalvo ? "Salvo" : "Salvar termos"}
          </button>
        </SectionCard>

        {/* FAQ */}
        <SectionCard>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <HelpCircle size={16} color={COLORS.green} />
              <p className="font-semibold text-sm" style={{ color: COLORS.navy }}>
                Perguntas Frequentes (FAQ)
              </p>
            </div>
            <button onClick={adicionarFaq} className="p-1 rounded-md" style={{ backgroundColor: COLORS.greenLight }}>
              <Plus size={16} color={COLORS.green} />
            </button>
          </div>

          <div className="space-y-2">
            {faqs.map((f) => (
              <div key={f.id} className="border rounded-lg" style={{ borderColor: COLORS.border }}>
                <button
                  className="w-full flex items-center justify-between px-3 py-2 text-left"
                  onClick={() => setFaqAberta(faqAberta === f.id ? null : f.id)}
                >
                  <span className="text-sm font-medium" style={{ color: COLORS.navy }}>
                    {f.pergunta}
                  </span>
                  <ChevronDown
                    size={16}
                    style={{
                      transform: faqAberta === f.id ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.15s",
                    }}
                  />
                </button>
                {faqAberta === f.id && (
                  <div className="px-3 pb-3 space-y-2">
                    <input
                      className="w-full text-sm border rounded-md px-2 py-1 outline-none"
                      style={{ borderColor: COLORS.border }}
                      value={f.pergunta}
                      onChange={(e) => atualizarFaq(f.id, "pergunta", e.target.value)}
                      placeholder="Pergunta"
                    />
                    <textarea
                      className="w-full text-sm border rounded-md px-2 py-1 outline-none resize-none"
                      style={{ borderColor: COLORS.border, minHeight: 50 }}
                      value={f.resposta}
                      onChange={(e) => atualizarFaq(f.id, "resposta", e.target.value)}
                      placeholder="Resposta"
                    />
                    <button
                      onClick={() => removerFaq(f.id)}
                      className="flex items-center gap-1 text-xs font-medium"
                      style={{ color: "#dc2626" }}
                    >
                      <Trash2 size={12} /> Remover
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Feedbacks */}
        <SectionCard>
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare size={16} color={COLORS.green} />
            <p className="font-semibold text-sm" style={{ color: COLORS.navy }}>
              Feedback / Sugestões dos usuários
            </p>
          </div>
          <div className="space-y-3">
            {feedbacks.map((f) => (
              <div key={f.id} className="border rounded-lg p-3" style={{ borderColor: COLORS.border }}>
                <p className="text-xs font-semibold" style={{ color: COLORS.navy }}>
                  {f.usuario}
                </p>
                <p className="text-sm mb-2" style={{ color: COLORS.muted }}>
                  {f.mensagem}
                </p>

                {f.respondido ? (
                  <div className="text-sm rounded-md px-2 py-1" style={{ backgroundColor: COLORS.greenLight, color: COLORS.green }}>
                    Resposta enviada: {f.resposta}
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      className="flex-1 text-sm border rounded-md px-2 py-1 outline-none"
                      style={{ borderColor: COLORS.border }}
                      placeholder="Responder..."
                      value={respostaAtual[f.id] || ""}
                      onChange={(e) =>
                        setRespostaAtual({ ...respostaAtual, [f.id]: e.target.value })
                      }
                    />
                    <button
                      onClick={() => enviarResposta(f.id)}
                      className="px-3 rounded-md text-white"
                      style={{ backgroundColor: COLORS.green }}
                    >
                      <Send size={14} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
