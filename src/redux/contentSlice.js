
import { createSlice } from '@reduxjs/toolkit'

const contents = []

const initialState = {
  contents,
  imageSequence: [],
  index: 0,
  stageEnterTimeMilis: 1000,
  isGameStarted: false,
  isReload: false,
  isStartButtonPresent: true,
  showWordBubble: false,
  isShowImages: false,
  isShowNextButton: false,
  triggerNextImage: {},
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    incrementIndex(state) {

        state.index++ 

    },
    setIndex(state, action) {
      state.index = action.payload
    },
    setContents(state, action){
      state.contents = action.payload
    },
    setImageSequence(state, action){
      state.imageSequence = [...action.payload]
    },
    setIsGameStarted(state, action){
      state.isGameStarted = action.payload
    },
    setReloadStatus(state, action){
      state.isReload = action.payload
    },
    setIsStartButtonPresent(state, action){
      state.isStartButtonPresent = action.payload
    },
    setShowWordBubble(state, action){
      state.showWordBubble = action.payload
    },
    setIsShowImages(state, action){
      state.isShowImages = action.payload
    },
    setIsShowNextButton(state, action){
      state.isShowNextButton = action.payload
    },
    triggerNextImage(state){
      state.triggerNextImage = {}
    },
  }
})



export default contentSlice

