import Link from "next/link";
import "../../ledger.css";

const features = [
  {
    title: "Lançamentos",
    desc: "Registre receitas e despesas em segundos, com categorias pensadas pra rotina de estudante.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M7 17l5-5 5 5M7 7l5 5 5-5" />
      </svg>
    ),
  },
  {
    title: "Metas de economia",
    desc: "Defina um objetivo (curso, viagem, emergência) e acompanhe o progresso mês a mês.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    title: "Categorias personalizadas",
    desc: "Alimentação, transporte, estudo, lazer — organize os gastos do jeito que fizer sentido pra você.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    title: "Conteúdo educativo",
    desc: "Dicas curtas de educação financeira, direto no seu painel, sem precisar sair do app.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.5.5.8 1 .8 1.7V16h6.4v-.8c0-.7.3-1.2.8-1.7A6 6 0 0 0 12 3z" />
      </svg>
    ),
  },
  {
    title: "Painel em tempo real",
    desc: "Saldo, entradas e saídas sempre atualizados, sem precisar recarregar nada.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 3v18h18" />
        <path d="M7 15l4-4 3 3 5-6" />
      </svg>
    ),
  },
  {
    title: "Acesso seguro",
    desc: "Login protegido, seus dados financeiros ficam só entre você e o painel.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4z" />
      </svg>
    ),
  },
];

export default function LandingPage() {
  return (
    <main className="landing-page">
      <header className="landing-header">
        <div className="landing-brand">
          <div className="landing-brand-mark">E</div>
          <span className="landing-brand-name">EduFinance</span>
        </div>
        <Link href="/login" className="landing-header-btn">
          Entrar
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
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
          <svg width="10" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
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
          <div className="landing-brand-mark">E</div>
          <span className="landing-brand-name">EduFinance</span>
        </div>
        <span>Painel financeiro · 2026</span>
      </footer>
    </main>
  );
}