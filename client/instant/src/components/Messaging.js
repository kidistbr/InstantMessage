import "./messaging.css";
import React, { Component, Fragment } from 'react'
import Talk from 'talkjs'
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";


class MessagingImpl extends Component {
  constructor(props) {
    super(props)
    // this.currentUser= undefined;
    this.chatWith = this.props.chatWith;    
    this.inbox = undefined;
    this.chatBox = undefined;
  }

  componentDidMount() {
    const currentUser=this.props.user;
    // const chatWith= this.props.chatWith;
    console.log("chat with", this.chatWith);
    console.log("Voila", currentUser);
    const context = this.context;
    this.setState({currentUser: context.user});
    this.setState({chatWith: context.chatWith});
    Talk.ready
      .then(() => {
      const me = new Talk.User({...currentUser, role:"Employee"})

        if (!window.talkSession) {
          window.talkSession = new Talk.Session({
            appId: 'tyHyJByi',
            //sending message as this user 
            me: me
          
        })
        }

        if(this.chatWith.userId){
          const second ={
            id:Number(this.chatWith.userId),
            name: this.chatWith.userName
          };
          const secondUser = new Talk.User(second)
        var conversation2 = window.talkSession.getOrCreateConversation(
            Talk.oneOnOneId(me, secondUser),
          )
          conversation2.setParticipant(me)
          conversation2.setParticipant(secondUser)

        this.inbox = window.talkSession.createInbox({selected:conversation2})
        }
        else{
          this.inbox = window.talkSession.createInbox({})
        }
        this.inbox.mount(this.container)
      })
      .catch((e) => console.error(e))
  }
  componentDidUpdate(){
    console.log("update", this.props.chatWith);
    console.log("update user", this.props.user);
    Talk.ready
    .then(() => {
    const me = new Talk.User({...this.props.user, role:"Employee"})

      if (!window.talkSession) {
        window.talkSession = new Talk.Session({
          appId: 'tyHyJByi',
          //sending message as this user 
          me: this.props.user
        
      })
      }

      if(this.props.chatWith.userId){
        console.log("inside if")
        const second ={
          id:Number(this.props.chatWith.userId),
          name: this.props.chatWith.userName
        };
        const secondUser = new Talk.User(second)
      var conversation2 = window.talkSession.getOrCreateConversation(
          Talk.oneOnOneId(me, secondUser),
        )
        conversation2.setParticipant(me)
        conversation2.setParticipant(secondUser)

      this.inbox = window.talkSession.createInbox({selected:conversation2})
      this.inbox.mount(this.container)
         }
      else{
        console.log("else")
        this.chatbox =window.talkSession.createChatbox();
      }
 
    })
    .catch((e) => console.error(e))
  }

  render() {
    return (
      <Fragment>
        <div
        
          className="messenger"
          ref={(c) => (this.container = c)}
        >
          Loading...
        </div>
      </Fragment>
    )
  }
}


export default function Messaging(chatWith) {
  // console.log(userId, userName,"@@@@@@@");
  // const chatWith = {
  //   userId:userId,
  //   userName: userName
  // }
  const { user } = useContext(AuthContext);
  // console.log("VOILA", user);
  return (<div>
  <MessagingImpl user={user} chatWith={chatWith}></MessagingImpl>
  </div>
  )
};

