import "./messaging.css";
import React, { Component, Fragment } from 'react'
import Talk from 'talkjs'
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import image from '../wallpaper3.jpg'

var crypto = require('crypto')


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
      const chatWithList = this.props.chatWith.userId.split(',')
      console.log(chatWithList);
      if (chatWithList.length === 1) {
        console.log("Inside update if");
        this.createChat();
      }
      else {
        this.createChat();
      }

    }
  }

  generateConversationId(userIds) {
    var sorted = [...userIds].sort();
    console.log(sorted);
    var encoded = JSON.stringify(sorted);
    
    var shasum = crypto.createHash('sha1')
    shasum.update(encoded)
    var hash = shasum.digest('hex')
    console.log(hash.substring(0, 20));
    return hash.substring(0, 20);
  }

  selectConversation(event) {
    var others = event.others;
    var userIds = others.map(function (user) {
      return user.id;
    })
    var userIdsString = userIds.join(',')
    var userNames = others.map(function (user) {
      return user.name;
    })
    var userNamesString = userNames.join(',')
    window.history.pushState({},"",`/messaging?userId=${userIdsString}&userName=${userNamesString}`);
  }

  async deleteConversation(event) {
    var conversation = event.conversation;
    var conversationId = conversation.id;
    var message = event.message;
    var text = message.text;

    if (text === "/delete") {
      var uri = `https://api.talkjs.com/v1/tyHyJByi/conversations/${conversationId}`;
      const response = await fetch(uri, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer sk_test_jqgP9ezEZAcfrDMEIWBm7pJNbI45LwQk'
        }
      });
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
        const userIdList = this.props.chatWith.userId.split(',');
        var conversation2;
        if (userIdList.length === 1) {
          const second ={
            id:Number(this.props.chatWith.userId),
            name: this.props.chatWith.userName
          };
          const secondUser = new Talk.User(second)
          console.log(Talk.oneOnOneId(me, secondUser));
          conversation2 = window.talkSession.getOrCreateConversation(
            Talk.oneOnOneId(me, secondUser),
          )
          conversation2.setParticipant(me)
          conversation2.setParticipant(secondUser)
        }
        else {
          const userNameList = this.props.chatWith.userName.split(',');
          conversation2 = window.talkSession.getOrCreateConversation(
            this.generateConversationId(userIdList),
          )
          conversation2.setParticipant(me)
          
          for (let index = 0; index < userIdList.length; ++index) {
            var element = userIdList[index];
            const other = {
              id: Number(element),
              name: userNameList[index]
            };
            const otherUser = new Talk.User(other);
            conversation2.setParticipant(otherUser);
          }
        }
        this.inbox = window.talkSession.createInbox({selected:conversation2})
      }
      else{
        console.log("Inside Else");
        this.chatBox= window.talkSession.createChatbox();
        console.log("chatbox", this.chatBox);
        this.inbox = window.talkSession.createInbox();
        

      }
      this.inbox.mount(this.container);
      this.inbox.on("selectConversation", this.selectConversation);
      this.inbox.on("sendMessage", this.deleteConversation);
    })
    .catch((e) => console.error(e))
  }

  render() {
    return (
      <Fragment>
        <div
        
          className="messenger"
          style={{
            backgroundImage: 'url('+image+')',
            backgroundSize: "cover",
            height: "100vh",
            color: "#f5f5f5"
          }}
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