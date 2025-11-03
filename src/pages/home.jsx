import axios from 'axios'
import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from "react-router-dom";
const home = () => {
  const [data, setData] = useState([])
  const [name, setName] = useState("")
  const [name2, setName2] = useState("")
  const [desc, setDesc] = useState("")
  const [desc2, setDesc2] = useState("")
  const [file, setFile] = useState([])
  const [file2, setFile2] = useState([])
  const [stat, setStat] = useState(true)
  const [stat2, setStat2] = useState(true)
  const [id, setId] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  }
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const Api = "https://to-dos-api.softclub.tj/api/to-dos";
  const imagese = "https://to-dos-api.softclub.tj/images";
  async function getData(params) {
    try {
      let res = await axios(Api)
      setData(res.data.data || res.data)
    } catch (error) {
      console.error(error);
    }
  }
  async function delet(id) {
    try {
      await axios.delete(`${Api}?id=${id}`)
      await getData()
    } catch (error) {
      console.error(error);

    }
  }
  async function check(id) {
    try {
      await axios.put(`https://to-dos-api.softclub.tj/completed?id=${id}`)
      getData()
    } catch (error) {
      console.error(error);
    }
  }
  async function addUser(e) {
    e.preventDefault()
    let formdate = new FormData()
    formdate.append("name", name)
    formdate.append("description", desc)
    formdate.append("isCompleted", stat)
    for (let i = 0; i < file.length; i++) {
      formdate.append("images", file[i])
    }
    try {
      await axios.post(Api, formdate)
      getData()
    } catch (error) {
      console.error(error);
    }
  }
  async function addUser2(e) {
    e.preventDefault()
    let newuser = {name: name2, description: desc2, id:id}
    try {
      await axios.put(Api, newuser)
      getData()
    } catch (error) {
      console.error(error);
    }
    setIsModalOpen(false)
  }
  async function deletImg(id) {
    try {
      await axios.delete(`https://to-dos-api.softclub.tj/api/to-dos/images/${id}`)
      getData()
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <div className=' max-w-[1200px] m-auto'>
      <nav>
        <form onSubmit={addUser}>
          <input onInput={(e) => setName(e.target.value)} value={name} className='border-2 border-black p-2 rounded-xl mx-2 my-4' type="text" placeholder='name' />
          <input onInput={(e) => setDesc(e.target.value)} value={desc} className='border-2 border-black p-2 rounded-xl mx-2 my-4' type="text" placeholder='description' />
          <select className='border-2 border-black p-2 rounded-xl mx-2 my-4' onChange={(e) => setStat(e.target.value)}>
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </select>
          <input onChange={(e) => setFile(e.target.files)} type="file" multiple />
          <button className='bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white' type='submit'>Add</button>
        </form>
      </nav>
      <div className="carts">
        {data.map((e) => {
          return (
            <div key={e.id} className="cart shadow-2xl rounded-xl p-6  ">
              <h1 className='text-2xl'>{e.name}</h1>
              <p className='text-[17px]'>{e.description}</p>
              <Link to={`/about/${e.id}`} className="bg-blue-500 text-white px-2 py-1 rounded">Info</Link>
              <h1 className={e.isCompleted ? "bg-green-500 text-green-900 inline-block p-2 rounded" : "bg-red-500 text-red-900 inline-block p-2 rounded"}>{e.isCompleted ? "Active" : "Inactive"}</h1>
              {e.images.map((elem) => {
                return (
                  <div key={elem.id}>
                    <img src={`${imagese}/${elem.imageName}`} className='flex justify-self-center object-cover w-[100px]' alt="" />
                    <button onClick={() => deletImg(elem.id)} className='bg-red-500 text-white p-2 rounded'>Del img</button>
                  </div>
                )
              })}
              <button className='text-red-700 text-3xl ' onClick={() => delet(e.id)}>Delete</button>
              <input type="checkbox" checked={e.isCompleted} onChange={() => check(e.id)} />
              <button onClick={() => { setId(e.id); setDesc2(e.description); setName2(e.name); showModal(); }}>Edit</button>
              <Modal
                title="Basic Modal"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={addUser2}
                onCancel={handleCancel}
              >
                <input onInput={(e) => setName2(e.target.value)} value={name2} className='border-2 border-black p-2 rounded-xl mx-2 my-4' type="text" placeholder='name' />
                <input onInput={(e) => setDesc2(e.target.value)} value={desc2} className='border-2 border-black p-2 rounded-xl mx-2 my-4' type="text" placeholder='description' />
              </Modal>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default home