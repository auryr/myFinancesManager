import React, { Component } from 'react';
import axios from 'axios';
import {
  Link
} from 'react-router-dom';

class BudgetList extends Component {
  	constructor() {
    	super();
    	this.state = {
      		categoryData: null,
      		categoryDataLoaded: false,
    	},
    	this.renderBudgetList =this.renderBudgetList.bind(this);
    	this.handlerDeleteBudget = this.handlerDeleteBudget.bind(this);
  	}

  	componentDidMount() {
    	this.handlerReloadList();
  	}

  	handlerReloadList() {
  		console.log(this.props);
   	 	axios.get(`/categories/${this.props.userData.id}`)
    	.then(res=>{
      		this.setState({
        		categoryData: res.data.data,
        		categoryDataLoaded: true,
      		})
    	}).catch(err=>{
      		console.log(err.json);
    	})
  	}

  	handlerDeleteBudget(category_id){
    	axios.delete(`categories/${category_id}`).then(()=>{
      		this.handlerReloadList();
    	}).catch(err=>{
      		console.log(err);
    	})
  	}

  	renderBudgetList() {

    	    if (this.state.categoryDataLoaded) {
      		return this.state.categoryData.map((category,index) => {
				return (
    				<div  className="transaction-list-detail">
      					<div   className="transaction-no" >
      						{index +1}
      					</div>
				      	<div   className="transaction-detail" >
				      		{category.name}
                        </div>
				      	<div   className="transaction-description" >
				      		{category.description}
				      	</div>

			            <div className="transaction-button">
				      		<input type="submit" value="Delete"
					       onClick={
					       		()=>{this.handlerDeleteBudget(category.id)}
					       	} />
					    </div>

			            <div className="transaction-button">
			                <Link to={`/categories/edit/${category.id}`}>
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
                <div  className="transaction-list" >
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

                        <div  className="transaction-detail" >
                            <h1 className="transaction-info">Type</h1>
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
