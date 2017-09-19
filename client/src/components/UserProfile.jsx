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
            dataLoaded:false
        }
        this.handlerloadList = this.handlerloadList.bind(this);
    }

    componentDidMount() {
        axios.get(`/users/id/${this.props.user.id}`)
        .then(res => {
            this.setState({
                user_id: res.data.user.id,
                username: res.data.user.username,
                fullname: res.data.user.fullname,
                email: res.data.user.email,
                dataLoaded:true,
            })
        })
        .then(() => {
            console.log(this.state);
            this.handlerloadList();
        })
    }

    handlerloadList() {
        axios.post(`/transactions/budget/${this.state.user_id}`,{
            user_id: this.state.user_id
        })
        .then(res=>{
            this.setState({
                transactionData: res.data.data,
                transactionDataLoaded: true,
            })
        }).catch(err=>{
            console.log(err.json);
        })
    }

    render() {
        return (
             (this.state.dataLoaded)?
                <div className="main-container">
                    <div className="sub-container3">
                        <div className="sub-container4">
                                <div  className="transaction-list-header">
                                    <div  className="transaction-no" >
                                        <h1 className="transaction-info" >#</h1>
                                    </div>

                                    <div  className="transaction-detail" >
                                        <h1 className="transaction-info">Name</h1>
                                    </div>

                                    <div  className="transaction-description" >
                                        <h1 className="transaction-info" >Description</h1>
                                    </div>

                                    <div  className="transaction-detail" >
                                        <h1 className="transaction-info">Type</h1>
                                    </div>

                                    <div className="transaction-button">
                                    </div>

                                    <div className="transaction-button">
                                    </div>
                                </div>
                            <div className="user-info">
                                <h1 className="link-to">{this.state.fullname}.</h1>

                                <div className="user-pic">
                                    <img alt="" src="https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png"/>
                                </div>
                                <div className="user-details">
                                    <h2 className="link-to">{this.state.username}</h2>
                                    <h3 className="link-to">{this.state.email}</h3>
                                    <br/>
                                    <Link className='link-small' to={`/user/password/${this.props.user.id}`} >Edit Password </Link>
                                    <br/>
                                    <br/>
                                    <Link className='link-small'   to={`/user/edit/${this.props.user.id}`} >Change Profile</Link>
                                </div>
                                <div className="user-links">
                                    <br/>

                                    <div className="links">
                                        <Link  className="link-small" to={'/budgets'}>Create A Budgets</Link>
                                    </div>
                                    <br/>

                                    <div className="links">
                                        <Link  className="link-small" to={`/budgets/list`}>View Budgets</Link>
                                    </div>
                                    <br/>


                                    <div className="links">
                                        <Link  className="link-small" to={'/categories'}>Create A Category</Link>
                                    </div>
                                    <br/>

                                    <div className="links">
                                        <Link  className="link-small" to={`/categories/list`}>View Categories</Link>
                                    </div>
                                    <br/>

                                    <div className="links">
                                        <Link  className="link-small" to={'/transactions'}>Add Transaction</Link>
                                    </div>
                                        <br/>

                                    <div className="links">
                                        <Link  className="link-small" to={`/transactions/list`}>Transaction List</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            :
                <h1> Loading... </h1>


        )
    }
}

export default UserProfile;
