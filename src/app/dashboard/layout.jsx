"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Lightbulb,
  Settings,
  LogOut,
  Bell,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dados", Icon: LayoutGrid },
  { href: "/dashboard/dicas", label: "Dicas", Icon: Lightbulb },
  { href: "/dashboard/interacao", label: "Interações", Icon: Settings },
];

function iniciais(nome) {return (nome || "Administrador").split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();}

export default function AdminLayout({ children }) {
  return <AdminLayoutContent>{children}</AdminLayoutContent>;
}

function AdminLayoutContent({ children }) {
  const pathname = usePathname();
  const [MenuAtivado, QualAba] = useState(false);
  
  const perfil = {
    nome: "Administrador",
    role: "Administrador",
    foto: null,
  };

  return (
    <div className={`admin-layout ${MenuAtivado ? "admin-layout--sidebar-collapsed" : ""}`}>
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <Image
            className="admin-sidebar-mark"
            src="/imagens/logo-simbolo.png"
            alt="Logo da EduFinance"
            width={36}
            height={36}
            priority
          />
          <div className="admin-sidebar-brand-copy">
            <div className="admin-sidebar-brand-name">EduFinance</div>
            <div className="admin-sidebar-brand-sub">Painel Administrativo</div>
          </div>
          <button
            type="button"
            className="admin-sidebar-toggle"
            onClick={() => QualAba((MenuEncolhido) => !MenuEncolhido)}
            aria-label={MenuAtivado ? "Expandir menu" : "Recolher menu"}
            title={MenuAtivado ? "Expandir menu" : "Recolher menu"}
          >
            {MenuAtivado ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>
        </div>

        <nav className="admin-nav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-nav-item ${pathname === item.href ? "admin-nav-item--active" : ""}`}
              title={MenuAtivado ? item.label : undefined}
            >
              <item.Icon size={17} />
              <span className="admin-nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="admin-nav-exit">
          <Link href="/login" className="admin-nav-item" title={MenuAtivado ? "Sair" : undefined}>
            <LogOut size={17} />
            <span className="admin-nav-label">Sair</span>
          </Link>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar-right">
            <button type="button" className="admin-icon-btn" aria-label="Notificações">
              <Bell size={19} />
            </button>
            <div className="admin-user">
              <div className="admin-user-avatar">
                {perfil.foto ? (
                  <Image src={perfil.foto} alt="Foto do perfil" width={34} height={34} unoptimized />
                ) : (
                  iniciais(perfil.nome)
                )}
              </div>
              <div>
                <div className="admin-user-name">{perfil.nome}</div>
                <div className="admin-user-role">{perfil.role}</div>
              </div>
            </div>
          </div>
        </header>

        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}