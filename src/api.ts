import { ITodo } from "./interfaces";

const url = 'http://localhost:0000/api/todos'; // update

export const getTodos = async (): Promise<ITodo[]> => {
	try {
		const response = await fetch(`${url}`);
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data: ITodo[] = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching todos:', error);
		throw error;
	}
};

export const addTodo = async (todo: ITodo): Promise<ITodo> => {
	try {
		const response = await fetch(`${url}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(todo),
		});
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data: ITodo = await response.json();
		return data;
	} catch (error) {
		console.error('Error adding todo:', error);
		throw error;
	}
};

export const updateTodo = async (id: number, updates: Partial<ITodo>): Promise<ITodo> => {
	try {
		const response = await fetch(`${url}/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updates),
		});
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data: ITodo = await response.json();
		return data;
	} catch (error) {
		console.error('Error updating todo:', error);
		throw error;
	}
};

export const deleteTodo = async (id: number): Promise<void> => {
	try {
		const response = await fetch(`${url}/${id}`, {
			method: 'DELETE',
		});
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return await response.json();
	} catch (error) {
		console.error('Error deleting todo:', error);
		throw error;
	}
};