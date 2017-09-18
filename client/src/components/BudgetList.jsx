import React, { Component } from 'react';
import axios from 'axios';
import {
  Link
} from 'react-router-dom';

class BudgetList extends Component {
  	constructor() {
    	super();
    	this.state = {
      		budgetData: null,
      		budgetDataLoaded: false,
    	},
    	this.renderBudgetList =this.renderBudgetList.bind(this);
    	this.handlerDeleteBudget = this.handlerDeleteBudget.bind(this);
  	}

  	componentDidMount() {
    	this.handlerReloadList();
  	}

  	handlerReloadList() {
  		console.log(this.props);
   	 	axios.get(`/budgets/${this.props.userData.id}`)
    	.then(res=>{
      		this.setState({
        		budgetData: res.data.data,
        		budgetDataLoaded: true,
      		})
    	}).catch(err=>{
      		console.log(err.json);
    	})
  	}

  	handlerDeleteBudget(budget_id){
    	axios.delete(`budgets/${budget_id}`).then(()=>{
      		this.handlerReloadList();
    	}).catch(err=>{
      		console.log(err);
    	})
  	}

  	renderBudgetList() {

    	    if (this.state.budgetDataLoaded) {
      		return this.state.budgetData.map((budget,index) => {
				return (
    				<div  className="transaction-list-detail">
      					<div   className="transaction-no" >
      						{index +1}
      					</div>

				      	<div   className="transaction-detail" >
				      		{budget.name}
                        </div>

                        <div   className="transaction-description" >
                            {budget.description}
                        </div>

                        <div   className="transaction-date" >
                            {budget.initdate}
                        </div>

                        <div   className="transaction-date" >
                            {budget.enddate}
                        </div>

			            <div className="transaction-button">
				      		<input type="submit" value="Delete"
					       onClick={
					       		()=>{this.handlerDeleteBudget(budget.id)}
					       	} />
					    </div>

			            <div className="transaction-button">
			                <Link to={`/budgets/edit/${budget.id}`}>
			                    <span className="button-span small-button">Edit</span>
			                </Link>
			            </div>

				    </div>
  				)

      		});
    	    }

    }

  	render() {
    	return (
            <div className="main-container">
                <div  className="small-list" >
                <div>
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

                        <div  className="transaction-date" >
                            <h1 className="transaction-info">Initial date</h1>
                        </div>

                        <div  className="transaction-date" >
                            <h1 className="transaction-info">End date</h1>
                        </div>

                        <div className="transaction-button">
                        </div>

                        <div className="transaction-button">
                        </div>
                    </div>
        		    {this.renderBudgetList()}
                </div>
                </div>
	      	</div>
    	);
  	};
}

export default BudgetList;
