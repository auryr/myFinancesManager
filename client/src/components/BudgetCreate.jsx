import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

import axios from 'axios';
import  BudgetList from "./BudgetList"

class BudgetCreate extends Component {
     constructor() {
          super();
          this.state = {
               name: '',
               description: '',
               initdate: null,
               enddate: null,
               user_id: null,
               newid:null,
          }
          this.handleInputChange = this.handleInputChange.bind(this);
          this.handleCreateBudget= this.handleCreateBudget.bind(this);
          this.clearComponents=this.clearComponents.bind(this);
     }

     componentDidMount() {
          this.setState({
               user_id :this.props.userData.id
          })
     }

     componentWillUpdate(nextProps, nextState) {
        if (nextState.newid != this.state.newid ) {
            this.handlerReloadList();
        }
     }

     clearComponents(){
          this.setState({
               name: '',
               description: '',
               initdate: null,
               enddate: '-',
               user_id: null
          })
     }

     handleCreateBudget(e, name, description, initdate, enddate) {
          e.preventDefault();
          let user_id=this.state.user_id;
          axios.post('/budgets', {
               name,
               description,
               initdate,
               enddate,
               user_id,
          }).then(res => {
               this.clearComponents();
               this.setState({
                    newid:res.data.data.id,
               })
          }).catch(err => console.log(err));
     }

     handleInputChange(e) {
          const name = e.target.name;
          const value = e.target.value;
          this.setState({
               [name]: value,
          });
     }

     render() {
          return (
               <div className="main-container">
                    <div className="sub-container">
                         <div >
                              <h1 className="hero-text2">Create a Budget</h1>
                         </div>
                         <form onSubmit={(e) => this.handleCreateBudget(e,
                         this.state.name,
                         this.state.description,
                         this.state.initdate,
                         this.state.enddate
                         )}>
                              <div className="input-container">
                                   <label>Name</label>
                                   <input  className="normal-input" type="text" name="name" placeholder="" value={this.state.name} onChange={this.handleInputChange} required />
                              </div>

                              <div className="input-container">
                                   <label>Description</label>
                                   <textarea name="description" value={this.state.description} onChange={this.handleInputChange} required />
                              </div>

                             <div className="input-container2">
                                   <label>Init Date </label>
                                   <input type="date" name="initdate" id="initdate" value={this.state.initdate} placeholder="" onChange={this.handleInputChange} required />

                                   <label>End Date </label>
                                   <input type="date" name="enddate" id="enddate" value={this.state.enddate} placeholder="" onChange={this.handleInputChange} required />
                             </div>


                              <div>
                                   <input type="submit" value="Create" />
                              </div>

                         </form>
                    </div>
               </div>
          )
     }
}

export default BudgetCreate;
