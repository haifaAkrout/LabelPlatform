import React, { Component } from 'react';
import axios from 'axios'

import "../../../App.css"
import Header from "../../../containers/Header";
import ContentContainer from "../../../containers/ContentContainer";
import Nav1 from "../../../containers/Nav1";
import {Button, Col, Fade, Form, FormGroup, Input, Label} from "reactstrap"
export default class RedactionAvis extends Component {
    constructor(props) {
        super(props);
        this.state = {
           status:'',
            charges:[],
            candidature:[],
            commentaire:'',
            refus:'',
            idCharge:'',
            isValide:null,
            review:''

        };

    }



    handleCommentaireChange=(e)=>{
        this.setState({commentaire :e.target.value})
    }

    handleRefusChange=(e)=>{
        this.setState({refus :e.target.value})

    }



    componentDidMount() {
        const {idCand} = this.props.match.params
        console.log("id candidature")
        console.log(idCand)
        axios.get('http://localhost:6003/Candidatures/detailsCandidature/'+idCand)
            .then(response => {

                this.setState({
                    candidature:response.data,
                    idCharge:response.data.charges,
                    status:response.data.Status,
                    review:response.data.review

                });
                console.log("status")
                console.log(response.data.Status)
                console.log(response.data.charges)
                console.log("id charge");
                console.log(this.state.idCharge)
                //find charge
                axios.get('http://localhost:6003/sessions/charge/'+this.state.idCharge)
                    .then(responsec => {

                        this.setState({
                            review:responsec.data.review,


                        });
                        console.log("id review");
                        console.log(responsec.data.review);
                        axios.get('http://localhost:6003/reviewC/findById/'+ responsec.data.review)
                            .then(response => {

                                this.setState({
                                    charges:response.data,
                                    isValide:response.data.estValide

                                });
                                console.log(response.data.estValide)

                            })
                            .catch(function (error) {
                                console.log(error);
                            })


                    })
                    .catch(function (error) {
                        console.log(error);
                    })

            })
            .catch(function (error) {
                console.log(error);
            })




    }


    handleSubmit=event=>{
        const {idCand} = this.props.match.params
        if(this.state.isValide === false){
            const avis = {
                cause:this.state.refus,
                commentaire:this.state.commentaire
            }
            axios.post('http://localhost:6003/avis/addAvis/'+this.state.idCharge,avis
            ).then(res=>{console.log(res);
                console.log(res.data)})

            const candidature={
                Status:"2eme_tour_en_instance"
            }
            axios.put('http://localhost:6003/reviewC//updateCandidatureByCand/'+idCand,candidature
            ).then(res=>{console.log(res);
                console.log(res.data)})
        }else
        {

            const avis = {
                comentaire:this.state.commentaire
            }
            axios.post('http://localhost:6003/avis/add/'+this.state.idCharge,avis
            ).then(res=>{console.log(res);
                console.log(res.data)})

            const candidature={
                Status:"2eme_tour"
            }
            axios.put('http://localhost:6003/reviewC//updateCandidatureByCand/'+idCand,candidature
            ).then(res=>{console.log(res);
                console.log(res.data)})
        }

        this.context.router.history.push('/resultat/');

    }






    render()
    {
        return(


            <div id = "container" className = "effect mainnav-sm navbar-fixed mainnav-fixed" >
                <Header/>
                <div className="boxed">

                    <div id="content-container">
                        <ContentContainer/>

                        <div className="panel">

                            <div className="panel-body">

                                <h1 id="lab">Rediger avis </h1>


                                <Form className="panel-body form-horizontal" onSubmit={this.handleSubmit} id={"formulaireAvis"}>
                                    <fieldset id="fieldsetAvis">

                                        <label>{this.state.status}</label>

                                        {
                                            this.state.isValide === false &&
                                            <FormGroup row>
                                                <Label for="exampleEmail" sm={2}>Refus</Label>
                                                <Col sm={8}>
                                                    <Input  type="text" name="refus"  onChange={this.handleRefusChange}
                                                            value={this.state.refus}    className="form-control" placeholder="LinkLinkedIn"/>
                                                </Col>
                                            </FormGroup>
                                        }
                                        <FormGroup row>
                                            <Label for="exampleEmail" sm={2}>Commentaire</Label>
                                            <Col sm={8}>
                                                <textarea type="text" name="commentaire" onChange={this.handleCommentaireChange}
                                                          required={true}
                                                          value={this.state.commentaire} className="form-control" placeholder="comentaire"/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Button color="primary" size="sm"
                                                     // onClick={this.test.bind(this)}
                                                    id="button1" type="submit"
                                                    className="btn btn-info" name="Passer en instance" value="Submit">
                                                Passer en instance
                                            </Button>
                                            <Fade in={this.state.fadeIn} tag="h5" className="mt-3">
                                                This content will fade in and out as the button is pressed
                                            </Fade>
                                        </FormGroup>


                                    </fieldset>
                                </Form>
                            </div>


                        </div>

                    </div>

                    <Nav1/>

                </div>

            </div>













        );
    }
}


