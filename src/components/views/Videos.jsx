import React from 'react'

const Videos = () => {
    
 const users = useUsers()[0]
  return (
    <div id='videos'>
     {users.length && users.map((user) => <Video key={user.uid} user={user} />)}
   </div>
  )
}

export default Videos