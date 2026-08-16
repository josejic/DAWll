"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { LayoutGrid, Users, ArrowRightLeft, Target, Lightbulb, Settings, LogOut, Bell, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import "../../ledger.css";
import { PerfilProvider, usePerfil } from "./perfil-context";

const navItems = [
  { href: "/dashboard", label: "Dados", Icon: LayoutGrid },
  { href: "/dashboard/usuarios", label: "Usuários", Icon: Users },
  { href: "/dashboard/transacoes", label: "Transações", Icon: ArrowRightLeft },
  { href: "/dashboard/metas", label: "Metas", Icon: Target },
  { href: "/dashboard/dicas", label: "Dicas", Icon: Lightbulb },
  { href: "/dashboard/configuracoes", label: "Configurações", Icon: Settings },
];

function iniciais(nome) {
  return (nome || "Administrador")
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}
export default function AdminLayout({ children }) {
  return (
    <PerfilProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </PerfilProvider>
  );
}

function AdminLayoutContent({ children }) {
  const pathname = usePathname();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { perfil } = usePerfil();

  useEffect(() => {
    const aplicarTemaSalvo = () => {
      const modoEscuroAtivo = localStorage.getItem("admin-dark-mode") === "true";
      document.body.classList.toggle("admin-dark-mode", modoEscuroAtivo);
    };

    aplicarTemaSalvo();
    window.addEventListener("admin-dark-mode-change", aplicarTemaSalvo);

    return () => window.removeEventListener("admin-dark-mode-change", aplicarTemaSalvo);
  }, []);

  return (
    <div className={clsx("admin-layout", { "admin-layout--sidebar-collapsed": isSidebarCollapsed })}>
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <img
            className="admin-sidebar-mark"
            src="/imagens/logo-simbolo.png"
            alt="Logo da EduFinance"
            width={36}
            height={36}
          />
          <div className="admin-sidebar-brand-copy">
            <div className="admin-sidebar-brand-name">EduFinance</div>
            <div className="admin-sidebar-brand-sub">Painel Administrativo</div>
          </div>
          <button
            type="button"
            className="admin-sidebar-toggle"
            onClick={() => setIsSidebarCollapsed((collapsed) => !collapsed)}
            aria-label={isSidebarCollapsed ? "Expandir menu" : "Recolher menu"}
            title={isSidebarCollapsed ? "Expandir menu" : "Recolher menu"}
          >
            {isSidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>
        </div>

        <nav className="admin-nav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx("admin-nav-item", {
                "admin-nav-item--active": pathname === item.href,
              })}
              title={isSidebarCollapsed ? item.label : undefined}
            >
              <item.Icon size={17} />
              <span className="admin-nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="admin-nav-exit">
          <Link href="/login" className="admin-nav-item" title={isSidebarCollapsed ? "Sair" : undefined}>
            <LogOut size={17} />
            <span className="admin-nav-label">Sair</span>
          </Link>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar-right">
            <Bell size={19} />
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
