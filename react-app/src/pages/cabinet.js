import { Dialog, DialogTrigger, DialogPortal, DialogOverlay, DialogContent, DialogCloseButton } from "../components/dialog";
import FoodList from "../components/foodList";
import AddGroceries from "../components/addGroceries";
import { useState } from "react";

function Cabinet() {

  // TODO: have to figure out clicking on the images to open the correct accordion

  const [activeAccordion, setActiveAccordion] = useState(null);

  const handleImageClick = (accordionName) => {
    setActiveAccordion(accordionName);
  };

  return (
    <div>
      <h2 className="page-title">My Pantry</h2>
      <div className="row">
        <div className="col-6 text-center">
          <div className="images">
            <img src="/images/shelves.png" alt="shelves" className="shelves"/>
            <div className="proteins" onClick={() => handleImageClick('proteins')}>
              <img src="/images/eggs.png" alt="eggs" className="eggs"/>
              <img src="/images/meatloaf.png" alt="meatloaf" className="meatloaf"/>
            </div>
            <img src="/images/vegetable.png" alt="vegetable" className="vegetable" onClick={() => handleImageClick('vegetables')}/>
            <img src="/images/fruit.png" alt="fruit" className="fruit" onClick={() => handleImageClick('fruits')}/>
            <img src="/images/milk.png" alt="milk" className="milk" onClick={() => handleImageClick('dairy')}/>
            <div className="grains" onClick={() => handleImageClick('grains')}>
              <img src="/images/pasta.png" alt="pasta" className="pasta"/>
              <img src="/images/rice.png" alt="rice" className="rice"/>
            </div>
            <img src="/images/bread.png" alt="bread" className="bread" onClick={() => handleImageClick('essentials')}/>
            <img src="/images/honey.png" alt="honey" className="honey" onClick={() => handleImageClick('other')}/>
          </div>
        </div>
        <div className="col-6 text-center">
          <Dialog>
            <DialogTrigger>
                <button type="button" class="btn btn-success">add grocery haul</button>
            </DialogTrigger>
            <DialogPortal>
                <DialogOverlay className="DialogOverlay"/>
                <DialogContent className="DialogContent">
                    <AddGroceries/>
                    <DialogCloseButton className="IconButton"/>
                </DialogContent>
            </DialogPortal>
          </Dialog>
          <FoodList activeAccordion={activeAccordion} />
        </div>
      </div>

    </div>
  );
}   

export default Cabinet;