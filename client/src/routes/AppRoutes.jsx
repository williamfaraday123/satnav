import { Route, Routes } from 'react-router-dom';
import Main from '../pages/Main/Main';
import PlannedRoutes from '../pages/PlannedRoutes/page';

const AppRoutes = () => {
    return(
        <Routes>
            <Route path = "/" Component = {Main} />
            <Route path = "/planned-routes" Component = {PlannedRoutes} />
        </Routes>
    );
};

export default AppRoutes;