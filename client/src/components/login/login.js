import React from 'react';
import {addCompte, loginUser, setCurrentUser} from "../../store/actions";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import axios from "axios";
import setAuthToken from "../../setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS,SET_CURRENT_USER } from '../../actions/types';
import './auth.css';
import './login.css';
import logo from './logo_label_blanc.png';
import { Redirect } from 'react-router-dom'


export default class login extends React.Component{

    constructor(props) {


        super(props);
        this.state = {
            username:'',
            username2:'',
            password:'',
            error: 'true',
            color_user_input:'',
            color_pwd_input:'',
            error_msg: '',
            errors: {},
        } ;

        this.handleChange = this.handleChange.bind(this);


    };


handleChange(event) {
       if (event.target.name === 'username')
          this.setState({username: event.target.value})

       if (event.target.name === 'password')
          this.setState({password: event.target.value})
     
}

 handleClick = event => {
   console.log(this.state.username)
   console.log(this.state.password)
   
   if(this.state.username.length == 0){
       console.log("vide")
   this.setState({color_user_input: '#ff0000ba'})
   }else {
   this.setState({color_user_input: 'rgb(39, 129, 42)'})  
   }

    if(this.state.password.length == 0){
       console.log("vide")
   this.setState({color_pwd_input: '#ff0000ba'})
   }else {
   this.setState({color_pwd_input: 'rgb(39, 129, 42)'})  
   }

   if(this.state.password.length != 0 && this.state.username.length !=0){

       axios.post('https://labelplatform.herokuapp.com/login', {email:this.state.username , password:this.state.password})
                .then(res => {
                   //  const {token} = res.data;
                   //  localStorage.setItem('jwtToken', token);
                   //  setAuthToken(token);
                   //  const decoded = jwt_decode(token);
                   // const user1 =setCurrentUser(decoded)
                   console.log(res.data)
                   if(res.data.error == false){
                       this.setState({error: 'true'})
                        localStorage.setItem('user_id', res.data.user_id);
                        localStorage.setItem('user_email', res.data.user.Email);
                        localStorage.setItem('user_fistname', res.data.user.FirstName);
                        localStorage.setItem('user_lastname', res.data.user.LastName);
                        console.log(res.data)
                        if(res.data.user.UserType == 'a')
                           this.props.history.push("/Dashboard");
                        if(res.data.user.UserType == 'c')
                           this.props.history.push("/Dashboard");
                        if(res.data.user.UserType == 'm')
                           this.props.history.push("/Dashboard");
                        if(res.data.user.UserType == 'ch')
                        {
                            this.props.history.push("/DashboardCharge");
                            console.log('charge work place')
                        }
                        if(res.data.user.UserType == 'j')
                           this.props.history.push("/Dashboard");
                      

                   }else{


                        this.setState({error: ''})
                         this.setState({error_msg: res.data.info.error})
                        //this.reset() 
                   }
                   console.log(res.data)
                })
   
   }else{
          this.setState({error: ''})
          this.setState({error_msg: 'Password / Username is required!'})
   }


}
 

 // handleClickFgPasswod = event => {

 // // axios.post('http://localhost:6003/forgetpwd', {email:this.state.username2})
 // //                .then(res => {
 // //                   //  const {token} = res.data;
 // //                   //  localStorage.setItem('jwtToken', token);
 // //                   //  setAuthToken(token);
 // //                   //  const decoded = jwt_decode(token);
 // //                   // const user1 =setCurrentUser(decoded)
 // //                   console.log(res.data)
 // //                   if(res.data.error == false){}}
 // }



//     handleSubmit=event=> {
// event.preventDefault()
//         const user = {

//             Email: this.state.Email,
//             Password: this.state.Password,}
//             axios.post('http://localhost:6003/judges/login', user)
//                 .then(res => {
//                     const {token} = res.data;
//                     localStorage.setItem('jwtToken', token);
//                     setAuthToken(token);
//                     const decoded = jwt_decode(token);
//                    const user1 =setCurrentUser(decoded)
//                    console.log(user1)
//                 })
//         this.props.history.push("../Dashboard");

//     }



    render(){
      if(localStorage.user_id)
        return <Redirect to='/Dashboard' />
        return (

      <div className="login-wrap">
        <div className="login-html">
          <a href="/" className="aligncenter">
            <img className="logo_signin logo_div" src={logo} /><br />
          </a>
          <div hidden={this.state.error} className="alert alert-danger" role="alert">{this.state.error_msg}</div>
          <input id="tab-1" type="radio" name="tab" className="sign-in" defaultChecked /><label htmlFor="tab-1" className="tab">Sign In</label>
          <input id="tab-2" type="radio" name="tab" className="for-pwd" /><label htmlFor="tab-2" className="tab">Forgot Password</label>
          <div className="login-form">
            <div className="sign-in-htm">
              <div className="text-center social-btn" hidden='true'>
                <a href="#" className="btn btn-primary btn-block"><i className="fa fa-facebook" /> Sign in with <b>Facebook</b></a>
                <a href="#" className="btn btn-danger btn-block"><i className="fa fa-google" /> Sign in with <b>Google</b></a>
              </div>
              <div className="hr2" />
              <div className="group">
                <label htmlFor="username" className="label">Username or Email</label>
                <input id="username" type="text" style={{backgroundColor: this.state.color_user_input}} name="username" className="input" value={this.state.username} onChange={this.handleChange.bind(this)}/>
              </div>
              <div className="group">
                <label htmlFor="password" className="label">Password</label>
                <input id="password" name="password"  type="password" style={{backgroundColor: this.state.color_pwd_input}} className="input" data-type="password" value={this.state.password} onChange={this.handleChange.bind(this)} />
              </div>
              <div className="group">
                <button  className="button" onClick={this.handleClick} >Sign In</button>
              </div>
            </div>
            <div className="for-pwd-htm">
              <div className="group">
                <label htmlFor="username_fg" className="label">Username or Email</label>
                <input id="username_fg" type="text" className="input" value={this.state.username2} onChange={this.handleChange.bind(this)} />
              </div>
              <div className="group">
                <button  className="button" >Reset Password</button>
              </div>
              <div className="hr" />
            </div>
          </div>
        </div>
      </div>
    );
  

}}
// const mapDispatchToProps = {
//     loginUser

// };

// export default connect(
//     null,
//     mapDispatchToProps
// )(login);
