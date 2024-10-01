import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importe useNavigate do react-router-dom
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

  const navigate = useNavigate(); // Defina o hook para navegação

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    
    // Aqui você pode adicionar a lógica para enviar os dados para o backend

    // Redireciona o usuário para a página "Home"
    navigate("/home");
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
