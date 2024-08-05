export const data: ITodo[] = [
	{ id: 1, task: "koda", isCompleted: false },
	{ id: 2, task: "springa", isCompleted: false },
	{ id: 3, task: "laga middag", isCompleted: false },
	{ id: 4, task: "handla", isCompleted: false }
];

export interface ITodo {
	id: number;
	task: string;
	isCompleted: boolean;
}