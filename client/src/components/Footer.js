import fbIcon from '../assets/f_logo_RGB-Blue_58.png';
import gitIcon from '../assets/GitHub-Mark-Light-64px.png';
import lolIcon from '../assets/League-of-Legends.png';
import twitterIcon from '../assets/twitter.png';

const Footer = () => {
    return (
        <footer className="footer container">
            <p className="text-center">LoLStack 2021</p>
            <div className="row">
                <div className="col d-flex justify-content-center">
                    <a href="http://leagueoflegends.com" target="_blank" rel="noreferrer"><img src={lolIcon} alt="League of Legends"></img></a>
                </div>
                <div className="col d-flex justify-content-center">
                    <a href="https://www.facebook.com/lolstack" target="_blank" rel="noreferrer"><img src={fbIcon} alt="facebook"></img></a>
                </div>
                <div className="col d-flex justify-content-center">
                    <a href="https://twitter.com/lol_stack" target="_blank" rel="noreferrer"><img src={twitterIcon} alt="twitterk"></img></a>
                </div>
                <div className="col d-flex justify-content-center">
                    <a href="https://github.com/alhoffiq/LolStack" target="_blank" rel="noreferrer"><img src={gitIcon} alt="GitHub"></img></a>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
