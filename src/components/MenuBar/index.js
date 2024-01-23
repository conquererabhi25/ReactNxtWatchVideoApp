import {Component} from 'react'
import {Link} from 'react-router-dom'
import {IoMdHome} from 'react-icons/io'
import {FaFire, FaFacebook, FaLinkedin} from 'react-icons/fa'
import {IoGameController, IoSearch} from 'react-icons/io5'
import {MdPlaylistAdd} from 'react-icons/md'
import {AiFillTwitterCircle} from 'react-icons/ai'
import NxtWatchContext from '../../context/NxtWatchContext'
import {
  HomeContainerMenu,
  MenuSection,
  MenuOptionBox,
  CustomButton,
  Text,
  FooterSection,
  ContactContainer,
  ContactHeading,
  SocialMediaConnection,
  Button,
  FooterText,
} from './styled'

import './index.css'

class MenuBar extends Component {
  state = {linkSelected: 'home'}

  handleSelected = link => {
    this.setState({linkSelected: link})
    console.log('run')
  }

  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDarkThemeOn} = value
          const {linkSelected} = this.state
          return (
            <>
              <HomeContainerMenu select={isDarkThemeOn}>
                <MenuSection>
                  <MenuOptionBox>
                    <Link
                      to="/"
                      className="rendingLinksStyle"
                      onClick={() => this.handleSelected('home')}
                    >
                      <CustomButton
                        type="button"
                        select={isDarkThemeOn}
                        selected={linkSelected === 'home'}
                      >
                        <IoMdHome select={isDarkThemeOn} />
                        <Text select={isDarkThemeOn}>Home</Text>
                      </CustomButton>
                    </Link>
                  </MenuOptionBox>
                  <MenuOptionBox>
                    <Link
                      to="/trending"
                      className="rendingLinksStyle"
                      onClick={() => this.handleSelected('trend')}
                    >
                      <CustomButton
                        select={isDarkThemeOn}
                        selected={linkSelected === 'trend'}
                      >
                        <FaFire />
                        <Text select={isDarkThemeOn}>Trending</Text>
                      </CustomButton>
                    </Link>
                  </MenuOptionBox>
                  <MenuOptionBox>
                    <Link
                      to="/gaming"
                      className="rendingLinksStyle"
                      onClick={() => this.handleSelected('game')}
                    >
                      <CustomButton
                        select={isDarkThemeOn}
                        selected={linkSelected === 'game'}
                      >
                        <IoGameController />
                        <Text select={isDarkThemeOn}>Gaming</Text>
                      </CustomButton>
                    </Link>
                  </MenuOptionBox>
                  <MenuOptionBox>
                    <Link
                      to="/saved-videos"
                      className="rendingLinksStyle"
                      onClick={() => this.handleSelected('game')}
                    >
                      <CustomButton
                        select={isDarkThemeOn}
                        onClick={() => this.handleSelected('saved')}
                        selected={linkSelected === 'saved'}
                      >
                        <MdPlaylistAdd />
                        <Text select={isDarkThemeOn}>Saved Videos</Text>
                      </CustomButton>
                    </Link>
                  </MenuOptionBox>
                </MenuSection>
                <FooterSection>
                  <ContactContainer select={isDarkThemeOn}>
                    <ContactHeading>CONTACT US</ContactHeading>
                    <SocialMediaConnection>
                      <Button select={isDarkThemeOn}>
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                          className="socialMediaImage"
                          alt="facebook logo URL"
                        />
                      </Button>
                      <Button select={isDarkThemeOn}>
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                          className="socialMediaImage"
                          alt="twitter logo"
                        />
                      </Button>
                      <Button select={isDarkThemeOn}>
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                          className="socialMediaImage"
                          alt="linked in logo"
                        />
                      </Button>
                    </SocialMediaConnection>
                  </ContactContainer>
                  <FooterText select={isDarkThemeOn}>
                    Enjoy! Now to see your channels and recommendations!
                  </FooterText>
                </FooterSection>
              </HomeContainerMenu>
            </>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default MenuBar
