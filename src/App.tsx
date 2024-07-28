// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
// import { Video } from "reactjs-media";
// import Navbar from "./components/Navbar";
import {useEffect, useState} from 'react';
import WebApp from '@twa-dev/sdk';

// import { WebApp } from '@twa-dev/sdk';

interface User {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
}

function App() {

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const userInfo = WebApp.initDataUnsafe?.user;
        if (userInfo) {
            setUser(userInfo as User);
        }
    }, []);

    return (
        <>
            <div>
                {user ? (
                    <div>
                        <h1>Welcome, {user.first_name}!</h1>
                        <p>User ID: {user.id}</p>
                        <p>Username: {user.username}</p>
                    </div>
                ) : (
                    <p>Unauthorized</p>
                )}
            </div>
        </>
        // <>
        //     <Video
        //         src={"https://download.samplelib.com/mp4/sample-30s.mp4"}
        //         controls={true}
        //         height={500}
        //         width={800}
        //         poster={
        //             "https://hips.hearstapps.com/hmg-prod/images/ripley-pa-108-011822-01629-r-661067043d66f.jpg?resize=980:*"
        //         }
        //         onPlay={() => console.log("Video is playing")}
        //         onPause={() => console.log("Video is paused")}
        //         onEnded={() => console.log("Video has ended")}
        //         onTimeUpdate={(time) => console.log("Time is updated", time)}
        //     />
        // </>
    )
}

export default App
