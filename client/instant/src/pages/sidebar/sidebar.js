
import "./sidebar.css";
import React from 'react'
import { useState } from "react";
import SearchBar from "material-ui-search-bar";
import {Work, Group, AddCircle} from '@mui/icons-material/';
// import Work from "@mui/icons-material/Work";
// import GroupIcon from '@mui/icons-material/Group';

export default function Sidebar() {

  const [search, setSearch] = useState();
  const doSomethingWith=(searchFor)=>{
      console.log("@@@@@", searchFor);
  }

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

