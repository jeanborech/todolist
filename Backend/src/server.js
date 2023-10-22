const app = require('./app');
require('dotenv').config();

const PORTA = process.env.PORTA || 3333;

app.listen(PORTA, () => console.log(`servidor rodando na porta ${PORTA}`));
