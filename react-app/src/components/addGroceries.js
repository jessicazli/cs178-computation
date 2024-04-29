import React, { useState } from "react";
import { PlusIcon } from '@radix-ui/react-icons';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/Firebase';

function AddGroceries() {
    const [groceryItems, setGroceryItems] = useState([{ newFood: "", category: "" }]);

    const handleSave = async () => {
        const UserID = sessionStorage.getItem('UserID');
        if (!UserID) {
            console.error("UserID is undefined.");
            return;
        }

        for (const { newFood, category } of groceryItems) {
            if (newFood && category) {
                const categoryRef = doc(db, "users", UserID, "ingredients", category);
                const allRef = doc(db, "users", UserID, "ingredients", "All");

                try {
                    await setDoc(categoryRef, { [newFood]: true }, { merge: true });
                    await setDoc(allRef, { [newFood]: true }, { merge: true });
                } catch (error) {
                    console.error("Error adding new food: ", error);
                    return; // Stop the loop if there is an error
                }
            } else {
                console.error("Food name or category is missing.");
                return; // Stop the loop if there is a missing field
            }
        }

        console.log("All new foods added successfully.");
        alert("All new foods added to pantry!");
        window.location.reload();
    };

    const addGroceryItem = () => {
        setGroceryItems([...groceryItems, { newFood: "", category: "" }]);
    };

    const updateGroceryItem = (index, field, value) => {
        const newGroceryItems = [...groceryItems];
        newGroceryItems[index][field] = value;
        setGroceryItems(newGroceryItems);
    };

    const isSaveDisabled = groceryItems.some(item => item.newFood === "" || item.category === "");

    return (
        <div className="add-groceries">
            <div className="title">Add Groceries</div>
            <div className="row mb-3">
                <div className="col-sm-6">
                    <label htmlFor="foodName" className="form-label">Food Name</label>
                </div>
                <div className="col-sm-6">
                    <label htmlFor="category" className="form-label">Category</label>
                </div>
            </div>
            <div className="scrollable">
                {groceryItems.map((item, index) => (
                    <div key={index} className="row mb-3">
                        <div className="col-sm-6">
                            <input
                                type="text"
                                id={`foodName-${index}`}
                                className="form-control"
                                placeholder="Enter food name"
                                value={item.newFood}
                                onChange={(e) => updateGroceryItem(index, 'newFood', e.target.value)}
                            />
                        </div>
                        <div className="col-sm-6">
                            <select
                                id={`category-${index}`}
                                className="form-select"
                                value={item.category}
                                onChange={(e) => updateGroceryItem(index, 'category', e.target.value)}
                            >
                                <option value="">Select</option>
                                <option value="Proteins">Proteins</option>
                                <option value="Vegetables">Vegetables</option>
                                <option value="Fruits">Fruits</option>
                                <option value="Dairy">Dairy</option>
                                <option value="Grains">Grains</option>
                                <option value="Basics">Essentials</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                ))}
            </div>
            <div className="d-flex justify-content-center"> 
                <button onClick={addGroceryItem} className="plus">
                    <PlusIcon/>
                </button>
            </div>
            <div className="d-flex justify-content-end"> 
                <button type="button" className="btn btn-primary add-button" onClick={handleSave} disabled={isSaveDisabled}>Save</button>
            </div>
        </div>
    );
}

export default AddGroceries;