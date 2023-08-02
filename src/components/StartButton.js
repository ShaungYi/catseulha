import './startButton.css'
import { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';


export default function StartButton(props) {

    const [inProp, setInProp] = useState(true);
    const shade = document.getElementById('shade')
    const overlayContainer = document.getElementById('overlayContainer')

    const handleClick = () => {
        setInProp(false);
    };

    const onExited = () => {
        shade.style.backgroundColor = 'transparent'
        overlayContainer.classList.add('no-pointer-events')
        props.setIsGameStarted(true)
    }

    return (
        <>
            {ReactDOM.createPortal(
                <CSSTransition
                    in={inProp}
                    timeout={1200}
                    classNames="start-button"
                    unmountOnExit
                    onExited={onExited}>
                    {state =>
                        <button
                            className='start-button'
                            onClick={handleClick}
                        >
                            {state == 'entered' && 'Start'}
                            {state == 'exiting' && 'Starting...'}
                        </button>
                    }
                </CSSTransition>
                ,
                document.getElementById('overlayContainer')
            )}
        </>

    )
}