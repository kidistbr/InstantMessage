
import React, { Component, Fragment } from 'react';
import Talk from "talkjs";

class Messaging extends Component {

    constructor(props) {
        super(props);

        this.inbox = undefined;
        let currentUser;

        // const currentUser = {
        //     name:"kidist",
        //     email: "kidist@matchMedia.com",
        //     description: "abc",
        //     id: 1,
        //     role: "Member",
        //     photoUrl: "https://talkjs.com/docs/img/ronald.jpg"
        // }
        // const currentTalkjsUser = localStorage.getItem('currentTalkjsUser');
        // if (currentTalkjsUser) {
        //     currentUser = JSON.parse(currentTalkjsUser)
        // }

        this.state = {
            currentUser
        }
    }


    componentDidMount() {
        Talk.ready
            .then(() => {
                const user={
                    
                        name:"kidist",
                        email: "kidist@matchMedia.com",
                        description: "abc",
                        id: 1,
                        role: "Member",
                        photoUrl: "https://talkjs.com/docs/img/ronald.jpg"
                    
                };
                const me = new Talk.User(user);
                
                if (!window.talkSession) {
                    window.talkSession = new Talk.Session({
                        appId: "t8WOumdG",
                        me: me
                    });
                }
            
                this.inbox = window.talkSession.createInbox();
                this.inbox.mount(this.container);

            })
            .catch(e => console.error(e));
    }

    render() {
        return (
            <Fragment>
                <div style={{height: '500px'}} className="inbox-container" ref={c => this.container = c}>Loading...</div>
            </Fragment>
        );
    }
  }
  
  export default Messaging;