import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import './Styles/App.css';

import UsersPage from './Pages/Users/UsersPage';
import TodosPage from './Pages/Todos/TodosPage';
import EventsPage from './Pages/Events/EventsPage';
import UserItemPage from './Pages/Users/UserItemPage';
import TodoItemPage from './Pages/Todos/TodoItemPage';

const App = () => {

  return (

    <BrowserRouter>
      <nav>
        <Link to={'/users'}>Пользователи</Link>
        <Link to={'/todos'}>Задачи</Link>
        <Link to={'/events'}>События</Link>
      </nav>

      <main>
        <Routes>
          <Route path='/users' element={<UsersPage/>} />
          <Route path='/users/:id' element={<UserItemPage/>} />

          <Route path='/todos' element={<TodosPage/>} />
          <Route path='/todos/:id' element={<TodoItemPage/>} />

          <Route path='/events' element={<EventsPage/>} />

          <Route path='' element={<EventsPage/>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;