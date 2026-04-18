<div align="center">

# 🎓 CampusSync: Training & Placement ERP

**An Industry-Ready Enterprise Platform for Modern Universities**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)](https://javascript.info/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Oracle](https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=oracle&logoColor=white)](https://www.oracle.com/database/)

<br />

> **CampusSync** bridges the gap between ambitious technical students, recruiting companies, and university placement administrators. Experience an intuitive, reactive, and powerful recruitment lifecycle manager.

<br />

</div>

---

## 🌟 Platform Highlights

### 🛡️ Dynamic Multi-Role Portals
Seamlessly routing three different distinct user experiences off a single authentication gateway:
- **👨‍🎓 Student Portal**: Track interview rounds, upload technical resumes, and monitor your personal CGPA statistics.
- **🏛️ Administrator View (TPO)**: Comprehensive eagle-eye dashboard featuring `recharts` trajectory graphs, hiring velocity tracking, and centralized user management directories.
- **💼 Corporate Partner View**: Easily post job drives, schedule interview pipelines, and browse internal university talent metrics.

### ⚡ Technical Polish
- **Persisted Stateful Storage**: The application mimics a robust backend locally by routing live JSON objects directly into the browser's `localStorage`. Create an account, refresh the browser, and watch your data survive!
- **Mobile-First Glassmorphism**: Stunning, semi-transparent frosted-glass UI components that perfectly collapse into touch-friendly grids and hamburger menus for smartphones.
- **Dynamic Registration Schema**: The interactive authentication form intelligently swaps required input fields based on the role selected (e.g. Students require *Departments*, Companies require *Industries*).
- **Custom UX Elegance**: Ditch aggressive browser alerts! This platform features slick, sliding "Toast" notifications and beautiful *Empty State* fallbacks for brand new users. 

---

## 💻 Tech Stack Ecosystem

| Layer | Tools Used | Purpose |
| --- | --- | --- |
| **Frontend Foundation** | React 18, JSX | Component-based UI architecture |
| **Build Tooling** | Vite | Lightning-fast Hot Module Replacement (HMR) |
| **Routing** | React Router DOM | Secure, declarative internal page routing |
| **Data Viz** | Recharts | SVG-powered reactive analytical graphing |
| **Iconography** | Lucide-React | Crisp, scalable vector icons |
| **Styling** | Vanilla CSS | Pure CSS styling utilizing variables and flex/grid |

---

## 🗄️ Database Management (DBMS) Architecture

This repository also contains the core logic satisfying **Database Management Project** requirements.

* **`schema.sql` (DDL)**: View the highly-normalized tables outlining `Users`, `Students`, `Companies`, `Placement_Drives`, and `Applications` enforcing strict `FOREIGN KEY` cascades.
* **`dml_queries.sql` (DML)**: View structured `INSERT`, `UPDATE`, `DELETE`, and complex `JOIN` retrieval statements that map exactly to the actions taking place on the React Frontend dashboard!

---

## 🚀 Installation & Quick Start

1. **Clone the Source Code**
   ```bash
   git clone https://github.com/your-username/campussync.git
   cd campussync/frontend
   ```

2. **Install Node Dependencies**
   ```bash
   npm install
   ```

3. **Deploy the Development Server**
   ```bash
   npm run dev
   ```

4. **Access the Portal**
   Open your browser and navigate to `http://localhost:5173/`

### 🔑 Default Master Credentials
Don't want to register a new mock account? Use our pre-seeded memory databanks to jump right into the action!

| Role | Email ID | Password |
|---|---|---|
| 🏛️ **Admin (TPO)** | `ayush@uni.edu` | `ayush123` |
| 👨‍🎓 **Student** | `alex@uni.edu` | `1234` |
| 💼 **Company** | `hr@google.com` | `1234` |

*(Note: Select the corresponding 'Role' icon toggle on the login screen before submitting!)*

---

<div align="center">
  <sub>Built with ❤️ for University Placement Automation.</sub>
</div>
