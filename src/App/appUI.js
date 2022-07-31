import React from 'react';
import {TodoCounter} from '../TodoCounter';
import {TodoSearch} from '../TodoSearch';
import {TodoList} from '../TodoList';
import {TodoItem} from '../TodoItem';
import {CreateTodoButton} from '../CreateTodoButton';



function AppUI ({
        loading,
        error,
        totalTodos, 
        completedTodos, 
        searchValue, 
        setSearchValue, 
        searchedTodos, 
        completeTodo, 
        deleteTodo, 
}){

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
        {/* Mostramos un mensaje en caso de que ocurra algún error */}
        {error && <p>Desespérate, hubo un error...</p>}
        {/* Mostramos un mensaje de cargando, cuando la aplicación está cargando lo sdatos */}
        {loading && <p>Estamos cargando, no desesperes...</p>}
         {/* Si terminó de cargar y no existen TODOs, se muestra un mensaje para crear el primer TODO */}
        {(!loading && !searchedTodos.length) && <p>¡Crea tu primer TODO!</p>}
          
          
          {searchedTodos.map(todo => (
            <TodoItem 
                key={todo.text} 
                text={todo.text} 
                completed={todo.completed}
                onComplete = {()=>completeTodo(todo.text)} // le paso el key como argumento
                onDelete = {()=>deleteTodo(todo.text)} // le paso el key como argumento
            />
          ))}
        </TodoList>
        <CreateTodoButton/>
        
    </React.Fragment>
    )
}

export{AppUI}; 