import styled from 'styled-components'

export const SecondMainDiv = styled.div`
  display: flex;
  height: 100vh;
`

export const VideoText = styled.p`
  font-size: 13px;
  margin-left: 8px;
  color: ${props => (props.select ? '#ffffff' : '#212121')};
`
export const VideoTextTitle = styled.p`
  font-size: 13px;
  margin-left: 8px;
  font-weight: bold;
  color: ${props => (props.select ? '#ffffff' : '#212121')};
`

export const UnorderedList = styled.ul`
  display: flex;
  flex-direction: column;
  padding-left: 0px;
  list-style: none;
  overflow-y: scroll;
  width: 100vw;
  padding: 10px;
  margin-top: 0px;
  background-color: ${props => (props.select ? '#212121' : ' #e2e8f0')};
`
export const PageName = styled.h1`
  color: ${props => (props.select ? '#ffffff' : '#212121')};
  align-self: center;
  font-size: 20px;
  margin-bottom: 10px;
  margin-left: 5px;
`
export const VideoTextHeadingTitle = styled.h1`
  font-size: 22px;
  color: ${props => (props.select ? '#ffffff' : '#212121')};
`

export const NoVideoDiv = styled.div`
display: flex;
  width: 80vw;
  flex-direction: column;
  align-items: center;
   background-color: ${props => (props.select ? '#212121' : ' #e2e8f0')};
}
`
