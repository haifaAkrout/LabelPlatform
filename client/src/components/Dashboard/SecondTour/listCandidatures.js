import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { Progress } from 'reactstrap';
import moment from 'moment';
import axios from 'axios';
import ContentContainer from "../../../containers/ContentContainer";
import Header from '../../../containers/Header.js';
import Nav1 from '../../../containers/Nav1.js';
import { Link } from 'react-router-dom';
import {deleteJudge,
} from "../../../store/actions";
import {connect} from "react-redux";
export  default  class listCandidatures extends React.Component{
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
SessionId:0,
            Sessions:[],
            NomSession:'',
            DateEnd:''
        } ;



    };
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }


    componentDidMount() {
        const {id1}=this.props.match.params
        axios.get('http://localhost:6003/candidatures/'+id1).then(res=>{
            console.log(res.data.Project)
            this.setState({SessionId:res.data._id});
            this.setState({NomSession:res.data.Name});
            this.setState({Sessions:res.data.Project});
            this.setState({DateEnd:res.data.EndDate})


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

                            {Sessions.map(d=> {

var i=0
                                if (d.createdBy.countPositif !== 0 || d.createdBy.countNegatif!==0) {
                                    {
                                        i++
                                        return(
                                        <center>
                                            <div className="text-center"><span>{i}% Completés </span><span></span><span></span>{i}/{Sessions.length} projects</div>
                                            <Progress color="#31b0d5" value={Sessions.length}/>
                                        </center>)
                                    }
                                }
                                else
                                    return(
                                        <center>
                                            <div className="text-center">{Sessions.length}%</div>
                                            <Progress color="#31b0d5" value={Sessions.length}/>
                                        </center>)

                            })}

                            <div className="panel-body">
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
                                        <center>

                                                <Nav tabs>
                                                    <NavItem>
                                                        <NavLink
                                                            className={classnames({ active: this.state.activeTab === '1' })}
                                                            onClick={() => { this.toggle('3'); }}
                                                        >
                                                            Tous
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink
                                                            className={classnames({ active: this.state.activeTab === '2' })}
                                                            onClick={() => { this.toggle('4'); }}
                                                        >
                                                            Avis positif
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink
                                                            className={classnames({ active: this.state.activeTab === '2' })}
                                                            onClick={() => { this.toggle('5'); }}
                                                        >
                                                            Avis neutre
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink
                                                            className={classnames({ active: this.state.activeTab === '2' })}
                                                            onClick={() => { this.toggle('6'); }}
                                                        >
                                                            Avis négatif
                                                        </NavLink>
                                                    </NavItem>
                                                </Nav></center>

                                <table id="demo-foo-filtering"
                                       className="table table-bordered table-hover toggle-circle" data-page-size="7">

                                <thead>
                                    <tr>
                                        <th>Type of candidature </th>
                                        <th >Project Name </th>
                                        <th >Lead </th>

                                        <th >Soumission Date </th>
                                        <th> Review Charge </th>

                                        <th>Status</th>
                                        <th> Action </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {Sessions.map(d=> {

                                        if (d.createdBy.Status === "non Traité")
                                            return (

                                                <tr key={d._id}>


                                                    <td>{d.createdBy.TypeLabel.type}</td>
                                                    <td>{d.Name}</td>

                                                    <td>{d.members[0].Email}</td>
                                                    <td>{d.createdBy.TypeLabel.SoumissionDate}</td>
                                                    <td>{d.createdBy.review.type}</td>
                                                    <td>{d.createdBy.Status}</td>
                                                    <td>
                                                        <center>
                                                            <button className="btn btn-info btn-lg" type="submit"><Link
                                                                to={"/SecondTour/" + this.state.SessionId + "/Details/" + d._id}
                                                                params={{
                                                                    id1: d._id,
                                                                    id2: '5ca6d387cf19b7956820d8f4'
                                                                }}>Juger</Link></button>
                                                        </center>
                                                    </td>


                                                </tr>
                                            )


                                    }
                                    )}


                                    </tbody>
                                </table>

                                    </TabPane>
                                </TabContent>
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

                                                    <th >Soumission Date </th>
                                                    <th> Review Charge </th>

                                                    <th>Status</th>
                                                    <th> Action </th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {Sessions.map(d=>{
                                                    if (d.createdBy.Status==="Traité")
                                                        return (

                                                            <tr key={d._id}>
                                                                <td>{d.createdBy.TypeLabel.type}</td>
                                                                <td>{d.Name }</td>

                                                                <td>{d.members[0].Email}</td>
                                                                <td>{d.createdBy.TypeLabel.SoumissionDate}</td>
                                                                <td>{d.createdBy.review.type}</td>
                                                                <td>{d.createdBy.Status}</td>
                                                                <td> <center>
                                                                    <button className="btn btn-info btn-lg" type="submit"> <Link to={"/Question"}>Consulter</Link></button>
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
                                    <TabPane tabId="6">

                                        <center>

                                                <Nav tabs>
                                                    <NavItem>
                                                        <NavLink
                                                            className={classnames({ active: this.state.activeTab === '1' })}
                                                            onClick={() => { this.toggle('3'); }}
                                                        >
                                                            Tous
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink
                                                            className={classnames({ active: this.state.activeTab === '2' })}
                                                            onClick={() => { this.toggle('4'); }}
                                                        >
                                                            Avis positif
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink
                                                            className={classnames({ active: this.state.activeTab === '2' })}
                                                            onClick={() => { this.toggle('5'); }}
                                                        >
                                                            Avis neutre
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink
                                                            className={classnames({ active: this.state.activeTab === '2' })}
                                                            onClick={() => { this.toggle('6'); }}
                                                        >
                                                            Avis négatif
                                                        </NavLink>
                                                    </NavItem>
                                                </Nav></center>


                                        <div className="panel-body">

                                            <table id="demo-foo-filtering"
                                                   className="table table-bordered table-hover toggle-circle" data-page-size="7">

                                                <thead>
                                                <tr>
                                                    <th>Type of candidature</th>
                                                    <th >Project Name </th>
                                                    <th >Lead </th>

                                                    <th >Soumission Date </th>
                                                    <th> Review Charge </th>

                                                    <th>Status</th>
                                                    <th> Action </th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {Sessions.map(d=> {
                                                    if (d.createdBy.review.type==="negatif" && d.createdBy.Status==="non Traité")
                                                        return (

                                                            <tr key={d._id}>
                                                                <td>{d.createdBy.TypeLabel.type}</td>
                                                                <td>{d.Name }</td>

                                                                <td>{d.members[0].Email}</td>
                                                                <td>{d.createdBy.TypeLabel.SoumissionDate}</td>
                                                                <td>{d.createdBy.review.type}</td>
                                                                <td>{d.createdBy.Status}</td>
                                                                <td>Juger</td>


                                                            </tr>
                                                        )



                                                })}


                                                </tbody>
                                            </table>


                                        </div>
                                    </TabPane>
                                </TabContent>
                                <TabContent activeTab={this.state.activeTab}>
                                    <TabPane tabId="5">
                                        <center>

                                                <Nav tabs>
                                                    <NavItem>
                                                        <NavLink
                                                            className={classnames({ active: this.state.activeTab === '1' })}
                                                            onClick={() => { this.toggle('3'); }}
                                                        >
                                                            Tous
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink
                                                            className={classnames({ active: this.state.activeTab === '2' })}
                                                            onClick={() => { this.toggle('4'); }}
                                                        >
                                                            Avis positif
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink
                                                            className={classnames({ active: this.state.activeTab === '2' })}
                                                            onClick={() => { this.toggle('5'); }}
                                                        >
                                                            Avis neutre
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink
                                                            className={classnames({ active: this.state.activeTab === '2' })}
                                                            onClick={() => { this.toggle('6'); }}
                                                        >
                                                            Avis négatif
                                                        </NavLink>
                                                    </NavItem>
                                                </Nav></center>



                                        <div className="panel-body">

                                            <table id="demo-foo-filtering"
                                                   className="table table-bordered table-hover toggle-circle" data-page-size="7">

                                                <thead>
                                                <tr>
                                                    <th>Type of candidature</th>
                                                    <th >Project Name </th>
                                                    <th >Lead </th>

                                                    <th >Soumission Date </th>
                                                    <th> Review Charge </th>

                                                    <th>Status</th>
                                                    <th> Action </th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {this.state.Sessions.map(function(d, idx){
                                                    if (d.createdBy.review.type==="neutre" && d.createdBy.Status==="non Traité")
                                                        return (

                                                            <tr key={d._id}>
                                                                <td>{d.createdBy.TypeLabel.type}</td>
                                                                <td>{d.Name }</td>

                                                                <td>{d.members[0].Email}</td>
                                                                <td>{d.createdBy.TypeLabel.SoumissionDate}</td>
                                                                <td>{d.createdBy.review.type}</td>
                                                                <td>{d.createdBy.Status}</td>
                                                                <td>Juger</td>


                                                            </tr>
                                                        )



                                                }.bind(this))}


                                                </tbody>
                                            </table>


                                        </div>
                                    </TabPane>

                                </TabContent>
                                <TabContent activeTab={this.state.activeTab}>
                                    <TabPane tabId="4">
                                        <center>

                                                <Nav tabs>
                                                    <NavItem>
                                                        <NavLink
                                                            className={classnames({ active: this.state.activeTab === '1' })}
                                                            onClick={() => { this.toggle('3'); }}
                                                        >
                                                            Tous
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink
                                                            className={classnames({ active: this.state.activeTab === '2' })}
                                                            onClick={() => { this.toggle('4'); }}
                                                        >
                                                            Avis positif
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink
                                                            className={classnames({ active: this.state.activeTab === '2' })}
                                                            onClick={() => { this.toggle('5'); }}
                                                        >
                                                            Avis neutre
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink
                                                            className={classnames({ active: this.state.activeTab === '2' })}
                                                            onClick={() => { this.toggle('6'); }}
                                                        >
                                                            Avis négatif
                                                        </NavLink>
                                                    </NavItem>
                                                </Nav></center>




                                        <div className="panel-body">

                                            <table id="demo-foo-filtering"
                                                   className="table table-bordered table-hover toggle-circle" data-page-size="7">

                                                <thead>
                                                <tr>
                                                    <th>Type of candidature</th>
                                                    <th >Project Name </th>
                                                    <th >Lead </th>

                                                    <th >Soumission Date </th>
                                                    <th> Review Charge </th>

                                                    <th>Status</th>
                                                    <th> Action </th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {Sessions.map(d=> {
                                                    if (d.createdBy.review.type==="positif" && d.createdBy.Status==="non Traité")
                                                        return (

                                                            <tr key={d._id}>
                                                                <td>{d.createdBy.TypeLabel.type}</td>
                                                                <td>{d.Name }</td>

                                                                <td>{d.members[0].Email}</td>
                                                                <td>{d.createdBy.TypeLabel.SoumissionDate}</td>
                                                                <td>{d.createdBy.review.type}</td>
                                                                <td>{d.createdBy.Status}</td>
                                                                <td>Juger</td>


                                                            </tr>
                                                        )



                                                })}


                                                </tbody>
                                            </table>


                                        </div>
                                    </TabPane>
                                </TabContent>
                            </div>


                    </div>
<Nav1/>


                </div>

            </div>

            </div>




        )
    }
}
