import React, { useState, useEffect } from "react";
import "./entrar.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Carrega o email e a senha do localStorage
    const storedEmail = localStorage.getItem("email");
    const storedSenha = localStorage.getItem("senha");

    if (storedEmail) setEmail(storedEmail);
    if (storedSenha) setPassword(storedSenha);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:3002/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Erro ao fazer login");
      }
      
      const data = await response.json();
      
      // Armazena o email, a senha e o token no localStorage
      localStorage.setItem("email", email.token);
      localStorage.setItem("senha", password.token);
      localStorage.setItem("token", data);  // Salva o token
      
      // Aqui você pode lidar com a resposta de sucesso (por exemplo, redirecionar o usuário)
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
