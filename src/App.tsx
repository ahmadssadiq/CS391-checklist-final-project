import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Importing components for the application
import Homepage from './components/Homepage';
import CreateChecklist from './components/CreateChecklist';
import Navbar from './components/Navbar';

// Main App component
export default function App() {
  return (
    // The Router component wraps the entire application to enable routing
    <Router>
      {/* Navbar Component: Displays a navigation bar with links to different pages */}
      <Navbar />

      {/* Routes: Define the paths and the corresponding components to render */}
      <Routes>
        {/* Route for the Homepage */}
        <Route path="/" element={<Homepage />} />
        {/* Route for the Create Checklist page */}
        <Route path="/create-checklist" element={<CreateChecklist />} />
      </Routes>
    </Router>
  );
}
