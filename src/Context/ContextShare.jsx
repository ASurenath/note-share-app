import React, { createContext, useState } from 'react'
export const noteUpdateContext=createContext()
export const userUpdateContext=createContext()
export const loginStatusContext=createContext()

function ContextShare({children}) {
  const [noteUpdate,setNoteUpdate]=useState(false)
  const [userUpdate,setUserUpdate]=useState(false)
  const [loginStatus,setLoginStatus]=useState(false)

  return (
    <loginStatusContext.Provider value={{loginStatus,setLoginStatus}}>
      <noteUpdateContext.Provider value={{noteUpdate,setNoteUpdate}}>
        <userUpdateContext.Provider value={{userUpdate,setUserUpdate}}>
          <>{children}</>
          </userUpdateContext.Provider>
      </noteUpdateContext.Provider>
    </loginStatusContext.Provider>
  )
}

export default ContextShare