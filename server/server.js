// imports
var axios = require('axios');
var express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser')
var md5 = require('js-md5');

// instantier serveur et axios
var server = express();
server.use(cors());

server.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
server.use(bodyParser.json())

// création de l'instance axios
var instance = axios.create({
  baseURL: 'http://api.betaseries.com',
  headers: {
      'Content-Type': 'application/json',
      'X-BetaSeries-Key': 'e4b6bfcdcda5'
    }
});

// Configure routes

// Requete API pour toutes les séries à découvrir
server.get('/allseries', (req, res) => {
    instance
        .get('/shows/discover', {
            params: {
                limit : 20
            }
        })
        .then(response => {
            res.json(response.data);
        })
        .catch(error => {
            res.status(500).send('Une erreur est survenue');
        });
});

// requete API pour la connexion
server.post('/login', (req, res) => {
    instance
        .post('/members/auth', {
                login: req.body.login,
                password: md5(req.body.password)
        })
        .then((response) => {
            res.json(response.data)
        })
        .catch(error => {
            res.status(500).send('Utilisateur inconnu');
        })
})

// requete API pour l'Utilisateur
server.get('/user', (req, res) => {
    instance
        .get('/members/infos', {
            params: {
                id: req.query.id
            }
        })
        .then((response) => {
            res.json(response.data)
        })
        .catch(error => {
            res.status(500).send('Mais t\'es qui toi ?');
        })
})


//requete API pour une série
server.get('/oneserie', (req, res) => {
    instance
        .get('/shows/display', {
            params : {
                id: req.query.id
            }
        })
        .then( response => {
            res.json(response.data)
        })
        .catch(error => {
            res.status(500).send('On connait pas cette série');
        })
})

// requete API pour ajouter une série
server.post('/addserie', (req, res) => {
    instance
        .post('/shows/show', {
                id: req.body.id,
                token: req.body.token
        })
        .then((response) => {
            res.json(response.data)
        })
        .catch(error => {
            res.status(500).send('Internal error server');
        })
})

// requete API pour archiver une série
server.post('/storeserie', (req, res) => {
    instance
        .post('/shows/archive', {
            id: req.body.id,
            token: req.body.token
        })
        .then( response => {
            res.json(response.data)
        })
        .catch( error => {
            res.status(500).send('Internal error server');
        })
})

// requete API pour archiver une série
server.post('/destoreserie', (req, res) => {
    instance
        .delete('/shows/archive', {
            params: {
                id: req.body.id,
                token: req.body.token
            }
        })
        .then( response => {
            res.json(response.data)
        })
        .catch( error => {
            res.status(500).send('Internal error server...');
        })
})

// requete API pour lister les épisodes d'une série
server.get('/listepisodes', (req, res) => {
    instance
        .get('/shows/episodes', {
            params: {
                id: req.query.id
            }
        })
        .then( response => {
            res.json(response.data)
        })
        .catch( error => {
            res.status(500).send('Internal error server...');
        })
})



// Lancer serveur
server.listen(8080, function() {
    console.log('Démarrage du serveur');
});
