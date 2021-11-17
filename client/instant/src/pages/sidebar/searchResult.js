import { Link } from "react-router-dom";
import "./sidebar.css";
import image from './../../noAvatar.png';
import { useState, useEffect } from "react";
import axios from "axios";


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
    const [ onlineStatus, setOnlineStatus] =useState('');

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (!onlineStatus) {
            getOnlineStatus();
        }
      }, []);

    const getOnlineStatus= async()=>{
        console.log("user id", user.userId)
        // var uri = `https://api.talkjs.com/v1/tyHyJByi/users/${user.userId}/sessions`;
        // const response = await fetch(uri, {
        //     method: 'GET',
        //     mode:'cors',
        //     headers: {
        //       'Authorization': 'Bearer sk_test_jqgP9ezEZAcfrDMEIWBm7pJNbI45LwQk'
        //     }
        //   });
        //   console.log(response);
        try{
            const res = await axios.get("http://localhost:3001/api/users/online?userId="+user.userId);
            console.log(res.data);
            setOnlineStatus(res.data.length);
        }catch (err) {
            return err;
        }
    }
    return (
        // <Link to={`/messaging?userId=${user.userId}&userName=${user.firstName}" "${user.lastName}`}>

        // <Link to={`/messaging?userId=${user.userId}&userName=${name}`}>
        // <li className="link" key={key}>{user.firstName} {user.lastName}</li>
        // </Link>

        // <Link to={`/messaging?userId=${user.userId}&userName=${name}`}>
        <div className="chatOnline">
        <div className="chatOnlineFriend" >
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={image}
              alt=""
            />
                        {onlineStatus?

            <div className="chatOnlineBadge"></div>
       :<div className="chatOfflineBadge"></div>}
        </div>
        <li className="link" key={key}>{name}
         <Link to={`/messaging?userId=${user.userId}&userName=${name}`}>

        <button>Begin New Chat</button> 
        </Link>
        <button onClick={(theUser) => printTest2(user)}>Add to Chat</button> 
        
        </li>
        </div>
        </div>
        // </Link>
    );
  }

  // My code
//   <li key={key}>{name}</li>
 
  
  
  
  
