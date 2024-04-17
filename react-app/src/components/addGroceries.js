import React, { useState } from "react";
import { PlusIcon } from '@radix-ui/react-icons'

function AddGroceries() {
    const [newFood, setNewFood] = useState("");
    const [category, setCategory] = useState("");
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
                        <option value="Protein">Protein</option>
                        <option value="Vegetable">Vegetable</option>
                        <option value="Fruit">Fruit</option>
                        <option value="Dairy">Dairy</option>
                        <option value="Grain">Grain</option>
                        <option value="Essential">Essential</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>
            <div className="d-flex justify-content-center"> 
                <div className="plus">
                    <PlusIcon/>
                </div>
            </div>
            <button type="button" className="btn btn-primary add-button">Save</button>
        </div>
    )
}

export default AddGroceries;