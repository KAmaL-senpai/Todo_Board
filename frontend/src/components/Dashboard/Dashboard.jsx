
import DashNav from "./DashNav";
import KanbanBoard from "./KanbanBoard";
function Dashboard() {
  return (
    <div className="Page-Wrapper">
      <DashNav />
      <div className="main-content">
        <KanbanBoard />
      </div>
    </div>
  );
}
export default Dashboard;
