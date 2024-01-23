import styled from 'styled-components'

export const VideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

export const VideoText = styled.p`
  font-size: 14px;
  color: ${props => (props.select ? '#64748b' : '#212121')};
  margin-left: 10px;
  font-weight: 500;
`
export const VideoText1 = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: #2563eb;
  margin-left: 5px;
  font-weight: 500;
`

export const LineElement = styled.hr`
  color: #000000;
`

export const VideoPlayerContainer = styled.div`
  width: 120vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 13px;
  background-color: ${props => (props.select ? '#212121' : ' #e2e8f0')};
`

export const VideoDescButton = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
