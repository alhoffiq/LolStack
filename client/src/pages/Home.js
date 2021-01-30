import carousel1 from '../assets/carousel/carousel1.png';
import carousel2 from '../assets/carousel/carousel2.png';
import carousel3 from '../assets/carousel/carousel3.png';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/auth';

function Home() {
    const { isLoggedIn } = useAuth();
    return (
        <div className="container home">
            <h3 className="text-center top title mx-auto">Welcome to LoLStack</h3>
            <div className="input-group mb-3"></div>
            <div className="input-group-prepend"></div>
            <div className="card text-white mb-3">
                <div>
                    <h3 className="card-title home-title text-center">A personalized look at how your favorite League of Legends champions stack up against each other.</h3>
                    {!isLoggedIn() ?
                        <>
                            <Link to="/signup" className="nav-link text-center"><h5 className="starter">Get started here!</h5></Link>
                        </>
                        :
                        <></>}
                </div>
                <div className="card-body">
                    <Carousel nextIcon="" nextLabel="" prevIcon="" prevLabel="" indicators={false}>
                        <Carousel.Item interval={3000}>
                            <img
                                className="d-block w-100"
                                src={carousel1}
                                alt="First slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item interval={3000}>
                            <img
                                className="d-block w-100"
                                src={carousel2}
                                alt="Second slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item interval={3000}>
                            <img
                                className="d-block w-100"
                                src={carousel3}
                                alt="Third slide"
                            />
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </div>
    );
}
export default Home;

