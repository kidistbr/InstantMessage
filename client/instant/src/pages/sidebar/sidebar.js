
import "./sidebar.css";
import {  useState } from "react";
import SearchBar from "material-ui-search-bar";
import {Work, Group, AddCircle} from '@mui/icons-material/';
import { searchUserCall } from "../../apiCalls";
import SearchResult from "./searchResult";

// import Work from "@mui/icons-material/Work";
// import GroupIcon from '@mui/icons-material/Group';
export default function Sidebar() {
  const [users, setUsers]= useState();
  const [isSearched, setIsSearched] = useState(false);
  const [search, setSearch] = useState();
  

  // useEffect(() => {
  //   const getFriends = async () => {
  //     try {
  //       const friendList = await axios.get("http://localhost:3001/api/users?name" + search);
  //       setUsers(friendList.data);
  //       setIsSearched(true);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getFriends();
  // }, [search]);
  const doSomethingWith=async(searchFor)=>{
      console.log("@@@@@", searchFor);
     const users =  await searchUserCall(searchFor);
        setUsers(users);
       setSearch(searchFor);
       setIsSearched(true);
      console.log("user at searcg", users)
  }

  // const doSomethingWith = useCallback(async(searchFor)=>{
  //   const users= await searchUserCall(searchFor);
  //   setUsers(users);
  // });

  return (
    <div className="sidebar">

<SearchBar
    value={search}
    onChange={(newValue) => setSearch(newValue)}
    onRequestSearch={() => doSomethingWith(search)}
  />
    <div>
      <div className="title">
        <Work/> <h2>Creospan</h2>
        </div>
        <p>Communicate With Your Peers</p>
    </div>
    <hr/>
    {isSearched?
    <div>
    <div>
      <ul>
        {users.map(u => (
          <SearchResult key={u.id} user={u} />
        ))} 
       </ul>
    </div>
    <hr/>
    </div>
    :<div></div>}
    <div>
      <div className="title">
        <Group/> <h2>Group Chats</h2>
        </div>
        <hr/>
        <div className="link"><AddCircle/><h3>New Channel</h3></div>
        <ul>
          <li className="link"><h3>Group One</h3></li>
          <li className="link"><h3>Group Two</h3></li>
          <li className="link"><h3>Group Three</h3></li>
          <li className="link"><h3>Group Four</h3></li>
        </ul>
    </div>
    <hr/>
  
    </div>
  )
}

