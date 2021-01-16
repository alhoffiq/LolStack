import { useEffect, useState } from 'react';
import axios from 'axios';

const Summoner = function () {
    const [summoner, setSummoner] = useState([]);
    const [name, setName] = useState('');
    useEffect(() => {
        fetchSummoner();
    }, []);

    async function fetchSummoner() {
        const { data } = await axios.get('/api/summoners');
        setSummoner(data);
    }

    const handleSubmit = event => {
        event.preventDefault();
        submitSummoner();
    };
    const submitSummoner = async () => {
        await axios.post('/api/summoners', { name: name });
        setName('');
    };

    return (
        <div>
            <h2>Summoner</h2>
            <h2>Summoner Name: {summoner.name}</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Summoner Name:</label>
                <input
                    name='name'
                    placeholder='Summoner'
                    type='text'
                    value={name}
                    onChange={event => setName(event.target.value)}
                />
                <br />
                <button type="submit" className="btn btn-primary">Post</button>
            </form>
        </div>
    );
};

export default Summoner;