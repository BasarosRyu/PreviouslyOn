import React, { Component } from 'reactn';
import './style/Header.css';
import './style/Connexion.css';
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import {loginAPI, userAPI } from './utils/API';

class Connexion extends Component {
    constructor() {
        super();
        this.state = {
            login: '',
            password: '',
            connexionError: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDeco = this.handleDeco.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }

    handleLogin(event) {
        this.setState({login: event.target.value});
    }

    handlePassword(event) {
        this.setState({password: event.target.value});
    }


    handleDeco() {
        this.setGlobal({user : undefined});
    }

    handleSubmit(event) {
        event.preventDefault();
        loginAPI(this.state.login, this.state.password)
            .then( data => {
                this.setState({ connexionError : '' })
                this.setGlobal({
                    user : data,
                    connexion : false
                })
            })
            .catch( error => {
                this.setState({ connexionError : "Utilisateur inconnu" })
            })

        if(this.global.user !== undefined) {
            userAPI(this.global.user.user.id).then(data => {
                this.setGlobal({seriesUser: data.member})
            })
        }
    }

    DisplayConnexion() {
        if(this.global.user === undefined) {
            return (
                <div className="login">
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Control type="text" placeholder="Mail or Username" value={this.state.login} onChange={this.handleLogin}/>
                        </Form.Group>
                    <Form.Group>
                        <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.handlePassword}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Se connecter
                    </Button>
                    </Form>
                    <span className="error">
                        {this.state.connexionError}
                    </span>
                </div>
           )
        }
        else {
            return (
                <div>
                    <Link to="/profil">Profil </Link>
                   <div onClick={this.handleDeco}>Se déconnecter</div>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="connexion">
                <div  className="title-popin">
                    Mon Compte
                </div>
                <div className="button-connexion">
                     {this.DisplayConnexion()}
                </div>
            </div>
        )
    }
}

export default Connexion
