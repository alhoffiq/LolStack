import { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../hooks/auth';

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
        console.log(data[0]);
    }

    async function fetchScore() {
        const { data } = await axios.get('/api/riot/score');
        setScore(data);
    }

    return (
        <div>
            <h2 className="sum-name">Hello, {getProfile().name}</h2>
            <h3 className="sum-name">Mastery Level: {score}</h3>
            <ol>
                {masteries.slice(0, show).map(mastery => {
                    return (
                        <li key={mastery.championId}>
                            <div className="card mx-auto">
                                <div className="row">
                                    <div className="col-3"><img src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${mastery.champion.id}_0.jpg`} alt="champion"></img></div>
                                    <div className="col-6">
                                        <div className="card-body">
                                            <h2 className="card-title">{mastery.champion.name} -- {mastery.champion.title}</h2>
                                            <h3 className="card-text">{mastery.champion.title}</h3>
                                            <h3 className="card-text">Mastery level: {mastery.championLevel}</h3>
                                            <h4 className="card-text">Mastery points: {mastery.championPoints}</h4>
                                            <p className="card-text">{`Earned chest: ${mastery.chestGranted}`}</p>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ol>
            <button className="btn btn-primary" onClick={() => setShow(show + 10)}>Show more!</button>
        </div>
    );
};

export default Summoner;