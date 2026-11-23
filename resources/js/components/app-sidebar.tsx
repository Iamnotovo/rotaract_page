import { Link } from '@inertiajs/react';
import {
    Calendar,
    FolderGit2,
    LayoutGrid,
    Link2,
    Mail,
    Newspaper,
    Users,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    { title: 'Resumen', href: '/admin', icon: LayoutGrid },
    { title: 'Proyectos', href: '/admin/proyectos', icon: FolderGit2 },
    { title: 'Noticias', href: '/admin/noticias', icon: Newspaper },
    { title: 'Actividades', href: '/admin/eventos', icon: Calendar },
    { title: 'Miembros', href: '/admin/miembros', icon: Users },
    { title: 'Enlaces', href: '/admin/enlaces', icon: Link2 },
    { title: 'Mensajes', href: '/admin/mensajes', icon: Mail },
];

const footerNavItems: NavItem[] = [
    { title: 'Ver la web', href: '/', icon: LayoutGrid },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/admin" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
