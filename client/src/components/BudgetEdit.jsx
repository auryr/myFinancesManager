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
            initdate: null,
            enddate: null,
            user_id: null,
            categoryDataLoaded:false,
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleEditBudget = this.handleEditBudget.bind(this);
        this.renderEditBudget= this.renderEditBudget.bind(this)
    }

    componentDidMount() {
        axios.get(`/budgets/id/${this.props.category_id}`)
        .then((res) => {
            console.log(res.data.data)
            this.setState({
                id: res.data.data.id,
                name: res.data.data.name,
                description: res.data.data.description,
                initdate: res.data.data.initdate,
                enddate: res.data.data.enddate,
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

    handleEditBudget(e, name, description, initdate, enddate, user_id) {
        e.preventDefault();
        axios.put(`/budgets/${this.state.id}`, {
            name,
            description,
            initdate,
            enddate,
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
                            this.state.initdate,
                            this.state.enddate,
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
                            <div className="input-container2">
                                   <label>Init Date </label>
                                   <input type="date" name="initdate" id="initdate" value={this.state.initdate} placeholder="" onChange={this.handleInputChange} required />

                                   <label>End Date </label>
                                   <input type="date" name="enddate" id="enddate" value={this.state.enddate} placeholder="" onChange={this.handleInputChange} required />
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
          ? <Redirect push to={`/budgets/${this.state.user_id}`} />
          : ''}
      </div>
    )
  }
}
export default BudgetEdit;
