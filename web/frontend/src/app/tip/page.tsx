import {redirect} from "next/navigation";

export default function Tip() {
    // TODO: What to do if no token for user?

    redirect('/tip/amount');
}