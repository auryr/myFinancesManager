import React, { Component } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import '../App.css';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
        })
    }
    render(){
        const { fireRedirect } = this.state;
        return(
            <div className="login-page">
                <div>
                    <h2 className="welcome-text">Welcome!</h2>
                </div>
                <div className="form">
                    <form className="login-form" onSubmit={(e) => this.props.handleLoginSubmit(
                        e,
                        this.state.username,
                        this.state.password
                        )}>
                        <div>
                        <input className="form" type="text" name="username" value={this.state.username} placeholder="Username" onChange={this.handleInputChange} />
                        </div>
                        <div>
                        <input className="form" type="Password" name="password" value={this.state.password} placeholder="Password" onChange={this.handleInputChange} />
                        </div>
                        <div>
                        <input className="login-button" type="submit" value="Log In" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default Login;
