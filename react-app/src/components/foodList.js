import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/accordion";
import { auth, db } from '../config/Firebase';
import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { TrashIcon } from "@radix-ui/react-icons";

function FoodList({ activeAccordion }) {
    console.log('active:' + activeAccordion);

    const categories = ["Proteins", "Vegetables", "Fruits", "Dairy", "Grains", "Basics", "Other"];
    const [state, setState] = useState({});

    useEffect(() => {
        let ignore = false;

        async function fetchIngredients() {
            const UserID = sessionStorage.getItem('UserID');
            const userRef = doc(db, "users", UserID);

            const fetchData = async (category) => {
                const ref = doc(userRef, "ingredients", category);
                const docSnap = await getDoc(ref);
                return docSnap.exists() ? docSnap.data() : {};
            };

            Promise.all(categories.map(fetchData)).then(results => {
                if (!ignore) {
                    setState(Object.fromEntries(categories.map((category, i) => [category.toLowerCase(), results[i]])));
                }
            });
        }

        fetchIngredients();

        return () => {
            ignore = true;
        };
    }, []);

    useEffect(() => {
        console.log(state);
    }, [state]);

    const deleteItem = async (key, category) => {
        console.log('Setting ' + key + ' to false' + ' in ' + category);
        const UserID = sessionStorage.getItem('UserID');
        if (!db || !UserID) {
            console.error("Database reference or UserID is undefined.");
            return;
        }
        
        const userRef = doc(db, "users", UserID);
        const categoryRef = doc(userRef, "ingredients", category); 
    
        try {
            // Update the document to set the item's value to false
            await setDoc(categoryRef, { [key]: false }, { merge: true });
    
            // Update local state to re-render the component
            setState(prevState => {
                // Clone the category items and set the item's value to false
                const updatedCategoryItems = { ...prevState[category.toLowerCase()], [key]: false };
                // Clone the entire state and update the category items
                return { ...prevState, [category.toLowerCase()]: updatedCategoryItems };
            });
            console.log(key + " set to false successfully.");
        } catch (error) {
            console.error("Error updating item status: ", error);
        }
    };
    const renderContent = (category) => {
        const items = state[category.toLowerCase()];
        if (!items || Object.keys(items).length === 0) {
            return "Add items to your pantry!";
        }
        return Object.keys(items).filter(key => items[key]).map((key) => ( 
            <div className="AccordionInfo2" key={key}>
                <div>{key}</div>
                <TrashIcon className="trash-icon" onClick={() => deleteItem(key, category)}/>
            </div>
        ));
    };

    return (
        <div className="food-list"> 
            <Accordion className="AccordionRoot" type="single">
                {categories.map((category) => (
                    <AccordionItem key={category} value={category.toLowerCase()} data-state={activeAccordion === category.toLowerCase() ? 'open' : 'closed'}>
                        <AccordionTrigger className="sticky-line">
                            <div>{category}</div>
                        </AccordionTrigger>
                        <AccordionContent>
                            {renderContent(category)}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}

export default FoodList;