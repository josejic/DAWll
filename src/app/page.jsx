import Link from "next/link";
import { 
  Users, 
  Receipt, 
  Target, 
  Lightbulb, 
  BarChart3, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp 
} from "lucide-react";

const features = [
  {
    title: "Gestão de Usuários",
    desc: "Acompanhe todos os usuários da plataforma, seus papéis e atividade em um só lugar.",
    icon: <Users size={20} />,
  },
  {
    title: "Transações e Relatórios",
    desc: "Visualize receitas e despesas de toda a plataforma com filtros e status em tempo real.",
    icon: <Receipt size={20} />,
  },
  {
    title: "Metas e Indicadores",
    desc: "Acompanhe o progresso das metas dos usuários com indicadores visuais de evolução.",
    icon: <Target size={20} />,
  },
  {
    title: "Conteúdo Educativo",
    desc: "Gerencie dicas em diferentes formatos: artigos, vídeos, quizzes e lições.",
    icon: <Lightbulb size={20} />,
  },
  {
    title: "Analytics em Tempo Real",
    desc: "Gráficos e indicadores que mostram a saúde financeira da plataforma ao vivo.",
    icon: <BarChart3 size={20} />,
  },
  {
    title: "Acesso Seguro",
    desc: "Painel exclusivo para administradores, com autenticação protegida.",
    icon: <ShieldCheck size={20} />,
  },
];

export default function LandingPage() {
  return (
    <main className="landing-page">
      {/* 1. CABEÇALHO */}
      <header className="landing-header">
        <div className="landing-brand">
          <div className="landing-brand-badge">E</div>
          <span className="landing-brand-name">EduFinance</span>
        </div>
        <Link href="/login" className="landing-header-btn">
          Entrar
          <ArrowRight size={16} />
        </Link>
      </header>

      {/* 2. SEÇÃO HERO */}
      <section className="landing-hero">
        <span className="landing-pill">
          <TrendingUp size={14} /> Painel Administrativo
        </span>
        <h1 className="landing-title">
          Gerencie a plataforma <br />
          EduFinance <br />
          com total controle
        </h1>
        <p className="landing-subtitle">
          Acompanhe usuários, transações, metas e conteúdo educativo em um
          painel único, moderno e em tempo real.
        </p>
        <Link href="/login" className="landing-cta-btn">
          Acessar painel
          <ArrowRight size={18} />
        </Link>
      </section>

      {/* 3. CARTÕES DE ESTATÍSTICAS */}
      <div className="landing-stats">
        <div className="landing-stat-card">
          <div className="landing-stat-value">100%</div>
          <div className="landing-stat-label">em tempo real</div>
        </div>
        <div className="landing-stat-card">
          <div className="landing-stat-value">6</div>
          <div className="landing-stat-label">módulos completos</div>
        </div>
        <div className="landing-stat-card">
          <div className="landing-stat-value">4</div>
          <div className="landing-stat-label">formatos de conteúdo</div>
        </div>
      </div>

      {/* 4. TÍTULO E GRID DE RECURSOS */}
      <h2 className="landing-section-title">Tudo que o painel oferece</h2>
      <p className="landing-section-subtitle">
        Recursos completos para administrar a plataforma financeira educacional
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

      {/* 5. BANNER CHAMADA FINAL (CTA) */}
      <div className="landing-cta-banner">
        <h3>Pronto para começar?</h3>
        <p>Acesse o painel administrativo e comece a gerenciar a plataforma agora mesmo.</p>
        <Link href="/login" className="landing-cta-btn">
          Entrar no painel
          <ArrowRight size={18} />
        </Link>
      </div>

      {/* 6. RODAPÉ */}
      <footer className="landing-footer">
        <div className="landing-brand">
          <div className="landing-brand-badge">E</div>
          <span className="landing-brand-name">EduFinance</span>
        </div>
        <span>Painel Administrativo · 2026</span>
      </footer>
    </main>
  );
}