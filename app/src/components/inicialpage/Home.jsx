import React from "react";
import { useNavigate } from "react-router-dom";
import "./inicial.css";

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="home-page">
      <header className="header-container">
        <div className="logo-area">
          <h1 className="site-logo">MeuSite</h1>
        </div>
        <nav className="navigation-bar">
          <ul className="navigation-list">
            <li className="dropdown-item">
              <button onClick={handleLoginClick} className="login-button">
                Entrar
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main className="main-section">
        <section className="welcome-section">
          <h1>Bem-vindo ao Nosso Site</h1>
          <hr />
          <p>
            Descubra nossas funcionalidades e explore o conteúdo que preparamos
            especialmente para você.
          </p>
          <button
            type="button"
            className="create-button"
            onClick={() => navigate("/index")}
          >
            Criar
          </button>
        </section>
      </main>

      <footer className="footer-area">
        <div className="footer-content">
          <p>&copy; 2024 Nome da Empresa. Todos os direitos reservados.</p>
          <ul className="footer-links">
            <li>
              <a href="#politica">Política de Privacidade</a>
            </li>
            <li>
              <a href="#termos">Termos de Serviço</a>
            </li>
            <li>
              <a href="#faq">FAQ</a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Home;
