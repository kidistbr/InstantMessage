import { Link } from "react-router-dom";
import "./sidebar.css";

export default function SearchResult({key,user}) {
    const name = user.firstName+" "+user.lastName;

    return (
        // <Link to={`/messaging?userId=${user.userId}&userName=${user.firstName}" "${user.lastName}`}>
        <Link to={`/messaging?userId=${user.userId}&userName=${name}`}>

        <li className="link" key={key}>{user.firstName} {user.lastName}</li>
        </Link>
    );
  }