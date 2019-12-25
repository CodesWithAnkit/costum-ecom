const express = require('express');

const app = express();

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

// MiddleWare function
const bodyParser = (req, res, next) => {
  if (req.method === 'POST') {
    req.on('data', data => {
      const parsed = data.toString('utf8').split('&');
      const formData = {};

      for (let pair of parsed) {
        const [key, value] = pair.split('=');
        formData[key] = value;
      }
      req.body = formData;
      next();
    });
  } else {
    next();
  }
};

app.post('/', bodyParser, (req, res) => {
  console.log(req.body);
  res.send('Account Created');
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Listen to the Port ${PORT}`));
