import Talk from 'talkjs';

class ProductPage extends React.Component{

    constructor(props) {}

    static defaultProps ={
        talkSession: Talk.Session | null,
        talkConversation: Talk.ConversationBuilder | null
    };

    chatPopup;

    preloadChatPopup() {
        if (!this.props.talkSession || !this.props.talkConversation) {
          return;
        }
        
        this.chatPopup = this.props.talkSession.createPopup(this.props.talkConversation);
        this.chatPopup.mount({ show: false });
      }
      
      componentDidUpdate() {
        this.preloadChatPopup();
      }

}