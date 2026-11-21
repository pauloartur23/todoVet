import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import TopBar from './TopBar.jsx';
import './Layout.css';

function Layout() {
    return (
        <div className="layout">
            <Sidebar />
            <div className="layout-direita">
                <TopBar />
                <main className="layout-conteudo">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default Layout;