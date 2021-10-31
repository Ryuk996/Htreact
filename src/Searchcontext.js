import React, {  useState } from "react"

let Searchcontext= React.createContext();
export default  Searchcontext;
 export const SearchProvider=({children}) => {
     const [searchList,setSearchlist]=useState([])
    return <Searchcontext.Provider value={{searchList,setSearchlist}}>
        {children}
    </Searchcontext.Provider>
        
}