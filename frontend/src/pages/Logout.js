import { redirect } from "react-router-dom";
import { clearAuthData } from "../util/auth";

export function action() {
    clearAuthData();
    return redirect('/');
}
