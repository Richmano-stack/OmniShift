"use client";

import { Card, Button } from "@/components/ui/core";
import { mockFloorStatus } from "@/lib/mock-data";
import { AlertCircle, Map as MapIcon, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

export function FloorMap() {
    return (
        <Card className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <MapIcon className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">Real-Time Floor Map</h3>
                </div>
                <div className="flex gap-2">
                    <Button variant="secondary" size="sm">Filter</Button>
                    <Button variant="secondary" size="sm">Zoom</Button>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {mockFloorStatus.map((agent) => (
                    <div
                        key={agent.id}
                        className="p-4 rounded-xl glass border border-card-border flex flex-col items-center gap-2 group hover:border-primary/30 transition-all"
                    >
                        <div className="relative">
                            <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold">
                                {agent.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className={cn(
                                "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background",
                                agent.color
                            )} />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-medium text-foreground truncate w-24">{agent.name}</p>
                            <p className="text-[10px] text-secondary uppercase tracking-wider">{agent.status}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}

export function AbsenceAlerts() {
    const alerts = [
        { id: "1", agent: "Jordan Smith", time: "15m late", type: "Clock In" },
        { id: "2", agent: "Sarah Chen", time: "5m over", type: "Break" },
    ];

    return (
        <Card className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-negative" />
                    <h3 className="text-lg font-semibold">Absence Alerts</h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-negative/10 text-negative text-[10px] font-bold uppercase">
                    {alerts.length} Active
                </span>
            </div>

            <div className="space-y-3">
                {alerts.map((alert) => (
                    <div
                        key={alert.id}
                        className="p-4 rounded-xl bg-negative/5 border border-negative/10 flex items-center justify-between group hover:bg-negative/10 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-negative/20 flex items-center justify-center text-negative">
                                <AlertCircle className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-foreground">{alert.agent}</p>
                                <p className="text-xs text-secondary">{alert.type} Alert</p>
                            </div>
                        </div>
                        <span className="text-xs font-bold text-negative">{alert.time}</span>
                    </div>
                ))}
            </div>

            <Button variant="outline" className="w-full text-xs py-2">View All Alerts</Button>
        </Card>
    );
}
