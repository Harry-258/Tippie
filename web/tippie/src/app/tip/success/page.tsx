'use client';

import React from "react";
import TileGrid from "@/app/components/TileGrid";
import Tile from "@/app/components/Tile";
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
        <TileGrid rows={1} cols={1} className="p-5 h-full">
            <Tile innerClassName="flex flex-col items-center justify-center h-full">
                <ProgressBar progress={Progress.FeedbackForm}/>

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
            </Tile>
        </TileGrid>
    )
}