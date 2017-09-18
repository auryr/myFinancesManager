import React, { Component } from 'react';
import axios from 'axios';
import {
  Link
} from 'react-router-dom';

class UserProfile extends Component {
    constructor() {
        super();
        this.state = {
            user_id:null,
            username: '',
            fullname: '',
        }
    }

    componentDidMount() {
        if (this.props.loggedIn) {
            axios.get(`/user/id/${this.props.user.id}`)
                .then(res => {
                    this.setState({
                        user_id: res.data.user.id,
                        username: res.data.user.username,
                        fullname: res.data.user.fullname,
                        email: res.data.user.email,
                    })
                }
            )
        }
    }


    render() {

    return (
        <div className="main-container">
            <div className="sub-container3">
                <div className="user-info">
                    <div className="user-pic">
                        <img alt="" src="http://www.doyouknowja.com/upload/profile-pic/default-user.jpg"/>
                    </div>
                    <div className="user-details">
                        <h1>{this.state.fullname}.</h1>
                        <h2>{this.state.username}</h2>
                        <h3>{this.state.email}</h3>
                        <Link className='link-to' to={`/user/password/${this.props.user.id}`} >Edit Password </Link>
                        <br/>
                        <br/>
                        <Link className='link-to'   to={`/user/edit/${this.props.user.id}`} >Change Profile</Link>
                    </div>
                </div>
                <div className="user-links">
                    <br/>

                    <div className="links">
                        <Link  className="link-small" to={'/budgets'}>Create A Budgets</Link>
                    </div>
                    <br/>

                    <div className="links">
                        <Link  className="link-small" to={`/budgets/${this.state.user_id}`}>View Budgets</Link>
                    </div>
                    <br/>


                    <div className="links">
                        <Link  className="link-small" to={'/categories'}>Create A Category</Link>
                    </div>
                    <br/>

                    <div className="links">
                        <Link  className="link-small" to={`/categories/${this.state.user_id}`}>View Categories</Link>
                    </div>
                    <br/>

                    <div className="links">
                        <Link  className="link-small" to={'/transactions'}>Add Transaction</Link>
                    </div>
                        <br/>

                    <div className="links">
                        <Link  className="link-small" to={`/transactions/${this.state.user_id}`}>Transaction List</Link>
                    </div>
                </div>
            </div>
        </div>
    )
    }
}

export default UserProfile;
