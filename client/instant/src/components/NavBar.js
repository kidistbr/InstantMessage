import "./navbar.css";
import { Link } from "react-router-dom";


export default function NavBar(){


    return (
        <div className="topbarContainer">
        <div className="topbarLeft">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">Instant App</span>
          </Link>
        </div>
        <div className="topbarCenter">

        </div>
        <div className="topbarRight">
        <div className="searchbar">
            {/* <Search className="searchIcon" /> */}
            <input
              placeholder="Search for friend"
              className="searchInput"
            />
          </div>



          
          {/* <Link to={`/profile/${user.username}`}>
            <img
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt=""
              className="topbarImg"
            />
          </Link> */}
        </div>
      </div>

    );
}