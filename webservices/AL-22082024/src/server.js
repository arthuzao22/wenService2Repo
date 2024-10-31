import express from "express";
import jsonwebtoken from "jsonwebtoken";

const api = express();
api.use(express.json());

api.get("/", (_, res) =>
  res.status(200).json({
    message: "Esta é a rota pública",
  })
);

api.get('login', (req, res) => {
  const [, hash] = req.headers.authorization?.split(" ") || [" "," "];
  const [email, password] = Buffer.from(hash, "base64").toString().split(":");

  try {
    const correctPassword = email === "zezinho@gmail.com" && password === "123456";

    if(!correctPassword) {
      return res.status(401).send("Senha ou e-mail inválido");
    }

    const token = jsonwebtoken.sign(
      { user: JSON.stringify(user) },
      PRIVATE_KEY,
      { expiresIn: "60m"}
    );

    return res.status(200).json({data: {user, token}});

  } catch (error) {
    console.log('Erro ao logar: ', error);
    return res.send(error);
  }

})

api.use("*", tokenValidated);

api.get("/private", (req, res) => {
    const {user} = req.headers;
    const currentUser = JSON.parse(user);

    return res.status(200).json({
        message: "Esta é uma rota privada",
        data: {
            userLogged: currentUser,
        }
    })
})

const port = 8081;
api.listen(port, () => {
  console.log(`Aplicação rodando na porta ${port}`);
});



