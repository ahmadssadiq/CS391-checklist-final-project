// src/components/CreateChecklist.tsx
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';

interface ChecklistItem {
    id: string;
    text: string;
    completed: boolean;
}

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
        <div style={{ padding: '20px' }}>
            <h1>Create Your Checklist</h1>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <TextField
                    label="Add Item"
                    variant="outlined"
                    value={newItemText}
                    onChange={handleInputChange}
                />
                <Button variant="contained" onClick={handleAddItem}>
                    Add Item
                </Button>
            </div>
            <List>
                {checklist.map((item) => (
                    <ListItem
                        key={item.id}
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
                        <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
                            {item.text}
                        </span>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}