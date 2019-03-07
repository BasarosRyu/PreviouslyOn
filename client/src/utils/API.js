import axios from 'axios';


var instance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {'Content-Type': 'application/json'}
});



export function seriesAPI() {
    return instance.get('/allseries')
        .then( response => {
            return response;
        })
}

export function loginAPI(login, password) {
    return instance.post('/login', {
        login: login,
        password: password
    })
        .then( response => {
            return response.data;
        })
}

export function userAPI(id) {
    return instance.get('/user', {
        params: {
            id: id
        }
    })
        .then( response => {
            return response.data;
        })
}

export function oneSerieAPI(id) {
    return instance.get("/oneserie", {
        params: {
            id: id
        }
    })
        .then(response => {
            return response.data;
        })
}

export function addSerieAPI(id, token) {
    return instance.post('/addserie', {
        id: id,
        token: token
    })
        .then( response => {
            return response.data;
        })
}

export function storeSerieAPI(id, token) {
    return instance.post('/storeserie', {
        id: id,
        token: token
    })
        .then( response => {
            return response.data;
        })
}

export function destoreSerieAPI(id, token) {
    return instance.post('/destoreserie', {
            id: id,
            token: token
    })
        .then( response => {
            return response.data;
        })
}

export function listingEpisodesAPI(id) {
    return instance.get('/listepisodes', {
        params: {
            id: id
        }
    })
        .then( response => {
            return response.data
        })
}
