     import axios from "axios";
    //  import * as talkSession from '../src/utils/talk.session';
     import {initialize} from "../src/utils/talk.session"

    export const loginCall = async (userCredential, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
        const res = await axios.post("http://localhost:3001/api/users/login", userCredential);
        const token= res.data.token;
        const {id, name} =JSON.parse(atob(token.split(".")[1]));
        console.log("id", id);
        console.log("username", name);
        const user={id:id,
        name:name};
        console.log("user", user);
        dispatch({ type: "LOGIN_SUCCESS", payload:user});

        console.log("res.data"+res.data.token);
        initialize(user)
        // talkSession.initialize(user);
        // talkSession.initialize(user);
    } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err });
    }
    };

export const searchUserCall= async (name) => {
    try {
        const res = await axios.get("http://localhost:3001/api/users?name="+name);
        return res.data;
    } catch (err) {
        return err;
    }
    };
