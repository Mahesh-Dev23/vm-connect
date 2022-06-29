import React, {useState} from 'react'

import { FiVideo, FiVideoOff, FiMic, FiMicOff, FiLogOut } from "react-icons/fi";

const Controls = ({controlElem}) => {
    const [ control, setControl ] = useState({
        video : true,
        audio : true,
        leave : true
    })
    let controlObj = ''
    const controlEle = (e) => {
        controlObj = e
        controlElem(e)
        setControl({...control, [controlObj] : false})

        console.log("Controls ", control)
    }
  return (
    <div className='controls '>
        <div className='controlBtn' onClick={() => controlEle("video")}>
            { control.video == false ? <FiVideo /> : <FiVideoOff /> }
        </div>
        <div className='controlBtn' onClick={() => controlEle("audio")}>
            { control.audio == false ? <FiMic /> : <FiMicOff /> }
        </div>
        <div className='controlBtn' onClick={() => controlEle("leave")}>
            { control.leave == false ? <FiLogOut /> : <FiLogOut /> }    
        </div>
    </div>
  )
}

export default Controls