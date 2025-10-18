'use client';

import {useEffect, useState} from "react";

export default function Profile() {
    const [test, setTest] = useState<string>("");

    useEffect(() => {
        fetch("http://localhost:4000/api/test").then(res => res.json()).then((data) => setTest(data.user)).catch(err => console.log(err));
    })

    return (
        <div className="text-primary">
            Hello, {test}!
        </div>
    )
}
