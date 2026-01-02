"use client";

import { Sidebar, Navbar } from "@/components/ui/layout";
import { Card, Button } from "@/components/ui/core";
import { mockFloorStatus } from "@/lib/mock-data";
import { Search, Mail, Phone, MoreVertical, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TeamPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex">
            <Sidebar role="manager" />

            <main className="flex-1 ml-64">
                <Navbar title="Team Overview" />

                <div className="p-8 space-y-8 max-w-7xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="relative w-96">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
                            <input
                                type="text"
                                placeholder="Search agents by name or ID..."
                                className="w-full bg-secondary/10 border border-card-border rounded-xl pl-12 pr-4 py-3 outline-none focus:border-primary/50 transition-colors"
                            />
                        </div>
                        <Button className="gap-2">
                            <UserPlus className="w-5 h-5" />
                            Add New Agent
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mockFloorStatus.map((agent) => (
                            <Card key={agent.id} className="p-0 overflow-hidden group">
                                <div className="p-6 space-y-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <div className="w-14 h-14 rounded-full bg-secondary/20 flex items-center justify-center text-xl font-bold text-secondary">
                                                    {agent.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div className={cn(
                                                    "absolute bottom-0 right-0 w-4 h-4 rounded-full border-4 border-background",
                                                    agent.color
                                                )} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-foreground">{agent.name}</h4>
                                                <p className="text-xs text-secondary uppercase tracking-wider">Senior Agent</p>
                                            </div>
                                        </div>
                                        <button className="p-2 hover:bg-secondary/10 rounded-lg transition-colors">
                                            <MoreVertical className="w-4 h-4 text-secondary" />
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-2">
                                        <div className="p-3 rounded-xl bg-secondary/5 border border-card-border">
                                            <p className="text-[10px] text-secondary uppercase font-bold">Adherence</p>
                                            <p className="text-lg font-bold text-primary">94%</p>
                                        </div>
                                        <div className="p-3 rounded-xl bg-secondary/5 border border-card-border">
                                            <p className="text-[10px] text-secondary uppercase font-bold">AHT</p>
                                            <p className="text-lg font-bold text-foreground">4m 12s</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-6 py-4 bg-secondary/5 border-t border-card-border flex items-center justify-between">
                                    <div className="flex gap-2">
                                        <button className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors text-secondary">
                                            <Mail className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors text-secondary">
                                            <Phone className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-xs">View Profile</Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
