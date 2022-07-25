import React from "react";
import { AppUI } from "./appUI";


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
//completando TODO
  const completeTodo = (text) =>{
      const todoIndex = todos.findIndex(todo=>todo.text === text);
      const newTodos = [...todos];

      newTodos[todoIndex].completed = true;
      setTodos(newTodos);
  };

//elimiinando TODOs
  const deleteTodo = (text) =>{
    const todoIndex = todos.findIndex(todo=>todo.text === text);
    const newTodos = [...todos];

    newTodos.splice(todoIndex,1);
    setTodos(newTodos);
  };


  return (
    <AppUI
        totalTodos = {totalTodos}
        completedTodos = {completedTodos}
        searchValue = {searchValue}
        setSearchValue = {setSearchValue}
        searchedTodos = {searchedTodos}
        completeTodo ={completeTodo}
        deleteTodo ={deleteTodo}
    />
  );
}

export default App;
 