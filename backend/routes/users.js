var express = require('express');
var router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

/* POST create user. */
router.post('/', async (req, res, next) => {
  const { nome, sobrenome, cpf, rg, data_rg, expedidor_rg, email, senha, telefone } = req.body;
  console.log(req.body);

  try {
    const user = await prisma.user.create({
      data: {
        nome,
        sobrenome,
        cpf,
        rg,
        data_rg: new Date(data_rg), // Certifique-se que a data está no formato correto
        expedidor_rg,
        email,
        senha,
        telefone,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    if (error.code === 'P2002') {
      // Conflito, geralmente quando um valor único já existe
      return res.status(400).json({ error: 'Email, CPF ou RG já cadastrado.' });
    }
    next(error);
  }
});

module.exports = router;
