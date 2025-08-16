
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Sector } from 'recharts';
import { Student } from '../types';
import StatCard from './StatCard';
import { SUBJECTS } from '../constants';
import StudentsIcon from './icons/StudentsIcon';

interface DashboardProps {
    students: Student[];
}

const getGrade = (score: number) => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
};

const GRADE_COLORS: { [key: string]: string } = { 'A': '#10b981', 'B': '#3b82f6', 'C': '#f59e0b', 'D': '#f97316', 'F': '#ef4444' };

const Dashboard: React.FC<DashboardProps> = ({ students }) => {

    const stats = useMemo(() => {
        if (students.length === 0) {
            return {
                totalStudents: 0,
                averageScore: 'N/A',
                topPerformer: 'N/A',
                passingRate: 'N/A'
            };
        }
        
        const totalScores = students.flatMap(s => s.scores.map(sc => sc.score));
        const averageScore = totalScores.reduce((acc, score) => acc + score, 0) / totalScores.length;

        let topPerformer = { name: 'N/A', avg: 0 };
        students.forEach(s => {
            const studentAvg = s.scores.reduce((acc, sc) => acc + sc.score, 0) / s.scores.length;
            if (studentAvg > topPerformer.avg) {
                topPerformer = { name: s.name, avg: studentAvg };
            }
        });

        const passingCount = students.filter(s => {
            const studentAvg = s.scores.reduce((acc, sc) => acc + sc.score, 0) / s.scores.length;
            return studentAvg >= 60;
        }).length;
        const passingRate = (passingCount / students.length) * 100;
        
        return {
            totalStudents: students.length,
            averageScore: averageScore.toFixed(1),
            topPerformer: topPerformer.name,
            passingRate: passingRate.toFixed(1) + '%'
        };
    }, [students]);

    const subjectPerformance = useMemo(() => {
        return SUBJECTS.map(subject => {
            const scores = students.flatMap(s => s.scores.filter(sc => sc.subject === subject).map(sc => sc.score));
            const average = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
            return { name: subject, averageScore: parseFloat(average.toFixed(2)) };
        });
    }, [students]);

    const gradeDistribution = useMemo(() => {
        const grades = { 'A': 0, 'B': 0, 'C': 0, 'D': 0, 'F': 0 };
        students.forEach(s => {
            const avg = s.scores.reduce((acc, sc) => acc + sc.score, 0) / s.scores.length;
            grades[getGrade(avg)]++;
        });
        return Object.entries(grades).map(([name, value]) => ({ name, value }));
    }, [students]);
    
    return (
        <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <StatCard title="Total Students" value={stats.totalStudents} icon={<StudentsIcon className="w-6 h-6 text-white" />} color="bg-blue-500" />
                 <StatCard title="Average Score" value={stats.averageScore} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>} color="bg-green-500" />
                 <StatCard title="Passing Rate" value={stats.passingRate} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} color="bg-yellow-500" />
                 <StatCard title="Top Performer" value={stats.topPerformer} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19.1V5.9A1.9 1.9 0 016.9 4h10.2A1.9 1.9 0 0119 5.9v13.2a1.9 1.9 0 01-1.9 1.9H6.9A1.9 1.9 0 015 19.1z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10l3 3 3-3" /></svg>} color="bg-red-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-primary-light dark:bg-secondary-dark p-6 rounded-xl shadow-lg animate-slide-in" style={{animationDelay: '150ms'}}>
                    <h3 className="text-xl font-semibold mb-4 text-text-light dark:text-text-dark">Subject Performance</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={subjectPerformance}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-gray-200 dark:stroke-gray-700"/>
                            <XAxis dataKey="name" className="text-xs" />
                            <YAxis className="text-xs" />
                            <Tooltip contentStyle={{ backgroundColor: 'rgba(30, 41, 59, 0.9)', border: 'none', color: '#fff', borderRadius: '0.5rem' }} />
                            <Bar dataKey="averageScore" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-primary-light dark:bg-secondary-dark p-6 rounded-xl shadow-lg animate-slide-in" style={{animationDelay: '300ms'}}>
                     <h3 className="text-xl font-semibold mb-4 text-text-light dark:text-text-dark">Grade Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={gradeDistribution}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                                label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                                    if (percent === 0) return null;
                                    const RADIAN = Math.PI / 180;
                                    const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
                                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                                    return (
                                        <text x={x} y={y} fill="#64748b" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-xs font-semibold">
                                            {`${(percent * 100).toFixed(0)}%`}
                                        </text>
                                    );
                                }}
                            >
                                {gradeDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={GRADE_COLORS[entry.name]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: 'rgba(30, 41, 59, 0.9)', border: 'none', color: '#fff', borderRadius: '0.5rem' }}/>
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
