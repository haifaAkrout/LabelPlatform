import { Col, Button, Form, FormGroup,Fade, Label, Input,  } from 'reactstrap';

import React, { Component } from 'react';

import '../../../App.css';
import Header from '../../../containers/Header.js';
import ContentContainer from '../../../containers/ContentContainer.js';
import Nav1 from '../../../containers/Nav1.js';
import axios from "axios";
export default class AddMember extends Component{
    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

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
            LinkFacebook:'',
            fadeIn: true

        } ;
        this.toggle = this.toggle.bind(this);
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

    toggle() {
        this.setState({
            fadeIn: !this.state.fadeIn
        });
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


    handleSubmit(e) {
        e.preventDefault();
        console.log("ajout")
        const formData = new FormData();
        console.log("linklinkedin")
        console.log(this.state.LinkLinkedIn);

            formData.append('image',this.state.image);
            formData.append('LinkLinkedIn',this.state.LinkLinkedIn);
            formData.append('Password',this.state.password);
            formData.append('Role',this.state.Role);
            formData.append('Description',this.state.Description);
            formData.append('Bio',this.state.Bio);
            formData.append('Email',this.state.Email);
            formData.append('LinkFacebook',this.state.LinkFacebook);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };

            axios.post('http://localhost:6003/members/addMemberwithLinkedIn/5cba2219bb0f481fe0e48b36/5cba238d2b5d6736fc6c8949',
                formData,config).then(res => {
                console.log(res);
                //  this.props.history.push('/sessions/');
            })

    }
    render(){
        return (

            <div
                id = "container"
                className = "effect mainnav-sm navbar-fixed mainnav-fixed" >

                <div className="boxed">
                    <Header/>
                    <div id="content-container">
                        <ContentContainer/>
                        <div className="row">
                            <div className="col-lg-9">
                                <div className="panel" id={"divForm"}>
                                    <div className="panel-heading">

                                        <h4 id={"namepage"}>Ajouter membre</h4>
                                    </div>

                                    <Form className="panel-body form-horizontal" onSubmit={this.handleSubmit}>
                                        <FormGroup row>
                                            <Label for="exampleEmail" sm={2}>LinkedIn</Label>
                                            <Col sm={10}>
                                                <Input  type="text" name="LinkLinkedIn" required
                                                       onChange={this.handleLinkLinkedInChange} className="form-control" placeholder="LinkLinkedIn"/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="exampleEmail" sm={2}>Link Facebook</Label>
                                            <Col sm={10}>
                                                <Input  type="text" name="Facebook" required
                                                       onChange={this.handleLinkFacebookChange} className="form-control" placeholder="Facebook"/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="exampleEmail" sm={2}>Role</Label>
                                            <Col sm={10}>
                                                <Input  type="text" name="Role" onChange={this.handleRoleChange} className="form-control" placeholder="role"/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="exampleEmail" sm={2}>Short Bio</Label>
                                            <Col sm={10}>
                                                <textarea type="text" name="Bio" onChange={this.handleBioChange} required
                                                          className="form-control" placeholder="short bio"/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="exampleEmail" sm={2}>Email</Label>
                                            <Col sm={10}>
                                                <Input  type="email" name="email" onChange={this.handleEmailChange}
                                                       required className="form-control" placeholder="email"/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="exampleEmail" sm={2}>Description</Label>
                                            <Col sm={10}>
                                                <textarea type="text" name="Description" onChange={this.handleDescriptionChange} required
                                                          className="form-control" placeholder={"Description"}/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="exampleEmail" sm={2}>Upload file</Label>
                                            <Col sm={10}>
                                                <Input  type="file" name="image"  onChange={this.handleimageChange} className="form-control" placeholder=""/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="exampleEmail" sm={2}>Password</Label>
                                            <Col sm={10}>
                                                <Input  type="password" name="password"  onChange={this.handlePasswordChange}
                                                       placeholder="don't tell!" className="form-control" />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Col sm={3}>

                                                <Button color="primary" id={"btn"} type="submit" onClick={this.toggle}>Add member</Button>
                                                <Fade in={this.state.fadeIn} tag="h5" className="mt-3">
                                                    This content will fade in and out as the button is pressed
                                                </Fade>
                                            </Col>
                                        </FormGroup>
                                        <header></header>

                                    </Form>
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




