import styled from 'styled-components'

export const VideoText = styled.p`
  font-size: 13px;
  color: ${props => (props.select ? '#f9f9f9' : '#212121')};
`

export const GameUl = styled.ul`
  display: flex;
  padding-left: 10px;
  list-style: none;
  flex-wrap: wrap;
  height: 100vh;
  margin-top: 0px;
  overflow-y: scroll;
  background-color: ${props => (props.select ? '#212121' : '#f9f9f9')};
`

export const CombineDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 90vw;
  background-color: ${props => (props.select ? '#212121' : '#f9f9f9')};
`

export const GamingHeading = styled.h1`
  color: ${props => (props.select ? '#f9f9f9' : '#212121')};
  font-size: 22px;
  margin-left: 10px;
`
export const PageTitleDiv = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${props => (props.select ? '#212121' : '#f9f9f9')};
  align-items: center;
`
