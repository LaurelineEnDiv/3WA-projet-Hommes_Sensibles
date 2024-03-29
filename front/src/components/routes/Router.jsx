import { Route, Routes } from "react-router-dom";
import routes from '../../tools/routes.js'
import PrivateRoute from "./PrivateRoute"

const Router = () => {
    return (

        <Routes>
            {routes.map(({ path, auth, component },i) => {
                return(
                
                    <Route 
                        key={i} 
                        path={path} 
                        element={
                            <PrivateRoute auth={auth}> 
                                {component}
                            </PrivateRoute>
                        } 
                    />
                
                )
            })}
        </Routes>

    )
}

export default Router