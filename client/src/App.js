import React, { Component } from "react";
import "./App.css";
import "./Reset.css";
import {
    BrowserRouter as Router,
    Route,
    Link
} from "react-router-dom";
import { Redirect } from "react-router";

import axios from "axios";

// HEADER/FOOTER/HOME
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home   from "./components/Home.jsx";

// USERS
import Login    from "./components/Login.jsx";
import UserCreate from "./components/UserCreate.jsx";

import UserProfile from "./components/UserProfile.jsx";
import UserProfileEdit from "./components/UserProfileEdit.jsx";
import UserPasswordEdit from "./components/UserPasswordEdit.jsx";

// CATEGORIES
import CategoryCreate from "./components/CategoryCreate.jsx";
import CategoryEdit   from "./components/CategoryEdit.jsx";
import CategoryList   from "./components/CategoryList.jsx";

//TRANSACTION
import TransactionCreate from "./components/TransactionCreate.jsx";
import TransactionEdit from "./components/TransactionEdit.jsx";
import TransactionList from "./components/TransactionList.jsx";


class App extends Component {
    constructor() {
        super();
        this.state = {
            auth: false,
            user: null,
            fireRedirect: false,
            apiDataloaded:false,
            currentPage: "home",
            loggedIn: false,
            toggleNav: false
        }

        this.logOut =  this.logOut.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.handleRegisterSubmit =this.handleRegisterSubmit.bind(this);
    }

    handleLoginSubmit(e, username, password) {
        e.preventDefault();
        axios.post("/auth/login", {
            username,
            password,
        }).then(res => {
            this.setState({
                auth: res.data.auth,
                user: res.data.user,
                fireRedirect: true,
                loggedIn: (res.data.user),
            });
        }).catch(err => console.log(err));
    }

    handleRegisterSubmit(e, username, firstname, lastname, password_digest, email, user_type) {
        e.preventDefault();
        axios.post("/auth", {
            username,
            firstname,
            lastname,
            password_digest,
            email,
            user_type,
        }).then(res => {
            this.setState({
                auth: res.data.auth,
                user: res.data.user,
                fireRedirect: true,
                currentPage: "home",
                userDataLoaded:true,
                loggedIn: (res.data.user),
            });
        }).catch(err => console.log(err));
    }

    logOut() {
        axios.get("/auth/logout")
        .then(res => {
            this.setState({
                auth: false,
                user:null,
                fireRedirect: true,
            });
        }).catch(err => console.log(err));
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Header userData={this.state.user} logOut={this.logOut}/>
                    <main>
                        <Route exact path="/" render={() => <Home />} />

                        <Route exact path="/login" render={() => {
                          if(this.state.loggedIn){
                            return <Redirect to={`/user/${this.state.user.id}`} Component={() =>
                            ( <UserProfile user={this.state.user} /> )
                              } />
                            }
                          else
                            return <Login handleLoginSubmit={this.handleLoginSubmit} />
                          }} />

                        <Route exact path="/user" render={() => {
                            if(this.state.loggedIn){
                                return <Redirect to={`user/${this.state.user.id}`} Component={() =>
                                ( <UserProfile user={this.state.user} /> )
                                  } />
                                }
                            else
                                return <UserCreate handleRegisterSubmit={this.handleRegisterSubmit}
                                   />
                            }} />

                        <Route exact path="/user/:id" render={() => {
                           if(!this.state.loggedIn){
                                return <Redirect to={`/login`} Component={() =>
                                ( <UserProfile user={this.state.user} /> )
                                  } />
                                }
                            else
                              return <UserProfile  loggedIn={this.state.auth} user={this.state.user}/>
                           }}/>


                        <Route exact path="/user/edit/:id" render={(props) => <UserProfileEdit  userData={this.state.user} />} />

                        <Route exact path="/user/password/:id" render={(props) => <UserPasswordEdit  userData={this.state.user} />} />

                        <Route exact path="/categories"       render={(props) => <CategoryCreate  userData={this.state.user} />} />

                        <Route exact path="/categories/edit/:id" render={(props) => <CategoryEdit  userData={this.state.user} category_id={props.match.params.id}  />} />

                        <Route exact path="/categories/:id" render={(props) => <CategoryList  userData={this.state.user} />} />

                        <Route exact path="/transactions"       render={(props) => <TransactionCreate  userData={this.state.user} />} />

                        <Route exact path="/transactions/edit/:id" render={(props) => <TransactionEdit  userData={this.state.user} transaction_id={props.match.params.id}  />} />

                        <Route exact path="/transactions/:id" render={(props) => <TransactionList  userData={this.state.user}   />} />

                    </main>
                </div>
            </Router>
        );
    }
}

export default App;
