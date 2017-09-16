import React, { Component } from 'react';
import './App.css';
import './Reset.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { Redirect } from 'react-router';
// AXIOS
import axios from 'axios';
// HEADER/FOOTER/HOME
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home   from './components/Home.jsx';
// LOGIN/REGISTER
import Login    from './components/Login.jsx';
import Register from './components/Register.jsx';

// USERS
import UserProfile from './components/UserProfile.jsx';
import UserProfileEdit from './components/UserProfileEdit.jsx';
import UserPasswordEdit from './components/UserPasswordEdit.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
        auth: false,
        user: null,
        fireRedirect: false,
        apiDataloaded:false,
        currentPage: 'home',
        loggedIn: false,
        toggleNav: false
    }
    // AUTH
    this.logOut =  this.logOut.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleRegisterSubmit =this.handleRegisterSubmit.bind(this);
    // Create Project
    this.handleCreateProject = this.handleCreateProject.bind(this);
  }

  handleLoginSubmit(e, username, password) {
      e.preventDefault();
      axios.post('/auth/login', {
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
    axios.post('/auth', {
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
           currentPage: 'home',
           userDataLoaded:true,
           loggedIn: (res.data.user),

       });
    }).catch(err => console.log(err));
  }

  logOut() {
    console.log("log out");
    axios.get('/auth/logout')
    .then(res => {
        console.log(res.body);
        this.setState({
            auth: false,
            user:null,
            fireRedirect: true,
        });
      }).catch(err => console.log(err));
   }


// Handle Create Project
  handleCreateProject(e, name, description, category, status, planned_start_date, planned_end_date) {
    e.preventDefault();
    axios.post('/project', {
      name,
      description,
      category,
      status,
      planned_start_date,
      planned_end_date,
    }).then(res => {
      this.setState({
        user: res.data.user,
        project: res.data,
        fireRedirect: true,
      })
    }).catch(err => console.log(err));
  }



  render() {
    return (
      <Router>
        <div className="App">
          <Header userData={this.state.user} logOut={this.logOut}/>
          <main>
            <Route exact path='/' render={() => <Home />} />
            <Route exact path='/login' render={() => {
              if(this.state.loggedIn){
                return <Redirect to={`user/id/:${this.state.user.id}`} Component={() =>
                ( <UserProfile user={this.state.user} /> )
                  } />
                }
              else
                return <Login handleLoginSubmit={this.handleLoginSubmit} />
              }} />

            <Route exact path='/register' render={() => {
              if(this.state.loggedIn){
                return <Redirect to={`user/id/:${this.state.user.id}`} Component={() =>
                ( <UserProfile user={this.state.user} /> )
                  } />
                }
              else
                return <Register handleRegisterSubmit={this.handleRegisterSubmit}
                    username={this.props.username}
                    firstname={this.firstname}
                    lastname={this.lastname}
                    password={this.password}
                    email={this.email}
                    user_type={this.user_type} />
              }} />


            <Route exact path="/user/id/:id" render={() => {
               if(!this.state.loggedIn)
                  return <Login/>
                else
                  return <UserProfile  loggedIn={this.state.auth} user={this.state.user}/>
               }}/>

            <Route exact path="/user" render={() => <UserProfile user={this.user} />} />
            <Route exact path="/userEdit/:id" render={(props) => <UserProfileEdit  userData={this.state.user} />} />

            <Route exact path="/userPassword/:id" render={(props) => <UserPasswordEdit  userData={this.state.user} />} />

          </main>
        </div>
      </Router>
    );
  }
}

export default App;
