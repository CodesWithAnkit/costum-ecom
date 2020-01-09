const express = require('express');
const bodyParser = require('body-parser');

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

app.post('/', (req, res) => {
  console.log(req.body);
  res.send('Account Created');
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Listen to the Port ${PORT}`));
