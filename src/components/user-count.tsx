
export function createCliente() {
  const supabase = await Usuarios();
  const { count, error } = await supabase
    .from("perfis")
    .select("*", { count: "exact", head: true });

  if (error) {
    return <p>Erro ao buscar contagem de usuários: {error.message}</p>;
  }

  return <p>{count} usuários cadastrados</p>;
}