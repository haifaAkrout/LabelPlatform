import React, { Component } from "react";

import axios from "axios";
import Header from '../../../containers/Header.js';
import ContentContainer from '../../../containers/ContentContainer.js';
import Nav1 from '../../../containers/Nav1.js';
import {Button, Col, Fade, FormGroup, Label} from "reactstrap";
import Input from "reactstrap/es/Input";
export default class EditMember extends Component{
    constructor(props) {
        super(props);
        this.state = {
            LinkLinkedIn:'',
            image:'',
            password:'',
            Role:'',
            Bio:'',
            Description:'',
            Email:'',
            LinkFacebook:''
        } ;

        this.handleLinkLinkedInChange = this.handleLinkLinkedInChange.bind(this);
        this.handleimageChange = this.handleimageChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
        this.handleBioChange = this.handleBioChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleLinkFacebookChange = this.handleLinkFacebookChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    };


    componentDidMount() {
        const {idMembre} = this.props.match.params
        console.log("id membre mel liste")
        console.log(idMembre)

        axios.get(`http://localhost:6003/members/findById/`+idMembre)
            .then(response => {
                this.setState({
                    image: response.data.data.image,
                    LinkLinkedIn:response.data.data.LinkLinkedIn,
                    Password:response.data.data.Password,
                    LinkFacebook:response.data.data.LinkFacebook,
                    Bio: response.data.data.Bio,
                    Description: response.data.data.Description,
                    Role: response.data.data.Role,
                    Email: response.data.data.Email

                });
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })

    }


handleEmailChange(evt) {
    this.setState({ Email: evt.target.value });
}

handleLinkFacebookChange (evt) {
    this.setState({ LinkFacebook: evt.target.value });
}

handleLinkLinkedInChange (evt) {
    this.setState({ LinkLinkedIn: evt.target.value });
}

handleimageChange (evt) {
    this.setState({ image: evt.target.files[0] });
}

handlePasswordChange (evt) {
    this.setState({ password:evt.target.value });
}

handleRoleChange (evt) {
    this.setState({ Role :evt.target.value });
}

handleDescriptionChange (evt) {
    this.setState({ Description :evt.target.value });
}

handleBioChange (evt) {
    this.setState({ Bio:evt.target.value });
}



    handleSubmit=event=>{
        const {idMembre} = this.props.match.params
        console.log("id membre from ")
        console.log(idMembre)
        const formData = new FormData();

        console.log(this.state.LinkLinkedIn)
        formData.append('image',this.state.image);
        formData.append('LinkLinkedIn',this.state.LinkLinkedIn);
        formData.append('Password',this.state.password);
        formData.append('Role',this.state.Role);
        formData.append('Description',this.state.Description);
        formData.append('Bio',this.state.Bio);
        formData.append('Email',this.state.Email);
        const {idSession} = this.props.match.params;
        const {idProjet} = this.props.match.params;
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.put('http://localhost:6003/members/editMember/'+idSession+'/'+idProjet+'/'+idMembre, formData,config
        ).then(res=>{console.log(res);
            console.log(res.data)})

    }
    render(){
        return (

            <div
                id = "container"
                className = "effect mainnav-sm navbar-fixed mainnav-fixed" >
                <Header/>
                <div className="boxed">

                    <div id="content-container">
                        <ContentContainer/>
                        <div className="row">
                            <div className="col-lg-9">
                                <div className="panel" id={"divForm"}>
                                    <div className="panel-heading">

                                        <h4 id={"namepage"}>Modifier Membre</h4>
                                    </div>

                                    <form className="panel-body form-horizontal" onSubmit={this.handleSubmit}>
                                        <FormGroup row>
                                            <Label for="exampleEmail" sm={2}>LinkedIn</Label>
                                            <Col sm={10}>
                                                <Input type="text" name="LinkLinkedIn"  defaultValue={this.state.LinkLinkedIn}
                                                       onChange={this.handleLinkLinkedInChange} className="form-control" placeholder="LinkLinkedIn"/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="exampleEmail" sm={2}>Facebook</Label>
                                            <Col sm={10}>
                                                <Input type="text" name="Facebook" defaultValue={this.state.LinkFacebook}
                                                       onChange={this.handleLinkFacebookChange} className="form-control" placeholder="Facebook"/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="exampleEmail" sm={2}>Role</Label>
                                            <Col sm={10}>
                                                <Input type="text" name="Role" defaultValue={this.state.Role}
                                                       onChange={this.handleRoleChange} className="form-control" placeholder="role"/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="exampleEmail" sm={2}>Bio</Label>
                                            <Col sm={10}>
                                                <textarea type="text" name="Bio" onChange={this.handleBioChange}
                                                          value={this.state.Bio} className="form-control" placeholder="short bio"/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="exampleEmail" sm={2}>Email</Label>
                                            <Col sm={10}>
                                                <Input type="email" name="email" onChange={this.handleEmailChange}
                                                       defaultValue={this.state.Email} className="form-control" placeholder="email"/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="exampleEmail" sm={2}>Description</Label>
                                            <Col sm={10}>
                                                <textarea type="text" name="Description" onChange={this.handleDescriptionChange}
                                                          value={this.state.Description} className="form-control"  placeholder="Description"/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="exampleEmail" sm={2}>Upload image</Label>
                                            <Col sm={10}>
                                                <Input type="file" name="image"  onChange={this.handleimageChange}
                                                       defaultValue={this.state.image} className="form-control" placeholder=""/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="exampleEmail" sm={2}>Password</Label>
                                            <Col sm={10}>
                                                <Input type="text" name="password" defaultValue={this.state.Password}
                                                       onChange={this.handlePasswordChange} className="form-control" />
                                            </Col>
                                        </FormGroup>

                                        <FormGroup row>
                                            <Col sm={3}>
                                                <Button color="primary" id={"btn"} type="submit" onClick={this.toggle}>Update</Button>
                                                <Fade in={this.state.fadeIn} tag="h5" className="mt-3">
                                                    This content will fade in and out as the button is pressed
                                                </Fade>
                                            </Col>
                                        </FormGroup>
                                        <header></header>

                                    </form>
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




