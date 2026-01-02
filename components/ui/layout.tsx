"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Clock,
    Calendar,
    BarChart3,
    Users,
    Map as MapIcon,
    AlertCircle,
    LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

const agentNavItems = [
    { name: "Dashboard", href: "/agent/dashboard", icon: LayoutDashboard },
    { name: "Time Logs", href: "/agent/logs", icon: Clock },
    { name: "Leave Requests", href: "/agent/leave", icon: Calendar },
    { name: "Performance", href: "/agent/performance", icon: BarChart3 },
];

const managerNavItems = [
    { name: "Dashboard", href: "/manager/dashboard", icon: LayoutDashboard },
    { name: "Floor Map", href: "/manager/floor", icon: MapIcon },
    { name: "Team Overview", href: "/manager/team", icon: Users },
    { name: "Absence Alerts", href: "/manager/alerts", icon: AlertCircle },
    { name: "Reports", href: "/manager/reports", icon: BarChart3 },
];

export function Sidebar({ role = "agent" }: { role?: "agent" | "manager" }) {
    const pathname = usePathname();
    const items = role === "agent" ? agentNavItems : managerNavItems;

    return (
        <aside className="w-64 h-screen glass border-r border-card-border flex flex-col fixed left-0 top-0 z-50">
            <div className="p-8">
                <h1 className="text-2xl font-bold neon-text text-primary tracking-tighter">
                    OMNISHIFT
                </h1>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                isActive
                                    ? "bg-primary/10 text-primary border border-primary/20"
                                    : "text-secondary hover:text-foreground hover:bg-secondary/10"
                            )}
                        >
                            <Icon className={cn(
                                "w-5 h-5 transition-transform duration-200 group-hover:scale-110",
                                isActive ? "text-primary" : "text-secondary"
                            )} />
                            <span className="font-medium">{item.name}</span>
                            {isActive && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary neon-glow" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 mt-auto border-t border-card-border">
                <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-secondary hover:text-negative hover:bg-negative/10 transition-all duration-200 group">
                    <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    <span className="font-medium">Sign Out</span>
                </button>
            </div>
        </aside>
    );
}

export function Navbar({ title }: { title: string }) {
    return (
        <header className="h-20 glass border-b border-card-border flex items-center justify-between px-8 sticky top-0 z-40 ml-64">
            <h2 className="text-xl font-semibold text-foreground">{title}</h2>

            <div className="flex items-center gap-6">
                <div className="flex flex-col items-end">
                    <span className="text-sm font-medium text-foreground">Alex Rivera</span>
                    <span className="text-xs text-secondary">Senior Agent</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold">
                    AR
                </div>
            </div>
        </header>
    );
}
