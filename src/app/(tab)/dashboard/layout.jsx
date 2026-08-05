"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { LayoutGrid, Users, ArrowRightLeft, Target, Lightbulb, Settings, LogOut, Search, Bell } from "lucide-react";
import "../../ledger.css";

const navItems = [
  { href: "/dashboard", label: "Dados", Icon: LayoutGrid },
  { href: "/dashboard/usuarios", label: "Usuários", Icon: Users },
  { href: "/dashboard/transacoes", label: "Transações", Icon: ArrowRightLeft },
  { href: "/dashboard/metas", label: "Metas", Icon: Target },
  { href: "/dashboard/dicas", label: "Dicas", Icon: Lightbulb },
  { href: "/dashboard/configuracoes", label: "Configurações", Icon: Settings },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <div className="admin-sidebar-mark">E</div>
          <div>
            <div className="admin-sidebar-brand-name">EduFinance</div>
            <div className="admin-sidebar-brand-sub">Painel Administrativo</div>
          </div>
        </div>

        <nav className="admin-nav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx("admin-nav-item", {
                "admin-nav-item--active": pathname === item.href,
              })}
            >
              <item.Icon size={17} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="admin-nav-exit">
          <Link href="/login" className="admin-nav-item">
            <LogOut size={17} />
            Sair
          </Link>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div className="admin-search">
            <Search size={15} />
            <input type="text" placeholder="Buscar usuários, transações..." />
          </div>

          <div className="admin-topbar-right">
            <Bell size={19} />
            <div className="admin-user">
              <div className="admin-user-avatar">JI</div>
              <div>
                <div className="admin-user-name">José Isac</div>
                <div className="admin-user-role">Administrador</div>
              </div>
            </div>
          </div>
        </header>

        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}