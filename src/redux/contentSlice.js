
import { createSlice } from '@reduxjs/toolkit'


export let contents = [
  [
    500,
    `안넝하때여?`,
    2000,
    `안넝하때여?
    Happy Happy Happy`,
    500,
    `안넝하때여?
    Happy Happy Happy.`,
    500,
    `안넝하때여?
    Happy Happy Happy..`,
    500,
    `안넝하때여?
    Happy Happy Happy...`,
    500,
    `안넝하때여?
    Happy Happy Happy....`,
    `안넝하때여?
    Happy Happy Happy....
    Happy Cat 이에오`
  ],
  [
    500,
    '오느른 스라에 대해서 에기하꺼에오']
]


const initialState = {
  contents,
  currentContent: contents[0],
  index: 0
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    incrementIndex(state) {
      state.index < state.contents.length - 1 ?
        state.index++ :
        state.index = 0
    },
    setNextContent(state) {
      state.currentContent = state.contents[state.index]
    },
  }
})



export default contentSlice

