import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {SiYoutubegaming} from 'react-icons/si'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import MenuBar from '../MenuBar'

import {
  VideoText,
  GameUl,
  CombineDiv,
  GamingHeading,
  PageTitleDiv,
} from './styled'
import NxtWatchContext from '../../context/NxtWatchContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GamingRoute extends Component {
  state = {apiStatus: apiStatusConstants.initial, videoData: {}}

  componentDidMount() {
    this.fetchGamingVideos()
  }

  fetchGamingVideos = async () => {
    const gamingVideoUrl = 'https://apis.ccbp.in/videos/gaming'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const serverResponse = await fetch(gamingVideoUrl, options)
    if (serverResponse.ok) {
      const dataJson = await serverResponse.json()
      const camelCaseData = dataJson.videos.map(eachVideo => ({
        id: eachVideo.id,
        thumbnailUrl: eachVideo.thumbnail_url,
        title: eachVideo.title,
        viewCount: eachVideo.view_count,
      }))
      this.setState({
        videoData: camelCaseData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderLoader = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccess = () => {
    const {videoData} = this.state
    return (
      <NxtWatchContext>
        {value => {
          const {isDarkThemeOn} = value
          return (
            <CombineDiv>
              <PageTitleDiv select={isDarkThemeOn}>
                <SiYoutubegaming size="20" color="red" />
                <GamingHeading select={isDarkThemeOn}>Gaming</GamingHeading>
              </PageTitleDiv>
              <GameUl select={isDarkThemeOn}>
                {videoData.map(eachVideo => (
                  <Link
                    to={`/videos/${eachVideo.id}`}
                    key={eachVideo.id}
                    className="link-styling"
                  >
                    <li className="gameList" key={eachVideo.id}>
                      <img
                        src={eachVideo.thumbnailUrl}
                        alt="video thumbnail"
                        className="gameImage"
                      />
                      <VideoText select={isDarkThemeOn}>
                        {eachVideo.title}
                      </VideoText>
                      <div className="footerVideoDiv">
                        <VideoText select={isDarkThemeOn}>
                          {eachVideo.viewCount} watching worldwide
                        </VideoText>
                      </div>
                    </li>
                  </Link>
                ))}
              </GameUl>
            </CombineDiv>
          )
        }}
      </NxtWatchContext>
    )
  }

  renderApi = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.initial:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="GamingMainContainer">
        <Header />
        <div className="secondMainDiv">
          <MenuBar />
          {this.renderApi()}
        </div>
      </div>
    )
  }
}

export default GamingRoute
