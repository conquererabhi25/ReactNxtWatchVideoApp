import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {
  LoginMainContainer,
  LoginBox,
  Image,
  FormElement,
  Labels,
  InputElement,
  ShowPasswordContainer,
  ErrorMag,
  Text,
  LoginButton,
} from './styled'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    showpassWord: false,
    loginSuccessFull: false,
    displayErrorMsg: '',
  }

  // ================================================================

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitError = errorMsg => {
    this.setState({displayErrorMsg: errorMsg})
  }

  LoginSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userData = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userData),
    }
    const serverResponse = await fetch(url, options)
    const data = await serverResponse.json()
    if (data.jwt_token !== undefined) {
      this.onSubmitSuccess(data.jwt_token)
      this.setState({loginSuccessFull: true})
    } else {
      this.onSubmitError(data.error_msg)
      this.setState({loginSuccessFull: false})
    }
  }

  getUserName = event => {
    this.setState({username: event.target.value})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  // ===================DISPLAY PASSWORD=============================

  displayPassword = () => {
    this.setState(prevState => ({showpassWord: !prevState.showpassWord}))
  }

  render() {
    const {showpassWord, displayErrorMsg, loginSuccessFull} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <LoginMainContainer>
        <LoginBox>
          <Image
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
          />
          <FormElement onSubmit={this.LoginSubmit}>
            <Labels htmlFor="userName">USERNAME</Labels>
            <InputElement
              id="userName"
              type="text"
              onChange={this.getUserName}
              placeholder="Username"
            />
            <Labels htmlFor="passWord">PASSWORD</Labels>
            {showpassWord ? (
              <InputElement
                id="passWord"
                type="text"
                onChange={this.getPassword}
                placeholder="Password"
              />
            ) : (
              <InputElement
                id="passWord"
                type="password"
                onChange={this.getPassword}
                placeholder="Password"
              />
            )}
            {loginSuccessFull ? null : <ErrorMag>{displayErrorMsg}</ErrorMag>}
            <ShowPasswordContainer>
              <input
                type="checkbox"
                id="passwordShow"
                onClick={this.displayPassword}
              />
              <Text htmlFor="passwordShow">Show Password</Text>
            </ShowPasswordContainer>
            <LoginButton type="submit">Login</LoginButton>
          </FormElement>
        </LoginBox>
      </LoginMainContainer>
    )
  }
}

export default LoginRoute
