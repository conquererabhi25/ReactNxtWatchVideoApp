import {Component} from 'react'
import Cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {RiMenuAddFill} from 'react-icons/ri'
import Header from '../Header'
import MenuBar from '../MenuBar'
import {
  VideoContainer,
  VideoText,
  VideoPlayerContainer,
  VideoText1,
  VideoDescButton,
} from './styled'
import NxtWatchContext from '../../context/NxtWatchContext'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class VideoItemDetails extends Component {
  state = {
    videoData: {},
    apiStatus: apiStatusConstants.initial,
    channelData: {},
    videoLiked: false,
    videoDisliked: false,
    videoSaved: false,
  }

  componentDidMount() {
    this.getVideo()
  }

  getVideo = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const video = data.video_details
      const camelCaseData = {
        channelObj: {
          name: video.channel.name,
          profileUrl: video.channel.profile_image_url,
          subscribers: video.channel.subscriber_count,
        },
        description: video.description,
        id: video.id,
        publishedAt: formatDistanceToNow(new Date(video.published_at)),
        thumbnailUrl: video.thumbnail_url,
        title: video.title,
        videoUrl: video.video_url,
        viewCount: video.view_count,
      }
      this.setState({
        videoData: camelCaseData,
        channelData: camelCaseData.channelObj,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  videoLikeFunction = () => {
    this.setState(prevState => ({
      videoLiked: !prevState.videoLiked,
      videoDisliked: false,
    }))
  }

  videoDislikeFunction = () => {
    this.setState(prevState => ({
      videoDisliked: !prevState.videoDisliked,
      videoLiked: false,
    }))
  }

  saveVideoClick = () => {
    this.setState(prevState => ({videoSaved: !prevState.videoSaved}))
  }

  renderLoader = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  successView = () => {
    const {
      videoData,
      channelData,
      videoLiked,
      videoDisliked,
      videoSaved,
    } = this.state
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDarkThemeOn, mySavedVideos} = value
          const saveVideo = () => {
            mySavedVideos(videoData)
            this.saveVideoClick()
          }
          return (
            <VideoPlayerContainer select={isDarkThemeOn}>
              <div className="react-player">
                <ReactPlayer
                  url={videoData.videoUrl}
                  controls="true"
                  mute="true"
                  width="80vw"
                  height="60vh"
                />
              </div>
              <div className="video-info">
                <VideoText select={isDarkThemeOn}>{videoData.title}</VideoText>
                <div className="description-div">
                  <div className="vdoDescription-div">
                    <VideoText select={isDarkThemeOn}>
                      {videoData.viewCount} Views
                    </VideoText>
                    <VideoText select={isDarkThemeOn}>
                      {videoData.publishedAt} ago
                    </VideoText>
                  </div>
                  <div className="vdoDescription-div">
                    <VideoDescButton
                      type="button"
                      className="video-desc-buttons"
                      onClick={this.videoLikeFunction}
                    >
                      {videoLiked ? (
                        <AiOutlineLike color="#2563eb" />
                      ) : (
                        <AiOutlineLike
                          color={isDarkThemeOn ? '#64748b' : '#000000'}
                        />
                      )}
                      {videoLiked ? (
                        <VideoText1>Like</VideoText1>
                      ) : (
                        <VideoText select={isDarkThemeOn}>Like</VideoText>
                      )}
                    </VideoDescButton>
                    <VideoDescButton
                      type="button"
                      className="video-desc-buttons"
                      onClick={this.videoDislikeFunction}
                    >
                      {videoDisliked ? (
                        <AiOutlineDislike color="#2563eb" />
                      ) : (
                        <AiOutlineDislike
                          color={isDarkThemeOn ? '#64748b' : '#000000'}
                        />
                      )}
                      {videoDisliked ? (
                        <VideoText1>Dislike</VideoText1>
                      ) : (
                        <VideoText select={isDarkThemeOn}>Dislike</VideoText>
                      )}
                    </VideoDescButton>
                    <VideoDescButton
                      type="button"
                      className="video-desc-buttons"
                      onClick={saveVideo}
                    >
                      {videoSaved ? (
                        <RiMenuAddFill color="#2563eb" />
                      ) : (
                        <RiMenuAddFill
                          color={isDarkThemeOn ? '#64748b' : '#000000'}
                        />
                      )}
                      {videoSaved ? (
                        <VideoText1>Save</VideoText1>
                      ) : (
                        <VideoText select={isDarkThemeOn}>Save</VideoText>
                      )}
                    </VideoDescButton>
                  </div>
                </div>
              </div>
              <hr />
              <div className="channel-details">
                <img
                  src={channelData.profileUrl}
                  alt="channel logo"
                  className="channel-profile-image"
                />
                <div>
                  <VideoText select={isDarkThemeOn}>
                    {channelData.name}
                  </VideoText>
                  <VideoText select={isDarkThemeOn}>
                    {channelData.subscribers} subscribers
                  </VideoText>
                </div>
              </div>
              <VideoText select={isDarkThemeOn}>
                {videoData.description}
              </VideoText>
            </VideoPlayerContainer>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }

  renderApi = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.initial:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.successView()
      case apiStatusConstants.failure:
        return this.failureView()
      default:
        return null
    }
  }

  renderVideoUI = () => (
    <VideoContainer>
      <Header />
      <div className="video-page">
        <MenuBar />
        {this.renderApi()}
      </div>
    </VideoContainer>
  )

  render() {
    return <div>{this.renderVideoUI()}</div>
  }
}

export default VideoItemDetails
