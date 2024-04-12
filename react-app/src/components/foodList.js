import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/accordion";

function FoodList() {
    return (
        <div className="food-list"> 
            <Accordion className="AccordionRoot" type="multiple">
                <AccordionItem value="proteins">
                        <div className="AccordionInfo sticky-line">
                            Proteins
                            <AccordionTrigger className="first-level" />
                        </div>
                    <AccordionContent>
                        <div className="AccordionInfo2">
                            list of proteins
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="vegetables">
                    <div className="AccordionInfo sticky-line">
                        Vegetables
                        <AccordionTrigger className="first-level" />
                    </div>
                <AccordionContent>
                    list of vegetables
                </AccordionContent>
                </AccordionItem>
                <AccordionItem value="fruits">
                        <div className="AccordionInfo sticky-line">
                            Fruits
                            <AccordionTrigger className="first-level" />
                        </div>
                    <AccordionContent>
                        list of fruits
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="dairy">
                        <div className="AccordionInfo sticky-line">
                            Dairy
                            <AccordionTrigger className="first-level" />
                        </div>
                    <AccordionContent>
                        list of dairy
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="grains">
                        <div className="AccordionInfo sticky-line">
                            Grains
                            <AccordionTrigger className="first-level" />
                        </div>
                    <AccordionContent>
                        list of grains
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="basic">
                        <div className="AccordionInfo sticky-line">
                            Basic Ingredients
                            <AccordionTrigger className="first-level" />
                        </div>
                    <AccordionContent>
                        list of basic
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="other">
                        <div className="AccordionInfo sticky-line">
                            Other
                            <AccordionTrigger className="first-level" />
                        </div>
                    <AccordionContent>
                        list of other
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default FoodList;