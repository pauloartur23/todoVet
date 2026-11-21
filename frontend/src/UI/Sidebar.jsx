import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    CalendarDays,
    Users,
    PawPrint,
    FileText,
    Syringe,
    Package,
    ShoppingCart,
    CreditCard,
    UserCog,
} from 'lucide-react';
import './Sidebar.css';

const menu = [
    { texto: 'Início', caminho: '/dashboard', Icone: LayoutDashboard },
    { texto: 'Agendamentos', caminho: '/agendamentos', Icone: CalendarDays },
    { texto: 'Clientes', caminho: '/clientes', Icone: Users },
    { texto: 'Pets', caminho: '/pets', Icone: PawPrint },
    { texto: 'Prontuários', caminho: '/prontuarios', Icone: FileText },
    { texto: 'Vacinas', caminho: '/vacinas', Icone: Syringe },
    { texto: 'Produtos', caminho: '/produtos', Icone: Package },
    { texto: 'Vendas', caminho: '/vendas', Icone: ShoppingCart },
    { texto: 'Pagamentos', caminho: '/pagamentos', Icone: CreditCard },
    { texto: 'Funcionários', caminho: '/funcionarios', Icone: UserCog },
];

function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <PawPrint size={26} />
                <span className="sidebar-texto">todoVet</span>
            </div>

            <nav className="sidebar-menu">
                {menu.map(({ texto, caminho, Icone }) => (
                    <NavLink key={caminho} to={caminho} title={texto}>
                        <Icone size={20} />
                        <span className="sidebar-texto">{texto}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}

export default Sidebar;