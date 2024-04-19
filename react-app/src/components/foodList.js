import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/accordion";
import { auth, db } from '../config/Firebase';
import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';

function FoodList({ activeAccordion }) {
    console.log('active:' + activeAccordion);

    const categories = ["Proteins", "Vegetables", "Fruits", "Dairy", "Grains", "Basics", "Other"];
    const [state, setState] = useState({});

    useEffect(() => {
        let ignore = false;

        async function fetchIngredients() {
            const userRef = doc(db, "users", global.UserID);

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

    const renderContent = (category) => {
        const items = state[category.toLowerCase()];
        if (!items || Object.keys(items).length === 0) {
            return "No items in pantry!";
        }
        return Object.keys(items).map((key) => (
            <div className="AccordionInfo2" key={key}>
                - {key}
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