import React, {FC, useRef, useState} from 'react';

const EventsExample: FC = () => {
  
  const [value, setValue] = useState<string>('')
  const [isDrag, setIsDrag] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Управляемый: ', value)
    console.log('Не управляемый: ', inputRef.current?.value)
  }

  // first div drag handler
  const dragHandler = (e: React.DragEvent<HTMLDivElement>) => {
    //console.log('dragged')
  }

  // second div drag handlers
  const dragWithPreventHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDrag(true)
  }

  const leaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDrag(false)
  }

  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDrag(false)
  }

  return (
    <div style={{display: 'flex', alignItems: 'center'}}>

        <div style={{display: 'flex', flexFlow: 'column nowrap'}}>
          <input value={value} onChange={changeHandler} type='text' placeholder='Управляемый'/>
          <input ref={inputRef} type='text' placeholder='Не управляемый'/>
          <button style={{marginTop: 15}} onClick={clickHandler}>Вывести в логи</button>
        </div>

      <div style={{display: 'inline-flex', marginLeft: 15}}>
        <div onDrag={dragHandler} draggable style={{width: 100, height: 100, background: 'skyblue'}}>Drag me to green div</div>
        <div
          onDrop={dropHandler}
          onDragLeave={leaveHandler}
          onDragOver={dragWithPreventHandler}
          style={{width: 100, height: 100, background: isDrag ? 'skyblue' : 'lightgreen', marginLeft: 15}}>Yeah, right here!</div>
      </div>

    </div>
  );
}

export default EventsExample;