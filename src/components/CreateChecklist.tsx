import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import React, { useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

interface ChecklistItem {
    id: string;
    text: string;
    completed: boolean;
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
    margin-bottom: 30px;
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
    const [checklist, setChecklist] = React.useState<ChecklistItem[]>([]);
    const [newItemText, setNewItemText] = React.useState<string>('');

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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewItemText(event.target.value);
    };

    return (
        <Container>
            <Title>Create Your Checklist</Title>
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
                            </StyledListItem>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </StyledList>
        </Container>
    );
}
