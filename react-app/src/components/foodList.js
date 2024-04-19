import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/accordion";
import { auth, db } from '../config/Firebase';
import { useEffect, useState } from "react";
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore"; 

function FoodList(activeAccordion) {
    console.log('active:' + activeAccordion);

    const [essentials, setEssentials] = useState([]);

    useEffect(() => {
        async function startFetching() {
            // Retrieving data from SessionStorage
            const UserID = sessionStorage.getItem('UserID');

            const userRef = doc(db, "users", UserID);
            const profileRef = doc(userRef,"ingredients", "Basics")

            const docSnap = await getDoc(profileRef);

            if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());

            if (!ignore) {
                setEssentials(docSnap.data());
            }
            } else {
            // docSnap.data() will be undefined in this case
            console.log("No basics!");
            }
        }

        let ignore = false;
        startFetching();
        return () => {
            ignore = true;
        }
    }, []);
     
    return (
        <div className="food-list"> 
            <Accordion className="AccordionRoot" type="single">
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
            </Accordion>
        </div>
    )
}

export default FoodList;