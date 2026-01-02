"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/core";
import { Clock, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusTimerProps {
    currentStatus: string;
    startTime: Date;
    durationMinutes?: number; // Optional duration limit in minutes
}

export function StatusTimer({ currentStatus, startTime, durationMinutes = 60 }: StatusTimerProps) {
    const [elapsed, setElapsed] = useState("00:00:00");
    const [isWarning, setIsWarning] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const diff = now.getTime() - startTime.getTime();

            // Calculate hours, minutes, seconds
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setElapsed(
                `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
            );

            // Check warning threshold (e.g., if within last 5 minutes of duration)
            if (durationMinutes) {
                const totalMinutes = diff / (1000 * 60);
                if (durationMinutes - totalMinutes <= 5 && durationMinutes - totalMinutes > 0) {
                    setIsWarning(true);
                } else {
                    setIsWarning(false);
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime, durationMinutes]);

    return (
        <Card className={cn(
            "p-4 border-l-4 transition-all duration-300 animate-in fade-in slide-in-from-top-2",
            isWarning ? "border-l-negative bg-negative/5" : "border-l-primary bg-primary/5"
        )}>
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                    <div className={cn(
                        "p-2 rounded-full animate-pulse mt-1",
                        isWarning ? "bg-negative/10 text-negative" : "bg-primary/10 text-primary"
                    )}>
                        {isWarning ? <AlertTriangle className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                    </div>
                    <div>
                        <p className="text-xs text-secondary uppercase font-bold tracking-wider">Current Status</p>
                        <h3 className="text-lg font-bold text-foreground">
                            {currentStatus}
                        </h3>
                        <span className="inline-block mt-1 text-xs font-medium text-secondary px-2 py-0.5 rounded-full bg-background border border-card-border">
                            Since {startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </span>
                    </div>
                </div>
                <div className="text-left xl:text-right pl-[44px] xl:pl-0">
                    <p className="text-xs text-secondary uppercase font-bold tracking-wider">Duration</p>
                    <p className={cn(
                        "text-2xl font-mono font-bold tabular-nums",
                        isWarning ? "text-negative" : "text-primary"
                    )}>
                        {elapsed}
                    </p>
                </div>
            </div>
            {isWarning && (
                <div className="mt-3 text-xs font-medium text-negative flex items-center gap-2 bg-negative/10 px-3 py-1.5 rounded-lg">
                    <AlertTriangle className="w-3 h-3" />
                    Warning: Status duration is about to exceed the limit ({durationMinutes}m).
                </div>
            )}
        </Card>
    );
}
