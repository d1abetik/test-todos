import {useEffect, useState} from "react";
import TodoListComponent from "./TodoListComponent.tsx";
import './todos-comp.scss';
import {useStore} from "./store.tsx";

export interface ITodo {
	id: number;
	value: string;
	status: string;
}

const TodosComponent = () => {
	const [value, setValue] = useState<string>('');
	const {status, setStatus, filter, setFilter, allTodos, setAllTodos} = useStore();

	useEffect(() => {
		const fetch = () => {
			const stored = localStorage.getItem("todos");
			const todos: ITodo[] = stored ? JSON.parse(stored) : [];
			setAllTodos(todos);
		}
		fetch();
	}, [setAllTodos]);

	const setTodo = (value: string) => {
		const lastId = allTodos[0] ?? {id: 0};
		allTodos.unshift({id: lastId.id + 1, value, status: 'open'});
		localStorage.setItem("todos", JSON.stringify(allTodos));
	};

	const deleteTodos = () => {
		setAllTodos([]);
		localStorage.removeItem("todos");
	}

	const lengthLeft = allTodos.filter((item:ITodo) => item.status === 'open').length;

	return(
			<div className='container'>
				<div className='flex-container'>
					<button disabled={allTodos.length === 0} onClick={() => setStatus(!status)}>
						<svg width="40" className={status ? 'show' : ''} height="40" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
									d="M175 41.6667L25 41.6666C23.4814 41.6714 21.9927 42.0903 20.6944 42.8781C19.3961 43.666 18.3372 44.793 17.6317 46.1379C16.9263 47.4828 16.601 48.9946 16.6908 50.5107C16.7807 52.0267 17.2823 53.4895 18.1417 54.7416L93.1417 163.075C96.25 167.567 103.733 167.567 106.85 163.075L181.85 54.7417C182.718 53.4921 183.227 52.0286 183.322 50.51C183.417 48.9915 183.093 47.476 182.387 46.1283C181.681 44.7805 180.619 43.652 179.317 42.8655C178.015 42.0789 176.522 41.6643 175 41.6667Z"
									fill="grey"
							/>
						</svg>
					</button>
					<form action="" onSubmit={() => setTodo(value)} className='label-input'>
						<input data-testid='input-submit' autoFocus disabled={filter === 'closed'} placeholder={filter === 'closed' ? 'Choose ALL or ACTIVE filter' : 'Enter your TODO'} type="text" value={value} onChange={(e) => setValue(e.target.value)}/>
					</form>
				</div>
				<TodoListComponent allTodos={allTodos} show={status} setTodos={setAllTodos} filter={filter}/>
				<div className='controller-box'>
					<div style={{paddingLeft: '10px'}}>{`${lengthLeft} todos left`}</div>
					<div className='button-group'>
						<button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : 'def'}>All</button>
						<button onClick={() => setFilter('open')} className={filter === 'open' ? 'active' : 'def'}>Active</button>
						<button onClick={() => setFilter('closed')} className={filter === 'closed' ? 'active' : 'def'} style={{paddingRight: '10px'}}>Closed</button>
					</div>
					<button className='deleteAll' onClick={() => deleteTodos()}>delete ALL</button>
				</div>
			</div>
	)
}

export default TodosComponent;