import {redirect} from "next/navigation";

export default function Personal() {
    // TODO: What to do if no token for user?

    redirect('/tip/amount');
}