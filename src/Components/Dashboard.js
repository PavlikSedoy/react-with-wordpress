import React, { Component } from 'react'
import Navbar from './Navbar'

export default class Dashboard extends Component {
  render() {

    const userName = localStorage.getItem( 'userName' )

    return (
      <div>
        <Navbar />
        <h2>Welcome {this.props.username}!</h2>
      </div>
    )
  }
}
