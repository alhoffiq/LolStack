import { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../hooks/auth';

const Summoner = function () {
    const { getProfile } = useAuth();
    const [masteries, setMasteries] = useState([]);
    useEffect(() => {
        fetchMasteries();
    }, []);

    async function fetchMasteries() {
        const { data } = await axios.get('/api/riot/masteries');
        setMasteries(data);
        console.log(data);
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
                            {JSON.stringify(mastery)}
                        </li>
                    );
                })}
            </ol>
        </div>
    );
};

export default Summoner;