import React,{useState} from 'react'
import {gql} from 'apollo-boost' //so we can work in javascript
import {graphql } from 'react-apollo'
import GetBook from './GetBook' //so we can bind the data that come from server to react
const getBookList=gql`
{
    books{
        name
        id
    }
}
`
function BookList(props) {
    
    const [bkselected,Setbook]=useState('');
    console.log(props)
    const displaydata=()=>{
        if(props.data.loading){
           return(
               <h1>loading books</h1>
          
           )

       }else{
           return props.data.books.map(book=>{
               return(
                   <li onClick={(e)=>{Setbook(book.id)}} key={book.id}>{book.name}</li>
               )
           })
       }
   }
    return (
        <div className="book-list">
            <ul className="list">
                <div>
                     {
                       displaydata()
                     }
                </div>
                <GetBook bookID={bkselected}/>
               
            </ul>
        </div>
    )
}

export default graphql(getBookList)(BookList);
