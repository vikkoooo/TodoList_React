import { ReactElement } from "react";
import { TodoList } from "./TodoList";
import { data } from "../index.ts";

export function App(): ReactElement {
	return (
		<TodoList taskList={data} />
	);
}
