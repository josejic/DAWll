import PainelGestao from "./PainelGestao";
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

    const quantidadeDaPagina =
      data.users.length;

    totalUsuarios += quantidadeDaPagina;

    if (quantidadeDaPagina < porPagina) {
      break;
    }

    pagina++;
  }

  return totalUsuarios;
}

export default async function DashboardPage() {
  const totalUsuarios =
    await contarUsuarios();

  return (
    <PainelGestao
      totalUsuarios={totalUsuarios}
    />
  );
}