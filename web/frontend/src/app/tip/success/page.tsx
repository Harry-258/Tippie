'use client';

import React from 'react';
import ProgressBar from '@/app/components/ProgressBar';
import { Progress } from '@/app/util/types';
import { baseUrl } from '@/app/util/util';
import { useSearchParams } from 'next/navigation';
import Rating from '@mui/material/Rating';
import styled from '@emotion/styled';

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#def186',
    },
    '& .MuiSvgIcon-root': {
        width: 50,
        height: 50,
    },
    '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
        color: '#e0e0e0',
    },
});

export default function Page() {
    const [submitted, setSubmitted] = React.useState(false);
    const [invalidFeedback, setInvalidFeedback] = React.useState(false);
    const [feedback, setFeedback] = React.useState('');
    const [rating, setRating] = React.useState(0);
    const params = useSearchParams();
    const uid = params.get('uid');

    if (!uid) {
        return (
            <div className="h-full w-full">
                Something went wrong. Your payment was successful, but we could not go further.
            </div>
        );
    }

    async function submitFeedback(feedback: string) {
        try {
            if (feedback.trim().length === 0) {
                setInvalidFeedback(true);
            } else {
                setSubmitted(true);
                setInvalidFeedback(false);

                console.log(
                    JSON.stringify({
                        feedback: feedback,
                        rating: rating,
                        uid: uid,
                    })
                );

                await fetch(baseUrl + '/api/tip/feedback', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        feedback: feedback,
                        rating: rating,
                        uid: uid,
                    }),
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex flex-col items-center h-full">
            <ProgressBar progress={Progress.FeedbackForm} className="mt-10" />

            <div className="flex flex-col items-center justify-center w-full h-full text-center gap-6">
                <div className="flex flex-col items-center justify-center gap-2 mb-10">
                    <h2 className="text-2xl font-semibold">Payment Successful! 🎉</h2>
                    <p className="mx-2">
                        Your tip made someone’s day! Would you also like to leave them some
                        feedback?
                    </p>
                </div>

                {submitted ? (
                    <div className="flex flex-col items-center space-y-2">
                        <span className="text-lg font-medium text-primary">
                            Thank you for your feedback!
                        </span>
                    </div>
                ) : (
                    <div className="flex flex-col items-center w-full gap-2">
                        <span className="text-lg">Rate your experience:</span>
                        <StyledRating
                            value={rating}
                            precision={0.5}
                            size={'large'}
                            defaultValue={5}
                            onChange={(event, newValue) => {
                                if (newValue) {
                                    setRating(newValue);
                                }
                            }}
                        />
                        <textarea
                            rows={4}
                            placeholder="Write your feedback here..."
                            onChange={e => setFeedback(e.target.value)}
                            className="w-full p-3 rounded-xl bg-primary/5 shadow-inner focus:outline-none mt-6"
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
    );
}
