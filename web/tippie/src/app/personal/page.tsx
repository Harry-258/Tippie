import {redirect} from "next/navigation";

export default function Personal() {
    // TODO: Check if logged in, then redirect

    redirect('/personal/dashboard');
}