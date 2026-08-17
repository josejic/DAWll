export const transacoes = [
  { desc: "Supermercado", categoria: "Alimentação", valor: -320.5, data: "07/01/2025" },
  { desc: "Curso de finanças", categoria: "Educação", valor: -450, data: "14/01/2025" },
  { desc: "Salário + bônus", categoria: "Salário", valor: 5200, data: "04/03/2025" },
  { desc: "Salário mensal", categoria: "Salário", valor: 4500, data: "04/01/2025" },
  { desc: "Rendimento CDI", categoria: "Investimento", valor: 1200, data: "09/01/2025" },
  { desc: "Salário", categoria: "Salário", valor: 3800, data: "04/02/2025" },
  { desc: "Dividendos", categoria: "Investimento", valor: 850, data: "09/02/2025" },
  { desc: "Aluguel", categoria: "Moradia", valor: -1500, data: "31/01/2025" },
  { desc: "Cinema e restaurante", categoria: "Lazer", valor: -150, data: "28/02/2025" },
  { desc: "Combustível", categoria: "Transporte", valor: -180, data: "11/01/2025" },
];

const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

export const movimentacoesMensais = meses.map((mes, indice) => {
  const transacoesDoMes = transacoes.filter((transacao) => {
const mesDaTransacao = Number(transacao.data.split("/")[2]);    
return Number(mesDaTransacao) === indice + 1;

  });

  return {
    mes,
    receitas: transacoesDoMes.filter((transacao) => transacao.valor > 0).reduce((total, transacao) => total + transacao.valor, 0),
    despesas: transacoesDoMes.filter((transacao) => transacao.valor < 0).reduce((total, transacao) => total + Math.abs(transacao.valor), 0),
  };
});
