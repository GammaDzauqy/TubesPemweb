import React from 'react';
import { Head } from '@inertiajs/react';

interface WelcomeProps {
    name: string;
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        } | null;
        roles: string[];
        permissions: string[];
    };
}

const Welcome: React.FC<WelcomeProps> = ({ name, auth }) => {
    return (
        <>
            <Head title="Welcome" />
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h1>Hello, {name}!</h1>
                {auth.user ? (
                    <div>
                        <p>You are logged in as: {auth.user.name} ({auth.user.email})</p>
                        <p>Your roles: {auth.roles.join(', ')}</p>
                        <p>Your permissions: {auth.permissions.join(', ')}</p>
                    </div>
                ) : (
                    <p>You are not logged in.</p>
                )}
                <p>This is your first Inertia.js page with React and TypeScript.</p>
            </div>
        </>
    );
};

export default Welcome;