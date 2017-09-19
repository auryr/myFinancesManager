import React, { Component } from 'react';
import axios from 'axios';
import {
    Link
} from 'react-router-dom';
import '../App.css';

class BudgetInfo extends Component {

    constructor() {
        super();
        this.state = {
            categoryDataLoaded:false,
            transactionData: null,
            transactionDataLoaded: false,
        },

        this.renderTransactionList    = this.renderTransactionList.bind(this);
        this.handlerLoadCategory      = this.handlerLoadCategory.bind(this);
        this.handlerReloadList        = this.handlerReloadList.bind(this);
    }

    componentDidMount() {
        this.setState({
            changeFilter:true,
        })
        this.handlerReloadList() ;
    }

    handlerReloadList() {
        axios.post(`/transactions/budget/3`,{
            user_id: 3
        })
        .then(res=>{
            console.log(res.data.data);
            this.setState({
                transactionData: res.data.data,
                transactionDataLoaded: true,
            })
        }).catch(err=>{
            console.log(err.json);
        })
    }

    renderTransactionList() {
        return (
        <h1>blah</h1>

        );
    }

    render() {
        return(
            <div className="main-container">
                {this.renderTransactionList()}
            </div>
        )
    }
}

export default BudgetInfo;
