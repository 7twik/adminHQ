import React from 'react'
import './App.css'
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
function App() {
  const [edit,setEdit] = React.useState(false)
  const [editid,setEditid] = React.useState('')
  const [data, setData] = React.useState([])
  const [show, setShow] = React.useState([])
  const [original, setOriginal] = React.useState([])
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  React.useEffect(() => {
    setShow(data.slice((page - 1) * 10, page * 10))
  }, [page,data])
  React.useEffect(() => {
    fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
      .then((response) => response.json())
      .then((json) => {
        setOriginal(json)
        setData(json)})
      
  }, [])
  const nameChange = (event,id) => {
    const newData = data.map((i) => {
      if(i.id===id){
        return {...i,name:event.target.value}
      }
      return i
    })
    setData(newData)
  }
  const emailChange = (event,id) => {
    const newData = data.map((i) => {
      if(i.id===id){
        return {...i,email:event.target.value}
      }
      return i
    })
    setData(newData)
  }
  const roleChange = (event,id) => {
    const newData = data.map((i) => {
      if(i.id===id){
        return {...i,role:event.target.value}
      }
      return i
    })
    setData(newData)
  }

  const handleEdit = (id) => {
    console.log(id)
    edit ? setEdit(false) : setEdit(true)
    setEditid(id)
  }
  const handleDelete = (item) => {
    console.log(item)
    const newData = data.filter((i) => i.id !== item)
    setData(newData)
    setOriginal(newData)
  }
  const handleName = (e) => {
    if(e.target.value===''){
      setData(original)
    }
    const newData = data.filter((i) => i.name.includes(e.target.value))
    setData(newData)
  }
  const handleEmail = (e) => {
    if(e.target.value===''){
      setData(original)
    }
    const newData = data.filter((i) => i.email.includes(e.target.value))
    setData(newData)
  }
  const handleRole = (e) => {
    if(e.target.value===''){
      setData(original)
    }
    const newData = data.filter((i) => i.role.includes(e.target.value))
    setData(newData)
  }
  const reset = () => {
    setData(original)
  }
  return (
    <>
    <Table>
        <Thead>
        
          <Tr>
            <Th className='tbord'><input placeholder='name' onChange={handleName} /></Th>
            <Th className='tbord'><input placeholder='email' onChange={handleEmail} /></Th>
            <Th  className='tbord'><input placeholder='role' onChange={handleRole} /></Th>
            <Th  className='tbord'><button onClick={reset}>Reset</button></Th>          
          </Tr>
        </Thead>
        </Table>
        <Table>
        <Thead>
        
          <Tr>
            <Th className='tbord'>Name</Th>
            <Th className='tbord'>Email</Th>
            <Th  className='tbord'>Role</Th>
            <Th  className='tbord'>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {show.map((item) => (
            <Tr key={item.id}>
              <Td className='tbord'><>{!(edit&&(editid===item.id))? <>{item.name}</>:<>
              <input value={item.name} onChange={(event)=>{nameChange(event,item.id)}} /></>}</></Td>
              <Td className='tbord'><>{!(edit&&(editid===item.id))? <>{item.email}</>:<>
              <input value={item.email} onChange={(event)=>{emailChange(event,item.id)}} /></>}</></Td>
              <Td className='tbord'><>{!(edit&&(editid===item.id))? <>{item.role}</>:<>
              <input value={item.role} onChange={(event)=>{roleChange(event,item.id)}} /></>}</></Td>
              <Td className='tbord'>
                <button onClick={()=>{handleEdit(item.id)}}>{(edit&&(editid===item.id))?<GiConfirmed />: <FaEdit />}</button>
                <button onClick={()=>{handleDelete(item.id)}}><MdDelete /></button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <div style={{display:"flex",justifyContent:"center",marginTop:"10vh"}}>
      <Typography>Page: {page}</Typography>
      <Pagination count={10} page={page} onChange={handleChange} />
      </div>
    </>
  )
}

export default App
