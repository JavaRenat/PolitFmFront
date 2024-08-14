import {BrowserRouter, useNavigate, useLocation, Routes, Route} from "react-router-dom";
import {Box} from '@mui/material';
import {useEffect} from "react";

import {ChannelDetail, VideoDetail, SearchFeed, Navbar, Feed} from './components';


const App = () => {
    return (
        <BrowserRouter>
            <Box sx={{backgroundColor: '#000'}}>
                <Navbar/>
                <Routes>
                    <Route path='/video/:id' element={<VideoDetail/>}/>
                    <Route path='/channel/:id' element={<ChannelDetail/>}/>
                    <Route path='/search/:searchTerm' element={<SearchFeed/>}/>
                    <Route path='*' element={<FeedWithRedirect/>}/>
                </Routes>
            </Box>
        </BrowserRouter>
    );
};

const FeedWithRedirect = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {

        const initData = window.Telegram?.WebApp?.initDataUnsafe;

        const queryParams = new URLSearchParams(location.search);
        let videoId = queryParams.get('video');
        let channelId = queryParams.get('channel');


        // Если параметры не найдены, проверяем данные из Telegram API
        if (!videoId && !channelId && initData) {
            videoId = initData.query_id === 'video' ? initData.query_hash : null;
            channelId = initData.query_id === 'channel' ? initData.query_hash : null;
        }

        if (videoId) {
            navigate(`/video/${videoId}`);
        } else if (channelId) {
            navigate(`/channel/${channelId}`);
        }
    }, [location, navigate]);

    return <Feed/>;
};

export default App;

//
// import { useEffect, useState } from 'react';
// import WebApp from '@twa-dev/sdk';
// import './App.css'
//
//
// function App() {
//     const [user, setUser] = useState(null);
//
//     useEffect(() => {
//         const userInfo = WebApp.initDataUnsafe?.user;
//         if (userInfo) {
//             setUser(userInfo);
//         }
//     }, []);
//
//   return (
//       <>
//           <div>
//               {user ? (
//                   <div>
//                       <h1>Welcome, {user.first_name}!</h1>
//                       <p>User ID: {user.id}</p>
//                       <p>Username: {user.username}</p>
//                   </div>
//               ) : (
//                   <p>Use telegram</p>
//               )}
//           </div>
//       </>
//   )
// }
//
// export default App
