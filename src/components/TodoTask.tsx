import { ReactElement } from "react";
import { ITodo } from "..";

interface TodoTaskProps {
	todoTask: ITodo
}

export function TodoTask(prop: TodoTaskProps): ReactElement {
	return (
		<li>{prop.todoTask.task}
			{prop.todoTask.isCompleted ?
				<span className="material-symbols-outlined">task_alt</span> : <span className="material-symbols-outlined">circle</span>}
		</li>
	);
}