import { useState } from 'react';
import { Recipe } from '../App'


// Dropdown Component
const RecipeDropdown = ({ title, ingredients, instructions }: Recipe) => {
    const [isOpen, setIsOpen] = useState(false);

    // Toggle the dropdown open/close state
    const toggleDropdown = () => setIsOpen(!isOpen);

    const instructionsSplit = instructions.split("\n")

    return (
        <div className="dropdown">
            {/* Dropdown header */}
            <div>
                <h4 className="link" onClick={toggleDropdown}>
                    {`${title} (${isOpen ? "-" : "+"})`}
                </h4>
            </div>
            {/* Dropdown items (only visible if isOpen is true) */}
            {isOpen && (
                <>
                    <ul className="dropdown-list">
                        {ingredients.map((item, index) => (
                            <li key={index} className="dropdown-item">
                                {item}
                            </li>
                        ))}
                    </ul>
                    {instructionsSplit.map((sentence, index) => <p style={{ marginTop: index == 0 ? "revert" : 0, marginBottom: index === instructionsSplit.length - 1 ? "revert" : 0 }}>{sentence}</p>)}
                    <span style={{ border: "1px solid black" }} className="link" onClick={toggleDropdown}>close</span>
                    <hr style={{ opacity: 0.5 }} />
                </>
            )}
        </div>
    );
};

export default RecipeDropdown