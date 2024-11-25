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
  const [nome, setNome] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("senha");
    const storedNome = localStorage.getItem("nome");

    if (!storedEmail || !storedPassword) {
      setError("Usuário não autenticado");
      navigate("/login");
      return;
    }

    setEmail(storedEmail);
    setNome(storedNome);
    setPassword(storedPassword);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Usuário não autenticado");
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3002/api/users", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar dados do usuário");
        }

        const data = await response.json();
        setBalance(data.balance || "R$ 1.000,00");
      } catch (error) {
        setError("Erro ao buscar informações da conta.");
      }
    };

    fetchUserData();
  }, [navigate]);

  const toggleBalance = () => {
    setShowBalance((prev) => !prev);
  };

  // Função para deletar a conta
  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:3002/api/users", {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar conta");
      }

      // Remover os dados do localStorage
      localStorage.removeItem("email");
      localStorage.removeItem("senha");
      localStorage.removeItem("nome");
      localStorage.removeItem("token");

      
      navigate("/"); // Redirecionar para a página que queremos
    } catch (error) {
      alert("Erro ao deletar conta: " + error.message);
    }
  };

  return (
    <main className="account-container">
      <div className="account-header">
        <h1>Conta do Usuário</h1>
        {error ? (
          <p>{error}</p>
        ) : (
          <div className="account-info">
            <h2>Bem-vindo, {nome}</h2>
            <div className="account-balance">
              <h3>Saldo Disponível:</h3>
              <p className="balance-amount">{showBalance ? balance : "****"}</p>
              <button onClick={toggleBalance} className="toggle-button">
                {showBalance ? "Esconder Saldo" : "Mostrar Saldo"}
              </button>
            </div>
            <div className="pix-info">
              <h3>Pix</h3>
              <p>Chave Pix: {email}</p>
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
        <button onClick={handleDeleteAccount} className="delete-account-button">
          Deletar Conta
        </button>
      </div>
    </main>
  );
};

export default Account;
