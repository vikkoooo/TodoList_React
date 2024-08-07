import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { App } from "./components/App";
import { TodoListPage } from "./pages/TodoListPage";
import { AddTaskPage } from "./pages/AddTaskPage";

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={< App />}>
			<Route index element={< TodoListPage />} />
			< Route path="add-todo" element={< AddTaskPage />} />
		</Route>
	)
);