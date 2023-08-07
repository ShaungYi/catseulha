import { useEffect, useRef, useState } from 'react';
import FadeAnimation from './FadeAnimation';
import NextButton from './NextButton';
import './wordBubble.css'
import { useDispatch, useSelector } from 'react-redux';
import { TypeAnimation } from 'react-type-animation';
import { contentSliceActions } from '../../redux/store';
import TimeOutPromise from '../../TimeOutPromise';
import ImageViewer from './ImageViewer';
import ImagePreloader from '../ImagePreloader';

let bubbleWidth
const typingSpeed = 50

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


    function calculateTypingTime(text) {
        console.log(text.length * typingSpeed)
        return text.length * typingSpeed + 100
    }
    const contents = [
        {
            textSequence:
                [
                    500,
                    `안넝하때여?`,
                    2000,
                    `안넝하때여?
                    져는 Happy Happy Happy`,
                    500,
                    `안넝하때여?
                    져는 Happy Happy Happy.`,
                    500,
                    `안넝하때여?
                    져는 Happy Happy Happy..`,
                    500,
                    `안넝하때여?
                    져는 Happy Happy Happy...`,
                    500,
                    `안넝하때여?
                    져는 Happy Happy Happy....`,
                    `안넝하때여?
                    져는 Happy Happy Happy....
                      Happy Cat 이에오`,
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
                    showImages,
                    200,
                    showNextButton,
                    200,
                    saveBubbleWidth
                ],
            imageSequence:
                [
                    'catSeulha-images/popsicle_seulha.jpg'
                ]
        },
        {

            textSequence:
                [
                    500,
                    '이딴 스라는 저가튼 고양이를 좋아해요',
                    1500,
                    '예르 드면 요 고양이나',
                    500,
                    showImages,
                    1500,
                    '조 고양이나',
                    1500 - calculateTypingTime('조고양이나'),
                    '저 고양이나',
                    1500 - calculateTypingTime('저고양이나'),
                    '이 고양이나',
                    1500 - calculateTypingTime('이고양이나'),
                    '2 고양이나',
                    1500 - calculateTypingTime('n 고양이나'),
                    '3 고양이나',
                    1500 - calculateTypingTime('n 고양이나'),
                    '4 고양이나',
                    1500 - calculateTypingTime('n 고양이나'),
                    '5 고양이나',
                    1500 - calculateTypingTime('n 고양이나'),
                    '6 고양이나',
                    1500 - calculateTypingTime('n 고양이나'),
                    '.',
                    500 - calculateTypingTime('.'),
                    '..',
                    500 - calculateTypingTime('.'),
                    '...',
                    500 - calculateTypingTime('.'),
                    '',
                    500,
                    '.',
                    500 - calculateTypingTime('.'),
                    '..',
                    500 - calculateTypingTime('.'),
                    '...',
                    500 - calculateTypingTime('.'),
                    '7 고양이나',
                    1500 - calculateTypingTime('n 고양이나'),
                    '8 고양이나',
                    1500 - calculateTypingTime('n 고양이나'),
                    '9 고양이나',
                    1500 - calculateTypingTime('n 고양이나'),
                    '10 고양이나',
                    1500 - calculateTypingTime('n 고양이나'),
                    '헉헉... 거이 다 해따...',
                    3000 - calculateTypingTime('헉헉... 거이 다 해따...'),
                    '11 고양이나',
                    1500 - calculateTypingTime('nn고양이나'),
                    '12 고양이나',
                    1500 - calculateTypingTime('nn고양이나'),
                    '13 고양이나',
                    1500 - calculateTypingTime('nn고양이나'),
                    ' ',
                    500,
                    '아니먼...',
                    2000 - calculateTypingTime('아니먼...'),
                    '두구두구두구',
                    4000 - calculateTypingTime('두구두구두구'),
                    '봉주이!!!!!',
                    700,
                    `봉주이!!!!!
                    르 조아하조`,
                    200,
                    showNextButton,
                    200,
                    saveBubbleWidth
                ],
            imageSequence:
                [
                    '/our-cats/comero.jpg',
                    1500,
                    '/our-cats/uluk.jpg',
                    1500,
                    '/our-cats/ummarpak.jpg',
                    1500,
                    '/our-cats/chizu.jpg',
                    1500,
                    '/our-cats/dawuk.jpg',
                    1500,
                    '/our-cats/liber.jpg',
                    1500,
                    '/our-cats/libro.jpg',
                    1500,
                    '/our-cats/verde.jpg',
                    1500,
                    '/our-cats/blanca.jpg',
                    1500,
                    '/other-cats/exhausted_cat.jpeg',
                    3000,
                    '/our-cats/peqo.jpg',
                    1500,
                    '/our-cats/sharon.jpg',
                    1500,
                    '/our-cats/somi.jpg',
                    1500,
                    '/our-cats/jumbak.jpg',
                    1500,
                    '/other-cats/cat-driving-serious.gif',
                    3000,
                    '/our-cats/jutso.jpg',
                    1500,
                    '/our-cats/soboro.jpg',
                    1500,
                    '/our-cats/cotton.jpg',
                    1500,
                    'nothing',
                    2500,
                    '/miscellaneous-images/drumroll.gif',
                    4000,
                    '/our-cats/caramel.jpg'

                ]

        },
        {
            textSequence:
                [
                    500,
                    '게다가 스라느 고양이 그림도 잘 그리답니다',
                    200,
                    showImages,
                    200,
                    showNextButton,
                    200,
                    saveBubbleWidth
                ],
            imageSequence:
                [
                    '/other-cats/cat-drawing.jpg'
                ]
        },
        {
            textSequence:
                [
                    500,
                    '또 스라는 셀피르 잘 찌거오',
                    1500,
                    '이제부터 스라에 셀피 쇼르 하게슴니다',
                    200,
                    showImages,
                    200,
                    showNextButton,
                    200,
                    saveBubbleWidth

                ],
            imageSequence:
                [
                    '/catSeulha-images/surprised_seulha.jpg'
                ]
        },
        {
            textSequence:
                [
                    500,
                    showImages,
                    'catseuraman.exe 불러오는 중',
                    500 - calculateTypingTime('catseuraman.exe 불러오는 중'),
                    'catseuraman.exe 불러오는 중.',
                    500 - calculateTypingTime('.'),
                    'catseuraman.exe 불러오는 중..',
                    500 - calculateTypingTime('.'),
                    'catseuraman.exe 불러오는 중...',
                    500 - calculateTypingTime('.'),
                    'catseuraman.exe 불러오는 중',
                    500 - calculateTypingTime('.'),
                    'catseuraman.exe 불러오는 중.',
                    500 - calculateTypingTime('.'),
                    'catseuraman.exe 불러오는 중..',
                    500 - calculateTypingTime('.'),
                    'catseuraman.exe 불러오는 중...',
                    500 - calculateTypingTime('.'),
                    '음료는 나의 인생! 🍹🍹🍹',
                    200,
                    showNextButton,
                    200,
                    saveBubbleWidth

                ],
            imageSequence:
                [
                    '/miscellaneous-images/loading-gif.gif',
                    4000,
                    '/catSeulha-images/seulha-selfies/음료는나의인생.jpg',
                ]
        },
        {
            textSequence: [
                200,
                showImages,
                500,
                '근데 마시다 뇌가 얼어버렸당! 🥶',
                200,
                showNextButton,
                200,
                saveBubbleWidth
            ],
            imageSequence: [
                '/catSeulha-images/seulha-selfies/음료가뇌를얼렸다.jpg'
            ]
        },
        {
            textSequence: [
                200,
                showImages,
                500,
                '그래도 음료 조아 😊',
                200,
                showNextButton,
                200,
                saveBubbleWidth
            ],
            imageSequence: [
                '/catSeulha-images/seulha-selfies/그래도음료조아.jpg'
            ]
        },
        {
            textSequence: [
                200,
                showImages,
                500,
                '💦💦 와! 물에 빠졌다!!! 💦💦',
                200,
                showNextButton,
                200,
                saveBubbleWidth
            ],
            imageSequence: [
                '/catSeulha-images/seulha-selfies/물빠지기.jpg'
            ]
        },
        {
            textSequence: [
                200,
                showImages,
                500,
                '사마귀조아',
                200,
                showNextButton,
                200,
                saveBubbleWidth
            ],
            imageSequence: [
                '/catSeulha-images/seulha-selfies/사마귀조아.jpg'
            ]
        },
        {
            textSequence: [
                200,
                showImages,
                500,
                '컨셉은 좋지만 부체가 않어울려 🤔',
                200,
                showNextButton,
                200,
                saveBubbleWidth
            ],
            imageSequence: [
                '/catSeulha-images/seulha-selfies/부채않어울려.jpg'

            ]
        },
        {
            textSequence: [
                200,
                showImages,
                500,
                '셀피찍는 셀피',
                200,
                showNextButton,
                200,
                saveBubbleWidth
            ],
            imageSequence: [
                '/catSeulha-images/seulha-selfies/selfie_selfie.jpg'
            ]
        },
        {
            textSequence: [
                200,
                showImages,
                500,
                '비 넘 시러',
                200,
                showNextButton,
                200,
                saveBubbleWidth
            ],
            imageSequence: [
                '/catSeulha-images/seulha-selfies/비넘시러.jpg'
            ]
        },
        {
            textSequence: [
                200,
                showImages,
                500,
                '비었는데 피가 하얀색이야! 😱',
                200,
                showNextButton,
                200,
                saveBubbleWidth
            ],
            imageSequence: [
                '/catSeulha-images/seulha-selfies/비었는데피가하얀색이야.jpg'
            ]
        },
        {
            textSequence: [
                200,
                showImages,
                500,
                '아 ju 마 와 한컷',
                200,
                showNextButton,
                200,
                saveBubbleWidth
            ],
            imageSequence: [
                '/catSeulha-images/seulha-selfies/아줌마와.jpg'
            ]
        },
        {
            textSequence: [
                200,
                showImages,
                500,
                '대문짝얼굴 아 ju 마 와 한컷',
                200,
                showNextButton,
                200,
                saveBubbleWidth
            ],
            imageSequence: [
                '/catSeulha-images/seulha-selfies/대문짝얼굴아줌마.jpg'
            ]
        },
        {
            textSequence: [
                200,
                showImages,
                500,
                '아 jo 씨 와 한컷',
                200,
                showNextButton,
                200,
                saveBubbleWidth
            ],
            imageSequence: [
                '/catSeulha-images/seulha-selfies/아저씨와.jpg'
            ]
        },
        {
            textSequence: [
                200,
                showImages,
                500,
                '아 jo 씨 아이스크림 없지롱😝',
                200,
                showNextButton,
                200,
                saveBubbleWidth
            ],
            imageSequence: [
                '/catSeulha-images/seulha-selfies/아이스크림없지롱.jpg'
            ]
        },
        {
            textSequence: [
                200,
                showImages,
                500,
                '아직도 없지롱😝😝',
                200,
                showNextButton,
                200,
                saveBubbleWidth
            ],
            imageSequence: [
                '/catSeulha-images/seulha-selfies/아직도없지롱.jpg',
            ]
        },
        {
            textSequence: [
                500,
                '끝!',
                showImages,
                200,
                showNextButton,
                200,
                saveBubbleWidth
            ],
            imageSequence: [
                '/miscellaneous-images/end.png'
            ]
        },
        {
            textSequence: [
                500,
                '아주 잘하지오 👏👏👏',
                showImages,
                200,
                showNextButton,
                200,
                saveBubbleWidth
            ],
            imageSequence: [
                '/catSeulha-images/best_photographer.png'
            ]
        },
        {
            textSequence: [
                500,
                '하디만 이게 다가 아니에오',
                200,
                showNextButton,
                200,
                saveBubbleWidth
            ]
        },
        {
            textSequence:
                [
                    500,
                    '스라는...',
                    2000,
                    '자수',
                    showImages,
                    2200 - calculateTypingTime('자수'),
                    '카페',
                    2000 - calculateTypingTime('카페'),
                    '달달이',
                    2000 - calculateTypingTime('달달이'),
                    '달달이 만들기',
                    3000 - calculateTypingTime('만들기'),
                    '부드러운 앉을것',
                    2000 - calculateTypingTime('부드러운앉을것'),
                    '부드러운 누울것',
                    2000 - calculateTypingTime('누울것'),
                    '아이페드',
                    2000 - calculateTypingTime('아이페드'),
                    ' ',
                    500,
                    '그리고...',
                    1500 - calculateTypingTime('그리고...'),
                    '🩰발레!🩰',
                    2000 - calculateTypingTime('🩰발레!🩰'),
                    '🩰발레!🩰 가 아닌',
                    2000 - calculateTypingTime('가아닌'),
                    '🕺댄스🕺',
                    2000 - calculateTypingTime('🕺댄스🕺'),
                    '🕺댄스🕺 를 조아해오',
                    200,
                    showNextButton,
                    200,
                    saveBubbleWidth
                ],
            imageSequence:
                [
                    '/miscellaneous-images/seulhas-favorites/sewing.JPG',
                    2000,
                    '/miscellaneous-images/seulhas-favorites/cafe.jpeg',
                    2000,
                    '/miscellaneous-images/seulhas-favorites/sweets.png',
                    2000,
                    '/miscellaneous-images/seulhas-favorites/making_sweets.jpeg',
                    3000,
                    '/miscellaneous-images/seulhas-favorites/soft_chair.webp',
                    2000,
                    '/miscellaneous-images/seulhas-favorites/soft_bed.jpeg',
                    2000,
                    '/miscellaneous-images/seulhas-favorites/ipad.jpg',
                    2000,
                    'nothing',
                    2000,
                    '/miscellaneous-images/seulhas-favorites/ballet.jpeg',
                    2000,
                    '/miscellaneous-images/seulhas-favorites/ballet-banned.jpeg',
                    2000,
                    '/miscellaneous-images/seulhas-favorites/dance.jpeg'

                ]
        },
        {
            textSequence:
                [
                    500,
                    '참!',
                    1500,
                    `참!
                    그리고 오느른 스라에 생일이에오`,
                    200,
                    showImages,
                    2000,
                    '🎉🎉🎉!생일축하해오!🎉🎉🎉',
                    200,
                    showNextButton,
                    200,
                    saveBubbleWidth

                ],
            imageSequence:
                [
                    '/miscellaneous-images/birthday_cake.png',
                    2000,
                    '/miscellaneous-images/happy-birthday-cats.gif'
                ]
        },
        {
            textSequence:
                [
                    500,
                    'joyeux anniversaire',
                    showImages,
                    200,
                    showNextButton,
                    200,
                    saveBubbleWidth
                ],
            imageSequence:
                [
                    '/miscellaneous-images/country-flags/french_flag.png'
                ]
        },
        {
            textSequence:
                [
                    500,
                    'عيد ميلاد سعيد',
                    showImages,
                    200,
                    showNextButton,
                    200,
                    saveBubbleWidth
                ],
            imageSequence:
                [
                    '/miscellaneous-images/country-flags/arab_league_flag.png',
                ]
        },
        {
            textSequence:
                [
                    500,
                    'كل عام وأنت بخير',
                    showImages,
                    200,
                    showNextButton,
                    200,
                    saveBubbleWidth
                ],
            imageSequence:
                [
                    '/miscellaneous-images/country-flags/Flag_of_Saudi_Arabia.svg',
                ]
        },
        {
            textSequence:
                [
                    500,
                    'سنة حلوة يا جميلة',
                    showImages,
                    200,
                    showNextButton,
                    200,
                    saveBubbleWidth
                ],
            imageSequence:
                [
                    '/miscellaneous-images/country-flags/Flag_of_Egypt.svg.png',
                ]
        },
        {
            textSequence:
                [
                    500,
                    'feliz cumpleaños',
                    showImages,
                    200,
                    showNextButton,
                    200,
                    saveBubbleWidth
                ],
            imageSequence:
                [
                    '/miscellaneous-images/country-flags/spanish_flag.png',
                ]
        },
        {
            textSequence:
                [
                    500,
                    '生',
                    100,
                    '生日',
                    100,
                    '生日快',
                    100,
                    '生日快乐',
                    showImages,
                    200,
                    showNextButton,
                    200,
                    saveBubbleWidth
                ],
            imageSequence:
                [
                    '/miscellaneous-images/country-flags/chinese_flag.png'
                ]
        },
        {
            textSequence:
                [
                    500,
                    '生',
                    100,
                    '生日',
                    100,
                    '生日快',
                    100,
                    '生日快樂',
                    showImages,
                    200,
                    showNextButton,
                    200,
                    saveBubbleWidth
                ],
            imageSequence:
                [
                    '/miscellaneous-images/country-flags/taiwan_flag.png'
                ]
        },
        {
            textSequence:
                [
                    500,
                    'FELICEM DIEM NATALEM',
                    showImages,
                    200,
                    showNextButton,
                    200,
                    saveBubbleWidth
                ],
            imageSequence:
                [
                    '/miscellaneous-images/country-flags/SPQR_sign.png',
                ]
        },
        {
            textSequence:
                [
                    500,
                    '야옹!🎉🇰🇷',
                    500,
                    '야옹!🎉🇰🇷 🐈🐈🐈',
                    500,
                    '야옹!🎉🇰🇷 🐈🐈🐈 🇸🇦!🎉مواء',
                    500,
                    '야옹!🎉🇰🇷 🐈🐈🐈 🇸🇦!🎉مواء 🐈🐈🐈',
                    500,
                    '야옹!🎉🇰🇷 🐈🐈🐈 🇸🇦!🎉مواء 🐈🐈🐈 miaou!🎉🇫🇷',
                    500,
                    '야옹!🎉🇰🇷 🐈🐈🐈 🇸🇦!🎉مواء 🐈🐈🐈 miaou!🎉🇫🇷 🐈🐈🐈',
                    500,
                    '야옹!🎉🇰🇷 🐈🐈🐈 🇸🇦!🎉مواء 🐈🐈🐈 miaou!🎉🇫🇷 🐈🐈🐈 miau!🎉🇪🇸',
                    500,
                    '야옹!🎉🇰🇷 🐈🐈🐈 🇸🇦!🎉مواء 🐈🐈🐈 miaou!🎉🇫🇷 🐈🐈🐈 miau!🎉🇪🇸 🐈🐈🐈',
                    500,
                    '야옹!🎉🇰🇷 🐈🐈🐈 🇸🇦!🎉مواء 🐈🐈🐈 miaou!🎉🇫🇷 🐈🐈🐈 miau!🎉🇪🇸 🐈🐈🐈 喵!🎉🇨🇳',
                    500,
                    '야옹!🎉🇰🇷 🐈🐈🐈 🇸🇦!🎉مواء 🐈🐈🐈 miaou!🎉🇫🇷 🐈🐈🐈 miau!🎉🇪🇸 🐈🐈🐈 喵!🎉🇨🇳 🐈🐈🐈',
                    500,
                    '야옹!🎉🇰🇷 🐈🐈🐈 🇸🇦!🎉مواء 🐈🐈🐈 miaou!🎉🇫🇷 🐈🐈🐈 miau!🎉🇪🇸 🐈🐈🐈 喵!🎉🇨🇳 🐈🐈🐈 MUGO!🎉🏛️🇲🇪',

                    showImages,
                    200,
                    showNextButton,
                    200,
                    saveBubbleWidth
                ],
            imageSequence:
                [
                    '/miscellaneous-images/country-flags/cat_flag.jpeg'
                ]
        },
        {
            textSequence:
                [
                    500,
                    `이상`,
                    1000,
                    `이상
                    Happy Happy Happy`,
                    500,
                    `이상
                    Happy Happy Happy.`,
                    500,
                    `이상
                    Happy Happy Happy..`,
                    500,
                    `이상
                    Happy Happy Happy...`,
                    500,
                    `이상
                    Happy Happy Happy...
                      Happy Cat 이었슴미다`,
                    showImages,
                    2000,
                    '그럼 안너어어어어어어어어엉',
                    200,
                    saveBubbleWidth,
                    1300,
                    reload
                ],
            imageSequence:
                [
                    '/other-cats/happyCatGif1.gif',
                    2000,
                    '/other-cats/goodbyeCat.gif'
                ]
        }

    ]

    const contentNum = contents.length


    useEffect(() => {
        dispatch(contentSliceActions.setContents(contents))
    }, [])


    function keepWidthWhileFading() {
        try {
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


    function getListOfImgSrcs(){
        let allSrcs = []
        for (let paire of contents){
            const imgSequence = paire.imageSequence
            if (imgSequence){
                const srcs = imgSequence.filter((src => !(typeof src === 'number')))
                allSrcs = [...allSrcs, ...srcs]
            }
        }

        return allSrcs
    }

    const isLoadImages = useRef(true)
    useEffect(() => {isLoadImages.current = false}, [])



    const range = []
    for (let i = 0; i < contentNum; i++) {
        range.push(i)
    }

    return (
        <>
            {isLoadImages.current && <ImagePreloader images={getListOfImgSrcs()}></ImagePreloader>}
            {props.show &&
                <FadeAnimation trigger={contentIndex} onExited={hideNextButton} onExiting={keepWidthWhileFading}>
                    <div id="word-bubble">
                        <div id='bubbleContent' className='bubble-content'>
                            {isGameStarted && range.map((i) => {
                                const sequence = [...contents[i].textSequence]
                                return i === contentIndex && <TypeAnimation
                                    sequence={sequence}
                                    wrapper="span"
                                    speed={typingSpeed}
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
            }
        </>
    );
};

