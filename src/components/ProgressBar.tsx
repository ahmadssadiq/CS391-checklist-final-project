// progress component page - Faria Shahriar
import styled from 'styled-components';

interface ProgressBarProps {
    value: number; // The current value representing progress (e.g., completed items).
    max: number;   // The maximum possible value (e.g., total items).
}

// Styled container for the progress bar (outer div)
const ProgressBarContainer = styled.div`
    width: 100%;
    background-color: #e0e0e0;
    border-radius: 10px;
    height: 20px;
`;

// Styled inner div for the dynamic progress bar
const Progress = styled.div<{ percentage: number; color: string }>`
    width: ${({ percentage }) => `${percentage}%`}; // Dynamically set width based on progress
    background-color: ${({ color }) => color};     // Dynamic color based on progress
    height: 100%;                                 // Matches the height of the container
    border-radius: 10px;
    transition: width 0.3s ease;                  // Smooth transition for width changes
`;

function ProgressBar({ value, max }: ProgressBarProps) {
    const percentage = (value / max) * 100;

    // Function to determine the color of the progress bar based on the percentage.
    const getColor = () => {
        if (percentage >= 75) return '#4caf50'; // Green for high progress (75% or more).
        if (percentage >= 50) return '#ff9800'; // Orange for medium progress (50-74%).
        return '#f44336'; // Red for low progress (below 50%).
    };

    return (
        <ProgressBarContainer>
            <Progress percentage={percentage} color={getColor()} />
        </ProgressBarContainer>
    );
}

export default ProgressBar;
