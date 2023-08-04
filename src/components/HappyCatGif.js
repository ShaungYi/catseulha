import { useEffect, useRef, useState } from 'react';
import './happyCatGif.css'
import { CSSTransition } from 'react-transition-group';
import WordBubble from './wordBubble/WordBubble';
import NextButton from './wordBubble/NextButton';
import { useDispatch, useSelector } from 'react-redux';
import { contentSliceActions } from '../redux/store';
import FadeAnimation from './wordBubble/FadeAnimation';




export default function HappyCatGif(props) {

    const stageEnterTimeMilis = useSelector((state) => state.content.stageEnterTimeMilis)
    const showWordBubble = useSelector((state) => state.content.showWordBubble)
    const [isReload, isGameStarted] = useSelector((state) => [state.content.isReload, state.content.isGameStarted])
    const dispatch = useDispatch()


    const onEntered = () => {
         dispatch(contentSliceActions.setShowWordBubble(true))
    }

    return (
        <CSSTransition
            // nodeRef={nodeRef}
            in={isGameStarted && !isReload}
            timeout={stageEnterTimeMilis}
            classNames="gif-container"
            onEntered={onEntered}>
            <div className='gif-container'>
                <WordBubble show={showWordBubble}></WordBubble>


                <img src='other-cats/happyCatGif1.gif' className='happy-cat-gif'></img>



            </div>
        </CSSTransition>

    )
}