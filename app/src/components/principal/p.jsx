import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Account.css';

const Account = () => {
  const location = useLocation();
  const { formData } = location.state || {};
  const [showBalance, setShowBalance] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const toggleBalance = () => {
    setShowBalance((prev) => !prev);
  };

  return (
    <main className="account-container">
      <div className="account-header">
        <h1>Conta do Usuário</h1>
        {formData ? (
          <div className="account-info">
            <h2>Bem-vindo, {formData.nome} {formData.sobrenome}!</h2>
            <div className="account-balance">
              <h3>Saldo Disponível:</h3>
              <p className="balance-amount">
                {showBalance ? 'R$ 1.000,00' : '****'}
              </p>
              <button onClick={toggleBalance} className="toggle-button">
                {showBalance ? 'Esconder Saldo' : 'Mostrar Saldo'}
              </button>
            </div>
            <div className="pix-info">
              <h3>Pix</h3>
              <p>Chave Pix: {formData.email}</p>
            </div>
          </div>
        ) : (
          <p>Nenhuma informação disponível.</p>
        )}
      </div>

      <div className="action-buttons-container">
        <h3>Ações</h3>
        <div className="action-buttons">
          <button className="action-button">Ver Extrato</button>
          <button className="action-button">Fazer Pix</button>
          <button className="action-button">Transferir</button>
          <button className="action-button">Pagar Conta</button>
        </div>
      </div>

      {/* Aba Lateral com Botões */}
      <div
        className="side-panel"
        onMouseEnter={() => setShowInfo(true)}
        onMouseLeave={() => setShowInfo(false)}
      >
        <h3>Mais Ações</h3>
        {showInfo && (
          <div className="side-info">
            <button className="side-button">Ver Perfil</button>
            <button className="side-button">Configurações</button>
            <button className="side-button">Ajuda</button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Account;
