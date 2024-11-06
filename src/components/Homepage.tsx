import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function Homepage() {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to the Checklist App</h1>
            <Button variant="contained" component={Link} to="/create-checklist">
                Create Checklist
            </Button>
        </div>
    );
}