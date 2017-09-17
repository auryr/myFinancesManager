import React, { Component } from 'react';
import axios from 'axios';
import {
    Link
} from 'react-router-dom';
import '../App.css';

class TransactionCreate extends Component {
    constructor() {
        super();
        this.state = {
            transaction_id:null,
            user_id:null,
            note: null,
            trdate: '',
            amount:0,
            receipt: '',
            category_id: null,
            categoryData:null,
            categoryDataLoaded:false,
            transactionData: null,
            transactionDataLoaded: false,
        },

        this.renderTransactionList =this.renderTransactionList.bind(this);
        this.handlerDeleteTransaction = this.handlerDeleteTransaction.bind(this);
        this.handleTransactionSubmit = this.handleTransactionSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.clearComponents= this.clearComponents.bind(this);
        this.handlerLoadCategory = this.handlerLoadCategory.bind(this);
    }

    componentDidMount() {
        this.setState({
              user_id:this.props.userData.id,
        })
        this.handlerReloadList();
        this.handlerLoadCategory();
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.transaction_id != this.state.transaction_id ) {
            this.handlerReloadList();
        }
    }

    clearComponents(){
        this.setState({
            note: null,
            trdate: '',
            amount:0,
            receipt: '',
        })
    }

    handlerLoadCategory(){
        axios.get(`/categories/${this.props.userData.id}`)
        .then(res=>{
            if(res.data.data.length>0){
                this.setState({
                    categoryData: res.data.data,
                    categoryDataLoaded: true,
                    category_id:res.data.data[0].id
                })
            }
        }).catch(err=>{
            console.log(err.json);
        })
    }

    handleTransactionSubmit(e, note, trdate, amount, receipt, category_id) {
        e.preventDefault();
        axios.post('/transactions', {
            note,
            trdate,
            amount,
            receipt,
            category_id,
        }).then(res => {
            this.clearComponents();
            this.setState({
                transactionData: res.data.data,
                transaction_id:  res.data.data.id,
                transactionDataLoaded:false,
            })
        }).catch(err => console.log(err));
    }

    handleInputChange(e) {
        const name = e.target.name;
        let value = e.target.value;

        this.setState({
            [name]: value,
        });
    }

    handlerReloadList() {
        axios.get(`/transactions/${this.props.userData.id}`)
        .then(res=>{
            this.setState({
                transactionData: res.data.data,
                transactionDataLoaded: true,
            })
        }).catch(err=>{
            console.log(err.json);
        })
    }

    handlerDeleteTransaction(transaction_Id){
        axios.delete(`/transactions/${transaction_Id}`)
        .then(()=>{
            this.handlerReloadList();
        })
        .catch(err=>{
            console.log(err);
        })
    }
  //transaction list
    renderTransactionList() {
    return (
        <div className="transaction-list" >
            <div  className="transaction-list-header">
                <div  className="transaction-no" >
                    <h1 className="transaction-info" >#</h1>
                </div>
                <div  className="transaction-name" >
                    <h1 className="transaction-info">Note</h1>
                </div>
                <div  className="transaction-description" >
                    <h1 className="transaction-info" >Date</h1>
                </div>
                <div  className="transaction-date" >
                    <h1 className="transaction-info">Amout</h1>
                </div>
                <div  className="transaction-date" >
                    <h1 className="transaction-info">Receipt</h1>
                </div>
                <div  className="transaction-detail">
                    <h1 className="transaction-info">Type</h1>
                </div>
                <div  className="transaction-detail" >
                    <h1 className="transaction-info">Category</h1>
                </div>
                <div className="transaction-button">
                </div>

                <div className="transaction-button">
                </div>
            </div>


            {(this.state.transactionDataLoaded) ?
            this.state.transactionData.map((transaction,index) => {
                return <div  className="transaction-list-detail"  key={transaction.id}>
                    <div  className="transaction-no" >
                        <h1 className="transaction-info" >{index +1 }</h1>
                    </div>
                    <div  className="transaction-name" >
                        <h1 className="transaction-info">{transaction.note}</h1>
                    </div>
                    <div  className="transaction-description" >
                        <h1 className="transaction-info" >{transaction.trdate}</h1>
                    </div>
                    <div  className="transaction-date" >
                        <h1 className="transaction-info">{transaction.amount}</h1>
                    </div>
                    <div  className="transaction-date" >
                        <h1 className="transaction-info">{transaction.receipt}</h1>
                    </div>
                    <div  className="transaction-detail" >
                        <h1 className="transaction-info">{transaction.operatio}</h1>
                    </div>
                    <div  className="transaction-detail">
                        <h1 className="transaction-info">{transaction.name}</h1>
                    </div>
                    <div className="transaction-button">
                        <Link className='link-to' to={`/TransactionEdit/${transaction.id}`}>
                            <span className="button-span small-button"> Edit   </span>
                        </Link>
                    </div>
                    <div className="transaction-button">
                        <input   className="small-button" type="submit" value="Delete" onClick={()=>{this.handlerDeleteTransaction(transaction.id)}} />
                    </div>
                </div>
            })
            : ""}

        </div>
    );
  }

  renderSubmitform(){
    return(
      <div className="main-container">
        <div className="sub-container">
          <div >
            <h1 className="hero-text2">Add a transaction to project</h1>
          </div>
          <form onSubmit={(e) => this.handleTransactionSubmit(
            e,
            this.state.note,
            this.state.trdate,
            this.state.amount,
            this.state.receipt,
            this.state.category_id
          )}>
            <div>
              <div  className="dropdown-container">
                <label >Category</label>
                <select id="cat_id"  name="cat_id" onChange={this.handleInputChange} >
                  { (this.state.categoryDataLoaded) ?
                  this.state.categoryData.map((category,index) => {
                    return <option key={category.id} id={category.id}
                    name="cat_id"  value={category.id} > {category.name}</option>
                  })
                : ""}
                </select>
              </div>


              <div className="input-container">
                <label className="labelInput" >Note </label>
                <textarea name="note" id="note" value={this.state.note} placeholder="" onChange={this.handleInputChange} required />
              </div>


              <div className="input-container2">
                <label >Date </label>
                <input type="date" name="trdate" id="trdate" value={this.state.trdate} placeholder="" onChange={this.handleInputChange} required />
              </div>

              <div className="input-container">
                <label className="labelInput" >Amount </label>
                <input className="normal-input"  type="number" name="amount" id="amount" value={this.state.amount} placeholder="" onChange={this.handleInputChange}  required/>
              </div>

              <div className="input-container">
                <label className="labelInput" >Receipt </label>
                <input className="normal-input"  type="text" name="receipt" id="receipt" value={this.state.receipt} placeholder="" onChange={this.handleInputChange}  required/>
              </div>


              <div>
                  <input type="submit" value="Submit" />
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }

    render() {
        return(
            <div>
                {this.renderSubmitform()}
                {this.renderTransactionList()}
            </div>
        )
    }
}

export default TransactionCreate;
