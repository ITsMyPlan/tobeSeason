import { useState , useEffect} from 'react';

function TodoList() {
  const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
  const storedCount = Number(localStorage.getItem('count')) || 0;
  const storedDate = localStorage.getItem('currentDate') || new Date().toDateString();
  const storedTotalCarbs = Number(localStorage.getItem('totalCarbs')) || 0;

  const [todos, setTodos] = useState(storedTodos);
  const [input, setInput] = useState('');
  const [count, setCount] = useState(storedCount);
  const [currentDate, setCurrentDate] = useState(storedDate);
  const [totalCarbs, setTotalCarbs] = useState(storedTotalCarbs);
  const remainingCarbs = totalCarbs - todos.reduce((acc, todo) => acc + parseInt(todo), 0);


  useEffect(() => {
    const today = new Date().toDateString();
    setTotalCarbs(200);
    if (currentDate !== today) {
      setTodos([]);
      setCount(0);
      setCurrentDate(today);
      localStorage.removeItem('todos');
      localStorage.removeItem('count');
    } else {
      localStorage.setItem('todos', JSON.stringify(todos));
      localStorage.setItem('count', count.toString());
      localStorage.setItem('currentDate', currentDate);
      localStorage.setItem('totalCarbs', totalCarbs.toString());
    }
  }, [todos, count, currentDate, totalCarbs]);

  const addTodo = () => {
    if (input.trim() === '' ) {
        alert('Please enter a todo')
        return;
      }

    if(input.typeof !== 'number'){
        alert('Please enter a number')
        return;
      }

    if(todos.length >= 4){
        alert('You can only add 4 todos')
        return;
      }
  if(remainingCarbs - parseInt(input) < 0){
    alert('You have exceeded the daily carb limit')
    return;
  }
    setTodos([...todos, input]);
    setInput('');
    setCount(count + 1);
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-semibold mb-4">{ new Date().toDateString()}</h1>
      <div className="flex flex-col w-80 p-4 bg-white rounded shadow">
        <input
        type='number'
          className="mb-2 border rounded p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="mb-2 p-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600" onClick={addTodo}>
          Add Todo
        </button>
        {todos.map((todo, index) => (
          <div key={index} className="flex justify-between p-2 mb-2 bg-white">
            <div className="flex items-center gap-5">
            <div className="bg-white">{todo}g</div>
            <button className='p-2 bg-gray-200 rounded-xl text-sm hover:bg-gray-300' onClick={() => deleteTodo(index)}>Delete</button>
            </div>
          </div>
        ))}
         {remainingCarbs - parseInt(input) < 0 ? <div className='text-red-500 text-md font-semibold'>
          over limit by {Math.abs(remainingCarbs - parseInt(input))}g</div> :
           <div className='flex gap-2'>Remaining carbs: <div className='text-md font-semibold'>{remainingCarbs}g </div></div>}

           <div className='text-md font-semibold'>Total Count Limit: 4</div>
      </div>
    </div>
  );
}

export default TodoList;