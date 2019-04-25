import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { Progress } from 'reactstrap';
import ReactDOM from 'react-dom';
import Nav1 from '../../../containers/Nav1.js';
import {enregistrerBrouillonJudge, setCurrentUser,} from "../../../store/actions";
import {refuserCandidature,} from "../../../store/actions";
import {appelerCandidature,} from "../../../store/actions";
import { UncontrolledTooltip } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import moment from 'moment';
import Header from '../../../containers/Header.js';
import axios from 'axios';
import { Link } from 'react-router-dom';

import {connect} from "react-redux";
import ContentContainer from "../../../containers/ContentContainer";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../../setAuthToken";
class DetailsCandidatureAJuger extends React.Component{
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',

            Projects: [],
            NomSession: '',
            DateEnd: '',
            text: '',
            type: '',
            currentJudge:'',
        id3:''}
        ;
        this.handleTextChange = this.handleTextChange.bind(this);
        this.masquer = this.masquer.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
        this.handleSubmit2= this.handleSubmit2.bind(this);
        this.handleSubmit3= this.handleSubmit3.bind(this);
    };
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    handleTextChange (evt) {
        this.setState({text: evt.target.value });
    }


    componentDidMount() {
       const token=localStorage.getItem('jwtToken');
        setAuthToken(token);
        const decoded = jwt_decode(token);
        this.state.currentJudge =setCurrentUser(decoded)
console.log(this.state.currentJudge.payload.id)
        const {id2}=this.props.match.params
        axios.get('http://localhost:6003/candidatures/'+id2).then(res=>{
            console.log(res.data.Project)
            this.setState({NomSession:res.data.Name});
            this.setState({Projects:res.data.Project});
            this.setState({DateEnd:res.data.EndDate})


        })
    }



    handleSubmit(text) {
        return event => {
            event.preventDefault()
            const Review={
                text: text.value,
                type:this.state.type


            }

            const id4=this.state.id3;

            this.props.enregistrerBrouillonJudge(this.state.currentJudge.payload.id,id4,Review);

        }
    }





    handleSubmit2 (text) {
        return event => {
            event.preventDefault()
            const Review={
                text: text.value,
                type:"negatif"


            }

            const id4=this.state.id3;

            this.props.refuserCandidature(this.state.currentJudge.payload.id,id4,Review)
        }
    }

    handleSubmit3 (text) {
        return event => {
            event.preventDefault()
            const Review={
                text: text.value,
                type:"positif"


            }

            const id4=this.state.id3;
            this.props.appelerCandidature(this.state.currentJudge.payload.id,id4,58011658,Review)

        }
    }








    masquer (text) {
        return event => {
            event.preventDefault()
            this.refs.container.value=text
        }
    }

    render(){
        const formattedDate = moment(this.state.DateEnd).format("LLL");
        const {Projects} = this.state;
        return (

            < div
                id = "container"
                className = "effect mainnav-sm navbar-fixed mainnav-fixed" >

<Header/>
                <div className="boxed">

                    <div id="content-container">
                       <ContentContainer/>

                        <div className="panel">
                            <div className="panel-heading">



                                <h2 className="panel-title" style={{float: 'left',width: '34%', textalign:'left'}}>{this.state.NomSession}</h2>
                                <p className="panel-title" style={{float: 'left', width: '33%', textalign: 'center'}}>2eme Tour</p>
                                <p className="panel-title" style={{float: 'left', width: '33%', textalign: 'right'}}>

                                    Deadline:     {formattedDate}

                                </p>
                            </div>


                            <center> <div className="text-center">25%</div>
                                <Progress color="#31b0d5" value="25" />
                            </center>





                        </div>
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '1' })}
                                    onClick={() => { this.toggle('1'); }}
                                >
                                    Candidatures non traitées
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '2' })}
                                    onClick={() => { this.toggle('2'); }}
                                >
                                    Candidatures traitées
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                {Projects.map(project=>{
                                    const {id1}=this.props.match.params
                                    if (project._id===id1)
                                    {
                                        this.state.type=project.createdBy.review.type;
                                        this.state.id3=project.createdBy._id;

                                        return (
                                            <div>
                                     <span style={{textDecoration: "underline", color:"blue"}} href="#" id="UncontrolledTooltipExample">Tour2   ></span>
                                    <span>{project.Name}</span>




                                            <ListGroup>

                                                <ListGroupItem><legend>Avis Charge</legend>
                                                    <Button color="success">{project.createdBy.review.type}</Button>{' '}
                                                    <br/>
                                                    {project.createdBy.review.text}</ListGroupItem>
                                            </ListGroup>


                                                {project.createdBy.Questions.map(question => (
                                                    <ListGroup>

                                                        <ListGroupItem>

                                                         <strong>Question:</strong>   {question.text}</ListGroupItem>
                                                        {question.responses.map(response => (
                                                            <ListGroupItem>

                                                                {response.text}</ListGroupItem>


                                                        ))}

                                                    </ListGroup>

                                                ))}




                                            </div> )}})}
                                <ListGroup>

                                    <fieldset border="1">
                                    <legend>Avis Tour2</legend>
                                        {Projects.map(project=>{
                                            const {id1}=this.props.match.params
                                            if (project._id===id1) {
return(
                                                <Link onClick={this.masquer(project.createdBy.review.text).bind(this)}>Reprendre
                                                    la recommendation du chargé</Link>)
                                            }})}
                                <br/>
                                            <div className="col-md-9">
                                                <textarea ref="container"  type="text" name="text" onChange={this.handleTextChange} className="form-control" placeholder="Commentaire"/>

                                        </div>
<br/>



                                        <h2 className="panel-title" style={{float: 'left',width: '34%', textalign:'left'}}>
                                            <button className="btn btn-info "  onClick={this.handleSubmit(this.refs.container).bind(this)}type="submit">Enregistrer le brouillon</button></h2>




                                        <p className="panel-title" style={{float: 'left', width: '33%', textalign: 'center'}}>

                                            <button className="btn btn-danger" onClick={this.handleSubmit2(this.refs.container).bind(this)} type="submit">Refuser</button></p>


                                        <p className="panel-title" style={{float: 'left', width: '15%', textalign: 'right'}}>
                                            <button className="btn btn-success" type="submit" onClick={this.handleSubmit3(this.refs.container).bind(this)}>
                                                Appeler pour pitch</button>

                                        </p>

                                        <p className="panel-title" style={{float: 'left', width: '15%', textalign: 'right'}}>
                                            <button className="btn btn-info" type="submit">
                                                Suivant</button>

                                        </p>
                                    </fieldset>

                                </ListGroup>

                            </TabPane>
                        </TabContent>
                       <Nav1/>

                    </div>

                </div>

            </div>




        )
    }
}
const mapDispatchToProps = {
    enregistrerBrouillonJudge,
    refuserCandidature,
    appelerCandidature

};

export default connect(
    null,
    mapDispatchToProps
)(DetailsCandidatureAJuger);
