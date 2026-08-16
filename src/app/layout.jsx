import "./globals.css";

export const metadata = {
  title: "EduFinance - Painel Financeiro",
  description: "Organize sua grana e acompanhe metas com controle total.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
