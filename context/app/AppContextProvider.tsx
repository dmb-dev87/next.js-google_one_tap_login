'use client'
import React, { ReactNode, useMemo, useState } from "react";
import AppContext from "./AppContext";

const AppContextProvider = ({ children }: any) => {
    const [switchState, setSwitchState] = useState([])
    const [switchOn, setSwitchOn] = useState(false)
    const [messagesLength, setMessagesLength] = useState(0)
    return (
        <AppContext.Provider value = {{switchState, setSwitchState, messagesLength, setMessagesLength, switchOn, setSwitchOn}}>
        {children}
      </AppContext.Provider>
    )
  }

  export default AppContextProvider