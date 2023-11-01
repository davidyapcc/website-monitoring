import React, { useState, useEffect } from 'react';
import './App.css';

const WebsiteStatus = () => {
    const [websites] = useState([
        { name: 'Facebook', url: 'https://www.facebook.com/' },
        { name: 'Wikipedia', url: 'https://www.wikipedia.org/' },
        { name: 'Google', url: 'https://www.google.com/' },
        { name: 'Stack Overflow', url: 'https://stackoverflow.com/' },
    ]);

    const [statuses, setStatuses] = useState({});

    const checkStatus = async (website) => {
        try {
            const response = await fetch(website.url);
            const status = response.ok ? 'Online' : 'Offline';
            setStatuses((prevStatuses) => ({
                ...prevStatuses,
                [website.name]: status,
            }));
        } catch (error) {
            console.error('Error:', error);
            setStatuses((prevStatuses) => ({
                ...prevStatuses,
                [website.name]: 'Error',
            }));
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            websites.forEach((website) => checkStatus(website));
        }, 5000);

        return () => clearInterval(interval);
    }, [websites]);

    return (
        <div>
            <h2>Website Status</h2>
            {websites.map((website) => (
                <div key={website.name}>
                    <button onClick={() => checkStatus(website)}>Check Status for {website.name}</button>
                    {statuses[website.name] && <p>Status for {website.name}: {statuses[website.name]}</p>}
                </div>
            ))}
        </div>
    );
};

export default WebsiteStatus;
