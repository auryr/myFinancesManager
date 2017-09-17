import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class TransactionEdit extends Component {
    constructor() {
        super();
        this.state = {
            user_id: 0,
            transaction_id: null,
            note: null,
            trdate: null,
            amount: null,
            receipt null,
            category_id:null
            categoryData:null,
            categoryDataLoaded:false,
            transactionData: null,
            transactionDataLoaded: false,
            fireRedirect:false,
        },
        this.handleTransactionSubmit = this.handleTransactionSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlerLoadCategory = this.handlerLoadCategory.bind(this);
        this.clearComponents= this.clearComponents.bind(this);
    }


    componentDidMount() {
        axios.get(`/transactions/${this.props.transaction_id}`)
        .then(res=>{
            this.handlerLoadCategory(this.props.userData.id);
            this.setState({
                user_id: res.data.data.user_id,
                transaction_id: res.data.data.id,
                proj_id: res.data.data.proj_id,
                name: res.data.data.name,
                description: res.data.data.description,
                start_date: res.data.data.start_datestr,
                end_date: res.data.data.end_datestr,
                act_start_date: res.data.data.act_start_datestr,
                act_end_date: res.data.data.act_end_datestr,
                status: res.data.data.status,
                ticket: res.data.data.ticket,
                transactionData:res.data.data,
                transactionDataLoaded: true,
            });
        }).catch(err=>{
            console.log(err.json);
        })
    }

  handlerLoadCategory(proj_id){
    axios.get(`/project/id/${proj_id}`).then(res=>{
      this.setState({
        categoryData: res.data.data,
        categoryDataLoaded: true,
        })
    }).catch(err=>{
        console.log(err.json);
    })
  }

        handleTransactionSubmit(e, user_id, transaction_id, name, description, start_date, end_date, act_start_date, act_end_date, status, ticket, user_type) {
        user_type=this.state.user_type;
        e.preventDefault();
        axios.put(`/transaction/${transaction_id}`, {
            transaction_id,
            name,
            user_id,
            description,
            start_date,
            end_date,
            act_start_date,
            act_end_date,
            status,
            ticket,
            user_type,
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
    }

    clearComponents(){
        this.setState({
            name:"",
            description:"",
            ticket:"",
            start_date:"",
            start_date:"",
            status:"Pending",
        })
    }

    renderformNormalUser(){
        if (this.state.transactionDataLoaded){
            return(
                <div  className="main-container">
                    <div className="sub-container">
                        <div >
                            <h1 className="hero-text2">Add a transaction to project</h1>
                        </div>
                        <form onSubmit={(e) => this.handleTransactionSubmit(
                            e,
                            this.state.user_id,
                            this.state.transaction_id,
                            this.state.name,
                            this.state.description,
                            this.state.start_date,
                            this.state.end_date,
                            this.state.act_start_date,
                            this.state.act_end_date,
                            this.state.status,
                            this.state.ticket,
                            this.state.user_type
                            )}>

                            <div className="input-container">
                                <label>Name</label>
                                <h1 className="transaction-no-edit" >{this.state.name}  </h1>
                            </div>

                            <div className="input-container">
                                <label>Descripcion</label>
                                <h1 className="transaction-no-edit" >{this.state.description}</h1>
                            </div>

                            <div className="input-container 2">
                                <label>Planned start date</label>
                                <h1 className="transaction-no-edit"  >  {this.state.start_date} </h1>
                                <label>Planned end date </label>
                                <h1 className="transaction-no-edit"  >{this.state.end_date}  </h1>
                            </div>

                            <div className="input-container">
                                <label>Ticket</label>
                                <input  className="normal-input" type="text" name="ticket" id="ticket" value={this.state.ticket} placeholder="" onChange={this.handleInputChange} required/>
                            </div>
                            <div  className="input-container2" >
                                <label>Started date </label>
                                <input className="form" type="date" name="act_start_date" id="act_start_date" value={this.state.act_start_date} placeholder="" onChange={this.handleInputChange} />

                                <label>Ended date </label>
                                <input className="form" type="date" name="act_end_date" id="act_end_date" value={this.state.act_end_date} placeholder="" onChange={this.handleInputChange} />
                            </div>

                            <div className="dropdown-container" >
                                <label>Status</label>
                                <select name="status"   id="status"  value={this.state.status} onChange={this.handleInputChange}>
                                    <option name="status" key="1" value={"Done"}>Pending</option>
                                    <option name="status" key="2" value={"In progress"}>In progress</option>
                                    <option name="status" key="3"  value={"Canceled"}>Canceled</option>
                                </select>
                            </div>

                            <div>
                                <input className="form" type="submit" value="Enter" required/>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }else{
            <h1>Loading....</h1>
        }
    }
    renderFormSuperUser(){
        if (this.state.transactionDataLoaded){
            return(
                <div  className="main-container">
                    <div className="sub-container">
                        <div >
                            <h1 className="hero-text2">Add a transaction to project</h1>
                        </div>
                        <form onSubmit={(e) => this.handleTransactionSubmit(
                            e,
                            this.state.user_id,
                            this.state.transaction_id,
                            this.state.name,
                            this.state.description,
                            this.state.start_date,
                            this.state.end_date,
                            this.state.act_start_date,
                            this.state.act_end_date,
                            this.state.status,
                            this.state.ticket
                            )}>
                            <div className="dropdown-container">
                                <label className="labelInput">Category</label>
                                <select id="user_id"  name="user_id" onChange={this.handleInputChange}  value={this.state.user_id} >
                              { (this.state.categoryDataLoaded) ?
                              this.state.categoryData.map((category,index) => {
                                return <option key={category.user_id_new} id={category.username}
                                name="user_id"  value={category.user_id_new} >{category.username}</option>
                                })
                                : ""}
                                </select>
                            </div>

                            <div className="input-container" >
                                <label>Name</label>
                                <input className="normal-input" type="text" name="name" id="name" value={this.state.name} placeholder="" onChange={this.handleInputChange} required/>
                            </div>

                            <div  className="input-container">
                                <label>Description </label>
                                <textarea className="form" name="description" id="description" value={this.state.description} placeholder="" onChange={this.handleInputChange} required/>
                            </div>

                            <div className="input-container2">
                                <label>Planned start date </label>
                                <input className="form" type="date" name="start_date" id="start_date" value={this.state.start_date} placeholder="" onChange={this.handleInputChange} required/>

                                <label>Planned end date </label>
                                <input className="form" type="date" name="end_date" id="end_date" value={this.state.end_date} placeholder="" onChange={this.handleInputChange} required/>
                            </div>
                            <div className="input-container2">
                                <label>Started date </label>
                                <input className="form" type="date" name="act_start_date" id="act_start_date" value={this.state.act_start_date} placeholder="" onChange={this.handleInputChange} />

                                <label>Ended date </label>
                                <input className="form" type="date" name="act_end_date" id="act_end_date" value={this.state.act_end_date} placeholder="" onChange={this.handleInputChange} />
                            </div>

                            <div className="input-container">
                                <label>Ticket</label>
                                <input className="normal-input" type="text" name="ticket" id="ticket" value={this.state.ticket} placeholder="" onChange={this.handleInputChange} required/>
                            </div>

                            <div  className="dropdown-container">
                                <label>Status</label>
                                <select name="status"   id="status"  value={this.state.status} onChange={this.handleInputChange}>
                                    <option name="status" key="1" value={"Done"}>Pending</option>
                                    <option name="status" key="2" value={"In progress"}>In progress</option>
                                    <option name="status" key="3"  value={"Canceled"}>Canceled</option>
                                </select>
                            </div>

                            <div>
                                <input className="form" type="submit" value="Enter" required/>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }else{
          <h1>Loading....</h1>
        }
    }

    renderInfo(){
        if (this.state.transactionDataLoaded){
            (this.state.transactionData.user_type==="Manager")? this.renderFormSuperUser() : this.renderformNormalUser();
        }
    }

    render() {
        return(
            <div>
                {(this.state.user_type=="Manager") ? this.renderFormSuperUser() : this.renderformNormalUser()}
              {this.state.fireRedirect
                ? <Redirect push to={`/projectTransaction/${this.state.proj_id}`} />
                : ''}
            </div>
        )
    }
}

export default TransactionEdit;
