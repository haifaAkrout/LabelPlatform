import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { Progress } from 'reactstrap';
import ReactDOM from 'react-dom';
import {enregistrerBrouillonJudge,} from "../../../store/actions";
import {refuserCandidature,} from "../../../store/actions";
import Nav1 from '../../../containers/Nav1.js';
import {appelerCandidature,} from "../../../store/actions";
import { UncontrolledTooltip } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import moment from 'moment';
import Header from '../../../containers/Header.js';
import axios from 'axios';
import { Link } from 'react-router-dom';

import {connect} from "react-redux";
import ContentContainer from "../../../containers/ContentContainer";
class VotesProjet extends React.Component{
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
            votesPour:'',
            votesContre:'',
            Sessions: [],
            NomSession: '',
            DateEnd: '',
            text: '',
            type: '',
            id3:'',
        idSession:'',
        result:''}
        ;


    };
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }



    componentDidMount() {
        const {id2}=this.props.match.params
        axios.get('http://localhost:6003/candidatures/'+id2).then(res=>{
            console.log(res.data.Project)
            this.setState({NomSession:res.data.Name});
            this.setState({Sessions:res.data.Project});
            this.setState({DateEnd:res.data.EndDate})
            this.setState({idSession:res.data._id})

        })



       }




    render(){



        const formattedDate = moment(this.state.DateEnd).format("LLL");
        const {Sessions} = this.state;

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
                                    Jury
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '2' })}
                                    onClick={() => { this.toggle('2'); }}
                                >
                                    Projets
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="2">




                                <div className="panel-body">

                                    <table id="demo-foo-filtering"
                                           className="table table-bordered table-hover toggle-circle" data-page-size="7">

                                        <thead>
                                        <tr>
                                            <th>Type of candidature</th>
                                            <th >Project Name </th>
                                            <th >Lead </th>

                                            <th >votes pour </th>

                                            <th> Action </th>
                                        </tr>
                                        </thead>
                                        <tbody>


                                        {Sessions.map(d=>{


                                                return (

                                                    <tr  key={d._id}>
                                                        <td>{d.createdBy.TypeLabel.type}</td>
                                                        <td>{d.Name }</td>

                                                        <td>{d.members[0].Email}</td>
                                                        <td>{d.createdBy.countPositif}/{d.createdBy.countNegatif}</td>

                                                        <td> <center>
                                                            <button className="btn btn-info " type="submit"> <Link to={"/Question"}>Consulter</Link></button>
                                                        </center></td>

                                                    </tr>
                                                )



                                        })}


                                        </tbody>
                                    </table>


                                </div>
                            </TabPane>
                        </TabContent>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">




                                <div className="panel-body">

                                    <table id="demo-foo-filtering"
                                           className="table table-bordered table-hover toggle-circle" data-page-size="7">

                                        <thead>
                                        <tr>
                                            <th>Nom</th>
                                            <th >Project voté </th>
                                            <th >Avancement </th>



                                        </tr>
                                        </thead>



                                    </table>


                                </div>
                            </TabPane>
                        </TabContent>
                       <Nav1/>

                    </div>

                </div>

            </div>




        )
    }
}
const mapStateToProps = (state) => ({
})
const mapDispatchToProps = {
    enregistrerBrouillonJudge,
    refuserCandidature,
    appelerCandidature,


};

export default connect(
    mapStateToProps,
    mapDispatchToProps,

)(VotesProjet);
