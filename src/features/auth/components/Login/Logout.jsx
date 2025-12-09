import { logoutUser } from "./logoutUser";

export default function Logout(dispatch){

    dispatch(logoutUser());
    
}