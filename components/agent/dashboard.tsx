"use client";

import { useState, useEffect } from "react";
import { Clock, Coffee, Utensils, GraduationCap, Square } from "lucide-react";
import { Card, Button } from "@/components/ui/core";
import { cn } from "@/lib/utils";

export function AdherenceMeter({ score }: { score: number }) {
    const [displayScore, setDisplayScore] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setDisplayScore(score), 500);
        return () => clearTimeout(timer);
    }, [score]);

    const getColor = (s: number) => {
        if (s >= 90) return "text-primary";
        if (s >= 80) return "text-yellow-500";
        return "text-negative";
    };

    return (
        <Card className="flex flex-col items-center justify-center text-center space-y-4">
            <h3 className="text-secondary font-medium uppercase tracking-wider text-xs">Adherence Meter</h3>
            <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                    <circle
                        cx="80"
                        cy="80"
                        r="70"
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-secondary/10"
                    />
                    <circle
                        cx="80"
                        cy="80"
                        r="70"
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeDasharray={440}
                        strokeDashoffset={440 - (440 * displayScore) / 100}
                        strokeLinecap="round"
                        className={cn("transition-all duration-1000 ease-out", getColor(displayScore))}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={cn("text-4xl font-bold tabular-nums", getColor(displayScore))}>
                        {displayScore}%
                    </span>
                    <span className="text-xs text-secondary mt-1">Real-time</span>
                </div>
            </div>
            <p className="text-sm text-secondary">
                You are <span className="text-foreground font-medium">Following Schedule</span>
            </p>
        </Card>
    );
}

export function PunchingPanel() {
    const [activeStatus, setActiveStatus] = useState<string | null>("Clocked In");

    const punchTypes = [
        { name: "Clock In", icon: Clock, color: "primary" },
        { name: "Lunch", icon: Utensils, color: "orange" },
        { name: "Short Break", icon: Coffee, color: "yellow" },
        { name: "Training", icon: GraduationCap, color: "blue" },
    ];

    return (
        <Card className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Precision Punching</h3>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs font-medium text-primary uppercase tracking-wider">Live</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {punchTypes.map((type) => {
                    const Icon = type.icon;
                    const isActive = activeStatus === type.name;
                    return (
                        <Button
                            key={type.name}
                            variant={isActive ? "primary" : "secondary"}
                            className={cn(
                                "h-24 flex flex-col gap-2 rounded-2xl transition-all duration-300",
                                isActive && "scale-[1.02] ring-2 ring-primary/50"
                            )}
                            onClick={() => setActiveStatus(isActive ? null : type.name)}
                        >
                            <Icon className={cn("w-6 h-6", isActive ? "text-background" : "text-primary")} />
                            <span className="text-sm font-semibold">{type.name}</span>
                        </Button>
                    );
                })}
            </div>

            <div className="pt-4 border-t border-card-border flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-xs text-secondary uppercase tracking-wider">Current Session</span>
                    <span className="text-xl font-bold text-foreground tabular-nums">02:45:12</span>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                    <Square className="w-4 h-4" />
                    End Shift
                </Button>
            </div>
        </Card>
    );
}
