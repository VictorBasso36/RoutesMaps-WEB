import { Icons } from '@/components/icons';
import { NavItem, SidebarNavItem } from '@/types';

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};

export const navItems: NavItem[] = [
  {
    title: 'Mapas',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Mapas'
  },
  {
    title: 'Sair',
    href: '/',
    icon: 'login',
    label: 'Sair'
  }
];
