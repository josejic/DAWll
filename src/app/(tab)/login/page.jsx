import "../../ledger.css";

export default function LoginPage() {
  return (
    <main className="bolso-page">
      <div className="bolso-shell">
        <p className="bolso-eyebrow">bolso · controle financeiro</p>
        <h1 className="bolso-title">
          Entra e vê pra onde<br />sua grana foi.
        </h1>

        <div className="bolso-card">
          <form>
            <div className="bolso-field">
              <label className="bolso-label" htmlFor="email">
                E-mail
              </label>
              <input
                className="bolso-input"
                id="email"
                type="email"
                placeholder="voce@email.com"
              />
            </div>

            <div className="bolso-field">
              <label className="bolso-label" htmlFor="senha">
                Senha
              </label>
              <input
                className="bolso-input"
                id="senha"
                type="password"
                placeholder="••••••••"
              />
            </div>

            <button className="bolso-btn" type="submit">
              Entrar
            </button>
          </form>
        </div>

        <p className="bolso-footnote">
          Ainda não tem conta? <a className="bolso-link" href="/cadastro">Criar conta</a>
        </p>
      </div>
    </main>
  );
}