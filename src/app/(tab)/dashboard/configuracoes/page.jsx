import { Mail, ShieldCheck } from "lucide-react";

export default function ConfiguracoesPage() {
  return (
    <>
      <h1 className="admin-page-title">Configurações</h1>
      <p className="admin-page-subtitle">Gerencie suas preferências</p>

      <div className="admin-settings-card">
        <h3 className="admin-settings-section-title">Perfil</h3>
        <div className="admin-settings-profile">
          <div className="admin-settings-avatar">JI</div>
          <div>
            <div className="admin-settings-profile-name">José Isac Cordeiro Rodrigues</div>
            <div className="admin-settings-profile-meta">
              <span>
                <Mail size={13} />
                isac.cordeiro@academico.ifpb.edu.br
              </span>
              <span>
                <ShieldCheck size={13} />
                Administrador
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-settings-card">
        <h3 className="admin-settings-section-title">Informações da Plataforma</h3>

        <div className="admin-settings-row">
          <div>
            <div className="admin-settings-row-label">Nome da Plataforma</div>
            <div className="admin-settings-row-desc">Nome exibido no app</div>
          </div>
          <span className="admin-settings-row-value">EduFinance</span>
        </div>

        <div className="admin-settings-row">
          <div>
            <div className="admin-settings-row-label">Versão</div>
            <div className="admin-settings-row-desc">Versão atual do sistema</div>
          </div>
          <span className="admin-settings-row-value" style={{ color: "var(--ink)" }}>
            1.0.0
          </span>
        </div>

        <div className="admin-settings-row">
          <div>
            <div className="admin-settings-row-label">Ambiente</div>
            <div className="admin-settings-row-desc">Ambiente de execução</div>
          </div>
          <span className="admin-settings-badge">Desenvolvimento</span>
        </div>
      </div>
    </>
  );
}