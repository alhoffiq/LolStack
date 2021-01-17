import { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../hooks/auth';

const Summoner = function () {
    const { getProfile } = useAuth();
    const [masteries, setMasteries] = useState([]);
    const [champions, setChampions] = useState([]);
    const [, setMergedChamps] = useState([]);
    useEffect(() => {
        fetchMasteries();
        fetchChampions();
        mergeChampions();
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

    function mergeChampions() {
        setMergedChamps(masteries.map(t1 => ({ ...t1, ...champions.find(t2 => t2.data.key === t1.championId) })));
        console.log('--------------------------------');
        console.log(masteries.map(t1 => ({ ...t1, ...champions.find(t2 => t2.data.key === t1.championId) })));
        console.log('--------------------------------');
    }

    // const handleSubmit = event => {
    //     event.preventDefault();
    //     submitSummoner();
    // };

    return (
        <div>
            <h2>Summoner</h2>
            <h2>Summoner Name: {getProfile().name}</h2>
            <ol>
                {masteries.map(mastery => {
                    return (
                        <li key={mastery.championId}>
                            <div className="card">
                                <img src="..." className="card-img-top" alt="..."></img>
                                <div className="card-body">
                                    <h5 className="card-title">{mastery.championId}</h5>
                                    <h6 className="card-text">Mastery level: {mastery.championLevel}</h6>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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