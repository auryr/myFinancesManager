import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import '../App.css';

class UserProfileEdit extends Component {
    constructor() {
        super();
        this.state = {
            newPassword: '',
            newPasswordConfirm: '',
            userData: null,
            userDataLoaded: false,
            fireRedirect:false,
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
        this.renderUserPassword = this.renderUserPassword.bind(this);
    }

    componentDidMount() {
        if (this.props.userData) {
            axios.get(`/user/id/${this.props.userData.id}`)
                .then(res => {
                    this.setState({
                        userData: res.data.user,
                        userDataLoaded: true,
                    })
                }
            )
        }
    }

    handleSubmit(e, password, newPasswordConfirm) {
        e.preventDefault();

        if ( password!==newPasswordConfirm){
          alert("The confirm password doesn't match")
        }else{
          let updatePass=true;
          let id =this.props.userData.id;
          axios.put(`/user/${this.props.userData.id}`, {
            id,
            password,
            updatePass,
          }).then(()=>{
            this.setState({
              fireRedirect:true,
            })
          }).catch(err => {
            console.log(err);
          })
        }
      }


    handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
        })
    }

    renderUserPassword() {
        if (this.state.userDataLoaded) {
            return (
                <div className="form">
                    <div>
                        <h1  className="page-tittle">Change Password</h1>
                        <form  className="login-form" onSubmit={(e) => this.handleSubmit(
                            e,
                            this.state.newPassword,
                            this.state.newPasswordConfirm,
                            )}>
                            <div className="input-container3">
                                <label>New Password</label>
                                <input className="form" type="password" name="newPassword" placeholder="" onChange={this.handleInputChange} required/>
                            </div>
                            <div  className="input-container3">
                                <label>Confirm New Password</label>
                                <input className="form" type="password" name="newPasswordConfirm" placeholder="" onChange={this.handleInputChange} required/>
                            </div>

                            <div>
                                <input type="submit" value="Enter" />
                            </div>

                        </form>
                    </div>

                </div>
            )
        }
    }

    render(){
        return(
            <div className="login-page">
                {this.renderUserPassword()}
                {this.state.fireRedirect
                ? <Redirect push to={`/user/id/${this.props.userData.id}`} />
                : ''}
            </div>
        )
    }
}

export default UserProfileEdit;
