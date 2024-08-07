export interface ITodo {
	id: number;
	task: string;
	isCompleted: boolean;
	timestamp: Date;
	author: string;
}

export interface ITodoContext {
	taskList: ITodo[];
	handleTaskClick: (todo: ITodo) => void;
	handleDeleteClick: (todo: ITodo) => void;
	handleTaskAdd: (newTaskInput: string, author: string) => void;
}