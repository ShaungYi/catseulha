import { useEffect, useRef, useState } from 'react';
import FadeAnimation from './FadeAnimation';
import NextButton from './NextButton';
import './wordBubble.css'
import { useDispatch, useSelector } from 'react-redux';
import { TypeAnimation } from 'react-type-animation';
import { contentSliceActions } from '../../redux/store';
import TimeOutPromise from '../../TimeOutPromise';
import ImageViewer from './ImageViewer';

let bubbleWidth

export default function WordBubble(props) {

    console.log('rendering wordBubble')

    const [contentIndex, isGameStarted] = useSelector((state) => [state.content.index, state.content.isGameStarted])
    const stageEnterTimeMilis = useSelector((state) => state.content.stageEnterTimeMilis)
    const isShowImages = useSelector((state) => state.content.isShowImages)


    const [isShowNextButton, setIsShowNextButton] = useState(false)


    const dispatch = useDispatch()

    const showNextButton = () => {
        setIsShowNextButton(true)
    }

    const hideNextButton = () => {
        setIsShowNextButton(false)
    }

    const saveBubbleWidth = () => {
        const bubble = document.getElementById('word-bubble')
        bubbleWidth = bubble.getBoundingClientRect().width
    }


    const showImages = () => {
        dispatch(contentSliceActions.setIsShowImages(true))
        dispatch(contentSliceActions.setImageSequence(contents[contentIndex].imageSequence))
    }


    const reload = async () => {

        if (isGameStarted) {
            lastingOutroMessage()
            dispatch(contentSliceActions.setReloadStatus(true))
            dispatch(contentSliceActions.setIsGameStarted(false))


            await TimeOutPromise(stageEnterTimeMilis, () => {
                dispatch(contentSliceActions.setIndex(0))
                dispatch(contentSliceActions.setShowWordBubble(false))
                dispatch(contentSliceActions.setImageSequence([]))
                dispatch(contentSliceActions.setIsShowImages(false))
            })
            await TimeOutPromise(500, () => {
                const shade = document.getElementById('shade')
                shade.classList.add('active-shade')

                dispatch(contentSliceActions.setReloadStatus(false))

            })
            await TimeOutPromise(200, () => {
                dispatch(contentSliceActions.setIsStartButtonPresent(true))

                const overlayContainer = document.getElementById('overlayContainer')
                overlayContainer.classList.remove('no-pointer-events')
            })
        }



    }

    const contents = [
        {
            textSequence:
                [
                    500,
                    `안넝하때여?`,
                    // 2000,
                    // `안넝하때여?
                    // 져는 Happy Happy Happy`,
                    // 500,
                    // `안넝하때여?
                    // 져는 Happy Happy Happy.`,
                    // 500,
                    // `안넝하때여?
                    // 져는 Happy Happy Happy..`,
                    // 500,
                    // `안넝하때여?
                    // 져는 Happy Happy Happy...`,
                    // 500,
                    // `안넝하때여?
                    // 져는 Happy Happy Happy....`,
                    // `안넝하때여?
                    // 져는 Happy Happy Happy....
                    //   Happy Cat 이에오`,
                    200,
                    showImages,
                    200,
                    showNextButton,
                    200,
                    saveBubbleWidth
                ],
            imageSequence:
                [
                    'other-cats/happyCatGif1.gif'
                ]
        }
        ,
        {
            textSequence:
                [
                    500,
                    '오느른 스라에 대해서 에기하꺼에오',
                    200,
                    showNextButton,
                    200,
                    saveBubbleWidth
                ],
            imageSequence:
                [
                    'other-cats/happyCatGif1.gif',
                    1000,
                    '/우리고양이/꼬메로.jpg',
                    1000,
                    '/우리고양이/얼룩.jpg',
                    1000,
                    '/우리고양이/우마르팍.jpg',
                    1000,
                    '/우리고양이/치주.jpg',
                ]
        },
        {
            textSequence:
                [
                    500,
                    '그럼 안너어어어어어어어어엉',
                    showImages,
                    200,
                    saveBubbleWidth,
                    1300,
                    reload
                ],
            imageSequence:
                [
                    'other-cats/goodbyeCat.gif'
                ]
        }

    ]

    const contentNum = contents.length


    useEffect(() => {
        dispatch(contentSliceActions.setContents(contents))
    }, [])


    function keepWidthWhileFading(){
        try{
            console.log('bubbleWidth: ', bubbleWidth)
            const bubble = document.getElementById('word-bubble')
            bubble.style.width = `${bubbleWidth}px`
    
           
        } catch (e) {
            console.log('from keepWidthWhileFading: ', e)
        }

    }

    const lastingOutroMessage = () => {
        const bubbleContent = document.getElementById('bubbleContent')
        const div = document.createElement('div')
        div.style.fontSize = '1.7em'
        div.innerText = '그럼 안너어어어어어어어어엉'
        bubbleContent.insertBefore(div, bubbleContent.firstChild)
    }



    const range = []
    for (let i = 0; i < contentNum; i++) {
        range.push(i)
    }

    return (

        props.show &&
        <FadeAnimation trigger={contentIndex} onExited={hideNextButton} onExiting={keepWidthWhileFading}>
            <div id="word-bubble">
                <div id='bubbleContent' className='bubble-content'>
                    {isGameStarted && range.map((i) => {
                        const sequence = [...contents[i].textSequence]
                        return i === contentIndex && <TypeAnimation
                            sequence={sequence}
                            wrapper="span"
                            speed={50}
                            omitDeletionAnimation
                            style={{ fontSize: '1.7em', display: 'inline-block', whiteSpace: 'pre-line' }}
                        />
                    })}

                    {isShowImages && <ImageViewer></ImageViewer>}
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

