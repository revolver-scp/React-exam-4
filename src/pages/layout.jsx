import React from 'react'
import useDarkMode from '../hooks/useDarkSide'
import { Outlet } from 'react-router-dom'
const layout = () => {
    const [isDarkmode, toggleDarkMode] = useDarkMode()
    return (
        <>
        <div className='pt-4 justify-between flex items-center max-w-[1200px] m-auto '>
            <h1 className='text-3xl py-2 rounded-md px-4 text-black dark:text-black'>User List</h1>
            <button
                onClick={toggleDarkMode}
                className="dark:bg-black px-4 py-2 rounded-md bg-blue-500 text-white "
            >
                {isDarkmode ? "Light Mode" : "Dark Mode"}
            </button>
        </div>
      <Outlet/>
        </>
    )
}
export default layout