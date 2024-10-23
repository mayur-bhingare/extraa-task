import "bootstrap/dist/css/bootstrap.min.css";
import MainApp from "./component/MainComp";

import EditUser from "./component/Form";

function App() {


  
  return (
    <>
      <div className="container">
        <div className="row ">
          <MainApp />
          <EditUser />
        </div>
      </div>
    </>
  );
}

export default App;
