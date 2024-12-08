import { Link } from 'react-router-dom'; // Importing the Link component for navigation

// Navbar component: Displays a navigation bar with links to different pages
export default function Navbar() {
  // Inline styles for the navbar container
  const navbarStyle = {
    backgroundColor: '#f8f9fa', // Light background color
    padding: '1rem', // Padding around the navbar
    borderBottom: '1px solid #ddd', // Subtle border at the bottom for separation
  };

  // Inline styles for the unordered list containing navigation links
  const navListStyle = {
    display: 'flex', // Display links in a horizontal row
    listStyleType: 'none', // Remove bullet points
    gap: '1rem', // Add spacing between links
    margin: 0, // Remove default margin
    padding: 0, // Remove default padding
    justifyContent: 'flex-start', // Align links to the left
  };

  // Inline styles for individual links
  const linkStyle = {
    textDecoration: 'none', // Remove underline from links
    color: '#007bff', // Blue color for links
  };

  return (
    // Navbar container
    <nav style={navbarStyle}>
      {/* Unordered list for navigation links */}
      <ul style={navListStyle}>
        {/* Link to the Homepage */}
        <li>
          <Link to="/" style={linkStyle}>
            Homepage
          </Link>
        </li>
        {/* Link to the Create Checklist page */}
        <li>
          <Link to="/create-checklist" style={linkStyle}>
            Create Checklist
          </Link>
        </li>
      </ul>
    </nav>
  );
};

