import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // Para redirecionar após login
import "./entrar.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {
    // Carrega o email e a senha do localStorage
    const storedEmail = localStorage.getItem("email");
    const storedSenha = localStorage.getItem("senha");

    if (storedEmail) setEmail(storedEmail);
    if (storedSenha) setPassword(storedSenha);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Dados de login antes de enviar:", { email, password });
  
    try {
      const response = await fetch("http://localhost:3002/api/authentication/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),  // Certifique-se de que a chave seja 'password'
      });
      
      // Verificação de resposta
      if (!response.ok) {
        throw new Error("Erro ao fazer login");
      }
      
      const data = await response.json();
  
      console.log("Resposta do servidor:", data);  // Verifique a resposta que está sendo retornada
  
      // Armazenando os dados no localStorage
      localStorage.setItem("email", email);
      localStorage.setItem("senha", password);
      localStorage.setItem("token", data.token);  
      localStorage.setItem("nome", data.nome);
      // Salva o token
  
      // Navega para a página de conta
      navigate("/account", { state: { email, password } });
  
      console.log("Login bem-sucedido:", data);
    
    } catch (error) {
      setError(error.message);
      console.error("Erro ao fazer login:", error);
    }
  };
  

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <a className="Esenha">Esqueci minha senha!</a>
        <button type="submit" className="login-button">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
