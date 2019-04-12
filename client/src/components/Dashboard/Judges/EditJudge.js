import React, { Component } from "react";
import { connect } from "react-redux";
import {
    accepterJudge,

} from "../../../store/actions";
import {
    refuserJudge,

} from "../../../store/actions";
import axios from "axios";
import Header from '../../../containers/Header.js';
import ContentContainer from '../../../containers/ContentContainer.js';
import Nav from '../../../containers/Nav.js';
class EditJudge extends Component{
    constructor(props) {
        super(props);
        this.state = {
            LastName:'',
            FirstName:'',
            Email:'',
            Password:'',
            YearsOfExperience:'',
            Spécialité:'',
            Telephone:''



        } ;
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleYearsOfExperienceChange = this.handleYearsOfExperienceChange.bind(this);
        this.handleSpécialitéChange = this.handleSpécialitéChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleTelephoneChange = this.handleTelephoneChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount() {
        const {id1}=this.props.match.params
        console.log(id1)
        axios.get('http://localhost:6003/Judges/find/'+id1).then(res=>{
            console.log(res.data)
            console.log();
            this.setState({LastName:res.data.LastName,FirstName:res.data.FirstName,Email:res.data.Email,
            Password:res.data.Password,YearsOfExperience:res.data.YearsOfExperience,Spécialité:res.data.Spécialité,Telephone:
                res.data.Telephone});

        })
    }

    handleEmailChange (evt) {
        this.setState({ Email: evt.target.value });
    }

    handlePasswordChange (evt) {
        this.setState({ Password: evt.target.value });
    }
    handleSpécialitéChange (evt) {
        this.setState({ Spécialité: evt.target.value });
    }
    handleEmailChange (evt) {
        this.setState({ Email: evt.target.value });
    }

    handleYearsOfExperienceChange (evt) {
        this.setState({YearsOfExperience: evt.target.value });
    }
    handleLastNameChange (evt) {
        this.setState({LastName: evt.target.value });
    }

    handleFirstNameChange (evt) {
        this.setState({ FirstName: evt.target.value });
    }
    handleTelephoneChange (evt) {
        this.setState({ Telephone: evt.target.value });
    }


    handleSubmit1=event=>{
        const {id1}=this.props.match.params
        event.preventDefault();
        this.props.refuserJudge(id1);
       }
    handleSubmit=event=>{
        const {id1}=this.props.match.params
        const judge={
            LastName: this.state.LastName,
            FirstName: this.state.FirstName,
            Email:this.state.Email,
            Password: this.state.Password,
            YearsOfExperience: this.state.YearsOfExperience,
            Spécialité: this.state.Spécialité,
            Telephone:this.state.Telephone

        }
        event.preventDefault();
        this.props.accepterJudge(id1,judge);
    }
    render(){
        return (

            < div
                id = "container"
                className = "effect mainnav-sm navbar-fixed mainnav-fixed" >
              <Header/>
                <div className="boxed">

                    <div id="content-container">
                        <ContentContainer/>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="panel">
                                    <div className="panel-heading">
                                        <div className="panel-control">
                                            <button className="btn btn-default" data-click="panel-expand"><i
                                                className="fa fa-expand"></i></button>
                                            <button className="btn btn-default" data-click="panel-reload"><i
                                                className="fa fa-refresh"></i></button>
                                            <button className="btn btn-default" data-click="panel-collapse"><i
                                                className="fa fa-chevron-down"></i></button>
                                            <button className="btn btn-default" data-dismiss="panel"><i className="fa fa-times"></i>
                                            </button>
                                        </div>
                                        <h3 className="panel-title">Edit account</h3>
                                    </div>


                                    <form className="panel-body form-horizontal" onSubmit={this.handleSubmit }>

                                        <div className="form-group">
                                            <label className="col-md-3 control-label" htmlFor="demo-text-input">LastName</label>
                                            <div className="col-md-9">
                                                <input type="text" name="LastName" value={this.state.LastName}  onChange={this.handleLastNameChange} className="form-control" />

                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-md-3 control-label" htmlFor="demo-text-input">FirstName</label>
                                            <div className="col-md-9">
                                                <input type="text" name="FirstName" value={this.state.FirstName } onChange={this.handleFirstNameChange} className="form-control"
                                                />

                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-md-3 control-label" htmlFor="demo-text-input">Email</label>
                                            <div className="col-md-9">
                                                <input type="text" name="Email" value={this.state.Email } onChange={this.handleEmailChange} className="form-control" placeholder="Email"/>

                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-md-3 control-label" htmlFor="demo-text-input">Password</label>
                                            <div className="col-md-9">
                                                <input type="password" name="Password"  value={this.state.Password } onChange={this.handlePasswordChange} className="form-control" placeholder="Text"/>

                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-md-3 control-label" htmlFor="demo-text-input">YearsOfExperience</label>
                                            <div className="col-md-9">
                                                <input type="Number" name="YearsOfExperience" value={this.state.YearsOfExperience } onChange={this.handleYearsOfExperienceChange} className="form-control" placeholder="Text"/>

                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-md-3 control-label" htmlFor="demo-text-input">Speciality</label>
                                            <div className="col-md-9">
                                                <input type="tetx" name="Spécialité"   value={this.state.Spécialité} onChange={this.handleSpécialitéChange} className="form-control" placeholder="Text"/>

                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-md-3 control-label" htmlFor="demo-text-input">Telephone</label>
                                            <div className="col-md-9">
                                                <input type="tetx" name="Telephone"   value={this.state.Telephone} onChange={this.handleTelephoneChange} className="form-control" placeholder="Text"/>

                                            </div>
                                        </div>

                                        <button type="submit" className="btn btn-info btn-lg" name="accepter" value="Submit">
                                        Update
                                        </button>


                                    </form>
                                </div>
                            </div>

                        </div>





                    </div>

                 <Nav/>

                </div>

            </div>


        )
    }
}



const mapDispatchToProps = {
accepterJudge,
    refuserJudge
};

export default connect(
    null,
    mapDispatchToProps
)(EditJudge);
