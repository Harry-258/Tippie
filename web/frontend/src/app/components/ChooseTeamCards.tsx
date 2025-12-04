import TileGrid from '@/app/components/TileGrid';
import Tile from '@/app/components/Tile';
import { CrownIcon, UserPlusIcon, UsersFourIcon } from '@phosphor-icons/react';
import { iconSize } from '@/app/util/util';
import { auth } from '@/firebase/firebaseClient';
import { assignUserToTeam, createTeam } from '@/app/util/apiCalls';
import Modal from '@/app/components/Modal';
import React, { useState } from 'react';
import { useUserContext } from '@/contexts/userContext';

export default function ChooseTeamCards() {
    const { refetch } = useUserContext();
    const [newTeamName, setNewTeamName] = useState('');
    const [newTeamId, setNewTeamId] = useState('');
    const [error, setError] = useState<string>('');
    const [showingError, setShowingError] = useState<boolean>(false);

    return (
        <TileGrid rows={1} cols={1}>
            <Tile>
                <div className="flex flex-col gap-4 p-8 h-full">
                    <div className="flex flex-row gap-2 items-center">
                        <UsersFourIcon size={iconSize * 2} />
                        <span className="text-3xl font-bold">Your Team</span>
                    </div>

                    <div className="w-full flex flex-col h-full">
                        <span className="text-xl mb-8">
                            Oops! Looks like you are not part of a team yet. Create or join a team
                            to split and compare your tips with your colleagues.
                        </span>

                        <div className="flex flex-row gap-12 items-center justify-evenly w-full h-full">
                            <div className="flex flex-col gap-4 rounded-xl shadow-md p-8 w-1/2 border-2 border-action h-full">
                                <div className="flex flex-row gap-2 items-center">
                                    <CrownIcon size={iconSize * 2} />
                                    <span className="text-3xl font-semibold">Team Manager</span>
                                </div>
                                <span className="text-lg">
                                    Create and manage your restaurant’s team. Choose a name and
                                    share your team ID so your staff can join easily.
                                </span>

                                <ul className="list-disc list-inside text-lg mb-4">
                                    <li>Manage team members</li>
                                    <li>View all tips received across the entire team</li>
                                    <li>
                                        Decide and configure the tip-split rules between staff
                                        members
                                    </li>
                                    <li>
                                        See individual staff averages for ratings and performance
                                    </li>
                                </ul>

                                <div className="flex flex-col text-left w-full mb-4">
                                    <label
                                        htmlFor="teamName"
                                        className="mb-2 font-medium text-primary/70"
                                    >
                                        Choose a name for your team:
                                    </label>
                                    <input
                                        type="text"
                                        id="teamName"
                                        name="teamName"
                                        value={newTeamName}
                                        onChange={e => setNewTeamName(e.target.value)}
                                        placeholder="Enter team name"
                                        className={`bg-foreground shadow-sm rounded-xl focus:outline-none p-3`}
                                    />
                                </div>

                                <div
                                    className="mt-4 p-5 rounded-xl shadow-md flex gap-2 items-center hover:bg-actionActive text-lg
                                               justify-center bg-action transition-all duration-200 hover:cursor-pointer"
                                    onClick={async () => {
                                        if (!newTeamName) {
                                            setError('Please enter a team name.');
                                            setShowingError(true);
                                            return;
                                        }

                                        const user = auth.currentUser;
                                        if (!user) {
                                            console.error('User is not authenticated');
                                            return;
                                        }

                                        const token = await user.getIdToken();

                                        await createTeam(token, newTeamName);
                                        setTimeout(async () => await refetch(), 500);
                                    }}
                                >
                                    <span>Create team</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 rounded-xl shadow-md p-8 w-1/2 border-2 border-action h-full">
                                <div className="flex flex-row gap-2 items-center">
                                    <UserPlusIcon size={iconSize * 2} />
                                    <span className="text-3xl font-semibold">Staff Member</span>
                                </div>

                                <span className="text-lg">
                                    Join your restaurant’s team to access team-wide insights,
                                    compare your performance, and stay connected with your
                                    coworkers.
                                </span>

                                <ul className="list-disc list-inside text-lg mb-4">
                                    <li>See your split of the total tips received by the team</li>
                                    <li>Compare your performance to team averages</li>
                                    <li>Claim shifts or indicate availability</li>
                                    <li>
                                        Receive important updates and announcements from your
                                        manager
                                    </li>
                                </ul>

                                <div className="flex flex-col text-left w-full mb-4">
                                    <label
                                        htmlFor="teamId"
                                        className="mb-2 font-medium text-primary/70"
                                    >
                                        Enter the ID of the team you want to join:
                                    </label>
                                    <input
                                        type="text"
                                        id="teamId"
                                        name="teamId"
                                        value={newTeamId}
                                        onChange={e => setNewTeamId(e.target.value)}
                                        placeholder="Enter team ID"
                                        className={`bg-foreground shadow-sm rounded-xl focus:outline-none p-3`}
                                    />
                                </div>

                                <div
                                    className="mt-4 p-5 rounded-xl shadow-md flex gap-2 items-center hover:bg-actionActive text-lg
                                               justify-center bg-action transition-all duration-200 hover:cursor-pointer"
                                    onClick={async () => {
                                        if (!newTeamId) {
                                            setError('Please enter a team ID.');
                                            setShowingError(true);
                                            return;
                                        }

                                        const user = auth.currentUser;
                                        if (!user) {
                                            console.error('User is not authenticated');
                                            return;
                                        }

                                        const token = await user.getIdToken();
                                        await assignUserToTeam(token, newTeamId);
                                        setTimeout(async () => await refetch(), 500);
                                    }}
                                >
                                    <span>Join team</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal
                    isOpen={showingError}
                    onClose={() => {
                        setShowingError(false);
                    }}
                    type="error"
                    content={error}
                />
            </Tile>
        </TileGrid>
    );
}
