import React, {FC} from 'react';
import {Routes, Route} from 'react-router-dom'
import {publicRoutes} from "../../Router/Router";

const Router: FC = () => {
    return (
        <Routes>
            {publicRoutes.map(route => <Route path={route.path} element={route.element} key={route.path}/>)}
        </Routes>
    );
};

export default Router;