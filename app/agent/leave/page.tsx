"use client";

import { Sidebar, Navbar } from "@/components/ui/layout";
import { Card, Button } from "@/components/ui/core";
import { Calendar as CalendarIcon, CheckCircle2, XCircle, ArrowLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LeavePage() {
    const leaveRequests = [
        { id: "1", type: "Vacation", dates: "Jan 15 - Jan 20", status: "Approved", color: "text-primary" },
        { id: "2", type: "Sick Leave", dates: "Feb 02 - Feb 03", status: "Pending", color: "text-yellow-500" },
        { id: "3", type: "Personal", dates: "Mar 10", status: "Denied", color: "text-negative" },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground flex">
            <Sidebar role="agent" />

            <main className="flex-1 ml-64">
                <Navbar title="Self-Service Leave" />

                <div className="p-8 space-y-8 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Request Form */}
                        <div className="lg:col-span-1 space-y-8">
                            <Card className="space-y-6">
                                <h3 className="text-lg font-semibold">Request Leave</h3>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs text-secondary uppercase font-bold">Leave Type</label>
                                        <select className="w-full bg-secondary/10 border border-card-border rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-colors">
                                            <option>Vacation</option>
                                            <option>Sick Leave</option>
                                            <option>Personal Time Off</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs text-secondary uppercase font-bold">Start Date</label>
                                        <input type="date" className="w-full bg-secondary/10 border border-card-border rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-colors" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs text-secondary uppercase font-bold">End Date</label>
                                        <input type="date" className="w-full bg-secondary/10 border border-card-border rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-colors" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs text-secondary uppercase font-bold">Reason (Optional)</label>
                                        <textarea className="w-full bg-secondary/10 border border-card-border rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-colors h-24 resize-none" placeholder="Brief explanation..." />
                                    </div>
                                    <Button className="w-full py-4">Submit Request</Button>
                                </div>
                            </Card>

                            <Card className="space-y-4">
                                <h3 className="text-lg font-semibold">Shift Swap</h3>
                                <p className="text-sm text-secondary">Swap your upcoming shift with a peer. Subject to manager approval.</p>
                                <Button variant="outline" className="w-full gap-2">
                                    <ArrowLeftRight className="w-4 h-4" />
                                    Find a Swap
                                </Button>
                            </Card>
                        </div>

                        {/* Right Column: Calendar and History */}
                        <div className="lg:col-span-2 space-y-8">
                            <Card className="flex flex-col">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold">Leave Calendar</h3>
                                    <div className="flex gap-2">
                                        <Button variant="secondary" size="sm">Prev</Button>
                                        <Button variant="secondary" size="sm">Next</Button>
                                    </div>
                                </div>
                                <div className="flex-1 grid grid-cols-7 gap-2">
                                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
                                        <div key={d} className="text-center text-[10px] text-secondary font-bold uppercase py-2">{d}</div>
                                    ))}
                                    {Array.from({ length: 31 }, (_, i) => (
                                        <div
                                            key={i}
                                            className={cn(
                                                "aspect-square rounded-xl border border-card-border flex flex-col items-center justify-center relative group hover:bg-primary/5 transition-colors cursor-pointer",
                                                i + 1 === 15 && "bg-primary/10 border-primary/30"
                                            )}
                                        >
                                            <span className="text-sm font-medium">{i + 1}</span>
                                            {i + 1 === 15 && (
                                                <div className="absolute bottom-2 w-1.5 h-1.5 rounded-full bg-primary neon-glow" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            <Card className="space-y-6">
                                <h3 className="text-lg font-semibold">Request History</h3>
                                <div className="space-y-4">
                                    {leaveRequests.map((req) => (
                                        <div
                                            key={req.id}
                                            className="flex items-center justify-between p-4 rounded-xl bg-secondary/5 border border-card-border"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={cn("w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center", req.color)}>
                                                    <CalendarIcon className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-foreground">{req.type}</p>
                                                    <p className="text-xs text-secondary">{req.dates}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {req.status === "Approved" && <CheckCircle2 className="w-4 h-4 text-primary" />}
                                                {req.status === "Denied" && <XCircle className="w-4 h-4 text-negative" />}
                                                <span className={cn("text-xs font-bold uppercase tracking-wider", req.color)}>
                                                    {req.status}
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
