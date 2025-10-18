'use client';

import React from "react";
import ProgressBar from "@/app/components/ProgressBar";
import {Progress} from "@/app/util/types";

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
        <div className="flex flex-col items-center h-full">
            <ProgressBar progress={Progress.FeedbackForm} className="mt-10" />

            {/*<div className="flex flex-col items-center justify-evenly h-full mt-10">*/}
            {/*    <span>Payment Successful! Feedback?</span>*/}
            {/*    { submitted ? (*/}
            {/*        <span>Thx for the feedback</span>*/}
            {/*    ) : (*/}
            {/*        <div>*/}
            {/*            <input type="text" placeholder="Write feedback here" onChange={(e) => setFeedback(e.target.value)} />*/}
            {/*            <button onClick={() => submitFeedback(feedback)} className="button">Submit</button>*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*    <span>*/}
            {/*        {invalidFeedback ? ("Oops! Looks like you forgot to write your feedback.") : ('')}*/}
            {/*    </span>*/}
            {/*</div>*/}

            <div className="flex flex-col items-center justify-center w-full h-full text-center gap-6">
                <div className="flex flex-col items-center justify-center gap-2 mb-10">
                    <h2 className="text-2xl font-semibold">Payment Successful! 🎉</h2>
                    <p className="mx-2">Your tip made someone’s day! Would you also like to leave them some feedback?</p>
                </div>

                {submitted ? (
                    <div className="flex flex-col items-center space-y-2">
                        <span className="text-lg font-medium text-primary">Thank you for your feedback!</span>
                    </div>
                ) : (
                    <div className="flex flex-col items-center w-full">
                        <textarea
                            rows={4}
                            placeholder="Write your feedback here..."
                            onChange={(e) => setFeedback(e.target.value)}
                            className="w-full p-3 rounded-xl bg-primary/5 shadow-inner focus:outline-none"
                        />
                    </div>
                )}

                {!submitted && (
                    <button
                        onClick={() => submitFeedback(feedback)}
                        className="button py-2 text-center font-semibold shadow-md hover:scale-[1.02] transition-transform"
                    >
                        Submit Feedback
                    </button>
                )}

                {invalidFeedback && (
                    <span className="text-sm text-red-500 font-medium">
                        Oops! Looks like you forgot to write your feedback.
                    </span>
                )}
            </div>
        </div>
    )
}