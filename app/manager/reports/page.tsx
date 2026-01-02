"use client";

import { Sidebar, Navbar } from "@/components/ui/layout";
import { Card, Button } from "@/components/ui/core";
import {
    FileText,
    Download,
    Filter,
    ChevronRight,
    FileSpreadsheet,
    File as FilePdf
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ReportsPage() {
    const reports = [
        { id: "1", name: "Weekly Attendance Summary", type: "Attendance", lastGenerated: "2 hours ago", size: "1.2 MB" },
        { id: "2", name: "Monthly Payroll Export", type: "Payroll", lastGenerated: "Yesterday", size: "4.5 MB" },
        { id: "3", name: "Team Adherence Report", type: "Performance", lastGenerated: "3 days ago", size: "850 KB" },
        { id: "4", name: "Overtime Prediction Analysis", type: "Compliance", lastGenerated: "1 week ago", size: "2.1 MB" },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground flex">
            <Sidebar role="manager" />

            <main className="flex-1 ml-64">
                <Navbar title="Reports & Exports" />

                <div className="p-8 space-y-8 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Generator */}
                        <div className="lg:col-span-1 space-y-8">
                            <Card className="space-y-6">
                                <h3 className="text-lg font-semibold">Generate New Report</h3>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs text-secondary uppercase font-bold">Report Type</label>
                                        <select className="w-full bg-secondary/10 border border-card-border rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-colors">
                                            <option>Attendance Summary</option>
                                            <option>Payroll Export (Timesheet-Ready)</option>
                                            <option>Schedule Adherence</option>
                                            <option>Overtime Analysis</option>
                                            <option>Shift Swap History</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs text-secondary uppercase font-bold">Date Range</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <input type="date" className="bg-secondary/10 border border-card-border rounded-xl px-3 py-2 text-xs outline-none focus:border-primary/50 transition-colors" />
                                            <input type="date" className="bg-secondary/10 border border-card-border rounded-xl px-3 py-2 text-xs outline-none focus:border-primary/50 transition-colors" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs text-secondary uppercase font-bold">Format</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            <Button variant="secondary" size="sm" className="text-[10px] gap-1">
                                                <FileText className="w-3 h-3" /> CSV
                                            </Button>
                                            <Button variant="secondary" size="sm" className="text-[10px] gap-1">
                                                <FileSpreadsheet className="w-3 h-3" /> Excel
                                            </Button>
                                            <Button variant="secondary" size="sm" className="text-[10px] gap-1">
                                                <FilePdf className="w-3 h-3" /> PDF
                                            </Button>
                                        </div>
                                    </div>
                                    <Button className="w-full py-4 gap-2">
                                        <Download className="w-5 h-5" />
                                        Generate & Export
                                    </Button>
                                </div>
                            </Card>

                            <Card className="p-0 overflow-hidden">
                                <div className="p-6 border-b border-card-border">
                                    <h3 className="text-lg font-semibold">Scheduled Reports</h3>
                                </div>
                                <div className="divide-y divide-card-border">
                                    <div className="p-4 flex items-center justify-between hover:bg-secondary/5 transition-colors cursor-pointer group">
                                        <div>
                                            <p className="text-sm font-medium">Daily Floor Status</p>
                                            <p className="text-[10px] text-secondary">Every day at 08:00 AM</p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-secondary group-hover:text-primary transition-colors" />
                                    </div>
                                    <div className="p-4 flex items-center justify-between hover:bg-secondary/5 transition-colors cursor-pointer group">
                                        <div>
                                            <p className="text-sm font-medium">Bi-Weekly Payroll</p>
                                            <p className="text-[10px] text-secondary">Every other Friday</p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-secondary group-hover:text-primary transition-colors" />
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Right Column: History and Preview */}
                        <div className="lg:col-span-2 space-y-8">
                            <Card className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold">Recent Generated Reports</h3>
                                    <Button variant="ghost" size="sm" className="gap-2">
                                        <Filter className="w-4 h-4" /> Filter
                                    </Button>
                                </div>

                                <div className="space-y-3">
                                    {reports.map((report) => (
                                        <div
                                            key={report.id}
                                            className="p-4 rounded-xl bg-secondary/5 border border-card-border flex items-center justify-between group hover:bg-secondary/10 transition-all"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                    <FileText className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-foreground">{report.name}</p>
                                                    <div className="flex items-center gap-3 text-[10px] text-secondary uppercase tracking-wider">
                                                        <span>{report.type}</span>
                                                        <span>•</span>
                                                        <span>{report.size}</span>
                                                        <span>•</span>
                                                        <span>{report.lastGenerated}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Button variant="outline" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                Download
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            <Card className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold">Report Preview</h3>
                                    <span className="text-xs text-secondary italic">Showing first 5 rows of &quot;Weekly Attendance Summary&quot;</span>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm">
                                        <thead>
                                            <tr className="border-b border-card-border">
                                                <th className="pb-4 font-semibold text-secondary uppercase text-[10px]">Agent Name</th>
                                                <th className="pb-4 font-semibold text-secondary uppercase text-[10px]">Total Hours</th>
                                                <th className="pb-4 font-semibold text-secondary uppercase text-[10px]">Adherence</th>
                                                <th className="pb-4 font-semibold text-secondary uppercase text-[10px]">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-card-border">
                                            {[
                                                { name: "Alex Rivera", hours: "38.5h", adherence: "94%", status: "On Track" },
                                                { name: "Sarah Chen", hours: "40.0h", adherence: "98%", status: "Excellent" },
                                                { name: "Marcus Thorne", hours: "36.2h", adherence: "88%", status: "Warning" },
                                                { name: "Elena Rodriguez", hours: "39.1h", adherence: "92%", status: "On Track" },
                                                { name: "David Kim", hours: "37.8h", adherence: "95%", status: "On Track" },
                                            ].map((row, i) => (
                                                <tr key={i} className="hover:bg-secondary/5 transition-colors">
                                                    <td className="py-4 font-medium">{row.name}</td>
                                                    <td className="py-4 tabular-nums">{row.hours}</td>
                                                    <td className="py-4 tabular-nums text-primary">{row.adherence}</td>
                                                    <td className="py-4">
                                                        <span className={cn(
                                                            "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase",
                                                            row.status === "Excellent" ? "bg-primary/10 text-primary" :
                                                                row.status === "Warning" ? "bg-negative/10 text-negative" : "bg-secondary/10 text-secondary"
                                                        )}>
                                                            {row.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
