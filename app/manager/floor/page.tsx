"use client";

import { Sidebar, Navbar } from "@/components/ui/layout";
import { FloorMap } from "@/components/manager/dashboard";

export default function FloorMapPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex">
            <Sidebar role="manager" />

            <main className="flex-1 ml-64">
                <Navbar title="Real-Time Floor Map" />

                <div className="p-8 max-w-7xl mx-auto">
                    <FloorMap />
                </div>
            </main>
        </div>
    );
}
