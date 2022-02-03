import BtnClose from '../res/btn-close.svg';
import BtnCloseHover from '../res/btn-close-hover.svg';
import { useEffect, useState } from 'react';
import './CloseButton.css';

interface CloseButtonProps {
    close: () => void;
    onFocus: () => void
}

const CloseButton: React.FC<CloseButtonProps> = ({ close, onFocus }) => {

    const [currentImg, setCurrentImg] = useState(BtnClose);
    const numberPressedEvent = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            close();
        }
    }
    return (
        <div
            tabIndex={14}
            className="close-btn"
            onClick={close}
            onKeyPress={numberPressedEvent}
            onFocus={() => {
                setCurrentImg(BtnCloseHover);
                onFocus();
            }}
            onBlur={() => setCurrentImg(BtnClose)}
        >
            <img src={currentImg} alt="btn close" />
        </div>
    )
}
export default CloseButton;
