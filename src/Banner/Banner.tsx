import { useEffect, useRef, useState } from 'react';
import QRImage from '../res/qr.svg';
import './Banner.css';

interface BannerProps {
    btnOnClick: (popup: boolean) => void; 
}

const Banner: React.FC<BannerProps> = ({ btnOnClick }) => {
    const [hidden, setHidden] = useState(true);
    const btnRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        btnRef.current?.focus();
        setTimeout(() => {
            setHidden(false);
        }, 5000);
    }, []);

    return (
        <div className={`banner ${hidden ? 'hidden' : ''}`}>
            <span className="primary-text">ИСПОЛНИТЕ МЕЧТУ ВАШЕГО МАЛЫША!<br />ПОДАРИТЕ ЕМУ СОБАКУ!</span>
            <img className="qr-image" src={QRImage} alt="QR" />
            <span className="secondary-text">Сканируйте QR-код или нажмите ОК</span>
            <button ref={btnRef} onClick={() => btnOnClick(true)} className="ok-button">OK</button>
        </div>
    );
};
export default Banner;
