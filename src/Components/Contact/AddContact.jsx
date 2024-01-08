import React from 'react'

class AddContact extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            successMessage : undefined,
            errorMessage : undefined
        }
    }

    handleSubmit = (e) =>{
      e.preventDefault();
      const name = e.target.elements.name.value.trim();
      const email = e.target.elements.email.value.trim();
      const phone = e.target.elements.phone.value.trim();
      const id =  this.props.isUpdating ? e.target.elements.id.value.trim() : "";
      
      const response =  this.props.isUpdating ? this.props.handleUpdateContact({id : id , name:name, email:email, phone:phone}) : this.props.handleAddContact({name:name, email:email, phone:phone})

      if(response.status === "success"){
        this.setState({successMessage : response.message , errorMessage : undefined})
        document.querySelector(".contact-form").reset();
      }else{
        this.setState({successMessage : undefined , errorMessage : response.message})
      }

      setTimeout(() => {
        this.setState({successMessage : undefined, errorMessage : undefined})
      }, 5000);

    }

    render(){
        return (
            <div className='col-12 bg-light p-2'>
                <form onSubmit={this.handleSubmit} className='contact-form'>
                    <div className='row mb-2'>
                        <div className='col-4'>
                            <h5>{this.props.isUpdating ? "Update Contact" : "Add Contact"}</h5>
                        </div>
                    </div>
                    <div className='row mb-2'>

                        {this.props.isUpdating &&  <input hidden className='form-control' name='id' defaultValue={this.props.isUpdating?this.props.selectedContact.id: ""}></input>}
                    
                        <div className='col-4'>
                            <input className='form-control' name='name' placeholder='Enter Name' defaultValue={this.props.isUpdating?this.props.selectedContact.name: ""}></input>
                        </div>
                        <div className='col-4'>
                            <input className='form-control' name='email'  placeholder='Enter Email'defaultValue={this.props.isUpdating?this.props.selectedContact.email: ""}></input>
                        </div>
                        <div className='col-4'>
                            <input className='form-control' name='phone'  placeholder='Enter Phone' defaultValue={this.props.isUpdating?this.props.selectedContact.phone: ""}></input>
                        </div>
                    </div>
                    {this.state.errorMessage === undefined ? <div></div> :
                    <div className='text-center mt-2' id='errorMsg'>
                       <h6 className='bg-danger p-2 text-light rounded'> {this.state.errorMessage}</h6>
                    </div>}
                    {this.state.successMessage === undefined ? <div></div> :
                    <div className='text-center mt-2' id='successMsg'>
                       <h6 className='bg-success p-2 text-light rounded'> {this.state.successMessage}</h6>
                    </div>}
                    
                    <div className='row'>
                        <div className='col-4'>
                            <button className='btn btn-primary'>{this.props.isUpdating ? "Update" : "Create"}</button>
                            {this.props.isUpdating && 
                             <button className='btn btn-dark ms-1' onClick={this.props.cancelUpdate}>Cancel</button>
                        }
                        </div>
                        
                    </div>
                    
                </form>
            </div>
        )
    }
  
}

export default AddContact