import styled from 'styled-components'

export const Heading = styled.h1`
  font-size: 22px;
  color: #ffffff;
`
export const HomeContainerMenu = styled.div`
  display:flex;
  flex-direction:column;
  height:140vh
  width:16vw;
  justify-content:space-between;
  background-color:${props => (props.select ? '#313131' : '#f1f5f9')};
  
`
export const MenuSection = styled.ul`
  display: flex;
  flex-direction: column;
  padding-left: 0px;
  list-style: none;
  margin-right: 15px;
`

export const MenuOptionBox = styled.li`
  display: flex;
`

export const CustomButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  color: ${props => (props.select ? '#ffffff' : '#212121')};
  background-color: transparent;
`
export const Text = styled.p`
  margin-left: 12px;
`

export const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 7px;
`
export const ContactContainer = styled.div`
  display: flex;
  color: ${props => (props.select ? '#ffffff' : '#212121')};
  flex-direction: column;
`
export const ContactHeading = styled.p`
  font-size: 14px;
`
export const SocialMediaConnection = styled.div`
  display: flex;
  color: ${props => (props.select ? '#ffffff' : '#212121')};
`

export const Button = styled.button`
  background-color: transparent;
  border: none;
  color: ${props => (props.select ? '#ffffff' : '#212121')};
`
export const FooterText = styled.p`
  font-size: 12px;
  color: ${props => (props.select ? '#ffffff' : '#212121')};
`
