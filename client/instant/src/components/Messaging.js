import React, { Component, Fragment } from 'react'
import Talk from 'talkjs'
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";


class Messaging extends Component {
  constructor(props) {
    super(props)
    // this.talkjsContainer=React.createRef();

    this.inbox = undefined
    let currentUser

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
      currentUser,
    }
  }

  componentDidMount() {
    Talk.ready
      .then(() => {
        // const { loginUser } = useContext(AuthContext);
        // console.log(loginUser)
        const user = {
          name: 'kidist',
          email: 'kidist@matchMedia.com',
          description: 'abc',
          id: 1,
          role: 'Member',
          // photoUrl: "https://talkjs.com/docs/img/ronald.jpg"
        }
        const me = new Talk.User(user)

        if (!window.talkSession) {
          window.talkSession = new Talk.Session({
            appId: 't8WOumdG',
            
            
            //sending message as this user 
            me: me
          
        })
        }
        const user2 = {
          name: 'thomas',
          email: 'email@gmail.com',
          description: 'xyz',
          id: 2,
          role: 'Member',
          // photoUrl: "https://talkjs.com/docs/img/ronald.jpg"
        }
        const me2 = new Talk.User(user2)
        const user3 = {
            name: 'scott',
            email: 'email@gmail.com',
            description: 'xyz',
            id: 3,
            role: 'Member',
            // photoUrl: "https://talkjs.com/docs/img/ronald.jpg"
          }
          const me3 = new Talk.User(user3)
        
        //first convo
          var conversation = window.talkSession.getOrCreateConversation(
          Talk.oneOnOneId(me, me2),
        )
        //make it a group convo 
        conversation.setParticipant(me)
        conversation.setParticipant(me2)
        conversation.setParticipant(me3) 
        
        //second convo
        var conversation2 = window.talkSession.getOrCreateConversation(
            Talk.oneOnOneId(me, me3),
          )
          conversation2.setParticipant(me)
          conversation2.setParticipant(me3)
        this.inbox = window.talkSession.createInbox({selected:conversation2})
        this.inbox.mount(this.container)
      })
      .catch((e) => console.error(e))
  }

  render() {
    // return( 
    //     <div ref={this.talkjsContainer}></div>
    // )

    return (
      <Fragment>
        <div
          style={{ height: '500px' }}
          className="inbox-container"
          ref={(c) => (this.container = c)}
        >
          Loading...
        </div>
      </Fragment>
    )
  }
}

export default Messaging
