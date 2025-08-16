
import React, { useState, useMemo } from 'react';
import { Student } from '../types';
import StudentFormModal from './StudentFormModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import StudentPreviewModal from './StudentPreviewModal';

interface StudentsProps {
    students: Student[];
    addStudent: (student: Omit<Student, 'id'>) => void;
    updateStudent: (student: Student) => void;
    deleteStudent: (studentId: string) => void;
}

const getGradeColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    if (score >= 80) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    if (score >= 70) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    if (score >= 60) return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
};

const getGrade = (score: number): string => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
};

type SortKey = 'name' | 'averageScore';


const Students: React.FC<StudentsProps> = ({ students, addStudent, updateStudent, deleteStudent }) => {
    const [isFormModalOpen, setFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isPreviewModalOpen, setPreviewModalOpen] = useState(false);
    
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);
    const [deletingStudentId, setDeletingStudentId] = useState<string | null>(null);
    const [previewingStudent, setPreviewingStudent] = useState<Student | null>(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'asc' | 'desc' } | null>({ key: 'name', direction: 'asc' });

    const handleAdd = () => {
        setEditingStudent(null);
        setFormModalOpen(true);
    };

    const handleEdit = (student: Student) => {
        setEditingStudent(student);
        setFormModalOpen(true);
    };

    const handleDelete = (studentId: string) => {
        setDeletingStudentId(studentId);
        setDeleteModalOpen(true);
    };

    const handlePreview = (student: Student) => {
        setPreviewingStudent(student);
        setPreviewModalOpen(true);
    };

    const confirmDelete = () => {
        if (deletingStudentId) {
            deleteStudent(deletingStudentId);
            setDeleteModalOpen(false);
            setDeletingStudentId(null);
        }
    };
    
    const studentData = useMemo(() => {
        return students.map(student => {
            const averageScore = student.scores.length > 0
                ? student.scores.reduce((acc, s) => acc + s.score, 0) / student.scores.length
                : 0;
            return {
                ...student,
                averageScore,
            };
        });
    }, [students]);


    const filteredAndSortedRecords = useMemo(() => {
        let filtered = studentData.filter(student =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.registeredId.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (sortConfig) {
            filtered.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];

                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    return aValue.localeCompare(bValue) * (sortConfig.direction === 'asc' ? 1 : -1);
                }
                
                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return filtered;
    }, [studentData, searchTerm, sortConfig]);
    
    const requestSort = (key: SortKey) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const SortableHeader: React.FC<{ sortKey: SortKey; label: string; }> = ({ sortKey, label }) => (
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => requestSort(sortKey)}>
            <div className="flex items-center">
                {label}
                {sortConfig?.key === sortKey && (
                    <span className="ml-1">{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
                )}
            </div>
        </th>
    );

    return (
        <div className="animate-fade-in">
            <div className="bg-primary-light dark:bg-secondary-dark p-4 sm:p-6 rounded-xl shadow-lg">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                    <div className="relative w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="Search by name or Registered ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-secondary-light dark:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                         <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                    <button
                        onClick={handleAdd}
                        className="w-full sm:w-auto px-4 py-2 bg-academic-blue text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center shadow-md hover:shadow-lg"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        Add Student
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <SortableHeader sortKey="name" label="Name" />
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Grade</th>
                                <SortableHeader sortKey="averageScore" label="Overall %" />
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-primary-light dark:bg-secondary-dark divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredAndSortedRecords.map((student) => (
                                <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-text-light dark:text-text-dark">{student.name}</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">{student.registeredId}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getGradeColor(student.averageScore)}`}>
                                            {getGrade(student.averageScore)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700 dark:text-gray-300">{student.averageScore.toFixed(1)}%</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex items-center space-x-2">
                                           <button onClick={() => handlePreview(student)} className="text-blue-500 hover:text-blue-700 p-1 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 transition" title="Preview">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C3.732 4.943 9.522 3 10 3s6.268 1.943 9.542 7c-3.274 5.057-9.03 7-9.542 7S3.732 15.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                                            </button>
                                            <button onClick={() => handleEdit(student)} className="text-yellow-500 hover:text-yellow-700 p-1 rounded-full hover:bg-yellow-100 dark:hover:bg-yellow-900 transition" title="Edit">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                                            </button>
                                            <button onClick={() => handleDelete(student.id)} className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition" title="Delete">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                     {filteredAndSortedRecords.length === 0 && (
                        <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                            <p>No student records found.</p>
                        </div>
                    )}
                </div>
            </div>
            
            {isFormModalOpen && (
                <StudentFormModal
                    isOpen={isFormModalOpen}
                    onClose={() => setFormModalOpen(false)}
                    onSubmit={editingStudent ? updateStudent : addStudent}
                    student={editingStudent}
                />
            )}
            
            {isDeleteModalOpen && (
                <DeleteConfirmationModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setDeleteModalOpen(false)}
                    onConfirm={confirmDelete}
                />
            )}

            {isPreviewModalOpen && previewingStudent && (
                 <StudentPreviewModal
                    isOpen={isPreviewModalOpen}
                    onClose={() => setPreviewModalOpen(false)}
                    student={previewingStudent}
                />
            )}

        </div>
    );
};

export default Students;
