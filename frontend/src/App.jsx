import AuthProvider from './contexts/AuthProvider.jsx';
import Rotas from './pages/routes/routes.jsx';

function App() {
    return (
        <AuthProvider>
            <Rotas />
        </AuthProvider>
    );
}

export default App;