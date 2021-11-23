
import { getToken } from './Common'
import React from 'react';
import Redirect from './Redirect';

const PrivateRoute = ({children}) => {
   
    return getToken()?children:<Redirect path="/auth" />
}


export default PrivateRoute

