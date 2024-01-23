import Header from '../Header'
import MenuBar from '../MenuBar'
import {NFHeading, NFText, NotFoundMainPage} from './styled'
import NxtWatchContext from '../../context/NxtWatchContext'
import './index.css'

const NotFoundRoute = () => (
  <div className="NotFoundPage">
    <Header />
    <NxtWatchContext>
      {value => {
        const {isDarkThemeOn} = value
        return (
          <div className="notFoundSecondDiv">
            <MenuBar />
            <NotFoundMainPage select={isDarkThemeOn}>
              <img
                src={
                  isDarkThemeOn
                    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
                }
                alt="notFound"
                className="notFoundImage"
              />
              <div className="textBox">
                <NFHeading select={isDarkThemeOn}>Page Not Found</NFHeading>
                <NFText select={isDarkThemeOn}>
                  We are sorry,the page you requested could not be found
                </NFText>
              </div>
            </NotFoundMainPage>
          </div>
        )
      }}
    </NxtWatchContext>
  </div>
)

export default NotFoundRoute
