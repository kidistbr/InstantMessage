import "./messaging.css";
import React, { Component, Fragment } from 'react'
import Talk from 'talkjs'
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { create } from "@mui/material/styles/createTransitions";


class MessagingImpl extends Component {
  constructor(props) {
    super(props)
    this.chatWith = this.props.chatWith;    
    this.inbox = undefined;
    this.chatBox = undefined;
  }

  componentDidMount() {
    const currentUser=this.props.user;
    console.log("chat with", this.chatWith);
    console.log("Voila", currentUser);
    this.createChat();

  }
  componentDidUpdate(){

    console.log("this.chatWith.userId update", this.props.chatWith)
    if(this.props.chatWith.userId){
      console.log("Inside update if");
      this.createChat();

    }
  }

  createChat(){
    Talk.ready
    .then(() => {
    const me = new Talk.User({...this.props.user, role:"Employee"})

      if (!window.talkSession) {
        window.talkSession = new Talk.Session({
          appId: 'tyHyJByi',
          //sending message as this user 
          me: me
        
      })
      }
      console.log(this.chatWith);
      if(this.props.chatWith.userId){
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
      this.inbox.mount(this.container);
      }
      else{
        console.log("Inside Else");
        this.chatBox= window.talkSession.createChatbox();
        console.log("chatbox", this.chatBox);
        this.inbox = window.talkSession.createInbox();
        this.inbox.mount(this.container);

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

  const { user } = useContext(AuthContext);
  return (<div>
  <MessagingImpl user={user} chatWith={chatWith}></MessagingImpl>
  </div>
  )
};