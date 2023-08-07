import { shallowEqual, useSelector } from 'react-redux'
import './imageViewer.css'
import { useEffect, useRef, useState } from 'react'
import TimeOutPromise from '../../TimeOutPromise'

export default function ImageViewer(props) {

    const imageSequence = useSelector((state) => state.content.imageSequence, shallowEqual)
    const img = useRef()

    const [imgSrc, setImgSrc] = useState()


    async function recursiveImageShow(index) {
        setImgSrc(imageSequence[index])
        if (index + 1 < imageSequence.length) {
            await TimeOutPromise(imageSequence[index + 1], () => {
                if (index + 2 < imageSequence.length) {
                    recursiveImageShow(index + 2)
                }
            })
        }

    }

    useEffect(() => { recursiveImageShow(0) }, [imageSequence])


    useEffect(() => {

        try{
            
            console.log('fitting height')
            const bubbleContentHeight = document.getElementById('word-bubble').getBoundingClientRect().height
            const halfViewHeight = window.innerHeight / 2
    
            console.log('bubbleContentHeight: ', bubbleContentHeight)
            console.log('halfViewHeight: ', halfViewHeight)
            if (bubbleContentHeight < halfViewHeight) {
                img.current.style.height = `${halfViewHeight - bubbleContentHeight}px`
            }

            if (imgSrc === '/miscellaneous-images/스라좋아하는거/댄스.jpeg'){
                img.current.style.height = `${halfViewHeight - 31.5}px`
            }
        } catch (e) {
            console.log(e)
        }




    }, [imgSrc])

    return (
        <>
            {imgSrc !== 'nothing' &&
                <img src={imgSrc} className='theImg' id='theImg' ref={img}></img>

            }
        </>

    )
}