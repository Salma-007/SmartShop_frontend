import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <main style={{ padding: '24px' }}>
                <Outlet />
            </main>
        </>
    );
};

export default MainLayout;
