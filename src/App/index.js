import React from "react";
import { AppUI } from "./appUI";


// const defaultTodos = [
//   {text:'cortar cebolla', completed: true},
//   {text:'comprar pan', completed: false},
//   {text:'terminar la tarea', completed: false}
// ]

function useLocalStorage (itemName, initialValue){
    //traemos nuestros TODOs almacenados
    const localStorageItem = localStorage.getItem(itemName);
    let parsedItem;

    if(!localStorageItem){
  //si el usuario es nuevo no existe un item en localStorage, por lo tanto guardamos un arrav vacio []
          localStorage.setItem(itemName,JSON.stringify(initialValue));
          parsedItem = initialValue;
    } else {  //si existen TODOs en el localStorage los regresamos como nuestros todos
          parsedItem = JSON.parse(localStorageItem)
    }

    //guardamos nuestros TODOs del localStorage en nuestro estado
    const [item,setItem] = React.useState(parsedItem); 

    // se crea la funcion para actualizar nuestro localStorage
    const saveItem = (newItem) => {
          const stringifiedItem = JSON.stringify(newItem);// convertimos a string
          localStorage.setItem(itemName,stringifiedItem);// los guardamos
          setItem(newItem); //actualizamos el estado de nuestros TODOs
  }; 

  return [
    item, //recibir lo que quiera guarfar en localStorage
    saveItem //actualizar lo que quiera guarfar en localStorage
  ];
}

function App() {
  
  const [todos,saveTodos] = useLocalStorage('TODOS_V1',[]); //cuando se creo el custom Hook

  
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
 