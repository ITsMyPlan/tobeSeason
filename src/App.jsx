import './App.css'
import { Button } from './components/common/Button'
import TodoList from './components/common/TodoList'

function App() {
  return (
    <>
      <div className="bg-red-400">
        <TodoList />
        <Button>Click me</Button>
      </div>
    </>
  )
}

export default App
