import React, { Component } from 'reactn';
import './style/Header.css';
import UserPng from './assets/pictures/user.png';
import { Link } from 'react-router-dom';
import Connexion from './Connexion.js';

class Header extends Component {

    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if(this.global.connexion === false) {
            this.setGlobal({
                connexion: true
            })
        }
        else {
            this.setGlobal({
                connexion: false
            })
        }
    }

    render() {
        return (
            <div className="Header">
                <div className="header-navbar">
                    <div className="header-logo">
                        <Link to="/">Previously On</Link>
                    </div>
                    <div className="header-compte">
                        {this.global.user !== undefined ? this.global.user.user.login : null}
                        <img onClick={this.handleClick} src={ UserPng } alt='icone user'/>
                        { this.global.connexion === true ?  <Connexion/> : null }
                    </div>
                </div>

            </div>
        )
    }
}

export default Header;
