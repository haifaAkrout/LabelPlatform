import React from 'react';
import axios from "axios";

import Header2 from'../../containers/Header2.js';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import ContentContainer from "../Dashboard/Questionnaire/Questionnaire";

const AVG = 1;
class front2 extends React.Component{




    constructor(props) {
        super(props);
        this.state = {
            answers: {},
            Questions: [],
            selectedOption: {},
            score: 0


        };

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);

    };

    handleFormSubmit = event => {
        event.preventDefault();
        console.log('You have selected:', Object.values(this.state.answers).filter(res => res == true).length);
        if(Object.values(this.state.answers).filter(res => res == true).length>AVG){
            console.log("you are eligible to the startup label")
            console.log("Hello"+this.state.Questions.length/2)
        }
    }

    componentDidMount() {
        axios.get('http://localhost:6003/Questionnaire').then(res => {

            console.log(res.data);
            this.setState({Questions: res.data})

        })
    }

    handleOptionChange(question,questionId, response) {
        this.setState(prevState => ({
            answers: {
                ...prevState.answers,
                [questionId]: response.type == "correcte"
            },
            selectedOption: {
                ...prevState.selectedOption,
                [questionId]: response._id
            },
        }));
        console.log(question,questionId,response)
    }

    render(){
        const {Questions} = this.state;
        return (
            <div>

<Header2/>

                <div id="content-container">


                    <div className="panel">

                        <div className="panel-heading">
                            <h3 className="panel-title">Am I eligible to the startup label?</h3>
                        </div>
                        <form id="demo-custom-container" action="#" className="form-horizontal">
                            <div className="panel-body">

                                <div className="form-group">

                                    <center>
                                        <button className="btn btn-info btn-lg" type="submit">Start the test</button>
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
                                    <button className="btn btn-info btn-lg" type="submit">Start the Application</button>
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








                </div>
        )

    }}
const mapDispatchToProps = {};

export default connect(
    null,
    mapDispatchToProps
)(front2);
