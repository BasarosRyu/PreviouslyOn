import React, { Component } from 'react';
import './style/App.css';
import Header from './Header.js';
import { seriesAPI } from './utils/API';
import { Link } from 'react-router-dom';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            series : []
        }
    }

    componentDidMount() {
        seriesAPI().then((data) => {
            this.setState({
                series : data.data.shows
            })
        })
    }

    displaySeries() {
        return this.state.series.map(series => {
            return <div className="serie" key={series.id}>
                <Link to={ `/serie/${series.id}` }>
                    <img
                        src={series.images.box !== null ? series.images.box : `https://place-hold.it/464x113&text=${series.title}` }
                        alt={series.title}
                        className="seriesposter" />
                </Link>
            </div>
        })
    }

    render() {
        // console.log(this.state.series);
        return (
            <div className="App">
                <Header />
                <h1>À découvrir sur PreviouslyOn</h1>
                <div className="allseries">
                    {this.displaySeries()}
                </div>
            </div>
        );
    }
}

export default App;
