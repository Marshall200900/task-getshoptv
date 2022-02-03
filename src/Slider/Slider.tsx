import './Slider.css';
import Left from '../res/left-arrow.svg';
import LeftSelected from '../res/left-arrow-selected.svg';
import Right from '../res/right-arrow.svg';
import RightSelected from '../res/right-arrow-selected.svg';
import React, { useEffect, useState } from 'react';
import CloseButton from '../CloseButton';

interface SliderProps {
    images: string[],
    closeSlider: () => void,
}

const Slider: React.FC<SliderProps> = ({ images, closeSlider }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [focused, setFocused] = useState(0);
    const [selectedLeft, setSelectedLeft] = useState(false);
    const [selectedRight, setSelectedRight] = useState(false);
    const imagesObjects = images.map((el, id) => {
        return {
            id, el
        };
    });
    const setImage = (idx: number) => {
        if (idx <= -1) {
            setCurrentImage(images.length - 1);
        } else if (idx >= images.length) {
            setCurrentImage(0);
        } else {
            setCurrentImage(idx);
        }
    }
    useEffect(() => {
        if (focused === 0) {
            const el = document.getElementsByClassName('button left')[0] as HTMLDivElement;
            el.focus();    
        } else if (focused === 1) {
            const el = document.getElementsByClassName('button right')[0] as HTMLDivElement;
            el.focus();    
        } else if (focused === 2) {
            const el = document.getElementsByClassName('close-btn')[0] as HTMLDivElement;
            el.focus();    
        }
    })
    const keyPress = (e: React.KeyboardEvent<HTMLDivElement>, fc: () => void) => {
        if (e.key === 'Enter') {
            fc();
        }
    }
    const selectCurrentButton = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'ArrowLeft') {
            setFocused(focused === 0 ? focused : focused - 1);    
        } else if (e.key === 'ArrowRight') {
            setFocused(focused === 2 ? focused : focused + 1);    
        }
    }
    const closeSliderWrapper = () => {
        setFocused(2);
        closeSlider();
    }
    return (
        <div className="slider" onKeyDown={selectCurrentButton}>
            <div className="images">
                {imagesObjects.map((el) => {
                    return (
                        <img key={el.id} className={`image ${el.id === currentImage ? 'visible' : ''}`} src={el.el} alt="wonderful image" />
                    )
                })}
            </div>
            <div className="buttons">
                <div
                    tabIndex={1}
                    className='button left'
                    onClick={() => setImage(currentImage - 1)}
                    onKeyPress={(e) => keyPress(e, () => setImage(currentImage - 1))}
                    onFocus={() => {
                        setSelectedLeft(true);
                        setFocused(0);
                    }}
                    onBlur={() => setSelectedLeft(false)}>
                        <img
                        src={selectedLeft ? LeftSelected : Left}
                        />
                </div>
                <div
                    tabIndex={2}
                    className='button right'
                    onClick={() => setImage(currentImage + 1)}
                    onKeyPress={(e) => keyPress(e, () => setImage(currentImage + 1))}
                    onFocus={() => {
                        setFocused(1);
                        setSelectedRight(true);
                    }}
                    
                    onBlur={() => setSelectedRight(false)}>
                    <img
                        src={selectedRight ? RightSelected : Right}
                    />
                    </div>
            </div>
            <CloseButton tabIndex={3} close={closeSliderWrapper} onFocus={() => {}} />
        </div>
    )
}
export default Slider;