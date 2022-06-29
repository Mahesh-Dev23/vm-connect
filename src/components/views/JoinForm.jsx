import React, { useState, useEffect } from 'react'

function JoinForm({joinedUser}) {
    const [ user, setUser ] = useState({
        name: '',
        roomId: '',
    })

    // useEffect(()=>{
    //     console.log(user)
    // },[user])

    const sendUserDetails = (e) =>{
        e.preventDefault()
        joinedUser(user)
    }
    
  return (
    
        
        <form onSubmit={sendUserDetails}>
            <input 
                type="text" 
                placeholder='Your registered name'
                onChange={(e) => setUser({...user, name: e.target.value})}
            />
            <input 
                type="text" 
                placeholder='Romm Id received in your email'
                onChange={(e) => setUser({...user, roomId: e.target.value})}
            />
            <button type='submit' className='btn'>Join</button>
        </form>
    
  )
}

export default JoinForm