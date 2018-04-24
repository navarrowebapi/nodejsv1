/**
 * Arquivo responsável por subir o servidor
 *   
 */

 //importando os pacotes
 var express = require('express');
 var app = express();
 var bodyParser = require('body-parser');
 var mongoose = require('mongoose');
 var Produto = require('./app/models/produto');

 //usando o MLAB
 mongoose.connect('mongodb://navas:navas123@ds014368.mlab.com:14368/nodejscrudapi');

 //usando o MongoDb LOCAL
 //mongoose.connect('mongodb://localhost/nome-do-banco');

 //Configurar o app para usar o body-parser
 app.use(bodyParser.urlencoded({ extended:true}));
 app.use(bodyParser.json());

//Definindo a porta onde o servidor vai responder
var port = process.env.port || 8000;

//Definindo as rotas
var router = express.Router();//intercepta todas as rotas

//MIDDLEWARE
router.use(function(req,res,next){
    //Poderão ser implementados middlewares de LOG, ERRO, VALIDAÇÕES etc..
    console.log("Interceptação pelo middleware ok");
    next();//esta função faz a api continuar, ir para a próxima API.
});

router.get('/', function(req,res){
    res.json({'message':'OK, rota de teste está funcionando'});
});

//Criando uma rota padrão para produtos, ou seja, tudo que for /api/produtos irá cair aqui
router.route('/produtos')
    //POST para produtos (criar um produto) acesso via 
    .post(function(req, res){
        var produto = new Produto();
        produto.nome = req.body.nome;
        produto.preco = req.body.preco;
        produto.descricao = req.body.descricao;

        produto.save(function(error){
            if(error)
                res.send("Erro ao tentar incluir um novo produto" + error);
            
            res.json({message:"Produto inserido com sucesso."});    
        });
    });



//Vincular a aplicação (app) com o motor de rotas
//Para esta aplicação vamos criar um caminho padrão para as APIs REST
app.use('/api', router);

app.listen(port);
console.log("API Server is up and running! on port " + port);