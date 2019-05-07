import React, { Component } from "react";
import { Link } from 'react-router';
import 'react-notifications/lib/notifications.css';
import { connect } from "react-redux";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {
    sendemail,

} from "../../store/actions";
import Header from '../../containers/Header.js';
import ContentContainer from '../../containers/ContentContainer.js';
import Nav1 from '../../containers/Nav1.js';
import axios from "axios";
class addQuestion extends Component{

    constructor(props) {
        super(props);
        this.state = {
      Question:'',
            Response1:'',
            Response2:'',
            Response3:'',
            selectedOption1:'',
            selectedOption2:'',
            selectedOption3:''


        } ;

        this.handleQuestionChange = this.handleQuestionChange.bind(this);
        this.handleResponse1Change = this.handleResponse1Change.bind(this);
        this.handleResponse2Change = this.handleResponse2Change.bind(this);
        this.handleResponse3Change = this.handleResponse3Change.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handleOption2Change = this.handleOption2Change.bind(this);
        this.handleOption1Change = this.handleOption1Change.bind(this);
    };




    handleQuestionChange (evt) {
        this.setState({ Question: evt.target.value });
    }

    handleResponse1Change (evt) {
        this.setState({ Response1: evt.target.value });
    }
    handleResponse2Change (evt) {
        this.setState({ Response2: evt.target.value });
    }
    handleResponse3Change (evt) {
        this.setState({ Response3: evt.target.value });
    }
    handleOptionChange(changeEvent) {
        this.setState({
            selectedOption1: changeEvent.target.value
        });
    }
    handleOption1Change(changeEvent) {
        this.setState({
            selectedOption2: changeEvent.target.value
        });
    }
    handleOption2Change(changeEvent) {
        this.setState({
            selectedOption3: changeEvent.target.value
        });
    }
    handleSubmit=event=> {

        const Question = {
            Question: this.state.Question,
            Response1: this.state.Response1,
            Response2: this.state.Response2,
            Response3: this.state.Response3,
            type1: this.state.selectedOption1,
            type2: this.state.selectedOption2,

            type3: this.state.selectedOption3,


        }
        event.preventDefault();
        axios.post('http://localhost:6003/questionnaire/add',Question
        ).then(res=>{console.log(res);
            console.log(res.data)})

    }

    render(){
        return (
            < div
                id = "container"
                className = "effect mainnav-sm navbar-fixed mainnav-fixed" >

                <div className="boxed">
                    <Header/>
                    <div id="content-container">
                        <ContentContainer/>
                        <div id="page-content">

                            <div className="row">

                                <div className="col-xs-12 col-md-9 col-lg-9">
                                    <div className="panel">
                                        <div className="panel-body">
                                            <form className="form-horizontal form-bordered" onSubmit={this.handleSubmit} >


                                                <div className="form-group ">
                                                    <label style={{color:"black",fontSize:"13px"}} className="control-label col-md-2">Question: </label>

                                                    <div className="col-md-6">
                                                    <input type="text" name="Question" onChange={this.handleQuestionChange} className="form-control "/>
                                                </div>


                                                </div>



                                                <div className="form-group nb">
                                                    <label style={{color:"black",fontSize:"12px"}} className="control-label col-md-2">Response1: </label>
                                                    <div className="col-md-6">
                                                        <input type="text" name="Response1" onChange={this.handleResponse1Change} className="form-control "/>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <span><input type="radio" value="correcte"  onChange={this.handleOptionChange}  checked={this.state.selectedOption1 === 'correcte'}/>
                                                      <label style={{color:"Black",fontSize:"9px"}}> Correct</label></span>
                                                        <span><input type="radio" value="incorrecte"
                                                                     onChange={this.handleOptionChange}  checked={this.state.selectedOption1=== 'incorrecte'}/>
                                                      <label style={{color:"Black",fontSize:"9px"}}> Incorrect</label></span>
                                                    </div>
                                                </div>

                                                <div className="form-group nb">
                                                    <label style={{color:"black",fontSize:"12px"}} className="control-label col-md-2">Response2: </label>
                                                    <div className="col-md-6">
                                                        <input type="text" name="Response2"  onChange={this.handleResponse2Change} className="form-control "/>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <span><input type="radio" value="correcte"   onChange={this.handleOption1Change} checked={this.state.selectedOption2 === 'correcte'}/>
                                                      <label style={{color:"Black",fontSize:"9px"}}> Correct</label></span>
                                                        <span><input type="radio" value="incorrecte" onChange={this.handleOption1Change}  checked={this.state.selectedOption2 === 'incorrecte'}/>
                                                      <label style={{color:"Black",fontSize:"9px"}}> Incorrect</label></span>
                                                    </div>
                                                </div>

                                                <div className="form-group nb">
                                                    <label style={{color:"black",fontSize:"12px"}} className="control-label col-md-2">Response3: </label>
                                                    <div className="col-md-6">
                                                        <input type="text" name="Response3" onChange={this.handleResponse3Change} className="form-control "/>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <span><input type="radio" value="correcte"  onChange={this.handleOption2Change} checked={this.state.selectedOption3 === 'correcte'}/>
                                                      <label style={{color:"Black",fontSize:"9px"}}> Correct</label></span>
                                                        <span><input type="radio" value="incorrecte"  onChange={this.handleOption2Change}  checked={this.state.selectedOption3 === 'incorrecte'}/>
                                                      <label style={{color:"Black",fontSize:"9px"}}> Incorrect</label></span>
                                                    </div>
                                                </div>


                                                <center><button  type="Submit"    className="btn btn-danger"><i className="fa fa-send"></i> Add</button></center>

                                            </form>

                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                    <Nav1/>


                </div>

            </div>

        )
    }
}



const mapDispatchToProps = {
    sendemail

};

export default connect(
    null,
    mapDispatchToProps
)(addQuestion);
