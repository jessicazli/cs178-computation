import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/accordion";
import { auth, db } from '../config/Firebase';
import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { TrashIcon } from "@radix-ui/react-icons";

function FoodList({ activeAccordion, setValue }) {
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

        const filteredItems = items ? Object.keys(items).filter(key => items[key] === true) : [];

        if (!filteredItems.length) {
            return <div className="empty-message">Add items to your pantry!</div>;
        }

        return filteredItems.map((key) => (
            <div className="AccordionInfo2" key={key}>
                <div>{key}</div>
                <TrashIcon className="trash-icon" onClick={() => deleteItem(key, category)}/>
            </div>
        ));
    };

    return (
        <div className="food-list"> 
<<<<<<< HEAD
            <Accordion className="AccordionRoot" type="multiple">
                <AccordionItem value="proteins" data-state={activeAccordion === 'proteins' ? 'open' : 'closed'}>
                    <div className="AccordionInfo sticky-line">
                        Proteins
                        <AccordionTrigger className="first-level" />
                    </div>
                    <AccordionContent>
                        <div className="AccordionInfo2">
                            - Eggs
                        </div>
                        <div className="AccordionInfo2">
                            - Beef
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="vegetables" data-state={activeAccordion === 'vegetables' ? 'open' : 'closed'}>
                    <div className="AccordionInfo sticky-line">
                        Vegetables
                        <AccordionTrigger className="first-level" />
                    </div>
                    <AccordionContent>
                        <div className="AccordionInfo2">
                            - Broccoli
                        </div>
                        <div className="AccordionInfo2">
                            - Carrots
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="fruits" data-state={activeAccordion === 'fruits' ? 'open' : 'closed'}>
                    <div className="AccordionInfo sticky-line">
                        Fruits
                        <AccordionTrigger className="first-level" />
                    </div>
                    <AccordionContent>
                        <div className="AccordionInfo2">
                            - Pineapple
                        </div>
                        <div className="AccordionInfo2">
                            - Apples
                        </div>
                        <div className="AccordionInfo2">
                            - Watermelon
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="dairy" data-state={activeAccordion === 'dairy' ? 'open' : 'closed'}>
                    <div className="AccordionInfo sticky-line">
                        Dairy
                        <AccordionTrigger className="first-level" />
                    </div>
                    <AccordionContent>
                        <div className="AccordionInfo2">
                            - Milk
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="grains" data-state={activeAccordion === 'grains' ? 'open' : 'closed'}>
                    <div className="AccordionInfo sticky-line">
                        Grains
                        <AccordionTrigger className="first-level" />
                    </div>
                    <AccordionContent>
                        <div className="AccordionInfo2">
                            - Pasta
                        </div>
                        <div className="AccordionInfo2">
                            - Rice
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="essentials" data-state={activeAccordion === 'essentials' ? 'open' : 'closed'}>
                    <div className="AccordionInfo sticky-line">
                        Essentials
                        <AccordionTrigger className="first-level" />
                    </div>
                    <AccordionContent>
                        {Object.keys(essentials).map((key) => (
                            <div className="AccordionInfo2" key={key}>
                                - {key}
                            </div>
                        ))}
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="other" data-state={activeAccordion === 'other' ? 'open' : 'closed'}>
                    <div className="AccordionInfo sticky-line">
                        Other
                        <AccordionTrigger className="first-level" />
                    </div>
                    <AccordionContent>
                        <div className="AccordionInfo2">
                            - Honey
                        </div>
                    </AccordionContent>
                </AccordionItem>
=======
            <Accordion className="AccordionRoot" type="single" value={activeAccordion} onValueChange={setValue}>
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
>>>>>>> e4a65b675f2214c92da368ab700cb8c285272028
            </Accordion>
        </div>
    );
}

export default FoodList;