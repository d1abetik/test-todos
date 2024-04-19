import {ITodo} from "./TodosComponent.tsx";
import CardItem from "./ui/CardItem.tsx";
import './todos-list.scss';

interface TodoListComponentProps {
	show: boolean;
	filter: string;
	allTodos: ITodo[];
	setTodos: (todos: ITodo[]) => void;
}

function TodoListComponent({show, allTodos, setTodos, filter}: TodoListComponentProps) {
	const filteredTodos = () => {
		const todosNew = allTodos.filter((todo: ITodo) => {
			if (filter === 'all') {
				return true;
			} else if (filter === 'open' && todo.status === 'open') {
				return true;
			} else if (filter === 'closed' && todo.status === 'closed') {
				return true;
			}
			return false;
		});
		return todosNew;
	};

	const handleRemove = (id: number) => {
		const newTodos:ITodo[] = allTodos.filter((todo: ITodo) => todo.id !== id);
		setTodos(newTodos);
		localStorage.setItem('todos', JSON.stringify(newTodos));
	}

	const handleSetStatus = (id:number) => {
		const newTodos = allTodos.map((todo: ITodo) => {
			if (todo.id === id) {
				return { ...todo, status: todo.status === 'open' ? 'closed' : 'open' };
			}
			return todo;
		});
		setTodos(newTodos);
		localStorage.setItem("todos", JSON.stringify(newTodos));
	}

	return(
		<ul className='container-ul' hidden={show}>
			{filteredTodos().map(({ value, id, status }: ITodo) => (
					<li key={id} id={id.toString()}>
						<CardItem value={value} status={status} id={id} handleSetStatus={handleSetStatus} handleRemove={handleRemove} />
					</li>
				)
			)}
		</ul>
	)
}

export default TodoListComponent