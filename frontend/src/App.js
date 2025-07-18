// // import CreateForm from './components/FormCreate';
// import CreateForm from './components/FormCreate';
// import Allforms from './components/AllForms';
// import ViewForm from './components/ViewForm';
// import './App.css';
// import { Route,Routes } from 'react-router-dom';
// import Home from './components/Home';


// function App() {
//   return (
//     <div className="min-h-screen bg-gray-100 text-gray-800" >
//       <Routes>
//         <Route path='/' element={<Home/>} />
//         <Route path='/forms' element={<Allforms/>} />
//         <Route path='/form' element={<CreateForm/>} />
//         <Route path='/edit/:id' element={<CreateForm/>}/>
//         <Route path='/view/:id' element={<ViewForm/>}/>
//       </Routes>
//       {/* <Allforms/>
//       <CreateForm/> */}
//     </div>
//   );
// }

// export default App;
// App.js
import CreateForm from './components/FormCreate';
import Allforms from './components/AllForms';
import ViewForm from './components/ViewForm';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';

function App() {
  return (
   <div className="min-h-screen w-screen bg-gray-50">

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/forms' element={<Allforms />} />
        <Route path='/form' element={<CreateForm />} />
        <Route path='/edit/:id' element={<CreateForm />} />
        <Route path='/view/:id' element={<ViewForm />} />
      </Routes>
    </div>
  );
}

export default App;
