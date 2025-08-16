
import React from 'react';
import { Student } from '../types';

interface StudentPreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    student: Student;
}

const getScoreColor = (score: number) => {
    if (score >= 90) return '#10b981'; // green
    if (score >= 80) return '#3b82f6'; // blue
    if (score >= 70) return '#f59e0b'; // yellow
    if (score >= 60) return '#f97316'; // orange
    return '#ef4444'; // red
};

const getGrade = (score: number): string => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
};

const StudentPreviewModal: React.FC<StudentPreviewModalProps> = ({ isOpen, onClose, student }) => {
    if (!isOpen) return null;

    const averageScore = student.scores.reduce((acc, s) => acc + s.score, 0) / student.scores.length;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center animate-fade-in" onClick={onClose}>
            <div className="bg-primary-light dark:bg-secondary-dark rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 m-4 animate-slide-in" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-3xl font-bold text-academic-blue">{student.name}</h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">{student.registeredId}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="text-xl font-semibold mb-4 text-text-light dark:text-text-dark">Performance Overview</h3>
                    <div className="bg-secondary-light dark:bg-primary-dark p-6 rounded-lg">
                        <div className="flex justify-between items-center">
                            <div>
                                <span className="font-medium text-gray-600 dark:text-gray-300">Average Score</span>
                                <span className="ml-2 text-sm font-semibold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: getScoreColor(averageScore) }}>
                                    {getGrade(averageScore)}
                                </span>
                            </div>
                            <span className="text-2xl font-bold" style={{ color: getScoreColor(averageScore) }}>
                                {averageScore.toFixed(1)}
                            </span>
                        </div>
                         <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
                             <div className="h-2.5 rounded-full" style={{ width: `${averageScore}%`, backgroundColor: getScoreColor(averageScore) }}></div>
                         </div>
                    </div>
                </div>

                <div className="mt-8">
                     <h3 className="text-xl font-semibold mb-4 text-text-light dark:text-text-dark">Scores by Subject</h3>
                     <div className="space-y-3">
                        {student.scores.map(({ subject, score }) => (
                            <div key={subject} className="bg-secondary-light dark:bg-primary-dark p-4 rounded-lg flex justify-between items-center transition-all hover:shadow-md dark:hover:bg-gray-800">
                                <span className="font-medium text-gray-700 dark:text-gray-300">{subject}</span>
                                <span className="text-lg font-bold" style={{ color: getScoreColor(score) }}>{score}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default StudentPreviewModal;
