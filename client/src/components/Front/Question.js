import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header2 from'../../containers/Header2.js';
import {connect} from "react-redux";
import {NotificationContainer, NotificationManager} from 'react-notifications';



class Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            answers: {},
            Questions: [],
            selectedOption: {},
            score: 0,
            status:'',


        };

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);

    };
    createNotification = (type) => {

        return (event) => {
            event.preventDefault()
            console.log(this.state.status)
            switch (type) {
                case 'info':
                    if(this.state.status===1)
                    NotificationManager.info('Your are eligible for the startup label,you need to provide the necessary document and 30 euros for registration');
                    else {
                        NotificationManager.info('Your are not eligible for the startup label because of some errors in your innovation criteria');
                    }
                    break;

            }
        };
    };

    handleFormSubmit = event => {
        event.preventDefault();
        console.log('You have selected:', Object.values(this.state.answers).filter(res => res == true).length);
        if(Object.values(this.state.answers).filter(res => res == true).length>this.state.Questions.length/2) {
            this.state.status=1
console.log(this.state.status)
        }else
        {
            this.state.status=2
            console.log(this.state.status)

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
    handleClick = ()=> {
        window.location.reload();
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
            <div>

                <Header2/>
                <br/>
                    <br/>

                <div id="content-container">

<center>
                <form>
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


                    < Link  onClick={  this.createNotification('info')}> <button  className="btn btn-pink" type="submit" onClick={this.handleFormSubmit}>Submit </button></ Link>
                    <span>  <button className="btn btn-info" onClick={this.handleClick} >Reinitialisate  </button></span>
                        </form>
</center>
                    <NotificationContainer/>
                </div>
            </div>


        )
    }
}

const mapDispatchToProps = {};

export default connect(
    null,
    mapDispatchToProps
)(Question);
