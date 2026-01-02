"use client";

import { Sidebar, Navbar } from "@/components/ui/layout";
import { Card, Button } from "@/components/ui/core";
import { mockPerformanceData } from "@/lib/mock-data";
import { Target, Award, Clock, ThumbsUp, AlertTriangle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PerformancePage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex">
            <Sidebar role="agent" />

            <main className="flex-1 ml-64">
                <Navbar title="My Performance" />

                <div className="p-8 space-y-8 max-w-7xl mx-auto">
                    {/* Top Stats Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard
                            label="Adherence Score"
                            value="94%"
                            trend="+2.4%"
                            icon={Target}
                            color="text-primary"
                        />
                        <StatCard
                            label="Quality Assurance"
                            value="98/100"
                            trend="Top 5%"
                            icon={Award}
                            color="text-purple-500"
                        />
                        <StatCard
                            label="Avg Handle Time"
                            value="4m 12s"
                            trend="-15s"
                            icon={Clock}
                            color="text-blue-500"
                        />
                        <StatCard
                            label="Customer CSAT"
                            value="4.8/5"
                            trend="+0.2"
                            icon={ThumbsUp}
                            color="text-green-500"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Trends */}
                        <div className="lg:col-span-2 space-y-8">
                            <Card className="h-[400px] flex flex-col">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold">Adherence Trend</h3>
                                    <div className="flex gap-2">
                                        <Button variant="secondary" size="sm">Weekly</Button>
                                        <Button variant="secondary" size="sm">Monthly</Button>
                                    </div>
                                </div>
                                <div className="flex-1 flex items-end justify-between gap-4 px-4 pb-4 border-b border-card-border/50">
                                    {mockPerformanceData.map((data) => (
                                        <div key={data.day} className="flex-1 flex flex-col items-center gap-2 group">
                                            <div
                                                className="w-full bg-primary/20 rounded-t-lg relative transition-all duration-500 hover:bg-primary/40 group-hover:scale-y-105 origin-bottom"
                                                style={{ height: `${data.adherence}%` }}
                                            >
                                                <div
                                                    className="absolute top-0 left-0 w-full h-1 bg-primary neon-glow rounded-full"
                                                />
                                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 px-2 py-1 rounded border border-primary/20">
                                                    {data.adherence}%
                                                </span>
                                            </div>
                                            <span className="text-xs text-secondary font-medium">{data.day}</span>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            <Card>
                                <h3 className="text-lg font-semibold mb-6">Recent Quality Feedback</h3>
                                <div className="space-y-4">
                                    {[
                                        { id: 1, title: "Excellent Call Resolution", date: "Today", score: "100%", type: "positive" },
                                        { id: 2, title: "Missed Greeting Script", date: "Yesterday", score: "85%", type: "warning" },
                                        { id: 3, title: "Great Empathy Shown", date: "2 days ago", score: "98%", type: "positive" },
                                    ].map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center justify-between p-4 rounded-xl bg-secondary/5 border border-card-border group hover:bg-secondary/10 transition-colors cursor-pointer"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={cn(
                                                    "w-10 h-10 rounded-full flex items-center justify-center",
                                                    item.type === "positive" ? "bg-primary/10 text-primary" : "bg-yellow-500/10 text-yellow-500"
                                                )}>
                                                    {item.type === "positive" ? <Award className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-foreground">{item.title}</p>
                                                    <p className="text-xs text-secondary">{item.date}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className={cn(
                                                    "text-lg font-bold tabular-nums",
                                                    item.type === "positive" ? "text-primary" : "text-yellow-500"
                                                )}>
                                                    {item.score}
                                                </span>
                                                <ChevronRight className="w-4 h-4 text-secondary group-hover:text-foreground transition-colors" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>

                        {/* Right Column: Achievements & Goals */}
                        <div className="lg:col-span-1 space-y-8">
                            <Card className="space-y-6">
                                <h3 className="text-lg font-semibold">My Goals</h3>
                                <div className="space-y-6">
                                    <GoalItem label="Weekly Adherence" current={94} target={95} color="bg-primary" />
                                    <GoalItem label="Average Handle Time" current={88} target={90} color="bg-blue-500" />
                                    <GoalItem label="Customer Satisfaction" current={96} target={95} color="bg-green-500" />
                                </div>
                                <Button variant="outline" className="w-full">View All Goals</Button>
                            </Card>

                            <Card className="space-y-6 bg-gradient-to-br from-card-bg to-primary/5">
                                <div className="flex items-center gap-3">
                                    <Award className="w-6 h-6 text-primary" />
                                    <h3 className="text-lg font-semibold">Achievements</h3>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    {[
                                        { label: "Perfect Week", icon: "🔥" },
                                        { label: "Top Agent", icon: "👑" },
                                        { label: "Speedy", icon: "⚡" },
                                        { label: "Helper", icon: "🤝" },
                                        { label: "Tech Whiz", icon: "💻" },
                                        { label: "Early Bird", icon: "🌅" },
                                    ].map((badge, i) => (
                                        <div key={i} className="aspect-square rounded-xl bg-secondary/10 border border-card-border flex flex-col items-center justify-center gap-2 hover:bg-primary/10 hover:border-primary/30 transition-all cursor-pointer group">
                                            <span className="text-2xl group-hover:scale-110 transition-transform">{badge.icon}</span>
                                            <span className="text-[10px] text-secondary font-medium text-center leading-tight">{badge.label}</span>
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
                    <span className={cn("text-[10px] font-bold", color === "text-negative" ? "text-negative" : "text-primary")}>
                        {trend}
                    </span>
                </div>
            </div>
        </Card>
    );
}

function GoalItem({ label, current, target, color }: { label: string; current: number; target: number; color: string }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between text-xs">
                <span className="text-secondary font-medium">{label}</span>
                <span className="text-foreground font-bold">{current}% <span className="text-secondary font-normal">/ {target}%</span></span>
            </div>
            <div className="h-2 w-full bg-secondary/10 rounded-full overflow-hidden">
                <div
                    className={cn("h-full rounded-full transition-all duration-1000 relative", color)}
                    style={{ width: `${current}%` }}
                >
                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/50" />
                </div>
            </div>
        </div>
    );
}
