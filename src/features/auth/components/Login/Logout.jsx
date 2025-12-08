import { logout } from "@/features/auth/components/Login/authSlice";

export default function Logout(dispatch){

    dispatch(logout());
    
}