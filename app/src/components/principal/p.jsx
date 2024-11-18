import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Account.css';

const Account = () => {
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(false);
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");  // Variável de estado para armazenar o nome do usuário

  useEffect(() => {
    // Recupera o email, senha e nome do localStorage
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("senha");
    const storedNome = localStorage.getItem("nome");  // Nome do usuário

    // Se não houver email ou senha, redireciona para o login
    if (!storedEmail || !storedPassword) {
      setError("Usuário não autenticado");
      navigate("/login"); // Redireciona para login se não houver email ou senha
      return;
    }

    setEmail(storedEmail);
    setNome(storedNome);  // Define o nome do usuário
    setPassword(storedPassword);  // Armazena a senha para possíveis verificações (não exiba no frontend)

    // Obtém o token do localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Usuário não autenticado");
      navigate("/login"); // Redireciona para login se não tiver token
      return;
    }

    // Busca o saldo do usuário usando o token
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3002/api/users", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`, // Passa o token JWT no cabeçalho
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar dados do usuário");
        }

        const data = await response.json();
        setBalance(data.balance || "R$ 100.000,00"); // Exemplo de saldo

      } catch (error) {
        setError("Erro ao buscar informações da conta.");
      }
    };

    fetchUserData();
  }, [navigate]);

  const toggleBalance = () => {
    setShowBalance((prev) => !prev);
  };

  return (
    <main className="account-container">
      <div className="account-header">
        <h1>Conta do Usuário</h1>
        {error ? (
          <p>{error}</p>
        ) : (
          <div className="account-info">
            <h2>Bem-vindo, {nome}</h2> {/* Exibe o nome do usuário */}
            <div className="account-balance">
              <h3>Saldo Disponível:</h3>
              <p className="balance-amount">
                {showBalance ? balance : '****'}
              </p>
              <button onClick={toggleBalance} className="toggle-button">
                {showBalance ? 'Esconder Saldo' : 'Mostrar Saldo'}
              </button>
            </div>
            <div className="pix-info">
              <h3>Pix</h3>
              <p>Chave Pix: {email}</p> {/* A chave Pix é o email */}
            </div>
            {/* Adicionando informações sensíveis (sem exibir senha) */}
            <div className="account-credentials">
              <h3>Credenciais</h3>
              <p>Email: {email}</p>
              <p>Senha: *****</p> {/* Não exiba a senha, apenas sinalize que é "****" */}
            </div>
          </div>
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
      <div className="side-panel">
        <h3>Mais Ações</h3>
        <div className="side-info">
          <button className="side-button">Ver Perfil</button>
          <button className="side-button">Configurações</button>
          <button className="side-button">Ajuda</button>
        </div>
      </div>
    </main>
  );
};

export default Account;
