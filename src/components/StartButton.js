import './startButton.css'
import { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { contentSliceActions } from '../redux/store';


export default function StartButton(props) {

    const isStartButtonPresent = useSelector((state) => state.content.isStartButtonPresent)
    const shade = document.getElementById('shade')
    const overlayContainer = document.getElementById('overlayContainer')
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(contentSliceActions.setIsStartButtonPresent(!isStartButtonPresent))
    };

    const onExited = () => {
        shade.classList.remove('active-shade')
        overlayContainer.classList.add('no-pointer-events')
        dispatch(contentSliceActions.setIsGameStarted(true))
    }

    return (
        <>
            {ReactDOM.createPortal(
                <CSSTransition
                    in={isStartButtonPresent}
                    timeout={1200}
                    classNames="start-button"
                    unmountOnExit
                    onExited={onExited}>
                    {state =>
                        <button
                            className='start-button'
                            onClick={handleClick}
                        >
                            {(state === 'entered' || state === 'entering')  && 'Start'}
                            {state === 'exiting' && 'Starting...'}
                        </button>
                    }
                </CSSTransition>
                ,
                document.getElementById('overlayContainer')
            )}
        </>

    )
}