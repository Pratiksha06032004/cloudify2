import React, { useState } from 'react';
import styles from './Task.module.css';
import { FiChevronDown } from "react-icons/fi";

const Task = () => {
    // State to manage table rows
    const [rows, setRows] = useState([{ id: 1, year: "", selectedOptions: [], showDropdown: false }]);
    
    // List of available employees
    const [availableYears] = useState(["Pratiksha Gawali", "Anuja Pawar", "Ruturaj Shinde", "Shivam Patil", "Ashish Jagtap", "Sonal Shinde", "Ravi Kumar"]);
    
    // List of skills options
    const [options, setOptions] = useState(['Html', 'Css', 'JavaScript', 'ReactJs']);
    
    // State to handle new option input field
    const [newOption, setNewOption] = useState('');

    // Function to handle employee selection
    const handleYearChange = (id, event) => {
        const { value } = event.target;
        setRows(rows.map(row => (row.id === id ? { ...row, year: value } : row)));
    };

    // Function to handle skill selection
    const handleSelect = (id, option) => {
        setRows(rows.map(row => row.id === id ? {
            ...row,
            selectedOptions: row.selectedOptions.includes(option)
                ? row.selectedOptions.filter(item => item !== option)
                : [...row.selectedOptions, option]
        } : row));
    };

    // Function to remove a selected skill from a row
    const removeOption = (id, option) => {
        setRows(rows.map(row => row.id === id ? {
            ...row,
            selectedOptions: row.selectedOptions.filter(item => item !== option)
        } : row));
    };

    // Function to toggle dropdown visibility
    const toggleDropdown = (id) => {
        setRows(rows.map(row => row.id === id ? { ...row, showDropdown: !row.showDropdown } : row));
    };

    // Function to add a new skill option
    const addNewOption = () => {
        if (newOption.trim() !== '' && !options.includes(newOption)) {
            setOptions([...options, newOption]);
            setNewOption('');
        }
    };

    // Function to add a new row in the table
    const addRow = () => {
        setRows([...rows, { id: rows.length + 1, year: "", selectedOptions: [], showDropdown: false }]);
    };

    return (
        <div className={styles.backgroundContainer}>
            <div className={styles.tableWrapper}>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Employee</th>
                                <th>Skills</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map(row => (
                                <tr key={row.id}>
                                    {/* Employee selection dropdown */}
                                    <td>
                                        <select value={row.year} onChange={e => handleYearChange(row.id, e)} className={styles.select}>
                                            <option value="">select employee</option>
                                            {availableYears.map(year => (
                                                <option
                                                    key={year}
                                                    value={year}
                                                    disabled={rows.some(r => r.year === year && r.id !== row.id)}
                                                >
                                                    {year}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    {/* Skills selection dropdown */}
                                    <td>
                                        <div className={styles.dropdownContainer}>
                                            <div className={styles.dropdownHeader} onClick={() => toggleDropdown(row.id)}>
                                                {/* Display selected skills */}
                                                {row.selectedOptions.length > 0 && row.selectedOptions.map(option => (
                                                    <span key={option} className={styles.selectedOption}>
                                                        {option}
                                                        <span onClick={(e) => { e.stopPropagation(); removeOption(row.id, option); }} className={styles.removeOption}>✖</span>
                                                    </span>
                                                ))}
                                                <span className={styles.selectLabel}>select skill   <FiChevronDown /></span>
                                            </div>
                                            {/* Dropdown list with skills options */}
                                            {row.showDropdown && (
                                                <div className={styles.dropdownMenu}>
                                                    {options.map(option => (
                                                        <label key={option} className={styles.dropdownItem}>
                                                            <input
                                                                type="checkbox"
                                                                checked={row.selectedOptions.includes(option)}
                                                                onChange={() => handleSelect(row.id, option)}
                                                            />
                                                            {option}
                                                        </label>
                                                    ))}
                                                    {/* Input field to add new skill */}
                                                    <div className={styles.addOptionContainer}>
                                                        <input
                                                            type="text"
                                                            value={newOption}
                                                            onChange={(e) => setNewOption(e.target.value)}
                                                            placeholder="Add new skill"
                                                            className={styles.inputField}
                                                        />
                                                        <button onClick={addNewOption} className={styles.addButton}>+ Add</button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Button to add new row */}
                <div className={styles.addRowButtonContainer}>
                    <button onClick={addRow} className={styles.addRowButton}>+ Add New Row</button>
                </div>
            </div>
        </div>
    );
};

export default Task;
