import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
class BudgetEdit extends Component {
    constructor() {
        super();
        this.state = {
            id:null,
            name: '',
            description: '',
            include: true,
            operation: '-',
            user_id: null,
            categoryDataLoaded:false,
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleEditBudget = this.handleEditBudget.bind(this);
        this.renderEditBudget= this.renderEditBudget.bind(this)
    }

    componentDidMount() {
        axios.get(`/categories/id/${this.props.category_id}`)
        .then((res) => {
            console.log(res.data.data)
            this.setState({
                id: res.data.data.id,
                name: res.data.data.name,
                description: res.data.data.description,
                include: res.data.data.include,
                operation: res.data.data.operation,
                user_id :this.props.userData.id,
                categoryDataLoaded:true,
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

    handleEditBudget(e, name, description, include, operation, user_id) {
        e.preventDefault();
        axios.put(`/categories/${this.state.id}`, {
            name,
            description,
            include,
            operation,
            user_id,
        }).then(res => {
            this.setState({
                category: res.data.data,
                fireRedirect: true,
            })
        }).catch(err =>{
            console.log(err);
        })
    }

    renderEditBudget() {
        if (this.state.categoryDataLoaded) {
            return (
                <div className="main-container">
                    <div className="sub-container">
                        <div >
                            <h1 className="hero-text2">Edit Budget</h1>
                        </div>
                        <form onSubmit={(e) => this.handleEditBudget(e,
                            this.state.name,
                            this.state.description,
                            this.state.include,
                            this.state.operation,
                            this.state.user_id
                            )}>
                            <div className="input-container">
                                <label> Name </label>
                                <input className="normal-input"  type="text" name="name"  value={this.state.name} onChange={this.handleInputChange} required />
                            </div>
                            <div className="input-container">
                                <label> Description </label>
                                <input  className="normal-input" type="text" name="description"  value={this.state.description} onChange={this.handleInputChange} required />
                            </div>
                            <div className="select-container">
                                <label> Operation </label>
                                <select className="select small"  name="operation" value={this.state.operation} onChange={this.handleInputChange} required>
                                  <option>+</option>
                                  <option>-</option>
                                </select>
                            </div>
                            <input type="submit" value="Update" />
                        </form>
                    </div>
                </div>
            )
        }
    }
  render() {
    return (
      <div className="category-create">
        {this.renderEditBudget()}
        {this.state.fireRedirect
          ? <Redirect push to={`/category/id/${this.state.id}`} />
          : ''}
      </div>
    )
  }
}
export default BudgetEdit;