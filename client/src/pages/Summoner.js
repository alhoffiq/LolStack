import { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../hooks/auth';

const Summoner = function () {
    const { getProfile } = useAuth();
    const [masteries, setMasteries] = useState([]);
    const [score, setScore] = useState([]);
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

    // const handleSubmit = event => {
    //     event.preventDefault();
    //     submitSummoner();
    // };

    return (
        <div>
            <h2 className="sum-name">Hello, {getProfile().name}</h2>
            <h3 className="sum-name">Mastery Level: {score}</h3>
            <ol>
                {masteries.map(mastery => {
                    return (
                        <li key={mastery.championId}>
                            <div className="card mx-auto container">
                                <div className="row">
                                    <img src={`http://ddragon.leagueoflegends.com/cdn/11.1.1/img/champion/${mastery.champion.image.full}`} className="champ-img img-fluid" alt="champion"></img>
                                    <div className="card-body">
                                        <h2 className="card-title">{mastery.champion.name}</h2>
                                        <h3 className="card-text">Mastery level: {mastery.championLevel}</h3>
                                        <h4 className="card-text">Mastery points: {mastery.championPoints}</h4>
                                        <p className="card-text">{`Earned chest: ${mastery.chestGranted}`}</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
};

export default Summoner;