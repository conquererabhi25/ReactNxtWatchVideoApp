import styled from 'styled-components'

export const Button = styled.button`
  background-color: transparent;
  border: none;
`

export const HomeContainer = styled.div`
  display: flex;
`
export const HomeVideoSection = styled.div`
  display: flex;
  background-color: ${props => (props.select ? '#212121' : '#f9f9f9')};
  flex-direction: column;
`
export const Baner = styled.div`
  display: flex;
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png ');
  width: 75vw;
  height: 30vh;
  margin-left: 10px;
  background-size: cover;
  justify-content: space-between;
  padding-left: 10px;
  padding-top: 10px;
`
export const LogoImage = styled.img`
  height: 5vh;
  width: 6vw;
`
export const VideoDisplay = styled.div`
  background-color: ${props => (props.select ? '#181818' : '#f9f9f9')};
  color: ${props => (props.select ? '#f9f9f9' : '#212121')};
  display: flex;
  flex-direction: column;
  width: 89vw;
  padding: 12px;
  overflow-x: scroll;
  height: 130vh;
`

export const ListItem = styled.li`
  color: ${props => (props.select ? '#ffffff' : '#212121')};
`

export const VideoText = styled.p`
  font-size: 12px;
  color: ${props => (props.select ? '#f9f9f9' : '#212121')};
`
