import FoodList from "../components/foodList";

function Cabinet() {
  return (
    <div>
      <h2 className="page-title">My Pantry</h2>
      <div className="row">
        <div className="col-6 text-center">insert svg here</div>
        <div className="col-6 text-center">
            <button type="button" class="btn btn-success">add grocery haul</button>
            <FoodList />
        </div>
      </div>

    </div>
  );
}   

export default Cabinet;