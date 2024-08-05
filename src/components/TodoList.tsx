import { ReactElement } from "react";
import { ITodo } from "../interfaces";
import { TodoTask } from "./TodoTask";

interface TodoListProps {
	taskList: ITodo[]
}

export function TodoList(props: TodoListProps): ReactElement {
	return (
		<main>
			<h1>TODO List</h1>
			<ol>
				{props.taskList.map((element) => (
					<TodoTask key={element.id} todoTask={element} />
				))}
			</ol>
		</main>
	);
}