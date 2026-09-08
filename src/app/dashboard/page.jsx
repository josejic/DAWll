import { Users } from "lucide-react";
import { supabaseAdmin } from "../lib/supabaseAdmin";

export const dynamic = "force-dynamic";

async function contarUsuarios() {
  let pagina = 1;
  const porPagina = 1000;
  let totalUsuarios = 0;

  while (true) {
    const { data, error } =
      await supabaseAdmin.auth.admin.listUsers({
        page: pagina,
        perPage: porPagina,
      });

    if (error) {
      throw new Error(
        `Erro do Supabase Auth: ${error.message}`
      );
    }

    const quantidadeDaPagina = data.users.length;

    totalUsuarios += quantidadeDaPagina;

    // Se vier menos de 1000, chegamos à última página.
    if (quantidadeDaPagina < porPagina) {
      break;
    }

    pagina++;
  }

  return totalUsuarios;
}

export default async function TabelaDeUsuarios() {
  const totalUsuarios = await contarUsuarios();

  return (
    <>
      <h1 className="admin-page-title">
        Contas Ativas
      </h1>

      <div className="admin-users-stats">
        <div className="admin-users-stat-card">
          <div className="admin-users-stat-top">
            <Users size={13} />
            Total
          </div>

          <div className="admin-users-stat-value">
            {totalUsuarios}
          </div>
        </div>
      </div>
    </>
  );
}