import styled from 'styled-components'

export const NFHeading = styled.h1`
  color: ${props => (props.select ? '#ffffff' : '#212121')};
`

export const NFText = styled.p`
  color: ${props => (props.select ? '#ffffff' : '#212121')};
`
export const NotFoundMainPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;

  background-color: ${props => (props.select ? '#212121' : ' #e2e8f0')};
`
