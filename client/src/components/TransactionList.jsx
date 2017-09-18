import React, { Component } from 'react';
import axios from 'axios';
import {
    Link
} from 'react-router-dom';
import '../App.css';

class TransactionList extends Component {

    constructor() {
        super();

        function addChar(value,myChar,size){
            var myValue=value.toString();
            var k=myValue.length;
            while (k< size ){
                myValue=myChar+ myValue;
                k=myValue.length ;
            }
            return myValue;
        }
        var currentDate= new Date();
        var initDate =   currentDate.getFullYear()+ "-"+addChar((currentDate.getMonth()+1 ),"0",2) +"-01"
        var endDate =    currentDate.getFullYear()+ "-"+addChar((currentDate.getMonth()+1 ),"0",2) +"-"+ (new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)).getDate()  ;


        this.state = {
            cat_id: null,
            initDate:initDate,
            endDate:endDate,
            categoryData:null,
            changeFilter: false,
            categoryDataLoaded:false,
            transactionData: null,
            transactionDataLoaded: false,
        },

        this.renderTransactionList    = this.renderTransactionList.bind(this);
        this.handlerDeleteTransaction = this.handlerDeleteTransaction.bind(this);
        this.handlerLoadCategory      = this.handlerLoadCategory.bind(this);
        this.handlerReloadList        = this.handlerReloadList.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        this.setState({
            changeFilter:true,
        })

        this.handlerReloadList() ;
        this.handlerLoadCategory();


    }


    handlerLoadCategory(){
        axios.get(`/categories/${3}`)
        .then(res=>{
            if(res.data.data.length>0){
                this.setState({
                    categoryData: res.data.data,
                    categoryDataLoaded: true,
                    cat_id:res.data.data[0].id
                })
            }
        }).catch(err=>{
            console.log(err.json);
        })
    }


    handlerReloadList(e) {
        (e) ? e.preventDefault() :"";
        axios.post(`/transactions/${3}`,{
            user_id: 3,
            initdate:  this.state.initDate,
            enddate:  this.state.endDate
        })
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

    handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
        });
    }

    renderTransactionList() {
        var total=0;
        var subClass="blue"
        return (
            <div  className="transaction-list" >
                {this.state.changeFilter ?
                    <form onSubmit={(e) => this.handlerReloadList(e)}>
                        <div className="input-container2">
                            <label >From Date </label>
                            <input type="date" name="initDate" id="initDate" value={this.state.initDate} onChange={this.handleInputChange}  required />

                            <label >to Date </label>
                            <input type="date" name="endDate" id="endDate"  value={this.state.endDate}  onChange={this.handleInputChange}  placeholder=""  required />

                            <div>
                                <input className="small-button" type="submit" value="Find"  />
                            </div>
                        </div>
                    </form>
                :""}

                <div>
                    <div  className="transaction-list-header">
                        <div  className="transaction-no" >
                            <h1 className="transaction-info" >#</h1>
                        </div>
                        <div  className="transaction-description" >
                            <h1 className="transaction-info">Note</h1>
                        </div>
                        <div  className="transaction-detail" >
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
                        <div  className="transaction-detail" >
                            <h1 className="transaction-info">Result</h1>
                        </div>
                        <div className="transaction-button">
                        </div>

                        <div className="transaction-button">
                        </div>
                    </div>


                    {(this.state.transactionDataLoaded) ?
                    this.state.transactionData.map((transaction,index) => {
                        console.log(total,"a",transaction.amount );
                        (transaction.operation==="+") ? total+=Number(transaction.amount) : total-=Number(transaction.amount);
                        (total<0) ? subClass="red" : subClass="blue";
                        return <div  className="transaction-list-detail"  key={transaction.id}>
                            <div  className="transaction-no" >
                                <h1 className="transaction-info" >{index +1 }</h1>
                            </div>
                            <div  className="transaction-description" >
                                <h1 className="transaction-info">{transaction.note}</h1>
                            </div>
                            <div  className="transaction-detail" >
                                <h1 className="transaction-info" >{transaction.trdate}</h1>
                            </div>
                            <div  className="transaction-date" >
                                <h1 className="transaction-info">{transaction.amount}</h1>
                            </div>
                            <div  className="transaction-date" >
                                <h1 className="transaction-info">{transaction.receipt}</h1>
                            </div>
                            <div  className="transaction-detail" >
                                <h1 className="transaction-info">{transaction.operation}</h1>
                            </div>
                            <div  className="transaction-detail">
                                <h1 className="transaction-info">{transaction.name}</h1>
                            </div>

                            <div  className="transaction-detail">
                                <h1 className={`transaction-info  ${subClass}`}>{total}</h1>
                            </div>

                            <div className="transaction-button">
                                <Link className='link-to' to={`/transactions/edit/${transaction.id}`}>
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
            </div>
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

export default TransactionList;
