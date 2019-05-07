import React, { Component } from "react";
import { Link } from 'react-router';
import 'react-notifications/lib/notifications.css';
import { connect } from "react-redux";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {
    sendemail,

} from "../../../store/actions";
import Header from '../../../containers/Header.js';
import ContentContainer from '../../../containers/ContentContainer.js';
import Nav1 from '../../../containers/Nav1.js';
class sendEmail extends Component{
    createNotification = (type) => {
        return () => {
            switch (type) {
                case 'info':
                    NotificationManager.info('Your email has been sended successfully');
                    break;
                case 'success':
                    NotificationManager.success('Success message', 'Title here');
                    break;
                case 'warning':
                    NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
                    break;
                case 'error':
                    NotificationManager.error('Error message', 'Click me!', 5000, () => {
                        alert('callback');
                    });
                    break;
            }
        };
    };
    constructor(props) {
        super(props);
        this.state = {
            To:'',
            Subject:'',
            Content:'',
            LastName:'',
            FirstName:'',
            error_msg1: '',
            error_msg2: '',
            error1: true,
            error2:true


        } ;
        this.handleToChange = this.handleToChange.bind(this);
        this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);


    };




    handleToChange (evt) {
        this.setState({ To: evt.target.value });
    }

    handleSubjectChange (evt) {
        this.setState({ Subject: evt.target.value });
    }
    handleContentChange (evt) {
        this.setState({ Content: evt.target.value });
    }
    handleLastNameChange (evt) {
        this.setState({LastName: evt.target.value });
    }

    handleFirstNameChange (evt) {
        this.setState({ FirstName: evt.target.value });
    }

    handleSubmit=event=>{

        const email={
            To: this.state.To,
            Subject: "Invitation",
            Content:"http://localhost:3000/Judges/addCompte",
            LastName:this.state.LastName,
            FirstName:this.state.FirstName


        }
        event.preventDefault();

        if(this.state.LastName.length == 0) {

            this.setState({error_msg1: 'LastName is required!'})
            this.setState({error1:false})
        }
        if(this.state.To.length == 0) {

            this.setState({error_msg2: 'Recepient is required!'})
            this.setState({error2:false})
        }



       else{
            this.setState({error1:true})

            this.setState({error2:true})

            this.props.sendemail(email);
        this.createNotification('success') }
     //   window.location.reload()
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
                                <div hidden={this.state.error1} className="alert alert-danger" role="alert">{this.state.error_msg1}</div>

                                <div className="form-group ">
                                    <label style={{color:"black",fontSize:"13px"}} className="control-label col-md-2">LastName: </label>

                                    <div className="col-md-6">
                                        <input type="text" name="LastName" onChange={this.handleLastNameChange} className="form-control "/>
                                    </div>
                                </div>



                                <div className="form-group nb">
                                    <label style={{color:"black",fontSize:"12px"}} className="control-label col-md-2">FirstName: </label>
                                    <div className="col-md-6">
                                        <input type="text" name="FirstName" onChange={this.handleFirstNameChange} className="form-control "/>
                                    </div>
                                </div>
                                <div hidden={this.state.error2} className="alert alert-danger" role="alert">{this.state.error_msg2}</div>
                                <div className="form-group nb">
                                    <label style={{color:"black",fontSize:"12px"}} className="control-label col-md-2">To: </label>
                                    <div className="col-md-6">
                                        <input type="text" name="To" onChange={this.handleToChange} className="form-control "/>
                                    </div>
                                </div>

                                <div className="form-group nb">
                                    <label style={{color:"black",fontSize:"12px"}} className="control-label col-md-2">Subject: </label>
                                    <div className="col-md-6">
                                        <input type="text"  value="Invitation" disabled name="Subject" onChange={this.handleSubjectChange} className="form-control "/>
                                    </div>
                                </div>
                                <div className="form-group nb">
                                    <label style={{color:"black",fontSize:"12px"}} className="control-label col-md-2">Content: </label>
                                    <div className="col-md-7">
                                        <textarea type="text" disabled value="http://localhost:3000/Judges/addCompte" name="Content" onChange={this.handleContentChange} className="form-control "/>
                                    </div>
                                </div>
                                <NotificationContainer hidden={this.state.error2 || this.state.error1}/>
                             <center><button  type="Submit"    className="btn btn-danger"><i className="fa fa-send"></i> Send</button></center>

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
)(sendEmail);
