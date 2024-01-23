import styled from 'styled-components'

export const HeaderContainer = styled.div`
  display: flex;
  padding: 10px;
  padding-left: 18px;
  padding-right: 10px;
  width: 100vw;
  justify-content: space-between;
  background-color: ${props => (props.select ? '#181818 ' : '#f9f9f9 ')};
`
export const LogoImage = styled.img`
  height: 5vh;
  width: 6vw;
`
export const HeaderFunctionalityDiv = styled.div`
  display: flex;
`
export const ModeShifterbtn = styled.button`
  background-color: transparent;
  border: none;
  margin-right: 7px;
  cursor: pointer;
`
export const ProfileButton = styled.button`
  background-color: transparent;
  border: none;
  margin-right: 7px;
  cursor: pointer;
`

export const Image = styled.img`
  height: 30px;
  width: 30px;
`
export const LogOutButton = styled.button`
  background-color: #fff;
  border-color: #3b82f6;
  color: #3b82f6;
  border-radius: 6px;
  width: 5vw;
  margin-right: 7px;
  cursor: pointer;
`
export const LogOutContainer = styled.div`
  display: flex;
  height: 20vh;
  width: 20vw;
  flex-direction: column;
  align-items: center;
  background-color: #0f0f0f;
  border-radius: 10px;
  border: 2px solid #0f0f0f;
`
export const CancelButton = styled.button`
  background-color: transparent;
  border: 1px solid #ffffff;
  border-radius: 6px;
  padding: 10px;
  color: #ffffff;
  cursor: pointer;
  margin-right: 18px;
  width: 6vw;
`
export const ConfirmButton = styled.button`
  background-color: #3b82f6;
  color: #ffffff;
  border-radius: 6px;
  padding: 10px;
  border-color: #3b82f6;
  width: 6vw;
  cursor: pointer;
`
export const Text = styled.p`
  color: #ffffff;
  margin-bottom: 15px;
`
