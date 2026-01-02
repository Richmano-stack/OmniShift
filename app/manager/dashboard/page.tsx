"use client";

import { Sidebar, Navbar } from "@/components/ui/layout";
import { Card, Button } from "@/components/ui/core";
import { FloorMap, AbsenceAlerts } from "@/components/manager/dashboard";
import { Users, TrendingUp, Clock, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ManagerDashboard() {
    return (
        <div className="min-h-screen bg-background text-foreground flex">
            <Sidebar role="manager" />

            <main className="flex-1 ml-64">
                <Navbar title="Command Center" />

                <div className="p-8 space-y-8 max-w-7xl mx-auto">
                    {/* Top Stats Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard
                            label="Active Agents"
                            value="42/48"
                            trend="88% Capacity"
                            icon={Users}
                            color="text-primary"
                        />
                        <StatCard
                            label="Service Level"
                            value="92%"
                            trend="+1.2% (SLA)"
                            icon={ShieldCheck}
                            color="text-blue-500"
                        />
                        <StatCard
                            label="Avg Handle Time"
                            value="4m 12s"
                            trend="-15s"
                            icon={Clock}
                            color="text-purple-500"
                        />
                        <StatCard
                            label="Overtime Risk"
                            value="Low"
                            trend="2 Agents"
                            icon={TrendingUp}
                            color="text-green-500"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Floor Map */}
                        <div className="lg:col-span-2 space-y-8">
                            <FloorMap />
                            <CoverageHeatmap />
                        </div>

                        {/* Right Column: Alerts and Trends */}
                        <div className="lg:col-span-1 space-y-8">
                            <AbsenceAlerts />
                            <Card className="space-y-6">
                                <h3 className="text-lg font-semibold">Compliance Snapshot</h3>
                                <div className="space-y-4">
                                    <ComplianceItem label="Break Adherence" value={94} color="bg-primary" />
                                    <ComplianceItem label="Schedule Adherence" value={88} color="bg-blue-500" />
                                    <ComplianceItem label="Punctuality" value={91} color="bg-purple-500" />
                                </div>
                                <Button variant="secondary" className="w-full">Export Payroll Report</Button>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function CoverageHeatmap() {
    const hours = Array.from({ length: 12 }, (_, i) => `${i + 8} AM`);
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

    return (
        <Card className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Vacation & Coverage Planning</h3>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-primary/10" />
                        <span className="text-[10px] text-secondary uppercase">Low</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-primary" />
                        <span className="text-[10px] text-secondary uppercase">High</span>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <div className="min-w-[600px] space-y-2">
                    <div className="flex">
                        <div className="w-12" />
                        {hours.map(h => (
                            <div key={h} className="flex-1 text-[10px] text-secondary text-center">{h}</div>
                        ))}
                    </div>
                    {days.map(day => (
                        <div key={day} className="flex items-center">
                            <div className="w-12 text-xs font-medium text-secondary">{day}</div>
                            {hours.map((_, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "flex-1 h-8 m-0.5 rounded-sm transition-all hover:scale-110 cursor-pointer",
                                        (i + days.indexOf(day)) % 3 === 0 ? "bg-primary/60" : "bg-primary/20"
                                    )}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
}

function ComplianceItem({ label, value, color }: { label: string; value: number; color: string }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between text-xs">
                <span className="text-secondary font-medium">{label}</span>
                <span className="text-foreground font-bold">{value}%</span>
            </div>
            <div className="h-1.5 w-full bg-secondary/10 rounded-full overflow-hidden">
                <div
                    className={cn("h-full rounded-full transition-all duration-1000", color)}
                    style={{ width: `${value}%` }}
                />
            </div>
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
                    <span className="text-[10px] font-bold text-primary">{trend}</span>
                </div>
            </div>
        </Card>
    );
}
