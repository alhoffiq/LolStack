import { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../hooks/auth';
import ChampCard from '../components/ChampCard';
import SearchChamp from '../components/SearchChamp';

const Summoner = function () {
    const { getProfile } = useAuth();
    const [masteries, setMasteries] = useState([]);
    const [score, setScore] = useState([]);
    const [show, setShow] = useState(10);

    useEffect(() => {
        fetchMasteries();
        fetchScore();
    }, []);

    async function fetchMasteries() { // gets an array of all champions played by a given summoner with attached mastery data
        const { data } = await axios.get('/api/riot/masteries');
        setMasteries(data);
        //console.log(data);
    }

    async function fetchScore() { // gets a given summoner's total mastery score
        const { data } = await axios.get('/api/riot/score');
        setScore(data);
    }

    return (
        <div>
            <div>
                {masteries.slice(0, 1).map(mastery => {
                    return (
                        <div className="row splash" key="splash">
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

            <div className="row text-center">
                <div className="col-2">
                    <button className="btn btn-primary" onClick={() => setShow(show + 10)}>Show more</button>
                </div>
                <div className="col-8">
                    <SearchChamp />
                </div>
                <div className="col-2">
                    <button className="btn btn-primary" onClick={() => setShow(masteries.length)}>Show all!</button>
                </div>
            </div>

            <ol>
                {masteries.slice(0, show).map(mastery => {
                    return (
                        <ChampCard mastery={mastery} key={mastery.championId} />
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