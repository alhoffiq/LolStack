import { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../hooks/auth';

const Summoner = function () {
    const { getProfile } = useAuth();
    const [masteries, setMasteries] = useState([]);
    const [, setChampions] = useState([]);
    useEffect(() => {
        fetchMasteries();
        fetchChampions();
    }, []);

    async function fetchMasteries() {
        const { data } = await axios.get('/api/riot/masteries');
        setMasteries(data);
        console.log(data);
    }

    async function fetchChampions() {
        const { data } = await axios.get('/api/riot/champions');
        setChampions(data);
        console.log(data);
    }

    // const handleSubmit = event => {
    //     event.preventDefault();
    //     submitSummoner();
    // };
    // http://ddragon.leagueoflegends.com/cdn/11.1.1/img/champion/
    return (
        <div>
            <h2>Summoner</h2>
            <h2>Summoner Name: {getProfile().name}</h2>
            <ol>
                {masteries.map(mastery => {
                    return (
                        <li key={mastery.championId}>
                            <div className="card">
                                <img src={`http://ddragon.leagueoflegends.com/cdn/11.1.1/img/champion/${mastery.champion.image.full}`} className="card-img-top" alt="..."></img>
                                <div className="card-body">
                                    <h2 className="card-title">{mastery.champion.name}</h2>
                                    <h3 className="card-text">Mastery level: {mastery.championLevel}</h3>
                                    <h4 className="card-text">Mastery points: {mastery.championPoints}</h4>
                                    <p className="card-text">{`Earned chest: ${mastery.chestGranted}`}</p>
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