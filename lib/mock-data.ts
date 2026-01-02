export const mockAgent = {
    id: "agent-1",
    name: "Alex Rivera",
    role: "Senior Agent",
    team: "Alpha Squad",
    adherenceScore: 94,
    totalHours: 38.5,
    lateArrivals: 1,
    ptoBalance: 12,
};

export const mockTimeLogs = [
    { id: "1", type: "Clock In", time: "08:00 AM", status: "On Time" },
    { id: "2", type: "Short Break", time: "10:15 AM", status: "15m" },
    { id: "3", type: "Lunch", time: "12:30 PM", status: "1h" },
    { id: "4", type: "Short Break", time: "03:00 PM", status: "15m" },
];

export const mockFloorStatus = [
    { id: "1", name: "Alex Rivera", status: "On Call", color: "bg-primary" },
    { id: "2", name: "Sarah Chen", status: "On Break", color: "bg-yellow-500" },
    { id: "3", name: "Marcus Thorne", status: "Lunch", color: "bg-orange-500" },
    { id: "4", name: "Elena Rodriguez", status: "Training", color: "bg-blue-500" },
    { id: "5", name: "David Kim", status: "Available", color: "bg-green-500" },
    { id: "6", name: "Jordan Smith", status: "Absent", color: "bg-negative" },
];

export const mockPerformanceData = [
    { day: "Mon", adherence: 92 },
    { day: "Tue", adherence: 95 },
    { day: "Wed", adherence: 88 },
    { day: "Thu", adherence: 94 },
    { day: "Fri", adherence: 96 },
];
