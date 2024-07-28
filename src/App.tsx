import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Video } from "reactjs-media";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Video
            src={"https://rr2---sn-5goeen7y.googlevideo.com/videoplayback?expire=1722147016&ei=aIylZq-BM63I6dsPhruXmAM&ip=2a02%3Ace0%3A3000%3A22b%3Acc0c%3Ab1f3%3A6095%3A1c6d&id=o-ANaEYKB-qirZHoFvJfvwFz9UvgXuJs_9NwfFmFFE4Scw&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&bui=AXc671JbfgNnTbnL8pDt0OMZP9k4QQuWBDM6GETE5Sfh8UmM9hCiO3UFN7qS65hVeCF4tN7CAhB-RfNT&vprv=1&mime=video%2Fmp4&rqh=1&gir=yes&clen=65937355&ratebypass=yes&dur=1292.608&lmt=1722081034756436&c=ANDROID_CREATOR&txp=3309224&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cvprv%2Cmime%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRQIgK5xeDlLULindI4kmyfSuqcdJ9cD7AKJIGTddzxkvHzECIQDul0jSBK_RMzWkXpvO4GTG1Kb7E2tXm6UmAaHHA3qkAQ%3D%3D&title=%D0%90%D0%A0%D0%95%D0%A1%D0%A2%D0%9E%D0%92%D0%90%D0%9D%20%D0%97%D0%90%D0%9C%20%D0%A8%D0%9E%D0%99%D0%93%D0%A3%20%D0%93%D0%95%D0%9D%D0%95%D0%A0%D0%90%D0%9B%20%D0%91%D0%A3%D0%9B%D0%93%D0%90%D0%9A%D0%9E%D0%92%20%7C%20%D0%A0%D0%9E%D0%A1%D0%93%D0%92%D0%90%D0%A0%D0%94%D0%98%D0%AF%20%D0%9D%D0%90%20%D0%A2%D0%90%D0%9D%D0%9A%D0%90%D0%A5%20%7C%20%D0%97%D0%90%D0%A5%D0%92%D0%90%D0%A7%D0%95%D0%9D%D0%AB%20%D0%9D%D0%9E%D0%92%D0%9E%D0%A1%D0%95%D0%9B%D0%9E%D0%92%D0%9A%D0%90%20%D0%98%20%D0%AF%D0%A1%D0%9D%D0%9E%D0%91%D0%A0%D0%9E%D0%94%D0%9E%D0%92%D0%9A%D0%90&rm=sn-hvcpat-qhhs7e,sn-hgney7z&rrc=79,104&fexp=24350516,24350518,24350534,24350556&req_id=f295f1ef404a3ee&cmsv=e&redirect_counter=2&cms_redirect=yes&ipbypass=yes&mh=wr&mip=91.129.104.16&mm=29&mn=sn-5goeen7y&ms=rdu&mt=1722125586&mv=m&mvi=2&pl=19&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AGtxev0wRgIhANxb5Q4RH0TG3cDdImia11HR1zpxetxs78OgyHaIh_LFAiEAhLRXHT_nnN0oxE38_InX_GwMD4d0SSYu0tXCJfWkZTQ%3D"}
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
