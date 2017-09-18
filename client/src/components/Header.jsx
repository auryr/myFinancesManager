import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      menuDescription:'Login',
      userDataLoaded: false,
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.userData ){
      if ( this.state.userDataLoaded === false){
        this.setState({
          menuDescription: this.props.userData.username,
          userDataLoaded:true,
        })
      }
    }
  }

  render() {
    return (
      <header className="header">
            <div className="nav2">
              <ul className="nav-list">
                <li><Link to={'/login'}>{this.state.menuDescription} &nbsp;</Link></li>
                {!this.props.userData ? <li> <Link to={'/user'}>Register &nbsp;</Link></li> : ""}

                {this.props.userData ? <li><Link to={'/'}> Logout &nbsp;</Link></li> :""}
              </ul>
            </div>
      </header>
    )
  }
}

export default Header;
