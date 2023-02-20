import { memo } from "react";
import {Navigate, useLocation} from"react-router-dom"
import {useSelector} from "react-redux"

const RequireAuth = memo (({children}) => {

    const user = useSelector(state => state.auth.user)
    const location = useLocation()

    if (!user) {
        return <Navigate to="/auth/login" replace={true} state={{
            return_url: location.pathname
        }}
        
         />
}


return children
})
export default  RequireAuth