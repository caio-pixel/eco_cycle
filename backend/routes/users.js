var express = require('express');
var router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const bcrypt = require('bcryptjs');

// POST create user
router.post('/', async (req, res, next) => {
  const { nome, sobrenome, cpf, rg, data_rg, expedidor_rg, email, senha, telefone } = req.body;
  
  try {
    // Fazer o hash da senha antes de salvar
    const hashedSenha = await bcrypt.hash(senha, 10);

    const user = await prisma.user.create({
      data: {
        nome,
        sobrenome,
        cpf,
        rg,
        data_rg: new Date(data_rg),
        expedidor_rg,
        email,
        senha: hashedSenha,  // Salvar a senha hashada
        telefone,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Email, CPF ou RG já cadastrado.' });
    }
    next(error);
  }
});


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

router.post('/login', async (req, res, next) => {
  const { email, senha } = req.body;

  try {
    // Verificar se o usuário existe
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ error: 'Email ou senha incorretos.' });
    }

    // Comparar a senha
    const isPasswordValid = await bcrypt.compare(senha, user.senha);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Email ou senha incorretos.' });
    }

    // Gerar o token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    // Enviar o token no response
    res.json({ token });
  } catch (error) {
    next(error);
  }
});




module.exports = router;
