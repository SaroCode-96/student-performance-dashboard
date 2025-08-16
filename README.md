# Student Performance Dashboard

A beautiful, interactive Student Performance Dashboard with full CRUD operations, advanced data visualization, real-time charts, and a modern, responsive design inspired by academic platforms like Khan Academy and Notion.

![Student Performance Dashboard Screenshot](placeholder.png)
*(Replace `placeholder.png` with a screenshot of the application)*

## ✨ Features

-   **🎨 Modern & Responsive Design**: A professional, academic-blue theme with a collapsible sidebar, light/dark mode, elegant shadows, and smooth animations. The UI is fully responsive and optimized for all screen sizes.
-   **📊 Interactive Dashboard**: Get a real-time overview of key metrics like total students, average score, and passing rate. Visualize data with interactive bar charts for subject performance and pie charts for grade distribution.
-   **🔗 URL-Based Routing**: Each view has a dedicated URL (`/#/`, `/#/students`, `/#/subjects`), enabling bookmarking, direct navigation, and use of browser history.
-   **✏️ Full CRUD Operations**: Easily manage student records with complete Create, Read, Update, and Delete functionality.
    -   **Add**: Add new students with a validated form, featuring auto-incrementing Registered IDs.
    -   **Edit**: Update student information and scores through an intuitive modal form.
    -   **Delete**: Safely remove student records with a confirmation prompt.
    -   **View**: Preview detailed student information and performance breakdowns in a clean modal.
-   **📈 Advanced Data Table**:
    -   **Search**: Instantly find students by name or Registered ID.
    -   **Sort**: Sort the student list by name or overall percentage.
-   **📚 Subjects Overview**: A dedicated view to analyze class performance on a per-subject basis, featuring modern circular progress bars for a clear visual representation.
-   **💾 Data Persistence**: All student data is saved to the browser's `localStorage`, so your information persists between sessions.
-   **🌗 Theme Toggle**: Switch between a clean light mode and a sleek dark mode to suit your preference.

## 🛠️ Tech Stack

-   **Frontend**: React, TypeScript, React Router
-   **Styling**: Tailwind CSS
-   **Charts**: Recharts
-   **Build**: No build step required; runs directly in the browser using ES Modules and CDN links.

## 🚀 Getting Started

This project is set up to run directly in the browser without any build steps.

### Prerequisites

-   A modern web browser (e.g., Chrome, Firefox, Safari, Edge).

### Installation & Running

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/student-performance-dashboard.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd student-performance-dashboard
    ```
3.  **Open the `index.html` file in your browser:**
    -   You can simply double-click the file, or right-click and choose "Open with" your preferred browser.

And that's it! The application should be running.

## 📁 File Structure

The project is organized with a clear and scalable structure:

```
.
├── components/
│   ├── icons/              # Reusable SVG icon components
│   ├── Dashboard.tsx       # Main dashboard view with charts
│   ├── Header.tsx          # Top navigation bar
│   ├── Sidebar.tsx         # Side navigation menu
│   ├── Students.tsx        # Student list, table, and CRUD triggers
│   ├── Subjects.tsx        # Subject overview page
│   ├── StatCard.tsx        # Reusable card for key metrics
│   ├── StudentFormModal.tsx # Modal for adding/editing students
│   ├── StudentPreviewModal.tsx # Modal for viewing student details
│   └── DeleteConfirmationModal.tsx # Modal for delete confirmation
├── App.tsx                 # Main application component, state management
├── constants.ts            # Initial student data and subjects list
├── types.ts                # TypeScript type definitions
├── index.html              # Main HTML entry point
├── index.tsx               # React root renderer
└── metadata.json           # Application metadata
```

## 📄 How to Use

1.  **Navigate**: Use the sidebar to switch between the **Dashboard**, **Students**, and **Subjects** views. The URL in your browser will update, and you can use the back/forward buttons to navigate.
2.  **Add a Student**: Go to the **Students** tab and click the "Add Student" button. Fill out the form and save.
3.  **Edit/Delete/View**: In the student list, use the action icons to preview, edit, or delete a student record.
4.  **Search & Sort**: Use the search bar to filter students. Click on the "Name" or "Overall %" table headers to sort the data.
5.  **Change Theme**: Click the sun/moon icon in the header to toggle between light and dark modes.