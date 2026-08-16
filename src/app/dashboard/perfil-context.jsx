"use client";

import { createContext, useContext, useEffect, useState } from "react";

const PERFIL_STORAGE_KEY = "admin-perfil";

const perfilInicial = {
  nome: "José Isac Cordeiro Rodrigues",
  email: "isac.cordeiro@academico.ifpb.edu.br",
  role: "Administrador",
  foto: "",
};

const PerfilContext = createContext(null);

export function PerfilProvider({ children }) {
  const [perfil, setPerfil] = useState(perfilInicial);

  useEffect(() => {
    const perfilSalvo = localStorage.getItem(PERFIL_STORAGE_KEY);
    if (!perfilSalvo) return;

    try {
      const perfilArmazenado = { ...perfilInicial, ...JSON.parse(perfilSalvo) };
      const carregamento = window.setTimeout(() => setPerfil(perfilArmazenado), 0);
      return () => window.clearTimeout(carregamento);
    } catch {
      localStorage.removeItem(PERFIL_STORAGE_KEY);
    }
  }, []);

  function atualizarPerfil(novoPerfil) {
    setPerfil((perfilAnterior) => {
      const perfilAtualizado = { ...perfilAnterior, ...novoPerfil };
      localStorage.setItem(PERFIL_STORAGE_KEY, JSON.stringify(perfilAtualizado));
      return perfilAtualizado;
    });
  }

  return <PerfilContext.Provider value={{ perfil, atualizarPerfil }}>{children}</PerfilContext.Provider>;
}

export function usePerfil() {
  const contexto = useContext(PerfilContext);
  if (!contexto) throw new Error("usePerfil deve ser usado dentro de PerfilProvider.");
  return contexto;
}
