import React, { useMemo } from 'react';
import { SUBJECTS } from '../constants';
import SubjectsIcon from './icons/SubjectsIcon';
import { Student } from '../types';

interface SubjectsProps {
    students: Student[];
}

const getScoreColorHex = (score: number) => {
    if (score >= 90) return '#10b981';
    if (score >= 80) return '#3b82f6';
    if (score >= 70) return '#f59e0b';
    if (score >= 60) return '#f97316';
    return '#ef4444';
};

const CircularProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;
    const color = getScoreColorHex(progress);

    return (
        <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                    className="stroke-current text-gray-200 dark:text-gray-700"
                    strokeWidth="10"
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="transparent"
                ></circle>
                <circle
                    className="stroke-current transition-all duration-1000 ease-out"
                    strokeWidth="10"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    transform="rotate(-90 50 50)"
                    style={{ color }}
                ></circle>
            </svg>
            <span
                className="absolute inset-0 flex items-center justify-center text-2xl font-bold"
                style={{ color }}
            >
                {progress.toFixed(1)}%
            </span>
        </div>
    );
};

const Subjects: React.FC<SubjectsProps> = ({ students }) => {

    const subjectAverages = useMemo(() => {
        return SUBJECTS.map(subject => {
            const scores = students.flatMap(s => s.scores.filter(sc => sc.subject === subject).map(sc => sc.score));
            const average = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
            return { name: subject, averageScore: average };
        });
    }, [students]);

    return (
        <div className="animate-fade-in p-4 md:p-8">
            <h2 className="text-3xl font-bold mb-8 text-text-light dark:text-text-dark">Subjects Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
                {subjectAverages.map(({ name, averageScore }) => (
                     <div key={name} className="bg-primary-light dark:bg-secondary-dark rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                        <div className="mb-4">
                             <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">{name}</h3>
                             <p className="text-xs text-gray-500 dark:text-gray-400">Class Average</p>
                        </div>
                        <CircularProgressBar progress={averageScore} />
                    </div>
                ))}
            </div>
             {students.length === 0 && (
                <div className="text-center py-20 text-gray-500 dark:text-gray-400 bg-primary-light dark:bg-secondary-dark rounded-2xl shadow-lg mt-8">
                    <p className="text-lg">No student data available.</p>
                    <p>Add students to see subject performance metrics here.</p>
                </div>
             )}
        </div>
    );
};

export default Subjects;