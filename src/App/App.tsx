import newYoutubePlayer from 'youtube-player';
import { useEffect, useState } from 'react';
import Banner from '../Banner';
import NumberPopup from '../NumberPopup';
import Slider from '../Slider';
import YouTubeVideo from '../YouTubeVideo';
import './App.css';
import { YouTubePlayer } from 'youtube-player/dist/types';
import img1 from '../res/slider-images/image 1.png'
import img2 from '../res/slider-images/image 2.png'
import img3 from '../res/slider-images/image 3.png'


const videoSrc = 'https://www.youtube.com/embed/M7FIvfx5J10';

const App = () => {
    const [currentNumber, setCurrentNumber] = useState('');
    const [popupShown, setPopupShown] = useState(false);
    const [bannerShown, setBannerShown] = useState(true);
    const [sliderShown, setSliderShown] = useState(false);
    let player: YouTubePlayer;
    const openPopup = () => {
        setBannerShown(false);
        setPopupShown(true);
    }
    const openSlider = () => {
        setPopupShown(false);
        setSliderShown(true);
    }
    const setNumber = (num: string) => {
        if (num.length <= 10) {
            setCurrentNumber(num);
        }
    }
    const closePopup = () => {
        setPopupShown(false);
    }
    useEffect(() => {
        player = newYoutubePlayer('player-1');
        player.loadVideoById('M7lc1UVf-VE');
        player.playVideo();
    }, [])

    return (
        <div className='app'>
            <YouTubeVideo />
            {bannerShown ? <Banner btnOnClick={openPopup} /> : ''}
            {popupShown ? <NumberPopup
                setCurrentNumber={setNumber}
                currentNumber={currentNumber}
                closePopup={closePopup}
                openSlider={openSlider}
                /> : ''}
            {sliderShown ? <Slider images={[img1, img2, img3]} closeSlider={() => setSliderShown(false)} /> : ''}
        </div>
    )
}
export default App;
