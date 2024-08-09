import { ReactElement } from "react";
import { useOutletContext } from "react-router-dom";
import { ITodoContext } from "../interfaces";

export function AboutPage(): ReactElement {
	const { counter } = useOutletContext<ITodoContext>();

	return (
		<div className="about-page">
			<p className="about-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia fugit assumenda architecto nam dicta a vitae distinctio numquam. Nesciunt vitae saepe explicabo alias. Quisquam, quae omnis pariatur sed magnam corporis?</p>
			<label className="task-counter">Current number of todos: {counter}</label>
		</div>
	);
}