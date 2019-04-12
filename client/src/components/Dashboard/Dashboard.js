
import React, { Component, Suspense } from 'react';
import Header from '../../containers/Header.js';
import ContentContainer from '../../containers/ContentContainer';
import Nav from '../../containers/Nav.js';

export default class Dashboard extends Component{

    render(){
        return (

            < div
                id = "container"
                className = "effect mainnav-sm navbar-fixed mainnav-fixed" >
             <Header/>

                <div className="boxed">
<ContentContainer/>

                  <Nav/>

                </div>

            </div>

        )
    }
}



