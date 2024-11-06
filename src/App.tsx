
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import CreateChecklist from './components/CreateChecklist';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create-checklist" element={<CreateChecklist />} />
      </Routes>
    </Router>
  );
}