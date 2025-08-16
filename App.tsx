import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Student, Theme } from './types';
import { INITIAL_STUDENTS } from './constants';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Students from './components/Students';
import Subjects from './components/Subjects';

const App: React.FC = () => {
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem('theme') as Theme;
        return savedTheme || Theme.Light;
    });

    const [students, setStudents] = useState<Student[]>(() => {
        const savedStudents = localStorage.getItem('students');
        return savedStudents ? JSON.parse(savedStudents) : INITIAL_STUDENTS;
    });

    const [isSidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('theme', theme);
        if (theme === Theme.Dark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('students', JSON.stringify(students));
    }, [students]);

    const addStudent = (student: Omit<Student, 'id'>) => {
        // Find the highest existing SID number
        const maxId = students.reduce((max, s) => {
            const idNum = parseInt(s.registeredId.split('-')[1] || '0', 10);
            return idNum > max ? idNum : max;
        }, 0);

        // Generate the new ID, e.g., SID-011
        const newRegisteredId = `SID-${String(maxId + 1).padStart(3, '0')}`;

        const newStudent = {
            ...student,
            id: `s${Date.now()}`,
            registeredId: newRegisteredId // Overwrite with generated ID
        };
        setStudents(prev => [newStudent, ...prev]);
    };

    const updateStudent = (updatedStudent: Student) => {
        setStudents(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));
    };

    const deleteStudent = (studentId: string) => {
        setStudents(prev => prev.filter(s => s.id !== studentId));
    };
    
    return (
        <div className="flex h-screen bg-secondary-light dark:bg-primary-dark text-text-light dark:text-text-dark font-sans transition-colors duration-300">
            <Sidebar isOpen={isSidebarOpen} setOpen={setSidebarOpen} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header theme={theme} setTheme={setTheme} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8">
                    <Routes>
                        <Route path="/" element={<Dashboard students={students} />} />
                        <Route 
                            path="/students" 
                            element={<Students students={students} addStudent={addStudent} updateStudent={updateStudent} deleteStudent={deleteStudent} />} 
                        />
                        <Route path="/subjects" element={<Subjects students={students} />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default App;