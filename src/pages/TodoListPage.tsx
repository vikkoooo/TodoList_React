import { ReactElement } from "react";
import { TodoTask } from "../components/TodoTask";
import { ITodo, ITodoContext } from "../interfaces";
import { useOutletContext } from "react-router-dom";

export function TodoListPage(): ReactElement {
	const { taskList, handleTaskClick, handleDeleteClick } = useOutletContext<ITodoContext>(); // context variables instead of interface and prop

	const handleEditClick = (todo: ITodo) => {
		console.log("edit clicked..");
	};

	return (
		<ol className="task-list">
			{taskList.map((element) => (
				<TodoTask
					key={element.id}
					todoTask={element}
					handleTaskClick={handleTaskClick}
					handleDeleteClick={handleDeleteClick}
					handleEditClick={handleEditClick} />
			))}
		</ol>
	);
}