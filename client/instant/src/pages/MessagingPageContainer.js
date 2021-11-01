import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import Talk from 'talkjs';
import * as talkSession from "../utils/talk.session";
import { getOrCreateConversation } from '../utils/talk.util';


class ProductPageContainer extends React.Component {
    static DefaultProps = { currentUser: User }
    static DefaultState = { 
        product: Product | null,
        talkSession: Talk.Session | null,
        talkConversation: Talk.ConversationBuilder | null
      };
    constructor(props){
        this.state = {
            product: null,
            talkSession: null,
            talkConversation: null
          }
    }

    async componentDidMount() {        
        const session = await talkSession.get();
        const user2={
            id:3,
            name:"Other User"
        };
        const conversation = await getOrCreateConversation(session, this.props.currentUser, user2);
        
        //It is important that this #setState is being called separately from the one that's being called to set the product above.
        this.setState({
          talkSession: session,
          talkConversation: conversation
        });
      }

    
}
