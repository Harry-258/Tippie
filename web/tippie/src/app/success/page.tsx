'use client';

import React from "react";

export default function Page() {
    const [submitted, setSubmitted] = React.useState(false);
    const [invalidFeedback, setInvalidFeedback] = React.useState(false);
    const [feedback, setFeedback] = React.useState("");

    function submitFeedback(feedback: string) {
        if (feedback.trim().length === 0) {
            setInvalidFeedback(true);
        } else {
            setSubmitted(true);
            setInvalidFeedback(false);
        }
        console.log(feedback);
    }

    return (
        <div className="flex flex-col span-10 w-full items-center h-screen justify-center p-10">
            <span>Payment Successful! Feedback?</span>
            { submitted ? (
                <span>Thx for the feedback</span>
            ) : (
                <div>
                    <input type="text" placeholder="Write feedback here" onChange={(e) => setFeedback(e.target.value)} />
                    <button onClick={() => submitFeedback(feedback)}>Submit</button>
                </div>
            )}
            <span>
                {invalidFeedback ? ("Oops! Looks like you forgot to write your feedback.") : ('')}
            </span>
        </div>
    );
}