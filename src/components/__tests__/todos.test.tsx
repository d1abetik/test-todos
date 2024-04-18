import {render} from '@testing-library/react';
import TodoListComponent from "../TodoListComponent.tsx";
import {describe, expect, test, vi} from "vitest";

const mockTodos = [
	{ id: 1, value: 'Todo 1', status: 'open' },
	{ id: 2, value: 'Todo 2', status: 'closed' },
	{ id: 3, value: 'Todo 3', status: 'open' }
];

describe('Todos Tests', function () {

	test('filters & render work correctly', () => {
		const { getByText, queryByText } = render(<TodoListComponent show={true} filter={"closed"} allTodos={mockTodos} setTodos={vi.fn()} />);

		const openTodo = getByText('Todo 2');
		expect(openTodo).toBeTruthy();

		const closedTodo1 = queryByText('Todo 1');
		const closedTodo2 = queryByText('Todo 3');
		expect(closedTodo1).toBeNull();
		expect(closedTodo2).toBeNull();
	})

	test('render-todos', () => {
		const { getAllByText } = render(<TodoListComponent show={true} filter="all" allTodos={mockTodos} setTodos={vi.fn()} />);

		mockTodos.forEach(todo => {
			const todoElement = getAllByText(todo.value);
			expect(todoElement.length).toBeGreaterThan(0);
		});
	})

})