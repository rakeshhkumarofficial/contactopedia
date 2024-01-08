import React from 'react'
import Header from '../Layout/Header';
import AddContact from './AddContact';
import FavouriteContact from './FavouriteContact';
import GeneralContact from './GeneralContact';
import Footer from '../Layout/Footer';

class ContactIndex extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            contactList : [{
                id:1,
                name: "Rakesh Kumar",
                email : "rakesh@gmail.com",
                phone : "6203565848",
                isFavourite : true
            },{
                id:2,
                name: "Rahul Kumar",
                email : "rahul@gmail.com",
                phone : "7203565848",
                isFavourite : true
            },{
                id:3,
                name: "Nikhil Kumar",
                email : "nikhil@gmail.com",
                phone : "9203565848",
                isFavourite : false
            }],
            selectedContact : undefined,
            isUpdating : false
        }
    }

    handleAddContact = (newContact) =>{
        // eslint-disable-next-line
        if(newContact.name == ""){
            return { status : "error" , message : "Please Enter a valid Name"}
        }
        // eslint-disable-next-line
        else if(newContact.phone == ""){
            return { status : "error" , message : "Please Enter a valid Phone Number"}
        }
        // eslint-disable-next-line
        const duplicateRecord = this.state.contactList.filter((x)=>x.name==newContact.name && x.phone == newContact.phone);
        if(duplicateRecord.length>0){
            return { status : "error" , message : "Duplicate Record"}
        }
        var newFinalContact = {...newContact , id : this.state.contactList[this.state.contactList.length-1].id+1 , isFavourite: false};
        this.setState((prevState)=>{
            return {
                contactList : prevState.contactList.concat([newFinalContact])
            }
        })
        return { status : "success" , message : "Record Added Successfully"}
    }

    handleToggleFavourite = (contact) => {
        this.setState((prevState) => {
            return {
                contactList : prevState.contactList.map((obj)=>{
                    // eslint-disable-next-line
                    if(obj.id == contact.id){
                        return {...obj , isFavourite : !obj.isFavourite}
                    }
                    return obj;
                })
            }
        })
    }

    handleDeleteContact = (contactId) => {
        this.setState((prevState) => {
            return {
                contactList : prevState.contactList.filter((obj)=>{
                    // eslint-disable-next-line
                    return obj.id != contactId
                })
            }
        })
    }

    handleUpdateClick = (contact) => {
        this.setState({ selectedContact : contact , isUpdating : true})
    }

    handleCancelUpdate= () => {
        this.setState({ selectedContact : undefined , isUpdating : false})
    }

    handleUpdateContact = (updatedContact) =>{
        // eslint-disable-next-line
        if(updatedContact.name == ""){
            return { status : "error" , message : "Please Enter a valid Name"}
        }
        // eslint-disable-next-line
        else if(updatedContact.phone == ""){
            return { status : "error" , message : "Please Enter a valid Phone Number"}
        }
        // eslint-disable-next-line
        const duplicateRecord = this.state.contactList.filter((x)=>(x.name==updatedContact.name && x.phone == updatedContact.phone) && x.id != updatedContact.id);
        if(duplicateRecord.length>0){
            return { status : "error" , message : "Duplicate Record"}
        }

        this.setState((prevState) => {
            return {
                contactList : prevState.contactList.map((obj)=>{
                    // eslint-disable-next-line
                    if(obj.id == updatedContact.id){
                        return {...obj , name: updatedContact.name , email:updatedContact.email , phone:updatedContact.phone}
                    }
                    return obj;
                }),
                isUpdating : false ,
                selectedContact : undefined
            }
        })
        return { status : "success" , message : "Record Updated Successfully"}
    }
    

    render(){
        return (
            <>
                <div className='container'>
                    <div className='row mb-2'>
                        <Header />
                    </div>
                    <div className='row mb-2'>
                        <AddContact handleAddContact = { this.handleAddContact}
                        selectedContact = {this.state.selectedContact}
                        isUpdating = { this.state.isUpdating}
                        cancelUpdate = { this.handleCancelUpdate}
                        handleUpdateContact = {this.handleUpdateContact}
                        />
                    </div>
                    <div className='row mb-2'>
                     {/* eslint-disable-next-line */}
                        <FavouriteContact contactList = {this.state.contactList.filter((x)=>x.isFavourite==true)} 
                        favouriteClick={this.handleToggleFavourite}
                        handleDeleteContact = { this.handleDeleteContact}
                        handleUpdateClick = {this.handleUpdateClick}
                        />
                    </div>
                    <div className='row mb-2'>
                    {/* eslint-disable-next-line */}
                        <GeneralContact contactList = {this.state.contactList.filter((x)=>x.isFavourite==false)} 
                         favouriteClick={this.handleToggleFavourite}
                         handleDeleteContact = { this.handleDeleteContact}
                         handleUpdateClick = {this.handleUpdateClick}
                        />
                    </div>
                    <div className='row'>
                        <Footer />
                    </div>
                </div>
            </>
        )
    }
}

export default ContactIndex