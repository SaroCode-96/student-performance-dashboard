
export interface SubjectScore {
    subject: string;
    score: number;
}

export interface Student {
    id: string;
    name: string;
    registeredId: string;
    scores: SubjectScore[];
}

export enum Theme {
    Light = 'light',
    Dark = 'dark'
}

export enum View {
    Dashboard = 'Dashboard',
    Students = 'Students',
    Subjects = 'Subjects'
}
