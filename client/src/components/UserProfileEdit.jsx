import React, { Component } from 'react';
import axios from 'axios';
import {Link, Redirect } from 'react-router-dom';
import '../App.css';

class UserProfileEdit extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            firstname: '',
            lastname: '',
            email: '',
            photo: '',
            userData: null,
            userDataLoaded: false,
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
        this.renderUserProfileEdit = this.renderUserProfileEdit.bind(this);
    }

    componentDidMount() {
        if (this.props.userData) {
            axios.get(`/users/id/${this.props.userData.id}`)
            .then(res => {
                this.setState({
                    userData: res.data.user,
                    username: res.data.user.username,
                    firstname: res.data.user.firstname,
                    lastname: res.data.user.lastname,
                    email: res.data.user.email,
                    photo:res.data.user.photo,
                    userDataLoaded: true,
                })
            })
        }
    }


    handleSubmit(e, username, firstname, lastname, email, photo) {
        e.preventDefault();
        axios.put(`/users/${this.props.userData.id}`, {
            username,
            firstname,
            lastname,
            email,
            photo
        }).then(res => {
            this.setState({
              auth: res.data.auth,
              user: res.data.user,
              fireRedirect: true,
              userDataLoaded:true,
            });

        }).catch(err => {
          console.log(err);
        })
      }


    handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
        })
    }


    renderUserProfileEdit() {
      if (this.state.userDataLoaded) {
        return (
          <div className="main-container">
              <div className="sub-container">
                <div>
                    <h1 className='hero-text2'>Edit Profile</h1>
                </div>
                <div className="edit-form">
                    <form onSubmit={(e) => this.handleSubmit(
                    e,
                    this.state.username,
                    this.state.firstname,
                    this.state.lastname,
                    this.state.email,
                    this.state.photo
                    )}>
                    <div className="input-container">
                        <label>Username</label>
                        <input className="small-input"  type="text" name="username" value={this.state.username} placeholder="" onChange={this.handleInputChange} required/>
                    </div>

                    <div className="input-container">
                        <label>First Name</label>
                        <input  className="normal-input"  type="text" name="firstname" value={this.state.firstname} placeholder="" onChange={this.handleInputChange} required />
                    </div>

                    <div className="input-container">
                        <label>Last Name</label>
                        <input  className="normal-input"  type="text" name="lastname" value={this.state.lastname} placeholder="" onChange={this.handleInputChange} required />
                    </div>

                    <div className="input-container" id="email">
                        <label>Email</label>
                        <input className="small-input" type="email" name="email" value={this.state.email} placeholder="" onChange={this.handleInputChange} required />
                    </div>

                    <div className="input-container">
                        <label>Photo</label>
                        <input className="normal-input"  type="text" name="photo" value={this.state.photo} placeholder="" onChange={this.handleInputChange} />
                    </div>

                    <div  className="button-container">
                        <input className="form" type="submit" value="Enter" />

                        <Link to={`/user/${this.props.userData.id}`} >
                            <input className="form" type="submit" value="Cancel" />
                        </Link>
                    </div>
                    </form>
                </div>
          </div>
          </div>
        )
      }
    }

    render(){
        return(
            <div className="register">
                {this.renderUserProfileEdit()}
                {this.state.fireRedirect
                ? <Redirect push to={`/user`} />
                : ''}
            </div>
        )
    }
}

export default UserProfileEdit;
