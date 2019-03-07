import React, { Component } from 'reactn';
import './style/PageSeries.css';
import Header from './Header.js';
import Waiting from './assets/pictures/giphy.gif';
import { oneSerieAPI, addSerieAPI, userAPI, storeSerieAPI, destoreSerieAPI, listingEpisodesAPI } from './utils/API';

class PageSeries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: window.location.pathname.split("/")[2],
            serie : undefined,
            episodes : undefined,
            displayEpisodes : undefined,
            displayEpisodeDetails: undefined,
        }
        this.addSerie = this.addSerie.bind(this);
        this.storeSerie = this.storeSerie.bind(this);
        this.destoreSerie = this.destoreSerie.bind(this);
        this.episodeslist = this.episodeslist.bind(this);
        this.episodeDetails = this.episodeDetails.bind(this);
        this.addEpisodeView = this.addEpisodeView.bind(this);
    }

    componentDidMount() {
        oneSerieAPI(this.state.id).then( data => {
            this.setState({serie: data.show})
        })
        listingEpisodesAPI(this.state.id).then( data => {
            this.setState({episodes: data.episodes})
        })
    }

    /**************************************************************\
    *       Ajouter ou une série // noter un épisode comme vu      *
    \**************************************************************/
    addSerie() {
        addSerieAPI(this.state.serie.id, this.global.user.token)
            .then( () => {
                userAPI(this.global.user.user.id).then(data => {
                    this.setGlobal({seriesUser: data.member})
                })
            })
    }

    addEpisodeView() {
        console.log('hey ça avance');
    }

    /**************************************************************\
    *       Ajouter ou retirer une série dans les archives         *
    \**************************************************************/
    storeSerie() {
        storeSerieAPI(this.state.serie.id, this.global.user.token)
            .then( () => {
                userAPI(this.global.user.user.id).then( data => {
                    this.setGlobal({seriesUser: data.member})
                })
            .then( () => {
                oneSerieAPI(this.state.id).then( data => {
                    this.setState({serie: data.show})
                })
            })
        })
    }

    destoreSerie() {
        destoreSerieAPI(this.state.serie.id, this.global.user.token)
            .then( () => {
                userAPI(this.global.user.user.id).then( data => {
                    this.setGlobal({seriesUser: data.member})
                })
            .then( () => {
                oneSerieAPI(this.state.id).then( data => {
                    this.setState({serie: data.show})
                })
            })
        })
    }


    /**************************************************************\
    *       Afficher un bouton pour ajouter ou dés/archiver        *
    \**************************************************************/
    buttonAddSerie() {
        if(this.global.user !== undefined && this.global.seriesUser !== undefined) {
            var series = this.global.seriesUser.shows.filter( series => series.title === this.state.serie.title)
            var add = true;

            this.global.seriesUser.shows.forEach((element) => {
                if(element.title === this.state.serie.title) {
                    add = false;
                }
            });

            if(add === true) {
                return <div className="add-button">
                    <span onClick={this.addSerie}>Ajouter la série</span>
                </div>
            }
            if(add === false) {
                return <div className="add-button">
                    {series[0].user.archived === false ?
                        <span onClick={this.storeSerie}>Archiver la série</span> :
                        <span onClick={this.destoreSerie}>Désarchiver la série</span>
                    }

                </div>
            }
        }
    }

    /**************************************************************\
    *       Afficher un bouton pour ajouter ou dés/archiver        *
    \**************************************************************/

    buttonView(episode) {
        return <div>
            <span onClick={this.addEpisodeView}>
                {episode.user.seen === false ? "Noter comme vu" : "Noter comme non vu"}
            </span>
        </div>
    }

    /**************************************************************\
    *       Afficher la liste des épisodes                         *
    \**************************************************************/

    episodeslist(season) {
        if(this.state.displayEpisodes === undefined) {
            this.setState({displayEpisodes: season})
        }
        if(this.state.displayEpisodes !== undefined && this.state.displayEpisodes !== season) {
            this.setState({displayEpisodes: season})
        }
        if(this.state.displayEpisodes !== undefined && this.state.displayEpisodes === season) {
            this.setState({displayEpisodes: undefined})
        }
    }

    episodeDetails(e) {
        e.target.parentNode.nextSibling.classList.toggle('displayDiv');
    }

    displayEpisodeDetails(episode) {
        console.log(episode);
        var date = new Date(episode.date);
            return <div>
                Date de diffusion : {date.getDate() >= 10 ? date.getDate() : "0" + date.getDate() }/{date.getMonth() +1 >= 10 ? date.getMonth()+1 : "0" + (date.getMonth()+1)}/{date.getFullYear()}
                <p>
                    <em> Description : {episode.description} </em>
                </p>
                <div>
                Notes : {Math.round(episode.note.mean*10)/10}
                </div>
            </div>
    }

    displayEpisodeBySeason() {
        if(this.state.episodes !== undefined && this.state.displayEpisodes !== undefined) {
            var listEpisodes = this.state.episodes.filter(episode => episode.season === this.state.displayEpisodes);
        }
        return listEpisodes.map( episode => {
            return <div>
                <div className="episodes" key={episode.id} >
                    <span className="name-episode" onClick={ (e) => {this.episodeDetails(e)}}>
                        Épisode {episode.episode} : {episode.title}
                    </span>
                    <span className="buttonview">
                        {this.buttonView(episode)}
                    </span>
                </div>
                <div className="PageSerieEpisodesDetails displayDiv" value={episode.id}>
                    {this.displayEpisodeDetails(episode)}
                </div>
            </div>
        })
    }


    /**************************************************************\
    *       Afficher la liste des saisons                          *
    \**************************************************************/
    displaySeason() {
        if(this.state.serie !== undefined) {
            return this.state.serie.seasons_details.map(season => {
                return <div className="seasons" key={season.id} onClick={ (e) => {this.episodeslist(season.number)}}>
                Saison {season.number}
                </div>
            })
        }
    }

    /**************************************************************\
    *       Afficher les détails de la série                       *
    \**************************************************************/
    displaySerie() {
        if(this.state.serie === undefined)  {
            return (
                <div className="wait">
                    <img src={ Waiting } alt='en attente'/>
                </div>
            )
        }
        if(this.state.serie !== undefined) {
            return <div className="container">
                <div className="PageSerieBan">
                    <img src={this.state.serie.images.banner} alt="ban" />

                </div>

                <div className="PageSerieBody">
                    <div className="add-serie">
                        {this.buttonAddSerie()}
                    </div>
                    <strong>{this.state.serie.title}</strong>
                    <br/>
                    <em>Genre : {this.state.serie.genres.join(', ')}</em>
                    <br/>
                    {this.state.serie.seasons} {this.state.serie.seasons > 1 ? "saisons" : "saison" }
                    &nbsp;-&nbsp;
                    {this.state.serie.episodes} {this.state.serie.episodes > 1 ? "épisodes" : "sépisode" } <em>({this.state.serie.length} minutes)</em>
                    <p>
                    {this.state.serie.description}
                    </p>
                    <span className="serie-note">
                    Notes : {Math.round(this.state.serie.notes.mean*10)/10}
                    </span>
                </div>

                <div className="PageSerieSeasons">
                    {this.displaySeason()}
                </div>
                <div className="PageSerieEpisodes">
                    {this.state.displayEpisodes !== undefined ? this.displayEpisodeBySeason() : null }
                </div>
                <div className="marginBottom">
                </div>
            </div>
        }
    }

    render() {
        return <div className="App">
            <Header />
            {this.displaySerie()}
        </div>
    }
}

export default PageSeries
