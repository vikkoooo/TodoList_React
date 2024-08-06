import { ReactElement } from "react";
import { ITodo } from "../interfaces";

interface TodoTaskProps {
	todoTask: ITodo;
	handleTaskClick: (todo: ITodo) => void;
}

export function TodoTask(props: TodoTaskProps): ReactElement {
	return (
		<li>{props.todoTask.task}
			{props.todoTask.isCompleted
				? <span className="material-symbols-outlined" onClick={() => props.handleTaskClick(props.todoTask)}>task_alt</span>
				: <span className="material-symbols-outlined" onClick={() => props.handleTaskClick(props.todoTask)}>circle</span>}
		</li >
	);
}