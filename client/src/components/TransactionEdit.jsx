import React, { Component } from 'react';
import axios from 'axios';
import {Link, Redirect } from 'react-router-dom';

class TransactionEdit extends Component {
    constructor() {
        super();
        this.state = {
            user_id: 0,
            transaction_id: null,
            note   : null,
            trdate : null,
            amount : null,
            receipt: null,
            cat_id : null,
            categoryData:null,
            categoryDataLoaded:false,
            transactionDataLoaded: false,
            fireRedirect:false,
        },
        this.handleTransactionSubmit = this.handleTransactionSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlerLoadCategory = this.handlerLoadCategory.bind(this);
        this.clearComponents= this.clearComponents.bind(this);
    }

    componentDidMount() {
        axios.get(`/transactions/id/${this.props.transaction_id}`)
        .then(res=>{
            this.handlerLoadCategory(3);
            this.setState({
                user_id: res.data.data.user_id,
                transaction_id: res.data.data.id,
                note: res.data.data.note,
                trdate: res.data.data.trdate,
                amount: res.data.data.amount,
                receipt: res.data.data.receipt,
                cat_id: res.data.data.category_id,
                transactionDataLoaded: true,
            });
        }).catch(err=>{
            console.log(err.json);
        })
    }

    handlerLoadCategory(user_id){
        axios.get(`/categories/${user_id}`).
        then(res=>{
            this.setState({
                categoryData: res.data.data,
                categoryDataLoaded: true,
            })
        }).catch(err=>{
            console.log(err.json);
        })
    }

    handleTransactionSubmit(e, note, trdate, amount, receipt, category_id) {
        e.preventDefault();
        axios.put(`/transactions/${this.props.transaction_id}`, {
            note,
            trdate,
            amount,
            receipt,
            category_id
        }).then(()=>{
            this.setState({
                fireRedirect:true,
            })
            this.clearComponents();
        }).catch(err => console.log(err));

    }

    handleInputChange(e) {
        const name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]: value,
        });
        console.log(this.state.cat_id)
    }

    clearComponents(){
        this.setState({
            note:"",
            trdate:"",
            amount:"",
            receipt:""
        })
    }

    renderInfo(){
        if (this.state.transactionDataLoaded){
            return(
                <div  className="main-container">
                    <div className="sub-container">
                        <div >
                            <h1 className="hero-text2">Edit Transaction</h1>
                        </div>
                        <form onSubmit={(e) => this.handleTransactionSubmit(
                            e,
                            this.state.note,
                            this.state.trdate,
                            this.state.amount,
                            this.state.receipt,
                            this.state.cat_id
                            )}>

                            <div className="dropdown-container">
                                <label className="labelInput">Category</label>
                                <select id="cat_id"  name="cat_id" onChange={this.handleInputChange}  value={this.state.cat_id} >
                              { (this.state.categoryDataLoaded) ?
                              this.state.categoryData.map((category,index) => {
                                return <option key={category.id} id={category.id}
                                name="cat_id"  value={category.id} >{category.name}</option>
                                })
                                : ""}
                                </select>
                            </div>

                            <div  className="input-container">
                                <label>Note </label>
                                <textarea className="form" name="note" id="note" value={this.state.note} placeholder="" onChange={this.handleInputChange} required/>
                            </div>

                            <div className="input-container2">
                                <label>Date </label>
                                <input className="form" type="date" name="trdate" id="trdate" value={this.state.trdate} placeholder="" onChange={this.handleInputChange} required/>

                            </div>

                            <div className="input-container">
                                <label className="labelInput" >Amount </label>
                                <input className="normal-input"  type="number" name="amount" id="amount" value={this.state.amount} placeholder="" onChange={this.handleInputChange}  required/>
                            </div>

                            <div className="input-container">
                                <label className="labelInput" >Receipt </label>
                                <input className="normal-input"  type="text" name="receipt" id="receipt" value={this.state.receipt} placeholder="" onChange={this.handleInputChange}  required/>
                            </div>

                            <div  className="button-container">
                                <input type="submit" value="Update" />
                                <Link to={`/user/${this.props.userData.id}`} >
                                    <input className="form" type="submit" value="Cancel" />
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }else{
          <h1>Loading....</h1>
        }
    }


    render() {
        return(
            <div>
                {this.state.transactionDataLoaded  ? this.renderInfo() : ""}

                {this.state.fireRedirect
                ? <Redirect push to={`/transactions/${this.state.user_id}`} />
                : ''}
            </div>
        )
    }
}

export default TransactionEdit;
