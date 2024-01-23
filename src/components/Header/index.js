import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {FaMoon} from 'react-icons/fa'
import {IoSunnyOutline} from 'react-icons/io5'
import NxtWatchContext from '../../context/NxtWatchContext'

import {
  HeaderContainer,
  LogoImage,
  HeaderFunctionalityDiv,
  ModeShifterbtn,
  ProfileButton,
  Image,
  LogOutButton,
  LogOutContainer,
  CancelButton,
  ConfirmButton,
  Text,
} from './styled'

const Header = props => {
  const logOut = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDarkThemeOn, changeTheme} = value
        const changeAppMode = () => {
          changeTheme()
        }

        return (
          <HeaderContainer select={isDarkThemeOn}>
            {isDarkThemeOn ? (
              <Link to="/">
                <LogoImage
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                  alt="website logo"
                />
              </Link>
            ) : (
              <Link to="/">
                <LogoImage
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  alt="website logo"
                />
              </Link>
            )}
            <HeaderFunctionalityDiv>
              <ModeShifterbtn
                type="button"
                onClick={changeAppMode}
                data-testid="theme"
              >
                {isDarkThemeOn ? (
                  <IoSunnyOutline size="20" color="#ffffff" />
                ) : (
                  <FaMoon size="20" />
                )}
              </ModeShifterbtn>
              <ProfileButton type="button">
                <Image
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                />
              </ProfileButton>
              <Popup
                modal
                trigger={<LogOutButton type="button">Logout</LogOutButton>}
              >
                {close => (
                  <LogOutContainer>
                    <Text>Are you sure, you want to logout</Text>
                    <HeaderFunctionalityDiv>
                      <CancelButton type="button" onClick={() => close()}>
                        Cancel
                      </CancelButton>
                      <ConfirmButton type="button" onClick={logOut}>
                        Confirm
                      </ConfirmButton>
                    </HeaderFunctionalityDiv>
                  </LogOutContainer>
                )}
              </Popup>
            </HeaderFunctionalityDiv>
          </HeaderContainer>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}
export default withRouter(Header)
