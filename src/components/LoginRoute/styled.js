import styled from 'styled-components'

export const LoginMainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

export const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 24vw;
  height: 55vh;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 14px;
  border-radius: 6px;
`

export const Image = styled.img`
  align-items: center;
  height: 7vh;
  width: 14vw;
  align-self: center;
  margin-top: 15px;
`
export const FormElement = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
`
export const Labels = styled.label`
  font-size: 10px;
  margin-top: 13px;
  color: #1e293b;
  font-family: Roboto;
  font-weight: 500;
  margin-bottom: 5px;
`

export const InputElement = styled.input`
  border-radius: 4px;
  height: 25px;
  outline: grey;
  border-color: #e2e8f0;
  padding: 5px;
  padding-left: 8px;
`
export const LoginButton = styled.button`
  color: #ffffff;
  background-color: #3b82f6;
  margin-top: 15px;
  height: 28px;
  width: 18vw;
  border-radius: 6px;
  border-color: #3b82f6;
  align-self: center;
`
export const ShowPasswordContainer = styled.div`
  display: flex;
  margin-top: 12px;
  margin-bottom: 12px;
`

export const Text = styled.label`
  font-weight: bold;
  font-size: 14px;
  margin-left: 7px;
`

export const ErrorMag = styled.p`
  color: red;
  font-size: 12px;
`
