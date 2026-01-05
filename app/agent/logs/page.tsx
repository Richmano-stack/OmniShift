"use client";

import { Sidebar, Navbar } from "@/components/ui/layout";
import { Card } from "@/components/ui/core";
import { mockTimeLogs } from "@/lib/mock-data";
import { StatusTimer } from "@/components/agent/StatusTimer";
import { StatusGrid } from "@/components/agent/StatusGrid";
import { StatusConfirmationModal } from "@/components/agent/StatusConfirmationModal";
import { Clock, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebarToggle } from "@/lib/hooks/useSidebarToggle";
import { useState } from "react";

export default function AgentLogsPage() {
    const { isOpen } = useSidebarToggle();
    const [currentStatus, setCurrentStatus] = useState("Available");
    const [startTime, setStartTime] = useState(new Date());
    const [pendingStatus, setPendingStatus] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleStatusSelect = (status: string) => {
        if (status === currentStatus) return;
        setPendingStatus(status);
        setIsModalOpen(true);
    };

    const confirmStatusChange = () => {
        if (pendingStatus) {
            const now = new Date();
            const duration = now.getTime() - startTime.getTime();

            // Log the completed session
            console.log("Status Session Completed:", {
                status: currentStatus,
                startTime: startTime.toISOString(),
                endTime: now.toISOString(),
                durationMs: duration
            });

            // Update state
            setCurrentStatus(pendingStatus);
            setStartTime(now);
            setPendingStatus(null);
            setIsModalOpen(false);
        }
    };

    const cancelStatusChange = () => {
        setPendingStatus(null);
        setIsModalOpen(false);
    };

    return (
        <>
            <Sidebar role="agent" />
            <Navbar title="Agent Logs" />

            <main className={cn(
                "pt-20 transition-all duration-300 ease-in-out",
                isOpen ? "ml-64" : "ml-0"
            )}>
                <div className="p-8 space-y-6 max-w-5xl mx-auto">
                    {/* Top Row: Actual Status & Timer */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Actual Status */}
                        <Card>
                            <h3 className="text-sm font-semibold text-secondary uppercase mb-4">Actual Status</h3>
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
                                <p className="text-2xl font-bold">{currentStatus}</p>
                            </div>
                        </Card>

                        {/* Timer */}
                        <StatusTimer
                            currentStatus={currentStatus}
                            startTime={startTime}
                            durationMinutes={
                                currentStatus === "Lunch Break" ? 60 :
                                    currentStatus === "Short Break" ? 15 :
                                        undefined
                            }
                        />
                    </div>

                    {/* Status Manager */}
                    <Card>
                        <h3 className="text-lg font-semibold mb-6">Status Manager</h3>
                        <StatusGrid
                            currentStatus={currentStatus}
                            onStatusSelect={handleStatusSelect}
                        />
                    </Card>

                    {/* Recent Activity */}
                    <Card>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold">Recent Activity</h3>
                            <span className="text-xs text-secondary">Last 7 days</span>
                        </div>

                        <div className="space-y-3">
                            {mockTimeLogs.slice(0, 3).map((log) => (
                                <div
                                    key={log.id}
                                    className="flex items-center justify-between p-4 rounded-xl bg-secondary/5 border border-card-border hover:bg-secondary/10 transition-colors"
                                >
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center transition-colors flex-shrink-0",
                                            log.type === "Clock In" ? "bg-primary/10 text-primary" :
                                                log.type === "Clock Out" ? "bg-secondary/20 text-secondary" : "bg-blue-500/10 text-blue-500"
                                        )}>
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-medium text-foreground text-sm">{log.type}</p>
                                            <div className="flex items-center gap-2 text-xs text-secondary">
                                                <CalendarIcon className="w-3 h-3 flex-shrink-0" />
                                                <span>Today</span>
                                                <span>•</span>
                                                <span>{log.time}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 flex-shrink-0 ml-4">
                                        <div className="text-right">
                                            <p className="text-xs text-secondary uppercase font-bold">Duration</p>
                                            <p className="font-medium tabular-nums text-sm">
                                                {log.type === "Clock In" ? "-" : "4h 12m"}
                                            </p>
                                        </div>
                                        <span className={cn(
                                            "px-3 py-1 rounded-full text-xs font-medium w-20 text-center flex-shrink-0",
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

                    {/* Confirmation Modal */}
                    <StatusConfirmationModal
                        isOpen={isModalOpen}
                        currentStatus={currentStatus}
                        targetStatus={pendingStatus}
                        onConfirm={confirmStatusChange}
                        onCancel={cancelStatusChange}
                    />
                </div>
            </main>
        </>
    );
}
