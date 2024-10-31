const express = require("express");
const cors = require("cors"); // ativa a permição para usar a cors

const app = express();

app.use(express.json());
app.use(cors()); // ativa a permição para usar a cors

// porta para usar o localhost
app.listen(45678, () => { 
    console.log(`Aplicação rodando na porta 45678`);
})

// retorna só um pelo ID passado depois do numero
// app.get("/game/:id", (req, res) => { 
//     if (isNaN(req.params.id)) {
//         res.send('isso nao é um numero')
//     }else
//     {
//         res.send('isso é um numero')
//     }
// });

//http://localhost:45678/game/65 - retorna o id do banco de dados do numero 65
// caso for um que nao existe, da erro

app.get("/game/:id", (req, res) => { 
    if (isNaN(req.params.id)) {
        res.sendStatus(400)
    }else
    {
        const id = parseInt(req.params.id);

        const game = DB.games.find( g => g.id == id);

        // verifica se o id existe, se ele existir retorna 
        if(game != undefined){
            res.statusCode = 200
            res.json(game);
        }else{
            res.sendStatus(404)
        }
    }
});

// retorna todos
app.get("/game", (req,res) => { 
    res.statusCode = 200;
    res.json(DB.games);
})

// serve para criar um novo
app.post("/game",(req, res) => { 
    var {id, title, price, year} = req.body;
    DB.games.push({
        id,
        title,
        price,
        year
    });
    res.sendStatus(200);
})

// banco de dados fake da API
var DB = {
    games: [
        {
            id: 23,
            title: "The last of us part II",
            year: 2020,
            price: 130
        },
        {
            id: 65,
            title: "The legend of Zelda: breath of the wild",
            year: 2017,
            price: 150
        },
        {
            id: 2,
            title: "Grand Theft Auto IV",
            year: 2008,
            price: 20
        }
    ]
}