const express = require('express');
const bodyParser = require('body-parser');
const userRepo = require('./repository/users');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <div>
    <form method="POST">
    <input name="email" placeholder="Email">
    <input name="Password" placeholder="Password">
    <input name="passwordConformation" placeholder="Password Conformation">
    <button>SignUp</button>
</form>
</div>
    `);
});

app.post('/', async (req, res) => {
  const { email, password, passwordConformation } = req.body;

  const existingUser = await userRepo.getByOne({ email });
  if (existingUser) {
    return res.send('Email is used');
  }

  if (password !== passwordConformation) {
    return res.send('Password Must match');
  }

  res.send('Account Created');
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Listen to the Port ${PORT}`));
