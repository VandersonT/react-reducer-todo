/*-------------------------IMPORTS-------------------------*/
  import { ChangeEvent, useState } from 'react'
  import { useTodoList } from './reducers/todoList';
  import trashIcon from './assets/trash.svg';
/*---------------------------------------------------------*/

function App() {

  const [ list, dispatch ] = useTodoList();
  const [ currentNote, setCurrentNote ] = useState('');


  /*----------------------FUNCTIONS------------------------*/
    const currentNoteChange = (e:ChangeEvent<HTMLInputElement>) => {
      setCurrentNote(e.target.value);
    }

    const addNewNote = () => {
      if(currentNote){
        dispatch({
          type: 'ADD',
          payload: {
            txt: currentNote
          }
        })
        setCurrentNote('');
      }else{
        alert('Não envie notas vazias.')
      }

    }

    const changeStatus = (id: string, index: number) => {
      
      //Check the current state and switch to the opposite*
      let isMarked = list[index].done ? false : true;
      
      dispatch({
        type: 'CHANGE',
        payload: {
          id,
          done: isMarked
        }
      })
    }

    const deleteNote = (id: string) => {
      dispatch({
        type: 'DELETE',
        payload: {id}
      })
    }
  /*---------------------------------------------------------*/

  return (
    <div>
      <header className='h-16 bg-blue-400 flex justify-center items-center text-white	'>
        <h1>TO DO LIST</h1>
      </header>

      <main className='mb-10 mt-10 flex flex-col items-center min-h-[calc(100vh-208px)]'>
            <div className='text-xs border-b-2 pb-7 flex flex-col items-center w-full'>
              <input onChange={currentNoteChange} type="text" className='border-2 outline-0 p-2 mt-2 md:text-base' placeholder='Digite alguma tarefa abaixo' value={currentNote}/>
              <button onClick={addNewNote} className='text-xs mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md:text-sm'>Adicionar</button>
            </div>
            
            <div>
              <h4 className='text-lg mb-2 mt-7 text-sky-900 text-center md:text-2xl'>Anote abaixo suas tarefas:</h4>
              <ul className='border-2 p-4 w-72 break-all flex items-center flex-col'>
                {list.map((item, index)=>(
                  <li key={index} className='border-b-2 py-2 flex flex-row items-center select-none text-xs md:text-sm'>
                    <span onClick={()=>changeStatus(item.id, index)} className={item.done ? 'line-through cursor-pointer' : 'cursor-pointer'}>{item.txt}</span>
                    <img className='ml-1 cursor-pointer' onClick={()=>deleteNote(item.id)} src={trashIcon} />
                  </li>
                ))}
                {list.length < 1 &&
                  <p className='text-sm text-slate-600 text-center md:text-base'>Nenhuma tarefa anotada ainda</p>
                }
              </ul>
              <p className='text-xs mt-2 text-teal-900 text-center'>*Clique nas notas para marcar/desmarcar</p>
            </div>
      </main>

      <footer className='text-sm w-full h-16 bg-blue-400 flex justify-center items-center text-white'>
        Made using <a target="_blank" className='ml-1 text-sky-900 hover:underline' href="https://reactjs.org/">react.js</a>, <a target="_blank" className='mx-1 text-sky-900 hover:underline' href="https://www.typescriptlang.org/">typescript</a> and <a target="_blank" className='mx-1 text-sky-900 hover:underline' href="https://tailwindcss.com/"> tailwind</a>
      </footer>
    </div>
  )
}

export default App
