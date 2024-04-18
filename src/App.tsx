import './App.css'
import TodosComponent from "./components/TodosComponent.tsx";
import {StoreProvider} from "./components/store.tsx";

function App() {
  return (
    <StoreProvider>
        <span style={{fontSize: '20px'}}>Todos</span>
        <TodosComponent/>
    </StoreProvider>
  )
}

export default App
