import { useEffect } from 'react';
import YouTubePlayer from 'youtube-player';
import './YouTubeVideo.css';

const Video: React.FC = () => {
    useEffect(() => {
        let player = YouTubePlayer('player-1');

        player.loadVideoById('M7lc1UVf-VE');
        
        player.playVideo();

    }, [])
    return (
        <div tabIndex={-1} id='player-1'></div>
    );
};
export default Video;
