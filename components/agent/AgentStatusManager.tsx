"use client";

import { useState } from "react";
import { StatusTimer } from "./StatusTimer";
import { StatusGrid } from "./StatusGrid";
import { StatusConfirmationModal } from "./StatusConfirmationModal";
import { Card } from "@/components/ui/core";

export function AgentStatusManager() {
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
        <div className="space-y-8">
            {/* Live Timer Display */}
            <StatusTimer
                currentStatus={currentStatus}
                startTime={startTime}
                durationMinutes={
                    currentStatus === "Lunch Break" ? 60 :
                        currentStatus === "Short Break" ? 15 :
                            undefined
                }
            />

            {/* Status Selection Grid */}
            <Card>
                <h3 className="text-lg font-semibold mb-4">Change Status</h3>
                <StatusGrid
                    currentStatus={currentStatus}
                    onStatusSelect={handleStatusSelect}
                />
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
    );
}
