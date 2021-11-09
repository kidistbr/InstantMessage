
import "./sidebar.css";
import {  useState } from "react";
import SearchBar from "material-ui-search-bar";
import {Work} from '@mui/icons-material/';
import { searchUserCall } from "../../apiCalls";
import SearchResult from "./searchResult";
import * as React from 'react';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';



export default function Sidebar() {
  const [users, setUsers]= useState();
  const [isSearched, setIsSearched] = useState(false);
  const [search, setSearch] = useState();


  const doSomethingWith=async(searchFor)=>{
      console.log("@@@@@", searchFor);
     const users =  await searchUserCall(searchFor);
        setUsers(users);
       setSearch(searchFor);
       setIsSearched(true);
      console.log("user at search", users)
  }


  return (

    <div>
  <SearchBar
    value={search}
    onChange={(newValue) => setSearch(newValue)}
    onRequestSearch={() => doSomethingWith(search)}
  />
    <List>
      
    <ListItem button key="Creospan">
    <ListItemIcon>
        <Work/>
        </ListItemIcon>
        <ListItemText primary="Creospan" />
        </ListItem>
        </List>
        <Divider />
        <br/>
        <Typography variant="h8" noWrap component="div">
          Communicate With Your Peers
        </Typography>
        <br/>
        <Divider />
        {isSearched?
        <List>
        {users.map(u => (

        <ListItem>
          <SearchResult key={u.id} user={u} />

        </ListItem>
        ))};
        </List>:

        <div></div>}
        </div>


  )
}

