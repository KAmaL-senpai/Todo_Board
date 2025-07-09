// KanbanColumn.jsx
import { Droppable } from "@hello-pangea/dnd";
import KanbanTask from "./KanbanTask";

const KanbanColumn = ({
  status,
  tasks,
  users,
  currentUser,
  flippedTaskIds,
  setTasks,
  setFlippedTaskIds,
  allTasks,
}) => {
  return (
    <Droppable droppableId={status}>
      {(provided) => (
        <div
          className="kanban-column"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h3>{status}</h3>
          {tasks.map((task, index) => (
            <KanbanTask
              key={task._id}
              task={task}
              index={index}
              users={users}
              currentUser={currentUser}
              flippedTaskIds={flippedTaskIds}
              setTasks={setTasks}
              setFlippedTaskIds={setFlippedTaskIds}
              tasks={allTasks}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default KanbanColumn;
