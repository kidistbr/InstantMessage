import { Link } from "react-router-dom";
import "./sidebar.css";

function openChat(theUser) {
    const name = theUser.firstName+" "+theUser.lastName;
    window.location = `/messaging?userId=${theUser.userId}&userName=${name}`
}

function printTest2(theUser) {
    const name = theUser.firstName+" "+theUser.lastName;
    const urlSearchParams = new URLSearchParams(window.location.search);
    const userIds = urlSearchParams.get('userId');
    const names = urlSearchParams.get('userName');
    if (userIds && names) {
        const userIdsList = userIds.split(',');
        userIdsList.push(theUser.userId.toString());

        const namesList = names.split(',');
        namesList.push(name);

        console.log(userIdsList);
        console.log(namesList);

        window.location = `/messaging?userId=${userIdsList.join(',')}&userName=${namesList.join(',')}`
    }
    // window.location = `/messaging?userId=${theUser.userId}&userName=${name}`
}

export default function SearchResult({key,user}) {
    const name = user.firstName+" "+user.lastName;

    return (
        // <Link to={`/messaging?userId=${user.userId}&userName=${user.firstName}" "${user.lastName}`}>

        // <Link to={`/messaging?userId=${user.userId}&userName=${name}`}>
        // <li className="link" key={key}>{user.firstName} {user.lastName}</li>
        // </Link>

        // <Link to={`/messaging?userId=${user.userId}&userName=${name}`}>
        <li className="link" key={key}>{name}<button onClick={(theUser) => openChat(user)}>Begin New Chat</button> <button onClick={(theUser) => printTest2(user)}>Add to Chat</button> </li>
        // </Link>
    );
  }

  // My code
//   <li key={key}>{name}</li>
 
  
  
  
  
