import React from 'react'
import Contact from './Contact'

const GeneralContact = (props) => {
  return (
    <div className='col-12 bg-light p-2'>
      <div className='row mb-2'>
        <div className='col-4'>
          <h5>General Contact</h5>
        </div>
      </div>
      <div className='row mb-2'>
        <div className='col-12'>
          <table className='table table-bordered table-striped'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Is Favourite</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {props.contactList.map((contact, index)=>(
                <tr>
                  <Contact key={index} contact = { contact }  favouriteClick={props.favouriteClick}  handleDelete = { props.handleDeleteContact }
                   handleUpdateClick = {props.handleUpdateClick}
                    />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>           
    </div>
  )
}

export default GeneralContact