import React from 'react'
import {graphql} from 'react-apollo'
import {gql} from 'apollo-boost'


const getBookQuery=gql`
query($id:ID!){

    book(id:$id){
        name
        genre
        id
        author{
            name
            age
            books{
                name
            }
        }
    }
}


`
function GetBook(props) {
   
    function handelprops(){
        if(props.data.book){
            return(
                <div>
                     <h2>{props.data.book.name}</h2>
                     <p>{props.data.book.genre}</p>
                     <p>{props.data.book.id}</p>
                     <h3>{props.data.book.author.name}</h3>
                     <h5>{props.data.book.author.age}</h5>
                     <ul>
                          {
                         props.data.book.author.books.map(bk=>{
                           return <li key={bk.id}>{bk.name}</li>
                         })
                          } 
                     </ul>
                   
                </div>
            )
        }
        else{
            return <h2>No books selected...</h2>
        }
    }
    return (
        <div>
            {
                handelprops()
            }
        </div>
    )
}

export default graphql(getBookQuery,{
    options:(props)=>{
        return {
            variables:{
                id:props.bookID
            }
        } 
    }
})(GetBook)
