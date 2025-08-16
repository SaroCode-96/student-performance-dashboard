import React, { useState, useEffect } from 'react';
import { Student, SubjectScore } from '../types';
import { SUBJECTS } from '../constants';

interface StudentFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (student: Student | Omit<Student, 'id'>) => void;
    student: Student | null;
}

const StudentFormModal: React.FC<StudentFormModalProps> = ({ isOpen, onClose, onSubmit, student }) => {
    const [formData, setFormData] = useState<Omit<Student, 'id'>>({
        name: '',
        registeredId: '',
        scores: SUBJECTS.map(subject => ({ subject, score: 0 })),
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (student) {
            setFormData({
                name: student.name,
                registeredId: student.registeredId,
                scores: SUBJECTS.map(subject => {
                    const existingScore = student.scores.find(s => s.subject === subject);
                    return existingScore || { subject, score: 0 };
                })
            });
        } else {
            setFormData({
                name: '',
                registeredId: '',
                scores: SUBJECTS.map(subject => ({ subject, score: 0 })),
            });
        }
    }, [student, isOpen]);

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.name) newErrors.name = 'Name is required';
        
        formData.scores.forEach(s => {
            if (s.score < 0 || s.score > 100) {
                newErrors[`score_${s.subject}`] = 'Score must be 0-100';
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            if (student) {
                onSubmit({ ...formData, id: student.id });
            } else {
                onSubmit(formData);
            }
            onClose();
        }
    };

    if (!isOpen) return null;

    const handleScoreChange = (subject: string, score: number) => {
        const newScores = formData.scores.map(s => s.subject === subject ? { ...s, score } : s);
        setFormData(prev => ({ ...prev, scores: newScores }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center animate-fade-in">
            <div className="bg-primary-light dark:bg-secondary-dark rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 m-4 animate-slide-in">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-academic-blue">{student ? 'Edit Student' : 'Add New Student'}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className={!student ? 'md:col-span-2' : ''}>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                            <input type="text" id="name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-primary-dark border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent" />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>
                        {student && (
                            <div>
                                <label htmlFor="registeredId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Registered ID</label>
                                <input
                                    type="text"
                                    id="registeredId"
                                    value={formData.registeredId}
                                    readOnly
                                    className="mt-1 block w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm cursor-not-allowed"
                                />
                            </div>
                        )}
                    </div>

                    <div>
                        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Subject Scores</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {formData.scores.map(({ subject, score }) => (
                                <div key={subject}>
                                    <label htmlFor={`score_${subject}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">{subject}</label>
                                    <input type="number" id={`score_${subject}`} value={score} onChange={e => handleScoreChange(subject, parseInt(e.target.value) || 0)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-primary-dark border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent" />
                                    {errors[`score_${subject}`] && <p className="text-red-500 text-xs mt-1">{errors[`score_${subject}`]}</p>}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-text-light dark:text-text-dark rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-academic-blue text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg">{student ? 'Update Student' : 'Add Student'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentFormModal;