"use client";

import { Button } from "@/components/ui/core";
import { cn } from "@/lib/utils";
import { Coffee, Phone, Users, BookOpen, CheckCircle, Clock } from "lucide-react";

interface StatusGridProps {
    currentStatus: string;
    onStatusSelect: (status: string) => void;
}

const STATUS_OPTIONS = [
    { id: "Available", icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/20" },
    { id: "On Call", icon: Phone, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
    { id: "Lunch Break", icon: Coffee, color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20" },
    { id: "Short Break", icon: Clock, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" },
    { id: "Meeting", icon: Users, color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20" },
    { id: "Training", icon: BookOpen, color: "text-pink-500", bg: "bg-pink-500/10", border: "border-pink-500/20" },
];

export function StatusGrid({ currentStatus, onStatusSelect }: StatusGridProps) {
    return (
        <div className="grid grid-cols-2 gap-3">
            {STATUS_OPTIONS.map((status) => {
                const isActive = currentStatus === status.id;
                const Icon = status.icon;

                return (
                    <button
                        key={status.id}
                        onClick={() => onStatusSelect(status.id)}
                        disabled={isActive}
                        className={cn(
                            "relative p-4 rounded-xl border transition-all duration-300 flex flex-col items-center gap-3 group",
                            isActive
                                ? cn("bg-card-bg ring-2 ring-primary ring-offset-2 ring-offset-background", status.border)
                                : "bg-secondary/5 border-card-border hover:bg-secondary/10 hover:border-primary/30",
                            isActive && "cursor-default"
                        )}
                    >
                        <div className={cn(
                            "p-3 rounded-full transition-colors",
                            isActive ? status.bg : "bg-secondary/10 group-hover:bg-background"
                        )}>
                            <Icon className={cn(
                                "w-6 h-6 transition-colors",
                                isActive ? status.color : "text-secondary group-hover:text-foreground"
                            )} />
                        </div>
                        <span className={cn(
                            "font-medium transition-colors",
                            isActive ? "text-foreground" : "text-secondary group-hover:text-foreground"
                        )}>
                            {status.id}
                        </span>

                        {isActive && (
                            <span className="absolute top-3 right-3 flex h-2.5 w-2.5">
                                <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", status.color.replace("text-", "bg-"))}></span>
                                <span className={cn("relative inline-flex rounded-full h-2.5 w-2.5", status.color.replace("text-", "bg-"))}></span>
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}
