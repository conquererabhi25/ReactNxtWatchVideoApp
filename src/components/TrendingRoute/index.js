import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'
import Loader from 'react-loader-spinner'
import {FaFire} from 'react-icons/fa'
import Header from '../Header'
import MenuBar from '../MenuBar'
import {
  SecondMainDiv,
  VideoText,
  VideoTextTitle,
  UnorderedList,
  PageName,
} from './styled'
import NxtWatchContext from '../../context/NxtWatchContext'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class TrendingRoute extends Component {
  state = {apiStatus: apiStatusConstants.initial, videoList: {}}

  componentDidMount() {
    this.fetchTrendingVideos()
  }

  // 'https://apis.ccbp.in/videos/trending'
  fetchTrendingVideos = async () => {
    const trendingApiUrl = 'https://apis.ccbp.in/videos/trending'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const serverResponse = await fetch(trendingApiUrl, options)
    if (serverResponse.ok) {
      const dataJson = await serverResponse.json()
      const camelCaseData = dataJson.videos.map(eachVideo => ({
        channel: {
          name: eachVideo.channel.name,
          profileUrl: eachVideo.channel.profile_image_url,
        },
        id: eachVideo.id,
        title: eachVideo.title,
        thumbnailUrl: eachVideo.thumbnail_url,
        publishedAt: formatDistanceToNow(new Date(eachVideo.published_at)),
        viewCount: eachVideo.view_count,
      }))
      this.setState({
        videoList: camelCaseData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccess = () => {
    const {videoList} = this.state
    return (
      <NxtWatchContext>
        {value => {
          const {isDarkThemeOn} = value
          return (
            <UnorderedList select={isDarkThemeOn}>
              <div className="page-title-box" data-testid="trending">
                <FaFire color="red" />
                <PageName select={isDarkThemeOn}>Trending</PageName>
              </div>
              {videoList.map(eachVideo => (
                <Link
                  to={`/videos/${eachVideo.id}`}
                  key={eachVideo.id}
                  className="link-styling"
                >
                  <li key={eachVideo.id} className="eachList">
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
                        {eachVideo.channel.name}
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
      </NxtWatchContext>
    )
  }

  renderFailure = () => (
    <div className="failure-div">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="not found"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p>We are having some trouble to complete your request</p>
      <button type="button" className="retry-button" onClick={this.retrySearch}>
        Retry
      </button>
    </div>
  )

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
      <div className="trending-page-main-container">
        <Header />
        <SecondMainDiv>
          <MenuBar />
          {this.renderApi()}
        </SecondMainDiv>
      </div>
    )
  }
}

export default TrendingRoute
