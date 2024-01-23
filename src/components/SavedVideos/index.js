import {Component} from 'react'
import {Link} from 'react-router-dom'
import {FaFire} from 'react-icons/fa'
import Header from '../Header'
import MenuBar from '../MenuBar'

import {
  VideoText,
  VideoTextTitle,
  NoVideoDiv,
  UnorderedList,
  PageName,
  VideoTextHeadingTitle,
} from './styled'
import NxtWatchContext from '../../context/NxtWatchContext'
import './index.css'

const apiStatusCalls = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class SavedVideos extends Component {
  state = {apiStatus: apiStatusCalls.initial}

  renderSavedVideos = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {SavedVideosList, isDarkThemeOn} = value
        return SavedVideosList.length === 0 ? (
          <NoVideoDiv select={isDarkThemeOn}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
              alt="no saved videos"
              className="noSavedImage"
            />
            <VideoTextHeadingTitle select={isDarkThemeOn}>
              No saved videos found
            </VideoTextHeadingTitle>
            <VideoTextTitle select={isDarkThemeOn}>
              Save your videos by clicking a button
            </VideoTextTitle>
          </NoVideoDiv>
        ) : (
          <UnorderedList select={isDarkThemeOn}>
            <div className="page-title-box">
              <FaFire color="red" />
              <PageName select={isDarkThemeOn}>Saved Videos</PageName>
            </div>
            {SavedVideosList.map(eachVideo => (
              <Link
                to={`/videos/${eachVideo.id}`}
                key={eachVideo.id}
                className="link-styling"
              >
                <li className="listElement">
                  <img
                    src={eachVideo.thumbnailUrl}
                    alt="video thumbnail"
                    className="thumbnailUrl"
                  />
                  <div className="videoInfoBox">
                    <VideoTextTitle select={isDarkThemeOn}>
                      {eachVideo.title}
                    </VideoTextTitle>
                    <VideoText select={isDarkThemeOn}>
                      {eachVideo.channelObj.name}
                    </VideoText>
                    <div className="video-info2">
                      <VideoText select={isDarkThemeOn}>
                        {eachVideo.viewCount} views
                      </VideoText>
                      <VideoText select={isDarkThemeOn}>
                        {eachVideo.publishedAt} ago
                      </VideoText>
                    </div>
                  </div>
                </li>
              </Link>
            ))}
          </UnorderedList>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  renderApiCalls = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusCalls.initial:
        return this.renderSavedVideos()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="SavedVideoMainPage">
        <Header />
        <div className="secondaryPage">
          <MenuBar />
          {this.renderApiCalls()}
        </div>
      </div>
    )
  }
}

export default SavedVideos
