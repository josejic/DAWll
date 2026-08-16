import Link from "next/link";
import { 
  ArrowUpRight, 
  Target, 
  Grid, 
  Lightbulb, 
  BarChart3, 
  ShieldCheck, 
  ArrowRight 
} from "lucide-react";
import "../globals.css";

const features = [
  {
    title: "Lançamentos",
    desc: "Registre receitas e despesas em segundos, com categorias pensadas pra rotina de estudante.",
    icon: <ArrowUpRight size={20} />,
  },
  {
    title: "Metas de economia",
    desc: "Defina um objetivo (curso, viagem, emergência) e acompanhe o progresso mês a mês.",
    icon: <Target size={20} />,
  },
  {
    title: "Categorias personalizadas",
    desc: "Alimentação, transporte, estudo, lazer — organize os gastos do jeito que fizer sentido pra você.",
    icon: <Grid size={20} />,
  },
  {
    title: "Conteúdo educativo",
    desc: "Dicas curtas de educação financeira, direto no seu painel, sem precisar sair do app.",
    icon: <Lightbulb size={20} />,
  },
  {
    title: "Painel em tempo real",
    desc: "Saldo, entradas e saídas sempre atualizados, sem precisar recarregar nada.",
    icon: <BarChart3 size={20} />,
  },
  {
    title: "Acesso seguro",
    desc: "Login protegido, seus dados financeiros ficam só entre você e o painel.",
    icon: <ShieldCheck size={20} />,
  },
];

export default function LandingPage() {
  return (
    <main className="landing-page">
      <header className="landing-header">
        <div className="landing-brand">
          <img
            className="landing-brand-mark"
            src="/imagens/logo-simbolo.png"
            alt="Logo da EduFinance"
            width={40}
            height={40}
          />
          <span className="landing-brand-name">EduFinance</span>
        </div>
        <Link href="/login" className="landing-header-btn">
          Entrar
          <ArrowRight size={16} />
        </Link>
      </header>

      <section className="landing-hero">
        <span className="landing-pill">Painel financeiro para estudantes</span>
        <h1 className="landing-title">
          Organize sua grana com controle total
        </h1>
        <p className="landing-subtitle">
          Acompanhe receitas, despesas e metas em um só lugar, pensado pra
          rotina de quem estuda, estagia e ainda tá aprendendo a lidar com
          dinheiro.
        </p>
        <Link href="/login" className="landing-cta-btn">
          Acessar painel
          <ArrowRight size={18} />
        </Link>
      </section>

      <div className="landing-stats">
        <div className="landing-stat-card">
          <div className="landing-stat-value">100%</div>
          <div className="landing-stat-label">em tempo real</div>
        </div>
        <div className="landing-stat-card">
          <div className="landing-stat-value">4</div>
          <div className="landing-stat-label">formatos de conteudo</div>
        </div>
        <div className="landing-stat-card">
          <div className="landing-stat-value">6</div>
          <div className="landing-stat-label">módulos completos</div>
        </div>
      </div>

      <h2 className="landing-section-title">Tudo que o painel oferece</h2>
      <p className="landing-section-subtitle">
        Recursos pensados pra facilitar a vida financeira de estudantes
      </p>

      <div className="landing-features-grid">
        {features.map((f) => (
          <div className="landing-feature-card" key={f.title}>
            <div className="landing-feature-icon">{f.icon}</div>
            <h3 className="landing-feature-title">{f.title}</h3>
            <p className="landing-feature-desc">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="landing-cta-banner">
        <h3>Pronto pra organizar sua grana?</h3>
        <p>Acesse o painel e comece a gerenciar a plataforma agora mesmo.</p>
        <Link href="/login" className="landing-cta-btn">
          Entrar no painel
        </Link>
      </div>

      <footer className="landing-footer">
        <div className="landing-brand">
          <img
            className="landing-brand-mark"
            src="/imagens/logo-simbolo.png"
            alt="Logo da EduFinance"
            width={40}
            height={40}
          />
          <span className="landing-brand-name">EduFinance</span>
        </div>
        <span>Painel financeiro · 2026</span>
      </footer>
    </main>
  );
}