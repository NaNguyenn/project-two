import axios from "axios"
import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    //INITIALIZE currentUser STATE
    //user OBJECT STORED IN LOCAL STORAGE, OR null IF NONE
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user") || null))

    //SEND POST REQUEST TO SERVER WITH inputs VALUE
    //UPDATE currentUser WITH RESPONSE DATA
    const login = async (inputs) => {
        const res = await axios.post("/auth/login", inputs)
        setCurrentUser(res.data)
    }

    //SEND POST REQUEST TO SERVER
    //SET currentUser TO null
    const logout = async (inputs) => {
        await axios.post("/auth/logout")
        setCurrentUser(null)
    }

    //EVERYTIME currentUser CHANGES, CHANGE user
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])

    return (
        //PROVIDE currentUser, login, logout TO THE CONTEXT
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}