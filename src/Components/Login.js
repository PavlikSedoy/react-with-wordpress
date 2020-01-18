import React, { Component } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { Redirect } from '@reach/router'

export default class Login extends Component {

  constructor( props ) {
    super( props )

    this.state = {
      username: '',
      password: '',
      userNiceName: '',
      userEmail: '',
      loggedIn: false,
      loading: false,
      error: ''
    }
  }

  onFormSubmit = () => {
    event.preventDefault()

    const siteUrl = 'http://localhost:3000'

    const loginData = {
      username: this.state.username,
      password: this.state.password,
    }

    this.setState( { loading: true }, () => {
      axios.post( `${siteUrl}/wp-json/jwt-auth/v1/token`, loginData )
        .then( res => {

          console.warn( res.data )

          if ( undefined === res.data.token ) {
            this.setState({ error: res.data.message, loading: false })
            return
          }

          localStorage.setItem( 'token', res.data.token )
          localStorage.setItem( 'userName', res.data.user_nicename )

          this.setState({
            loading: false,
            token: res.data.token,
            userNiceName: res.data.user_nicename,
            userEmail: res.data.user_email,
            loggedIn: true
          })
        } )
        .catch( err => {
          this.setState({ error: err.response.data, loading: false })
        } )
    } )
  }

  handleOnChange = ( event ) => {
    this.setState({ [ event.target.name ]: event.target.value })
  }

  render() {

    const { username, password, loggedIn, userNiceName } = this.state;

    const user = userNiceName ? userNiceName : localStorage.getItem( 'userName' )

    if ( loggedIn || localStorage.getItem( 'token' ) ) {
      return <Redirect to={`/dashboard/${user}`} noThrow />
    } else {
      return (
        <div>
          <Navbar />
          <form onSubmit={ this.onFormSubmit } style={{ marginLeft: '20px', marginTop: '20px' }}>
            <label htmlFor="" className="form-group">
              Username:
              <input
                type="text"
                className="form-control"
                name="username"
                value={ username }
                onChange={ this.handleOnChange }
              />
            </label>
            <br/>
            <label htmlFor="" className="form-group">
              Password:
              <input
                type="password"
                className="form-control"
                name="password"
                value={ password }
                onChange={ this.handleOnChange }
              />
            </label>
            <br/>
            <button className="btn btn-primary mb-3" type="submit">Login</button>
          </form>
        </div>
      )
    }
  }
}