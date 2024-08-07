import { ReactElement } from "react";
import { ITodo } from "../interfaces";
import { TodoTask } from "../components/TodoTask";

interface TodoListPageProps {
	taskList: ITodo[];
	handleTaskClick: (todo: ITodo) => void;
	handleDeleteClick: (todo: ITodo) => void;
}

export function TodoListPage(): ReactElement {
	return (
		<ol className="task-list">
			{//props.taskList.map((element) => (
				//<TodoTask key={element.id} todoTask={element} handleTaskClick={props.handleTaskClick} handleDeleteClick={props.handleDeleteClick} />
				//))
			}
		</ol>
	);
}