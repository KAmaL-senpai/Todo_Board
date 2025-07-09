import { Link } from "react-router-dom";


const Sidebar = () => {
  return (
    <div className="sidebar">
      
      <Link to="/addtask" className="task-menu">
        Add Task
      </Link>
      <Link to="/updatetask" className="task-menu">
        Update Task
      </Link>
      <Link to="/deletetask" className="task-menu">
        Delete Task
      </Link>
      <Link to="/alltask" className="task-menu">
        All Tasks
      </Link>
    </div>
  );
};

export default Sidebar;
