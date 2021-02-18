import lolchest from '../assets/lolchest.png';

const ChampCard = ({ mastery }) => {

    return (
        <li key={mastery.championId}>
            <div className="card mx-auto">
                <div className="row champCard">
                    <div className="col-3 card-img"><img className="card-img" src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${mastery.champion.id}_0.jpg`} alt="champion"></img></div>
                    <div className="col">
                        <div className="card-body">
                            <a href={`https://leagueoflegends.fandom.com/wiki/${mastery.champion.name}`} target="_blank" rel="noreferrer"><h2 className="card-title card-data">{mastery.champion.name} -- {mastery.champion.title}</h2></a>
                            <h3 className="card-text card-data">Mastery level: {mastery.championLevel}</h3>
                            <h4 className="card-text card-data">Mastery points: {mastery.championPoints}</h4>
                            <br></br>
                            <div className="row">
                                <div className="col card-img-mob">
                                    <img className="card-img-mob card-data chest-img" src={`http://ddragon.leagueoflegends.com/cdn/11.4.1/img/champion/${mastery.champion.id}.png`} alt="champion"></img>
                                </div>
                                <div className="col">
                                    <img src={lolchest} alt="lol chest" className={`chest-img card-data ${!mastery.chestGranted ? 'grey' : ''}`}></img>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default ChampCard;