import React from 'react';
import axios from 'axios';

import {connect} from "react-redux";
import Header from '../../../containers/Header.js';
import ContentContainer from '../../../containers/ContentContainer.js';
import Nav from '../../../containers/Nav.js';

const AVG = 1;

class Question extends React.Component {
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
       this.loadJudges()
    }
    loadJudges = ()=> {
        axios.get('http://localhost:6003/Questionnaire').then(res => {

            console.log(res.data);
            this.setState({Questions: res.data})

        })
    }
    handleclick() {


        this.loadJudges()


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

    render() {
        const {Questions} = this.state;

        return (

            < div
                id="container"
                className="effect mainnav-sm navbar-fixed mainnav-fixed">

                <Header/>
                <div className="boxed">
                    <div id="content-container">
                        <ContentContainer/>
                        <form onSubmit={this.handleFormSubmit}>
                            {
                                Questions.map((question) => {
                                    if(question.type==="QuestionJury")
                                    return (
                                        <div>
                                            {question.text}
                                            {question.responses.map(response => (
                                                <div className="radio" key={response._id}>
                                                    <label>
                                                        <input type="radio"
                                                               checked={this.state.selectedOption[question._id] === response._id}
                                                               onChange={() => this.handleOptionChange(question,question._id, response)}/>
                                                        {response.text}
                                                    </label>
                                                </div>

                                            ))}

                                        </div>
                                    )


                                })}


                            <button className="btn btn-default" type="submit">Save</button>
                        </form>

                    </div>


                </div>

                <Nav/>


            </div>


        )
    }
}

const mapDispatchToProps = {};

export default connect(
    null,
    mapDispatchToProps
)(Question);
