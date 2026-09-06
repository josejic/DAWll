"use client";

import { useEffect, useState } from "react";
import {  Users } from "lucide-react";
import { supabase } from "./../lib/supabase";

export default function TabelaDeUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function buscarUsuarios() {
      const { data, error } = await supabase.from("perfis").select();
      console.log("data:", data, "error:", error)

      if (error) {
        console.error("Erro ao carregar usuários:", error.message);
        return;
      }

      setUsuarios(data);
    }

    buscarUsuarios();
  }, []);

  return (
    <>
      <h1 className="admin-page-title">Usuários logados</h1>
      <div className="admin-users-stats">
        <div className="admin-users-stat-card">
          <div className="admin-users-stat-top">
            <Users size={13} />
            Total
          </div>
          <div className="admin-users-stat-value">{usuarios.length}</div>
        </div>
      </div>
    </>
  );
}