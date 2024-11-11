import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importando useNavigate
import "./create.css";

const Create = () => {
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    cpf: '',
    rg: '',
    data_rg: '',
    expedidor_rg: '',
    email: '',
    senha: '',
    telefone: '',
  });

  const [users, setUsers] = useState([]); // Estado para armazenar a lista de usuários
  const navigate = useNavigate(); // Hook para navegação

  // Função para atualizar os dados do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita o envio padrão do formulário

    // Verificação manual dos campos obrigatórios
    const allFieldsFilled = Object.values(formData).every(field => field.trim() !== '');

    if (!allFieldsFilled) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const response = await fetch("http://localhost:3002/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar conta");
      }

      // Adiciona o novo usuário ao estado users
      setUsers((prevUsers) => [...prevUsers, formData]);
      console.log("Conta criada com sucesso");

      // Navegação para a nova página
      navigate(" /login", { state: { users: [...users, formData] } }); // Passa a lista de usuários

    } catch (error) {
      console.error("Erro:", error);
    } finally {
      // Limpa o formulário após o envio
      setFormData({
        nome: '',
        sobrenome: '',
        cpf: '',
        rg: '',
        data_rg: '',
        expedidor_rg: '',
        email: '',
        senha: '',
        telefone: '',
      });
    }
  };

  return (
    <main className="corpo">
      <div className="container">
        <h1>Criar Conta</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nome">Nome:</label>
          <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />

          <label htmlFor="sobrenome">Sobrenome:</label>
          <input type="text" id="sobrenome" name="sobrenome" value={formData.sobrenome} onChange={handleChange} required />

          <label htmlFor="cpf">CPF:</label>
          <input type="text" id="cpf" name="cpf" value={formData.cpf} onChange={handleChange} required />

          <label htmlFor="rg">RG:</label>
          <input type="text" id="rg" name="rg" value={formData.rg} onChange={handleChange} required />

          <label htmlFor="data_rg">Data de Emissão do RG:</label>
          <input type="date" id="data_rg" name="data_rg" value={formData.data_rg} onChange={handleChange} required />

          <label htmlFor="expedidor_rg">Órgão Expedidor do RG:</label>
          <select id="expedidor_rg" name="expedidor_rg" value={formData.expedidor_rg} onChange={handleChange} required>
            <option value="">Selecione um estado</option>
            <option value="AC">Acre (AC)</option>
            <option value="AL">Alagoas (AL)</option>
            <option value="AP">Amapá (AP)</option>
            <option value="AM">Amazonas (AM)</option>
            <option value="BA">Bahia (BA)</option>
            <option value="CE">Ceará (CE)</option>
            <option value="DF">Distrito Federal (DF)</option>
            <option value="ES">Espírito Santo (ES)</option>
            <option value="GO">Goiás (GO)</option>
            <option value="MA">Maranhão (MA)</option>
            <option value="MT">Mato Grosso (MT)</option>
            <option value="MS">Mato Grosso do Sul (MS)</option>
            <option value="MG">Minas Gerais (MG)</option>
            <option value="PA">Pará (PA)</option>
            <option value="PB">Paraíba (PB)</option>
            <option value="PR">Paraná (PR)</option>
            <option value="PE">Pernambuco (PE)</option>
            <option value="PI">Piauí (PI)</option>
            <option value="RJ">Rio de Janeiro (RJ)</option>
            <option value="RN">Rio Grande do Norte (RN)</option>
            <option value="RS">Rio Grande do Sul (RS)</option>
            <option value="RO">Rondônia (RO)</option>
            <option value="RR">Roraima (RR)</option>
            <option value="SC">Santa Catarina (SC)</option>
            <option value="SP">São Paulo (SP)</option>
            <option value="SE">Sergipe (SE)</option>
            <option value="TO">Tocantins (TO)</option>
          </select>

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

          <label htmlFor="senha">Senha:</label>
          <input type="password" id="senha" name="senha" value={formData.senha} onChange={handleChange} required />

          <label htmlFor="telefone">Telefone:</label>
          <input type="tel" id="telefone" name="telefone" value={formData.telefone} onChange={handleChange} required />

          <button type="submit" id="turn">Criar</button>
        </form>
      </div>
    </main>
  );
};

export default Create;
