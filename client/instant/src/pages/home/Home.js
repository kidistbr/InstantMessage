
import "./home.css"
import NavBar from "../../components/NavBar";
import Messaging from "../../components/Messaging";
import Sidebar from "../sidebar/sidebar";
import '../sidebar/sidebar.css'
import Grid from '@material-ui/core/Grid'
import { useLocation } from "react-router";

export default function Home() {

  let query = new URLSearchParams(useLocation().search);
  console.log("query, query", query);
  return (
    <Grid container style={{width: '100%', margin: '0 auto'}}>
      <Grid item xs={12}>
        <NavBar/>
      </Grid>
      <Grid item xs={4}>
        <div style={{height: 100, margin: 0}}><Sidebar/></div>
      </Grid>
      <Grid item xs={8}>
        <div style={{height: 100}}>
          <Messaging userId={query.get("userId")} userName={query.get("userName")}/></div>
      </Grid>
    </Grid>//     <div>
//       <NavBar/>
//       <div className="container">
//       <div class="sidebar">
//       {/* <div>
//         <div class="mt-3 inputs"> <i >{search}</i> 
//         <input type="text" class="form-control " placeholder="Search Tasks..."/> 
//         </div>

// <a class="active" href="#home">Home</a>
// <a href="#news">News</a>
// <a href="#contact">Contact</a>
// <a href="#about">About</a>
//         </div> */}
//         <Sidebar />
//       </div>
//         <div className="content">
//         <Messaging/>
//         </div>

//       </div>
//       </div>
  );
}
