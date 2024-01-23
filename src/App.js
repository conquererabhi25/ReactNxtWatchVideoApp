import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import NxtWatchContext from './context/NxtWatchContext'
import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import TrendingRoute from './components/TrendingRoute'
import VideoItemDetails from './components/VideoItemDetails'
import GamingRoute from './components/GamingRoute'
import SavedVideos from './components/SavedVideos'
import NotFoundRoute from './components/NotFoundRoute'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

class App extends Component {
  state = {isDarkThemeOn: false, SavedVideosList: []}

  changeTheme = () => {
    this.setState(prevState => ({isDarkThemeOn: !prevState.isDarkThemeOn}))
  }

  mySavedVideos = video => {
    const {SavedVideosList} = this.state
    const videoPresent = SavedVideosList.find(
      eachVideo => eachVideo.id === video.id,
    )
    if (!videoPresent) {
      this.setState(prevState => ({
        SavedVideosList: [...prevState.SavedVideosList, video],
      }))
    }
  }

  render() {
    const {isDarkThemeOn, SavedVideosList} = this.state
    console.log(SavedVideosList)
    return (
      <NxtWatchContext.Provider
        value={{
          isDarkThemeOn,
          SavedVideosList,
          changeTheme: this.changeTheme,
          mySavedVideos: this.mySavedVideos,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <ProtectedRoute exact path="/" component={HomeRoute} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <ProtectedRoute exact path="/trending" component={TrendingRoute} />
          <ProtectedRoute exact path="/gaming" component={GamingRoute} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <Route path="/not-found" component={NotFoundRoute} />
          <Redirect to="not-found" />
        </Switch>
      </NxtWatchContext.Provider>
    )
  }
}

export default App

// ccbp submit RJSCPYQN94
