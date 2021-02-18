import { useState } from 'react';
import axios from 'axios';
import ChampCard from '../components/ChampCard';

const Search = () => {
    const [summoner, setSummoner] = useState('');
    const [summonerName, setSummonerName] = useState('');
    const [masteries, setMasteries] = useState([]);
    const [score, setScore] = useState([]);
    const [show, setShow] = useState(10);

    const handleSubmit = event => {
        event.preventDefault();
        setShow(10);
        searchMasteries(summoner);
    };

    async function searchMasteries() {
        const { data } = await axios({
            method: 'post',
            url: '/api/riot/search/mastery',
            data: { summoner: summoner },
        });
        setMasteries(data.masteries);
        setSummonerName(data.summoner.name);
        searchScore(data.summoner.id);
        unhideBtns();
    }

    async function searchScore(id) {
        const { data } = await axios({
            method: 'post',
            url: '/api/riot/search/score',
            data: { id: id },
        });
        setScore(data);
    }

    async function unhideBtns() {
        const btns = document.getElementsByClassName('hide');
        while (btns.length) {
            btns[0].classList.remove('hide');
        }
    }


    return (
        <div>
            <div className="card">
                <h3 className="text-center card-title">Search</h3>
                <div className='row justify-content-center'>
                    <form onSubmit={handleSubmit}>
                        <div className='row justify-content-center'>
                            <label htmlFor='email'>Summoner Name </label>
                        </div>
                        <div className='row justify-content-center'>
                            <input
                                className='form-control'
                                name='summoner'
                                type='summoner'
                                value={summoner}
                                onChange={event => setSummoner(event.target.value)}
                            />
                        </div>
                        <div className='row justify-content-center'>
                            <button type='submit' className='btn btn-dark'>Search!</button>
                        </div>
                    </form>
                </div>
            </div>
            <div>
                <div>
                    {masteries.slice(0, 1).map(mastery => {
                        return (
                            <div className="row splash" key="splash">
                                <div className="col-lg">
                                    <div className="img-container">
                                        <div className="positioning">
                                            <h1 className="sum-name">{summonerName}</h1>
                                            <h3 className="sum-name">Mastery Level: {score}</h3>
                                        </div>
                                        <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${mastery.champion.id}_0.jpg`} alt="champ splash"></img>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <ol>
                    {masteries.slice(0, show).map(mastery => {
                        return (
                            <ChampCard mastery={mastery} key={mastery.championId} />
                        );
                    })}
                </ol>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-primary hide" onClick={() => setShow(show + 10)}>Show more</button>
                    <button className="btn btn-primary hide" onClick={() => setShow(masteries.length)}>Show all!</button>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </div>
        </div>
    );
};

export default Search;