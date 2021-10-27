// import Topbar from "../../components/topbar/Topbar";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Feed from "../../components/feed/Feed";
// import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css"
import NavBar from "../../components/NavBar";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import Messaging from "../../components/Messaging";


export default function Home() {

  const { user } = useContext(AuthContext);


  return (
    <div>
      <NavBar/>
      <div >
        <div>
        <h1>This is the home page.</h1>
        </div>
        <div>
        <h2>Hello {user.username}</h2>
        </div>
        <Messaging/>
      </div>
      </div>
  );
}
