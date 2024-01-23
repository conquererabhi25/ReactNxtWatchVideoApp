import React from 'react'

const NxtWatchContext = React.createContext({
  isDarkThemeOn: false,
  SavedVideosList: {},
  mySavedVideos: () => {},
  changeTheme: () => {},
})

export default NxtWatchContext
