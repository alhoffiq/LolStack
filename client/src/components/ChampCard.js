import lolchest from '../assets/lolchest.png';

const ChampCard = ({ mastery }) => {

    return (
        <li key={mastery.championId}>
            <div className="card mx-auto">
                <div className="row champCard">
                    <div className="col-3"><img className="cardImg" src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${mastery.champion.id}_0.jpg`} alt="champion"></img></div>
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
};

export default ChampCard;