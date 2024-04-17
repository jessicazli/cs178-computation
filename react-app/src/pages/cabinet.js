import { Dialog, DialogTrigger, DialogPortal, DialogOverlay, DialogContent, DialogCloseButton } from "../components/dialog";
import FoodList from "../components/foodList";

function Cabinet() {
  return (
    <div>
      <h2 className="page-title">My Pantry</h2>
      <div className="row">
        <div className="col-6 text-center">insert svg here</div>
        <div className="col-6 text-center">
          <Dialog>
            <DialogTrigger>
                <button type="button" class="btn btn-success">add grocery haul</button>
            </DialogTrigger>
            <DialogPortal>
                <DialogOverlay className="DialogOverlay"/>
                <DialogContent className="DialogContent">
                    hihihihi
                    <DialogCloseButton className="IconButton"/>
                </DialogContent>
            </DialogPortal>
          </Dialog>
          <FoodList />
        </div>
      </div>

    </div>
  );
}   

export default Cabinet;