import { logout } from "@features/auth/authSlice";

export default function Logout(dispatch){

    dispatch(logout());
    
}