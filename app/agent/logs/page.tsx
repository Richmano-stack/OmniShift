"use client";

import { Sidebar, Navbar } from "@/components/ui/layout";
import { Card, Button } from "@/components/ui/core";
import { mockTimeLogs } from "@/lib/mock-data";
import { AgentStatusManager } from "@/components/agent/AgentStatusManager";
import { Clock, Filter, Download, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TimeLogsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex">
            <Sidebar role="agent" />

            <main className="flex-1 ml-64">
                <Navbar title="Time Logs" />

                <div className="p-8 space-y-8 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Left Column: Filters & Stats */}
                        <div className="lg:col-span-1 space-y-8">
                            <Card className="space-y-6">
                                <h3 className="text-lg font-semibold">Filter Logs</h3>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs text-secondary uppercase font-bold">Date Range</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <input type="date" className="bg-secondary/10 border border-card-border rounded-xl px-3 py-2 text-xs outline-none focus:border-primary/50 transition-colors" />
                                            <input type="date" className="bg-secondary/10 border border-card-border rounded-xl px-3 py-2 text-xs outline-none focus:border-primary/50 transition-colors" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs text-secondary uppercase font-bold">Type</label>
                                        <select className="w-full bg-secondary/10 border border-card-border rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-colors">
                                            <option>All Types</option>
                                            <option>Clock In/Out</option>
                                            <option>Break</option>
                                            <option>Lunch</option>
                                            <option>Training</option>
                                        </select>
                                    </div>
                                    <Button className="w-full gap-2">
                                        <Filter className="w-4 h-4" />
                                        Apply Filters
                                    </Button>
                                </div>
                            </Card>

                            {/* Agent Status Manager */}
                            <AgentStatusManager />

                            <Card className="space-y-4">
                                <h3 className="text-lg font-semibold">Weekly Summary</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-secondary">Total Hours</span>
                                        <span className="font-bold tabular-nums">38.5h</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-secondary">Overtime</span>
                                        <span className="font-bold tabular-nums text-primary">1.2h</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-secondary">Adherence</span>
                                        <span className="font-bold tabular-nums text-primary">94%</span>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Right Column: Logs List */}
                        <div className="lg:col-span-3 space-y-6">
                            <Card>
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold">Recent Activity</h3>
                                    <span className="text-xs text-secondary">Showing last 7 days</span>
                                </div>

                                <div className="space-y-4">
                                    {mockTimeLogs.map((log) => (
                                        <div
                                            key={log.id}
                                            className="flex items-center justify-between p-4 rounded-xl bg-secondary/5 border border-card-border hover:bg-secondary/10 transition-colors group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={cn(
                                                    "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                                                    log.type === "Clock In" ? "bg-primary/10 text-primary" :
                                                        log.type === "Clock Out" ? "bg-secondary/20 text-secondary" : "bg-blue-500/10 text-blue-500"
                                                )}>
                                                    <Clock className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-foreground">{log.type}</p>
                                                    <div className="flex items-center gap-2 text-xs text-secondary">
                                                        <CalendarIcon className="w-3 h-3" />
                                                        <span>Today</span>
                                                        <span>•</span>
                                                        <span>{log.time}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-6">
                                                <div className="text-right">
                                                    <p className="text-xs text-secondary uppercase font-bold">Duration</p>
                                                    <p className="font-medium tabular-nums">
                                                        {log.type === "Clock In" ? "-" : "4h 12m"}
                                                    </p>
                                                </div>
                                                <span className={cn(
                                                    "px-3 py-1 rounded-full text-xs font-medium w-24 text-center",
                                                    log.status === "On Time" ? "bg-primary/10 text-primary" :
                                                        log.status === "Late" ? "bg-negative/10 text-negative" : "bg-secondary/10 text-secondary"
                                                )}>
                                                    {log.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Duplicate logs to fill the page for demo */}
                                    {[...mockTimeLogs, ...mockTimeLogs].map((log, i) => (
                                        <div
                                            key={`${log.id}-dup-${i}`}
                                            className="flex items-center justify-between p-4 rounded-xl bg-secondary/5 border border-card-border hover:bg-secondary/10 transition-colors group opacity-60"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={cn(
                                                    "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                                                    log.type === "Clock In" ? "bg-primary/10 text-primary" :
                                                        log.type === "Clock Out" ? "bg-secondary/20 text-secondary" : "bg-blue-500/10 text-blue-500"
                                                )}>
                                                    <Clock className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-foreground">{log.type}</p>
                                                    <div className="flex items-center gap-2 text-xs text-secondary">
                                                        <CalendarIcon className="w-3 h-3" />
                                                        <span>Yesterday</span>
                                                        <span>•</span>
                                                        <span>{log.time}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-6">
                                                <div className="text-right">
                                                    <p className="text-xs text-secondary uppercase font-bold">Duration</p>
                                                    <p className="font-medium tabular-nums">
                                                        {log.type === "Clock In" ? "-" : "4h 12m"}
                                                    </p>
                                                </div>
                                                <span className={cn(
                                                    "px-3 py-1 rounded-full text-xs font-medium w-24 text-center",
                                                    log.status === "On Time" ? "bg-primary/10 text-primary" :
                                                        log.status === "Late" ? "bg-negative/10 text-negative" : "bg-secondary/10 text-secondary"
                                                )}>
                                                    {log.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
