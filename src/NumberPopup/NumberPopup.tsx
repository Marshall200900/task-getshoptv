import React, { useEffect, useRef, useState } from 'react';
import CloseButton from '../CloseButton';
import CheckboxChecked from '../res/checkbox-checked.svg';
import Checkbox from '../res/checkbox.svg';

import QRImage from '../res/qr.svg';

import './NumberPopup.css';

interface NumberPopupProps {
    closePopup: () => void;
    openSlider: () => void;
    setCurrentNumber: (number: string) => void;
    currentNumber: string;
}

const NumberPopup: React.FC<NumberPopupProps> = ({ closePopup, setCurrentNumber, openSlider, currentNumber }) => {
    const [checkboxChecked, setCheckboxChecked] = useState(false);
    const [currentFocus, setCurrentFocus] = useState([0, 0]);
    const renderNumber = (currentNumber: string) => {
        const arr = currentNumber.padEnd(10);
        let idx = 0;
        const number = '+7(___)___-__-__'.split('').map((el) => {
            if (arr[idx] === ' ') return el;
            if (el === '_') {
                return arr[idx++];
            }
            return el
        });
        return number.join('');
    }
    const validated = () => {
        return currentNumber.length === 10 && checkboxChecked;
    }
    const elementsOnScreen = [
        ['1', '2', '3', 'x'],
        ['4', '5', '6', 'x'],
        ['7', '8', '9', 'x'],
        ['clear', '0', 'x'],
        ['agreement', 'x'],
        ['confirm', 'x'],
    ]
    const arrayOfButtons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'СТЕРЕТЬ', '0'];
    const arrowEvents = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'ArrowRight') {
            if (elementsOnScreen[currentFocus[0]][currentFocus[1] + 1]) {
                setCurrentFocus([currentFocus[0], currentFocus[1] + 1]);
            }
        } else if (e.key === 'ArrowLeft') {
            if (elementsOnScreen[currentFocus[0]][currentFocus[1] - 1]) {
                setCurrentFocus([currentFocus[0], currentFocus[1] - 1]);
            }
        } else if (e.key === 'ArrowDown') {
            if (elementsOnScreen[currentFocus[0] + 1]) {
                if (currentFocus[0] === 2 && currentFocus[1] > 0) {
                    setCurrentFocus([currentFocus[0] + 1, currentFocus[1] - 1]);
                } else if (currentFocus[0] === 3 && currentFocus[1] === 1) {
                    setCurrentFocus([currentFocus[0] + 1, 0]);

                } else {
                    setCurrentFocus([currentFocus[0] + 1, currentFocus[1]]);
                }
            }
        } else if (e.key === 'ArrowUp') {
            if (elementsOnScreen[currentFocus[0] - 1]) {
                if (currentFocus[0] === 3 && currentFocus[1] === 2 ) {
                    setCurrentFocus([currentFocus[0] - 1, currentFocus[1] + 1]);
                } else {

                    setCurrentFocus([currentFocus[0] - 1, currentFocus[1]]);
                }
            }
        }
    }
    const numberEvents = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const numbers = '0123456789'.split('');
        if (numbers.includes(e.key)) {
            setCurrentNumber(currentNumber + e.key);
        }
    }
    const backspaceEvent = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Backspace') {
            setCurrentNumber(currentNumber.slice(0, currentNumber.length - 1))
        }
    }
    const enterPressedEvent = (e: React.KeyboardEvent, fc: () => void) => {
        if (e.key === 'Enter') {
            fc();
        }
    }
    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        arrowEvents(e);
        numberEvents(e);
        backspaceEvent(e);
    }
    const getElement = (value: string) => {
        if (value === 'confirm') {
            return document.getElementsByClassName('button-submit')[0] as HTMLButtonElement;
        } else if (value === 'agreement') {
            return document.getElementsByClassName('agreement')[0] as HTMLDivElement;
        } else if (value === 'x') {
            return document.getElementsByClassName('close-btn')[0] as HTMLDivElement;
        } else if (value === 'clear') {
            return document.getElementsByClassName('numbers clear')[0] as HTMLDivElement;
        } else if (value === '0') {
            return document.querySelectorAll(`[tabindex='11']`)[0] as HTMLDivElement;
        } 
        else {
            return document.querySelectorAll(`[tabindex='${value}']`)[0] as HTMLDivElement;
        }
    }
    const setFocus = (value: string) => {
        for (let i = 0; i < elementsOnScreen.length; i++) {
            let idx = elementsOnScreen[i].findIndex((el) => el === value);
            if (idx !== -1) {
                setCurrentFocus([i, idx]);
            }
        }
    }
    useEffect(() => {
        const elementFocused = elementsOnScreen[currentFocus[0]][currentFocus[1]];
        const element = getElement(elementFocused);
        if (element) {
            element.focus();
        }
        
    });
    return (
        <div onKeyDown={onKeyDown} className="number-popup-container">
            <div className="number-popup">
                <span className="primary-text">Введите ваш номер мобильного телефона</span>
                <div className="number-input-container">{renderNumber(currentNumber)}</div>
                <span className="secondary-text">и с Вами свяжется наш менеждер для дальнейшей консультации</span>
                <div className="buttons">
                    {arrayOfButtons.map((el, i) => {
                        if (el === 'СТЕРЕТЬ') {
                            return (
                                <div
                                    className="numbers clear"
                                    tabIndex={i + 1}
                                    key={i}
                                    onFocus={() => setFocus('clear')}
                                    onKeyPress={(e) => enterPressedEvent(e, () => setCurrentNumber(''))}
                                    onClick={() => setCurrentNumber('')}
                                >
                                    {el}
                                </div>
                            )
                        }
                        return (
                            <div
                                className="numbers"
                                tabIndex={i + 1}
                                key={i}
                                onFocus={() => setFocus(el)}
                                onKeyPress={(e) => enterPressedEvent(e, () => setCurrentNumber(currentNumber + el))}
                                onClick={() => setCurrentNumber(currentNumber + el)}
                            >
                                {el}
                            </div>
                        )
                    })}
                </div>
                <span
                    tabIndex={12}
                    className="agreement"
                    onFocus={() => setFocus('agreement')}
                    onKeyPress={(e) => enterPressedEvent(e, () => setCheckboxChecked(!checkboxChecked))}
                    onClick={() => setCheckboxChecked(!checkboxChecked)}
                >
                    <img src={checkboxChecked ? CheckboxChecked: Checkbox} alt="checkbox" />
                    <span>Согласие на обработку персональных данных</span>
                </span>
                <button
                    tabIndex={13}
                    onFocus={() => setFocus('confirm')}
                    onKeyPress={(e) => enterPressedEvent(e, () => {
                        if (validated())
                            openSlider();
                    })}
                    className={`button-submit ${!validated() ? 'grey' : ''}`}>
                    ПОДТВЕРДИТЬ НОМЕР
                </button>
            </div>
            <CloseButton
                close={() => {
                    closePopup()
                }}
                onFocus={() => setFocus('x')}
                tabIndex={14}    
            />
            <div className="additional-info">
                <span>СКАНИРУЙТЕ QR-КОД ДЛЯ ПОЛУЧЕНИЯ ДОПОЛНИТЕЛЬНОЙ ИНФОРМАЦИИ</span>
                <img src={QRImage} alt="qr" />
            </div>
        </div>
    )
}
export default NumberPopup;