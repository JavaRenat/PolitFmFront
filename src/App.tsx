// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Video } from "reactjs-media";

function App() {

  return (
    <>
        <Video
            src={"https://download.samplelib.com/mp4/sample-30s.mp4"}
            controls={true}
            height={500}
            width={800}
            poster={
                "https://hips.hearstapps.com/hmg-prod/images/ripley-pa-108-011822-01629-r-661067043d66f.jpg?resize=980:*"
            }
            onPlay={() => console.log("Video is playing")}
            onPause={() => console.log("Video is paused")}
            onEnded={() => console.log("Video has ended")}
            onTimeUpdate={(time) => console.log("Time is updated", time)}
        />
    </>
  )
}

export default App
