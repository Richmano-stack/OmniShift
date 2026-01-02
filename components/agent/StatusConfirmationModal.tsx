"use client";

import { Button, Card } from "@/components/ui/core";
import { AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusConfirmationModalProps {
    isOpen: boolean;
    currentStatus: string;
    targetStatus: string | null;
    onConfirm: () => void;
    onCancel: () => void;
}

export function StatusConfirmationModal({
    isOpen,
    currentStatus,
    targetStatus,
    onConfirm,
    onCancel
}: StatusConfirmationModalProps) {
    if (!isOpen || !targetStatus) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <Card className="w-full max-w-md p-0 border-0 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="bg-card-bg border border-card-border">
                    {/* Header */}
                    <div className="p-6 border-b border-card-border flex items-start justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-full bg-primary/10 text-primary">
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-foreground">Confirm Status Change</h3>
                                <p className="text-sm text-secondary">Are you sure you want to switch status?</p>
                            </div>
                        </div>
                        <button
                            onClick={onCancel}
                            className="text-secondary hover:text-foreground transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex-1 p-4 rounded-xl bg-secondary/5 border border-card-border text-center">
                                <p className="text-xs text-secondary uppercase font-bold mb-1">Current</p>
                                <p className="font-bold text-foreground">{currentStatus}</p>
                            </div>
                            <div className="text-secondary">→</div>
                            <div className="flex-1 p-4 rounded-xl bg-primary/5 border border-primary/20 text-center">
                                <p className="text-xs text-secondary uppercase font-bold mb-1">New Status</p>
                                <p className="font-bold text-primary">{targetStatus}</p>
                            </div>
                        </div>

                        <p className="text-sm text-secondary text-center">
                            This will end your current session and start a new timer for <span className="text-foreground font-medium">{targetStatus}</span>.
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="p-6 bg-secondary/5 border-t border-card-border flex gap-3 justify-end">
                        <Button variant="ghost" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button onClick={onConfirm}>
                            Confirm Change
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
