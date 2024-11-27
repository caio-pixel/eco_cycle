import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Account.css";

const Account = () => {
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(false);
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [newNome, setNewNome] = useState("");
  const [newSenha, setNewSenha] = useState("");
  const [showActions, setShowActions] = useState(false); // Estado para controlar as ações

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
            Authorization: `Bearer ${token}`,
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

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:3002/api/users", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar conta");
      }

      localStorage.removeItem("email");
      localStorage.removeItem("senha");
      localStorage.removeItem("nome");
      localStorage.removeItem("token");

      navigate("/");
    } catch (error) {
      alert("Erro ao deletar conta: " + error.message);
    }
  };

  const handleEditAccount = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:3002/api/users", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: newNome || nome,
          senha: newSenha || password,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar informações.");
      }

      const updatedUser = await response.json();
      setNome(updatedUser.nome);
      setPassword(newSenha || password);
      setShowEditModal(false);

      alert("Informações atualizadas com sucesso!");
    } catch (error) {
      alert("Erro ao atualizar informações: " + error.message);
    }
  };

  const toggleActions = () => {
    setShowActions((prev) => !prev); // Alterna a visibilidade das ações
  };

  return (
    <main className="account-container">
      <div className="account-header">
        <div className="topImage">
          <h2>Bem-vindo, {nome}!</h2>
          <button className="show-actions-btn" onClick={toggleActions}>
            =
          </button>
        </div>

        {error ? (
          <p>{error}</p>
        ) : (
          <div className="account-info">
            <div className="account-balance">
              <h3>Saldo Disponível:</h3>
              <p className="balance-amount">
                {showBalance ? balance : "******"}
              </p>
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

      {/* Menu lateral com ações */}
      <div className={`action-buttons-container ${showActions ? "show" : ""}`}>
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
        <button onClick={() => setShowEditModal(true)} className="edit-account-button">
          Editar Informações
        </button>
      </div>

      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Editar Informações</h3>
            <label>
              Novo Nome:
              <input
                type="text"
                value={newNome}
                onChange={(e) => setNewNome(e.target.value)}
              />
            </label>
            <label>
              Nova Senha:
              <input
                type="password"
                value={newSenha}
                onChange={(e) => setNewSenha(e.target.value)}
              />
            </label>
            <div className="modal-actions">
              <button onClick={handleEditAccount}>Salvar</button>
              <button onClick={() => setShowEditModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Account;
