import { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../hooks/auth';
import lolchest from '../assets/lolchest.png';

const Summoner = function () {
    const { getProfile } = useAuth();
    const [masteries, setMasteries] = useState([]);
    const [score, setScore] = useState([]);
    const [show, setShow] = useState(10);

    useEffect(() => {
        fetchMasteries();
        fetchScore();
    }, []);

    async function fetchMasteries() {
        const { data } = await axios.get('/api/riot/masteries');
        setMasteries(data);
    }

    async function fetchScore() {
        const { data } = await axios.get('/api/riot/score');
        setScore(data);
    }

    return (
        <div>
            <div>
                {masteries.slice(0, 1).map(mastery => {
                    return (
                        <div className="row" key="splash">
                            <div className="col-lg">
                                <div className="img-container">
                                    <div className="positioning">
                                        <h1 className="sum-name">{getProfile().name}</h1>
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
                        <li key={mastery.championId}>
                            <div className="card mx-auto">
                                <div className="row">
                                    <div className="col-3"><img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${mastery.champion.id}_0.jpg`} alt="champion"></img></div>
                                    <div className="col">
                                        <div className="card-body">
                                            <a href={`https://leagueoflegends.fandom.com/wiki/${mastery.champion.name}`} target="_blank" rel="noreferrer"><h2 className="card-title">{mastery.champion.name} -- {mastery.champion.title}</h2></a>
                                            <h3 className="card-text">Mastery level: {mastery.championLevel}</h3>
                                            <h4 className="card-text">Mastery points: {mastery.championPoints}</h4>
                                            <br></br>
                                            <img src={lolchest} alt="lol chest" className={`chest-img ${!mastery.chestGranted ? 'grey' : ''}`}></img>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ol>
            <div className="d-flex justify-content-center">
                <button className="btn btn-primary" onClick={() => setShow(show + 10)}>Show more</button>
                <button className="btn btn-primary" onClick={() => setShow(masteries.length)}>Show all!</button>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </div> // Jank solution to get the buttons above the footer :)
    );
};

export default Summoner;