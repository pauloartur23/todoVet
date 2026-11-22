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
import { PERFIS } from './perfis.js';

const TODOS = [PERFIS.ADMIN, PERFIS.RECEPCIONISTA];
const SO_ADMIN = [PERFIS.ADMIN];

export const MENU = [
    { texto: 'Início', caminho: '/dashboard', Icone: LayoutDashboard, perfis: TODOS },
    { texto: 'Agendamentos', caminho: '/agendamentos', Icone: CalendarDays, perfis: TODOS },
    { texto: 'Clientes', caminho: '/clientes', Icone: Users, perfis: TODOS },
    { texto: 'Pets', caminho: '/pets', Icone: PawPrint, perfis: TODOS },
    { texto: 'Prontuários', caminho: '/prontuarios', Icone: FileText, perfis: TODOS },
    { texto: 'Vacinas', caminho: '/vacinas', Icone: Syringe, perfis: TODOS },
    { texto: 'Produtos', caminho: '/produtos', Icone: Package, perfis: TODOS },
    { texto: 'Vendas', caminho: '/vendas', Icone: ShoppingCart, perfis: TODOS },
    { texto: 'Pagamentos', caminho: '/pagamentos', Icone: CreditCard, perfis: TODOS },
    { texto: 'Funcionários', caminho: '/funcionarios', Icone: UserCog, perfis: SO_ADMIN },
];

export function menuDoPerfil(perfil) {
    return MENU.filter((item) => item.perfis.includes(perfil));
}

export function podeAcessar(perfil, caminho) {
    const item = MENU.find(
        (m) => caminho === m.caminho || caminho.startsWith(m.caminho + '/')
    );

    return item ? item.perfis.includes(perfil) : false;
}