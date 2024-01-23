import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {formatDistanceToNow} from 'date-fns'
import {IoSearch} from 'react-icons/io5'
import Cookies from 'js-cookie'
import MenuBar from '../MenuBar'
import NxtWatchContext from '../../context/NxtWatchContext'

import './index.css'

import {
  HomeContainer,
  HomeVideoSection,
  Baner,
  LogoImage,
  VideoDisplay,
  VideoText,
} from './styled'
import Header from '../Header'

const apiConstants = {
  initial: 'INITAIL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  notFound: 'NOTFOUND',
}

class HomeRoute extends Component {
  state = {
    banerOn: true,
    videoList: [],
    apiStatus: apiConstants.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    const videosApiUrl = 'https://apis.ccbp.in/videos/all?search='
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(videosApiUrl, options)
    const dataJson = await response.json()
    if (response.ok) {
      const camelCaseList = dataJson.videos.map(eachVideo => ({
        channel: {
          name: eachVideo.channel.name,
          profileUrl: eachVideo.channel.profile_image_url,
        },
        id: eachVideo.id,
        publishedAt: formatDistanceToNow(new Date(eachVideo.published_at)),
        thumbnailUrl: eachVideo.thumbnail_url,
        title: eachVideo.title,
        viewCount: eachVideo.view_count,
      }))

      this.setState({
        videoList: camelCaseList,
        apiStatus: apiConstants.success,
      })
    } else if (dataJson.videos.length === 0) {
      this.setState({apiStatus: apiConstants.failure})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  removeBaner = () => {
    this.setState({banerOn: false})
  }

  retrySearch = () => {
    this.getVideos()
    this.setState({searchInput: '', apiStatus: apiConstants.initial})
  }

  renderSuccessView = () => {
    const {videoList} = this.state
    return (
      <>
        <NxtWatchContext.Consumer>
          {value => {
            const {isDarkThemeOn} = value
            return (
              <ul className="video-unorderedList">
                {videoList.map(eachItem => (
                  <Link
                    to={`/videos/${eachItem.id}`}
                    key={eachItem.id}
                    className="link-styling"
                  >
                    <li
                      className="video-list-item"
                      key={eachItem.id}
                      onClick={this.goToVideoPage}
                    >
                      <img
                        src={eachItem.thumbnailUrl}
                        className="videoImage"
                        alt="video"
                      />
                      <div className="videoInfoBox1">
                        <img
                          src={eachItem.channel.profileUrl}
                          className="channelImageUrl"
                          alt={eachItem.channel.name}
                        />
                        <div className="videoDescriptionBox">
                          <VideoText select={isDarkThemeOn}>
                            {eachItem.title}
                          </VideoText>
                          <VideoText select={isDarkThemeOn}>
                            {eachItem.channel.name}
                          </VideoText>
                          <div className="videoInfoBoxS">
                            <VideoText select={isDarkThemeOn}>
                              {eachItem.viewCount} views
                            </VideoText>
                            <VideoText select={isDarkThemeOn}>
                              {eachItem.publishedAt}
                            </VideoText>
                          </div>
                        </div>
                      </div>
                    </li>
                  </Link>
                ))}
              </ul>
            )
          }}
        </NxtWatchContext.Consumer>
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-div">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
        alt="no videos"
        className="failure-img"
      />
      <h1 className="failure-heading">No Search results found</h1>
      <p>Try different key words or remove search filter</p>
      <button type="button" className="retry-button" onClick={this.retrySearch}>
        Retry
      </button>
    </div>
  )

  renderLoaderSpinner = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderHomeVideos = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.initial:
        return this.renderLoaderSpinner()
      case apiConstants.success:
        return this.renderSuccessView()
      case apiConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  fetchUserSearchInput = event => {
    if (event.target.value.trim() === '') {
      this.getVideos() // Fetch original list when input is cleared
    }
    this.setState({searchInput: event.target.value})
  }

  searchedVideoResult = () => {
    const {searchInput, videoList} = this.state
    const searchedVideos = videoList.filter(eachVideo =>
      eachVideo.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (searchedVideos.length === 0) {
      this.setState({apiStatus: apiConstants.failure})
    } else {
      this.setState({videoList: searchedVideos, searchInput: ''})
    }
  }

  // ADDTIONAL TEQUIQUE THAT DISPLAY RESULT AS SOON AS INPUT ENTERED or when enter pressed

  enterButtonPress = event => {
    // this.searchedVideoResult()
    if (event.key === 'ENTER') {
      this.searchedVideoResult()
    }
  }

  // =====================================================================

  render() {
    const {banerOn, searchInput} = this.state
    return (
      <>
        <Header />
        <NxtWatchContext.Consumer>
          {value => {
            const {isDarkThemeOn} = value
            return (
              <HomeContainer>
                <MenuBar />
                <HomeVideoSection select={isDarkThemeOn}>
                  {banerOn ? (
                    <Baner data-testid="banner">
                      <div className="baner-items">
                        <LogoImage
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          alt="nxt watch logo"
                        />
                        <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
                        <button type="button" className="getItButton">
                          GET IT NOW
                        </button>
                      </div>
                      <button
                        type="button"
                        className="cancelButton"
                        data-testid="close"
                        onClick={this.removeBaner}
                      >
                        X
                      </button>
                    </Baner>
                  ) : null}
                  <VideoDisplay select={isDarkThemeOn} data-testId="home">
                    <div className="searchBox">
                      <input
                        type="search"
                        className="videoSearchInput"
                        placeholder="Search"
                        onChange={this.fetchUserSearchInput}
                        onKeyDown={this.enterButtonPress}
                        value={searchInput}
                      />
                      <button
                        type="button"
                        onClick={this.searchedVideoResult}
                        data-testid="searchButton"
                      >
                        <IoSearch size="15" />.
                      </button>
                    </div>
                    <div className="videos">{this.renderHomeVideos()}</div>
                  </VideoDisplay>
                </HomeVideoSection>
              </HomeContainer>
            )
          }}
        </NxtWatchContext.Consumer>
      </>
    )
  }
}

export default HomeRoute
