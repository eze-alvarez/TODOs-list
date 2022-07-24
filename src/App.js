import React from "react";
import {TodoCounter} from './TodoCounter';
import {TodoSearch} from './TodoSearch';
import {TodoList} from './TodoList';
import {TodoItem} from './TodoItem';
import {CreateTodoButton} from './CreateTodoButton';

// import './App.css';

const defaultTodos = [
  {text:'cortar cebolla', completed: true},
  {text:'comprar pan', completed: false},
  {text:'terminar la tarea', completed: false}
]

function App() {
  //estado inicial de nuestros TODOs
  const [todos,setTodos] = React.useState(defaultTodos); 
   //cantidad de TODOs completados
  const completedTodos = todos.filter(todo => !!todo.completed).length;
  //cantidad total de TODOs
  const totalTodos = todos.length;

  //estado de nuestra busqueda
  const [searchValue,setSearchValue] = React.useState('');
  let searchedTodos = [];
  if(!searchValue.length >=1){
    searchedTodos = todos
  }else{
    searchedTodos = todos.filter(todo => {
            const todoText = todo.text.toLowerCase();
            const searchText = searchValue.toLowerCase();
            return todoText.includes(searchText);
    })

  }


  return (
    <React.Fragment>
        
        <TodoCounter
          total = {totalTodos}
          completed = {completedTodos}
        />

        <TodoSearch
          searchValue = {searchValue}
          setSearchValue = {setSearchValue}
        />
        <TodoList>
          {searchedTodos.map(todo => (
            <TodoItem 
                key={todo.text} 
                text={todo.text} 
                completed={todo.completed}
            />
          ))}
        </TodoList>
        <CreateTodoButton/>
        
    </React.Fragment>
  );
}

export default App;
 