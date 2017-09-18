import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

import axios from 'axios';
import  BudgetList from "./BudgetList"

class BudgetCreate.jsx
BudgetEdit.jsx
BudgetList.jsxCreate extends Component {
     constructor() {
          super();
          this.state = {
               name: '',
               description: '',
               include: true,
               operation: '-',
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
               include: true,
               operation: '-',
               user_id: null
          })
     }

     handleCreateBudget(e, name, description, include, operation) {
          e.preventDefault();
          let user_id=this.state.user_id;
          axios.post('/categories', {
               name,
               description,
               include,
               operation,
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
                         this.state.include,
                         this.state.operation
                         )}>
                              <div className="input-container">
                                   <label>Name</label>
                                   <input  className="normal-input" type="text" name="name" placeholder="" value={this.state.name} onChange={this.handleInputChange} required />
                              </div>
                              <div className="input-container">
                                   <label>Description</label>
                                   <textarea name="description" value={this.state.description} onChange={this.handleInputChange} required />
                              </div>
                              <div className="select-container">
                                   <label>Budget type</label>
                                   <select className="select small" name="operation" value={this.state.operation} onChange={this.handleInputChange} required>
                                        <option>+</option>
                                        <option>-</option>
                                   </select>
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
