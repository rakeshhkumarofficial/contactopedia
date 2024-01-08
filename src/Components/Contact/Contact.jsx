import React from 'react'

const Contact = (props) => {
  return (
    <>
       <td>
        {props.contact.name}
      </td>
      <td>
        {props.contact.email}
      </td>
      <td>
        {props.contact.phone}
      </td>
      <td> 
      <button onClick={()=>props.favouriteClick(props.contact)} className='btn btn-light'><i className={props.contact.isFavourite ? `bi bi-star-fill text-warning` : `bi bi-star-fill text-dark`}></i></button>
      </td>
      <td>
        <button className='btn btn-sm btn-danger' onClick={()=>props.handleDelete(props.contact.id)}><i className="bi bi-trash-fill"></i></button>
        <button className='btn btn-sm btn-primary ms-2' onClick={()=>props.handleUpdateClick(props.contact)}><i className="bi bi-pencil-square"></i></button>
      </td>
    </>
  )
}

export default Contact