import React, { Component } from 'reactn';
import './style/Profil.css';
import Header from './Header.js';
import Waiting from './assets/pictures/giphy.gif';
import { userAPI } from './utils/API';
import UserPng from './assets/pictures/user.png';
import { Link } from 'react-router-dom';

class Profil extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profil : undefined
        }
    }

    componentDidMount() {
        if(this.global.user !== undefined) {
            userAPI(this.global.user.user.id).then(data => {
                this.setState({profil: data.member})
                this.setGlobal({seriesUser: data.member})
            })
        }
    }

    renderRedirect = () => {
        if (this.global.user === undefined) {
            this.props.history.push(`/`)
        }
    }

    displaySeries(params) {
        if(this.state.profil === undefined)  {
            return (
                <div className="wait">
                <img src={ Waiting } alt='en attente'/>
                </div>
            )
        }
        if(this.state.profil !== undefined) {
            var listseries = this.state.profil.shows.filter(series => series.user.archived === params);

            return listseries.map(series => {
                return <div className="seriesdetails" key={series.id}>
                    <div className="seriesdisplay">
                        <div className="seriesPoster">
                            <img className="imgseries" alt="series" src={ this.state.profil === null ? `https://place-hold.it/125x200&text=${series.title}` : series.images.box } />
                            <img className="imgseries" alt="series" src={ this.state.profil === null ? `https://place-hold.it/125x200&text=${series.title}` : series.images.show } />
                        </div>
                        <div className="seriesinfos">
                            <div className="title-series">
                                {series.title}
                                <span className="margin-left-describe">
                                </span>
                            </div>
                            <em>Genre : {this.state.profil === null ? "Non renseigné" : series.genres.join(", ")} </em>
                            <br/>
                            {this.state.profil === null ? "Some text" : series.description.length > 400 ? series.description.slice(0, 400) + "..." : series.description }
                            <p>
                            Nombres de saisons : {this.state.profil === null ? "Non renseigné" : series.seasons}
                            <span className="margin-left-describe">
                                Nombres d'épisodes : {this.state.profil === null ? "Non renseigné" : series.episodes}
                            </span>
                            <span className="margin-left-describe more">
                                { this.state.profil === null ? null : <Link to={ `/serie/${series.id}` }>En savoir plus</Link>}
                            </span>
                            </p>

                        </div>
                    </div>
                </div>
            })
        }
    }


    render() {
        this.renderRedirect();
        return (
            <div className="App">
                <Header />
                <div className="Profil-container">
                    <div className="profil">
                        <div className="profil-content">
                            <div className="avatar-border">
                                <img src={ this.state.profil === undefined ?  UserPng : this.state.profil.avatar } alt="avatar" className="avatar"/>
                            </div>
                            <h2>{ this.state.profil === undefined ? "inconnu" : this.state.profil.login }</h2>
                            <span className="stats">
                            <em>Amis :</em> { this.state.profil === undefined ? "0" : this.state.profil.stats.friends }
                            <br/>
                            <em>Séries :</em> { this.state.profil === undefined ? "0" : this.state.profil.stats.shows }
                            </span>
                        </div>
                    </div>
                    <div className="viewsSeries">
                        <div className="title-series">
                            Vos séries
                        </div>
                        <div className="series-content">
                        {this.displaySeries(false)}

                            <div className="list-archived">
                                <div className="title-series">
                                    Vos séries archivées
                                </div>
                                {this.displaySeries(true)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profil;
