import React, { useState } from "react";
import { PlusIcon } from '@radix-ui/react-icons';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/Firebase';

function AddGroceries() {
    const [newFood, setNewFood] = useState("");
    const [category, setCategory] = useState("");

    const handleSave = async () => {
        if (newFood && category) {
            const UserID = sessionStorage.getItem('UserID');
            if (!UserID) {
                console.error("UserID is undefined.");
                return;
            }
            const categoryRef = doc(db, "users", UserID, "ingredients", category);
            const allRef = doc(db, "users", UserID, "ingredients", "All");

            try {
                await setDoc(categoryRef, { [newFood]: true }, { merge: true });
                await setDoc(allRef, { [newFood]: true }, { merge: true });

                console.log("New food added successfully.");
                window.location.reload();
            } catch (error) {
                console.error("Error adding new food: ", error);
            }
        } else {
            console.error("Food name or category is missing.");
        }
    };

    return (
        <div>
            <div className="title">Add Groceries</div>
            <div className="row mb-3">
                <div className="col-sm-6">
                    <label htmlFor="cookingTime" className="form-label">Food Name</label>
                    <input
                    type="text"
                    id="cookingTime"
                    className="form-control"
                    value={newFood}
                    onChange={(e) => setNewFood(e.target.value)}
                    />
                </div>
                <div className="col-sm-6">
                    <label htmlFor="category" className="form-label">Category</label>
                    <select
                        id="category"
                        className="form-select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
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
            <div className="d-flex justify-content-center"> 
                <div className="plus">
                    <PlusIcon/>
                </div>
            </div>
            <button type="button" className="btn btn-primary add-button" onClick={() => {handleSave(); alert("Added to pantry!")}}>Save</button>
        </div>
    )
}

export default AddGroceries;