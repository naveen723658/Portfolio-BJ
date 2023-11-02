import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentVideos: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeVideo: {},
  id: "",
  category: []
};

const playerState = createSlice({
  name: "player",
  initialState,
  reducers: {
    setactiveVideo: (state, action) => {
      state.activeVideo = action.payload.item;
      state.currentVideos = action.payload.data;
      state.currentIndex = action.payload.i;
      state.isActive = true;
    },

    nextSong: (state, action) => {
      if (state.currentIndex < state.currentVideos.length - 1) {
        state.currentIndex += 1;
      } else {
        state.currentIndex = 0;
      }
      state.activeVideo = state.currentVideos[state.currentIndex];
      state.isActive = true;
    },

    prevSong: (state, action) => {
      if (state.currentIndex > 0) {
        state.currentIndex -= 1;
      } else {
        state.currentIndex = state.currentVideos.length - 1;
      }
      state.activeVideo = state.currentVideos[state.currentIndex];
      state.isActive = true;
    },

    playPause: (state, action) => {
      state.isPlaying = action.payload;
      // console.log(state.isPlaying);
    },

    selectSongListId: (state, action) => {
      state.id = action.payload;
    },

    // channelList: (state, action) => {
    //   state.id = action.payload.data;
    // },
  },
});
export const {
  setactiveVideo,
  nextSong,
  prevSong,
  playPause,
  selectSongListId,
  category,
} = playerState.actions;

export default playerState.reducer;
