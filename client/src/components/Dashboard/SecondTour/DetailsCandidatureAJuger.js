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
import {NotificationContainer, NotificationManager} from 'react-notifications';
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
             axios.post('http://localhost:6003/candidatures/call/'+55626214).then(res=>{
                 console.log(res.data)



            })
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

    createNotification = (type) => {
        return () => {
            switch (type) {
                case 'info':
                    NotificationManager.info('Your review has been added successfully');
                    break;
                case 'success':
                    NotificationManager.success('Success message', 'Title here');
                    break;
                case 'warning':
                    NotificationManager.warning('The candidature has been  refused', 'Refusation', 3000);
                    break;
                case 'error':
                    NotificationManager.error('Error message', 'Click me!', 5000, () => {
                        alert('callback');
                    });
                    break;
            }
        };
    };
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

                        <div id="page-content">
                            <div className="row">


                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <div className="col-lg-10 col-md-10 col-sm-10">

                                    <div className="panel"  style={{height:"700px",width:"120%"}}>
                                        <div className="panel">
                                            <div className="panel-heading">



                                                <h2 className="panel-title" style={{float: 'left',width: '34%',color:"black", textalign:'left'}}>{this.state.NomSession}</h2>
                                                <p className="panel-title" style={{float: 'left', width: '33%',color:"black", textalign: 'center'}}>Second Tour</p>
                                                <p className="panel-title" style={{float: 'left', width: '33%', color:"black",textalign: 'right'}}>


                                                    Deadline:     {formattedDate}

                            <center>
                                <center><span>{Projects.length}projects %</span></center>
                                <Progress color="#31b0d5" value={Projects.length}/>
                            </center>


                                                </p>
                                            </div>


                                            <center> <div className="text-center" style={{color:"black"}}>25%</div>
                                                <Progress color="#31b0d5" value="25" />
                                            </center>





                                        </div>
                                        <div className="panel-body pad-no" className="td">

                                            <div className="tab-base" className="td">
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
                                {Projects.map(project=>{
                                    const {id1}=this.props.match.params
                                    if (project._id===id1)
                                    {
                                        this.state.type=project.createdBy.charges.review.type;
                                        this.state.id3=project.createdBy._id;

                                        return (

                                            <div>
                                     <span style={{textDecoration: "underline",float:'left', color:"blue"}} href="#" id="UncontrolledTooltipExample">Second Tour   ></span>
                                    <span style={{float:"left"}}>{project.Name}</span>

                                            <br/>


<div  style={{float:"left"}}>

                                                <h4>Review  Charge</h4>
                                                    <Button color="success">{project.createdBy.charges.review.type}</Button>{' '}
                                                    <br/>
                                                    {project.createdBy.charges.review.text}

</div><br/><br/><br/><br/><hr/>

                                                {project.createdBy.Questions.map(question => (
                                                    <div  style={{float:"left"}}>



                                                         <h4>Question:</h4>   {question.text}
                                                        {question.responses.map(response => (

<div>
    {response.text}</div>


                                                        ))}

                                                    </div>

                                                ))}




                                            </div> )}})}

                                                <br/><br/><br/><br/><hr/>

                                    <h4 style={{float:"left"}}>Review Second Tour</h4>

                                                <br/>
                                                <br/>
                                        {Projects.map(project=>{
                                            const {id1}=this.props.match.params
                                            if (project._id===id1) {
return(
                                                <Link  style={{color:"black",float:"left"}}onClick={this.masquer(project.createdBy.charges.review.text).bind(this)}>Reprendre
                                                    la recommendation du chargé</Link>)
                                            }})}
                                <br/>
                                            <div className="col-md-9">
                                                <textarea ref="container"  type="text" name="text" onChange={this.handleTextChange} className="form-control" placeholder="Commentaire"/>

                                        </div>

<br/>



                                        <h2 className="panel-title" style={{float: 'left',width: '34%', textalign:'left'}}>

                                            <button className="btn btn-info "  onClick={this.handleSubmit(this.refs.container).bind(this)}type="submit">Save brouillon</button></h2>

                                       <Link onClick={this.createNotification('info')}>     <button className="btn btn-info "  onClick={this.handleSubmit(this.refs.container).bind(this)}type="submit">Enregistrer le brouillon</button>
                                       </Link>




                                        <p className="panel-title" style={{float: 'left', width: '33%', textalign: 'center'}}>


                                            <button className="btn btn-danger" onClick={this.handleSubmit2(this.refs.container).bind(this)} type="submit">Refuse</button></p>

                                          <p>  <Link   onClick={this.handleSubmit2(this.refs.container).bind(this)}>    <button className="btn btn-danger"onClick={this.createNotification('warning')} type="submit">Refuser</button>
                                            </Link></p>



                                        <p className="panel-title" style={{float: 'left', width: '15%', textalign: 'right'}}>
                                            <button className="btn btn-success" type="submit" onClick={this.handleSubmit3(this.refs.container).bind(this)}>
                                                Call  pitch</button>

                                        </p>


                                        <p className="panel-title" style={{float: 'left', width: '15%', textalign: 'right'}}>
                                            <button className="btn btn-info" type="submit">
                                                Next</button>

                                        </p>





                                                        </div>








                                    </div></div></div>

                            </TabPane>
                        </TabContent>
                            </div>
                        </div>
                       <Nav1/>

                    </div>
<NotificationContainer/>
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
