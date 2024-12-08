import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ProgressBar from './ProgressBar'; // imported the progress bar component

// {AS}: Define the interface for a checklist item, including the optional 'description' field
interface ChecklistItem {
    id: string;
    text: string;
    completed: boolean;
    description?: string; // {AS}: Description field for each checklist item
}

// Styled components
const Container = styled.div`
    background-color: #f7f9fc;
    padding: 50px;
    border-radius: 12px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: 50px auto;
    text-align: center;
    font-family: 'Helvetica Neue', sans-serif;
`;

const Title = styled.h1`
    color: #333;
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 30px;
`;

const InputContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
`;

const DescriptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    margin-left: 10px;
    width: 100%; /* Ensure it spans the available width */
`;

const ProgressContainer = styled.div`
    margin: 20px 0;
    text-align: center;
`;

const StyledList = styled(List)`
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);
`;

const StyledListItem = styled(ListItem)`
    display: flex;
    align-items: center;
    background-color: white;
    padding: 15px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    margin-top: 10px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
    transition: box-shadow 0.3s, opacity 300ms, transform 300ms;

    &.item-enter {
        opacity: 0;
        transform: translateY(-10px);
    }
    &.item-enter-active {
        opacity: 1;
        transform: translateY(0);
    }
    &.item-exit {
        opacity: 1;
        transform: translateY(0);
    }
    &.item-exit-active {
        opacity: 0;
        transform: translateY(-10px);
    }

    &:hover {
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    }
`;

const ItemText = styled.span<{ completed: boolean }>`
    color: #333;
    font-size: 1rem;
    text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
    flex-grow: 1;
    margin-left: 10px;
`;

export default function CreateChecklist() {
    const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
    const [newItemText, setNewItemText] = useState<string>('');
    const [title, setTitle] = useState<string>(''); // New state for checklist title
    const [showDescriptionInput, setShowDescriptionInput] = useState<string | null>(null); // {AS}: Tracks which item is being edited for its description

    const handleAddItem = () => {
        if (newItemText.trim() !== '') {
            const newItem = {
                id: uuidv4(),
                text: newItemText,
                completed: false,
            };
            setChecklist((prev) => [...prev, newItem]);
            setNewItemText('');
        }
    };

    const handleToggleComplete = (id: string) => {
        setChecklist((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, completed: !item.completed } : item
            )
        );
    };

    const handleRemoveItem = (id: string) => {
        setChecklist((prev) => prev.filter((item) => item.id !== id));
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => { // Handler to update the checklist title
        setTitle(event.target.value);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewItemText(event.target.value);
    };

    // {AS}: Add or update the description of a specific checklist item
    const handleAddDescription = (id: string, description: string) => {
        setChecklist((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, description } : item
            )
        );
    };

    // {AS}: Toggle the visibility of the description input for a specific item
    const toggleDescriptionInput = (id: string) => {
        setShowDescriptionInput((prev) => (prev === id ? null : id));
    };

    const completedItems = checklist.filter((item) => item.completed).length;
    const totalItems = checklist.length;

    return (
        <Container>
            <Title>Create Your Checklist</Title>
            <TextField
                label="Checklist Title"
                variant="outlined"
                fullWidth
                value={title}
                onChange={handleTitleChange}
                style={{ marginBottom: '20px' }}
            />
            <InputContainer>
                <TextField
                    label="Add Item"
                    variant="outlined"
                    value={newItemText}
                    onChange={handleInputChange}
                />
                <Button variant="contained" onClick={handleAddItem}>
                    Add Item
                </Button>
            </InputContainer>
            {totalItems > 0 && ( // FS: Only show the ProgressBar if there are items in the checklist
                <ProgressContainer>
                    {/* Pass the number of completed items and total items to the ProgressBar */}
                    <ProgressBar value={completedItems} max={totalItems} />
                    {/* Display a textual representation of progress */}
                    <p>{`Progress: ${completedItems} / ${totalItems} items completed`}</p>
                </ProgressContainer>
            )}
            <StyledList>
                <TransitionGroup>
                    {checklist.map((item) => (
                        <CSSTransition
                            key={item.id}
                            timeout={300}
                            classNames="item"
                        >
                            <StyledListItem
                                secondaryAction={
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => handleRemoveItem(item.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <Checkbox
                                    checked={item.completed}
                                    onChange={() => handleToggleComplete(item.id)}
                                />
                                <ItemText completed={item.completed}>{item.text}</ItemText>
                                <DescriptionContainer>
                                    {/* {AS}: Display description if available */}
                                    {item.description && (
                                        <p style={{ fontStyle: 'italic', color: '#555' }}>
                                            {item.description}
                                        </p>
                                    )}
                                    {/* {AS}: Show or hide the description input */}
                                    {showDescriptionInput === item.id && (
                                        <TextField
                                            label="Add Description"
                                            variant="outlined"
                                            fullWidth
                                            value={item.description || ''}
                                            onChange={(e) =>
                                                handleAddDescription(item.id, e.target.value)
                                            }
                                        />
                                    )}
                                    <Button
                                        onClick={() => toggleDescriptionInput(item.id)}
                                    >
                                        {showDescriptionInput === item.id
                                            ? 'Close'
                                            : 'Add Description'}
                                    </Button>
                                </DescriptionContainer>
                            </StyledListItem>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </StyledList>
        </Container>
    );
}
