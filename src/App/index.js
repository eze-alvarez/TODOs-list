import React from "react";
import { AppUI } from "./appUI";


// const defaultTodos = [
//   {text:'cortar cebolla', completed: true},
//   {text:'comprar pan', completed: false},
//   {text:'terminar la tarea', completed: false}
// ]

function App() {
//traemos nuestros TODOs almacenados
  const localStorageTodos = localStorage.getItem('TODOS_V1');
  let parsedTodos;

  if(!localStorageTodos){
//si el usuario es nuevo no existe un item en localStorage, por lo tanto guardamos un arrav vacio []
    localStorage.setItem('TODOS_V1',JSON.stringify([]));
    parsedTodos = [];
  } else {  //si existen TODOs en el localStorage los regresamos como nuestros todos
    parsedTodos = JSON.parse(localStorageTodos)
  }

  //guardamos nuestros TODOs del localStorage en nuestro estado
  const [todos,setTodos] = React.useState(parsedTodos); 
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
    }); 
  };

// se crea la funcion para actualizar nuestro localStorage
  const saveTodos = (newTodos) => {
    const stringifiedTodos = JSON.stringify(newTodos);// convertimos a string
    localStorage.setItem('TODOS_V1',stringifiedTodos);// los guardamos
    setTodos(newTodos); //actualizamos el estado de nuestros TODOs
}; 
  
//completando TODO
  const completeTodo = (text) =>{
      const todoIndex = todos.findIndex(todo=>todo.text === text);
      const newTodos = [...todos];

      newTodos[todoIndex].completed = true;
// Cada que el usuario interactúe con nuestra aplicación se guardarán los TODOs con nuestra nueva función
      saveTodos(newTodos);
  };

//elimiinando TODOs
  const deleteTodo = (text) =>{
    const todoIndex = todos.findIndex(todo=>todo.text === text);
    const newTodos = [...todos];

    newTodos.splice(todoIndex,1);
// Cada que el usuario interactúe con nuestra aplicación se guardarán los TODOs con nuestra nueva función    
    saveTodos(newTodos);
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
 