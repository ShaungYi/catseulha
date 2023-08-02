import { useEffect, useRef, useState } from 'react';
import FadeAnimation from './FadeAnimation';
import NextButton from './NextButton';
import './wordBubble.css'
import { useSelector } from 'react-redux';
import { TypeAnimation } from 'react-type-animation';
import { contents } from '../../redux/contentSlice';



export default function WordBubble(props) {

    const [contentNum, contentIndex] = useSelector((state) => [state.content.contents.length, state.content.index])
    const [isShowNextButton, setIsShowNextButton] = useState(false)


    const range = []
    for (let i = 0; i < contentNum; i++) {
        range.push(i)
    }


    const showNextButton = () => {
        setIsShowNextButton(true)
    }

    const hideNextButton = () => {
        console.log('hiding')
        setIsShowNextButton(false)
    }

    useEffect(() => {
        try {
            const dummyContent = document.getElementById('bubbleContent').cloneNode(true)
            const wordBubble = document.getElementById('word-bubble')
            wordBubble.appendChild(dummyContent)
            hideNextButton()

            setTimeout(() => {
                wordBubble.removeChild(dummyContent)
            }, 200);
        } catch (e) {
        }

    }, [contentIndex])

    return (

        props.show &&
        <FadeAnimation trigger={contentIndex}>

            <div id="word-bubble">
                <div id='bubbleContent'>
                    {range.map((i) => {
                        const sequence = [...contents[i]]
                        i === contentIndex && sequence.push(showNextButton)
                        return i === contentIndex && <TypeAnimation
                            sequence={sequence}
                            wrapper="span"
                            speed={50}
                            omitDeletionAnimation
                            style={{ fontSize: '2em', display: 'inline-block', whiteSpace: 'pre-line' }}
                        />
                    })}
                    {isShowNextButton &&
                        <FadeAnimation trigger={isShowNextButton}>
                            <NextButton></NextButton>
                        </FadeAnimation>}

                    <div className="arrow"></div>
                </div>
            </div>


        </FadeAnimation>


    );
};

