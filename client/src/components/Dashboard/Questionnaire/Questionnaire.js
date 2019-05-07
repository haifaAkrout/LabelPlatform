import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {deleteJudge,
} from "../../../store/actions";

import {connect} from "react-redux";
import Header from '../../../containers/Header.js';
import ContentContainer from '../../../containers/ContentContainer.js';
import Nav from '../../../containers/Nav.js';
class   Questionnaire extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

            Judges:[]

        } ;
        this.handleclick = this.handleclick.bind(this);


    };


    componentDidMount() {
        axios.get('http://localhost:6003/Judges/listJudges').then(res=>{
            console.log("hhh")
            console.log(res.data);
            this.setState({Judges:res.data});
        })
    }

    handleclick(id,id1){
        this.props.deleteJudge(id,id1);
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

                        <div className="panel">

                                <h3 >Am I eligible to the startup label?</h3>

                            <form id="demo-custom-container" action="#" className="form-horizontal">
                                <div className="panel-body">

                                    <div className="form-group">

<center>
    <button className="btn btn-info btn-lg" type="submit"><Link to={"/Question"}>Start the tsssest</Link></button>
</center>
                                    </div>



                                </div>
                                <div className="panel-footer">
                                    <div className="row">
                                        <div className="col-sm-7 col-sm-offset-3">

                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="panel">

                            <div className="panel-heading">
                                <h3 className="panel-title">Apply for the startup label as a compagny</h3>
                            </div>
                            <form id="demo-custom-container" action="#" className="form-horizontal">
                                <div className="panel-body">

                                    <div className="form-group">

                                     <center>
                                            <button className="btn btn-info btn-lg" type="submit"> <Link to={"/Question"}>Start the application</Link></button>
                                     </center>
                                    </div>



                                </div>
                                <div className="panel-footer">
                                    <div className="row">
                                        <div className="col-sm-7 col-sm-offset-3">

                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div> <div className="panel">

                        <div className="panel-heading">
                            <h3 className="panel-title">Apply for the startup label as an individual</h3>
                        </div>
                        <form id="demo-custom-container" action="#" className="form-horizontal">
                            <div className="panel-body">

                                <div className="form-group">

                            <center>
                                <button className="btn btn-info btn-lg" type="submit"><Link to={"/Question"}>Start the Application</Link></button>
                            </center>
                                </div>



                            </div>
                            <div className="panel-footer">
                                <div className="row">
                                    <div className="col-sm-7 col-sm-offset-3">

                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>




                    </div>

                    <Nav/>

                </div>

            </div>






        )
    }
}
const mapDispatchToProps = {

};

export default connect(
    null,
    mapDispatchToProps
)(Questionnaire);
