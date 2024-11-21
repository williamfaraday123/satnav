import { Route, Routes } from 'react-router-dom';
import Main from '../pages/Main/Main';

const AppRoutes = () => {
    return(
        <Routes>
            <Route path = "/" Component = {Main} />
        </Routes>
    );
};

export default AppRoutes;