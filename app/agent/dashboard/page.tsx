"use client";

import { Sidebar, Navbar } from "@/components/ui/layout";
import { Card } from "@/components/ui/core";
import { AdherenceMeter, PunchingPanel } from "@/components/agent/dashboard";
import { mockAgent, mockTimeLogs, mockPerformanceData } from "@/lib/mock-data";
import { TrendingUp, AlertCircle, Clock, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AgentDashboard() {
    return (
        <div className="min-h-screen bg-background text-foreground flex">
            <Sidebar role="agent" />

            <main className="flex-1 ml-64">
                <Navbar title="Agent Hub" />

                <div className="p-8 space-y-8 max-w-7xl mx-auto">
                    {/* Top Stats Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard
                            label="Adherence"
                            value={`${mockAgent.adherenceScore}%`}
                            trend="+2.4%"
                            icon={TrendingUp}
                            color="text-primary"
                        />
                        <StatCard
                            label="Total Hours"
                            value={`${mockAgent.totalHours}h`}
                            trend="On Track"
                            icon={Clock}
                            color="text-blue-500"
                        />
                        <StatCard
                            label="PTO Balance"
                            value={`${mockAgent.ptoBalance}d`}
                            trend="Available"
                            icon={Calendar}
                            color="text-purple-500"
                        />
                        <StatCard
                            label="Late Arrivals"
                            value={mockAgent.lateArrivals.toString()}
                            trend="Warning"
                            icon={AlertCircle}
                            color="text-negative"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Punching and Adherence */}
                        <div className="lg:col-span-1 space-y-8">
                            <PunchingPanel />
                            <AdherenceMeter score={mockAgent.adherenceScore} />
                        </div>

                        {/* Right Column: Performance and Logs */}
                        <div className="lg:col-span-2 space-y-8">
                            <Card className="h-[400px] flex flex-col">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold">Performance Snapshot</h3>
                                    <select className="bg-secondary/10 border border-card-border rounded-lg px-3 py-1 text-sm outline-none">
                                        <option>Last 7 Days</option>
                                        <option>Last 30 Days</option>
                                    </select>
                                </div>
                                <div className="flex-1 flex items-end justify-between gap-4 px-4 pb-4">
                                    {mockPerformanceData.map((data) => (
                                        <div key={data.day} className="flex-1 flex flex-col items-center gap-2 group">
                                            <div
                                                className="w-full bg-primary/20 rounded-t-lg relative transition-all duration-500 hover:bg-primary/40"
                                                style={{ height: `${data.adherence}%` }}
                                            >
                                                <div
                                                    className="absolute top-0 left-0 w-full h-1 bg-primary neon-glow rounded-full"
                                                />
                                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {data.adherence}%
                                                </span>
                                            </div>
                                            <span className="text-xs text-secondary font-medium">{data.day}</span>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            <Card>
                                <h3 className="text-lg font-semibold mb-6">Recent Time Logs</h3>
                                <div className="space-y-4">
                                    {mockTimeLogs.map((log) => (
                                        <div
                                            key={log.id}
                                            className="flex items-center justify-between p-4 rounded-xl bg-secondary/5 border border-card-border hover:bg-secondary/10 transition-colors"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                    <Clock className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-foreground">{log.type}</p>
                                                    <p className="text-xs text-secondary">{log.time}</p>
                                                </div>
                                            </div>
                                            <span className={cn(
                                                "px-3 py-1 rounded-full text-xs font-medium",
                                                log.status === "On Time" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
                                            )}>
                                                {log.status}
                                            </span>
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

function StatCard({ label, value, trend, icon: Icon, color }: { label: string; value: string; trend: string; icon: React.ElementType; color: string }) {
    return (
        <Card className="p-5 flex items-center gap-4 group">
            <div className={cn("p-3 rounded-xl bg-secondary/10 transition-colors group-hover:bg-secondary/20", color)}>
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <p className="text-xs text-secondary uppercase tracking-wider font-medium">{label}</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-foreground tabular-nums">{value}</span>
                    <span className={cn("text-[10px] font-bold", color === "text-negative" ? "text-negative" : "text-primary")}>
                        {trend}
                    </span>
                </div>
            </div>
        </Card>
    );
}
