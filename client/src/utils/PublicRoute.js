
import { getToken } from './Common'
import Redirect from './Redirect';


const PublicRoute = ({children}) => {

    return !getToken()?children:<Redirect path="/Dashboard" /> 
}

export default PublicRoute
