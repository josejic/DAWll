"use client";

import { Search, ChevronDown, ShieldCheck, User, Users, MoreHorizontal } from "lucide-react";

const usuarios = [
  {
    nome: "José Isac Cordeiro Rodrigues",
    email: "isac.cordeiro@academico.ifpb.edu.br",
    tipo: "admin",
    cadastro: "09 jun 2026",
    avatarCor: "a",
  },
  {
    nome: "Iara Cordeiro Rodrigues",
    email: "iara.cordeiro@academico.ifpb.edu.br",
    tipo: "usuario",
    cadastro: "31 ago 2026",
    avatarCor: "b",
  },
  {
    nome: "jisacprogramer",
    email: "jisacprogramer@gmail.com",
    tipo: "usuario",
    cadastro: "31 ago 2026",
    avatarCor: "c",
  },
];

function iniciais(nome) {
  return nome
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function DashboardPage() {
  const totalAdmins = usuarios.filter((u) => u.tipo === "admin");
  const totalComuns = usuarios.filter((u) => u.tipo === "usuario");

  return (
    <>
      <h1 className="admin-page-title">Usuários</h1>
      <p className="admin-page-subtitle">Gerencie todos os usuários da plataforma</p>

      <div className="admin-users-stats">
        {/* TOTAL */}
        <div className="admin-users-stat-card">
          <div className="admin-users-stat-top">
            <Users size={13} />
            Total
          </div>
          <div className="admin-users-stat-value">{usuarios.length}</div>
          <div className="admin-avatar-stack">
            {usuarios.map((u) => (
              <div
                key={u.email}
                className={"admin-mini-avatar admin-mini-avatar--" + u.avatarCor}
              >
                {iniciais(u.nome)}
              </div>
            ))}
          </div>
        </div>

        {/* ADMINISTRADORES */}
        <div className="admin-users-stat-card">
          <div className="admin-users-stat-top">
            <ShieldCheck size={13} />
            Administradores
          </div>
          <div className="admin-users-stat-value">{totalAdmins.length}</div>
          <div className="admin-avatar-stack">
            {totalAdmins.map((u) => (
              <div
                key={u.email}
                className={"admin-mini-avatar admin-mini-avatar--" + u.avatarCor}
              >
                {iniciais(u.nome)}
              </div>
            ))}
          </div>
        </div>

        {/* USUÁRIOS COMUNS */}
        <div className="admin-users-stat-card">
          <div className="admin-users-stat-top">
            <User size={13} />
            Usuários
          </div>
          <div className="admin-users-stat-value">{totalComuns.length}</div>
          <div className="admin-avatar-stack">
            {totalComuns.map((u) => (
              <div
                key={u.email}
                className={"admin-mini-avatar admin-mini-avatar--" + u.avatarCor}
              >
                {iniciais(u.nome)}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="admin-toolbar">
        <div className="admin-toolbar-search">
          <Search size={15} />
          <input type="text" placeholder="Buscar por nome ou email..." />
        </div>
        <button className="admin-toolbar-filter" type="button">
          Todos
          <ChevronDown size={15} />
        </button>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Usuário</th>
              <th>Email</th>
              <th>Tipo</th>
              <th>Cadastro</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.email}>
                <td>
                  <div className="admin-table-user">
                    <div
                      className={"admin-table-avatar admin-mini-avatar--" + u.avatarCor}
                    >
                      {iniciais(u.nome)}
                    </div>
                    {u.nome}
                  </div>
                </td>
                <td>{u.email}</td>
                <td>
                  <span
                    className={
                      "admin-badge-tipo " +
                      (u.tipo === "admin" ? "admin-badge-tipo--admin" : "admin-badge-tipo--usuario")
                    }
                  >
                    {u.tipo === "admin" && <ShieldCheck size={12} />}
                    {u.tipo === "admin" ? "Admin" : "Usuário"}
                  </span>
                </td>
                <td>{u.cadastro}</td>
                <td>
                  <button className="admin-table-more" type="button" aria-label="Mais opções">
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}