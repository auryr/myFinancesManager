import React, { Component } from 'react';
import axios from 'axios';

class UserCreate extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            firstname: '',
            lastname: '',
            password_digest: '',
            email: '',
            photo: '',
            auth_token: '',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.clearComponents = this.clearComponents.bind(this);
    }


    clearComponents(){
        this.setState({
            username: '',
            firstname: '',
            lastname: '',
            password: '',
            email: '',
            photo: '',
            auth_token: '',
        })
    }

    handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
        })
    }

    render(){
        return(
              <div className="main-container">
                <div className="sub-container">
                    <div>
                        <h2 className="hero-text2">Create account</h2>
                    </div>
                    <form onSubmit={(e)=>this.props.handleRegisterSubmit(
                    e,
                    this.state.username,
                    this.state.firstname,
                    this.state.lastname,
                    this.state.password_digest,
                    this.state.email,
                    this.state.photo,
                    this.state.auth_token
                    )}>

                        <div className="input-container">
                            <label>Username</label>
                            <input className="small-input" type="text" name="username" value={this.state.username} placeholder="" onChange={this.handleInputChange} required/>
                        </div>

                        <div className="input-container">
                            <label>First Name</label>
                            <input className="normal-input" type="text" name="firstname" value={this.state.firstname} placeholder="" onChange={this.handleInputChange} required />
                        </div>

                        <div className="input-container">
                            <label>Last Name</label>
                            <input className="normal-input" type="text" name="lastname" value={this.state.lastname} placeholder="" onChange={this.handleInputChange} required/>
                        </div>

                        <div className="input-container">
                            <label>Password    </label>
                            <input className="small-input" type="password" name="password" value={this.state.password} placeholder="" onChange={this.handleInputChange} required/>
                        </div>

                        <div className="input-container" id="email">
                            <label>Email</label>
                            <input  className="normal-input" type="email" name="email" value={this.state.email} placeholder="" onChange={this.handleInputChange} required/>
                        </div>

                        <div className="input-container">
                            <label>Photo</label>
                            <input className="normal-input" type="text" name="img_url" value={this.state.img_url} placeholder="" onChange={this.handleInputChange} required/>
                        </div>

                        <div className="x">
                            <input className="form" type="submit" value="Enter" />
                        </div>



                        <div>
                            <h3 className="register-done">Already have an account?</h3>
                        </div>
                    </form>
              </div>
            </div>
        )
    }
}

export default UserCreate;
