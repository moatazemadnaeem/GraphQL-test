import React,{useState} from 'react'
import {gql} from 'apollo-boost' //so we can work in javascript
import {graphql } from 'react-apollo'
import {flowRight as compose} from 'lodash'
const getAuthorsList=gql`
{
    authors{
        name
        id
    }
}
`
const getBookList=gql`
{
    books{
        name
        id
    }
}
`
const AddBK=gql`
   mutation($name:String!,$genre:String!,$authorid:ID!){
       addBook(name:$name, genre:$genre, authorid:$authorid){
        name
        id
        }
   } 
`
function AddBook(props) {
 
    const [bookname,Setbookname]=useState('');
    const [genre,Setgenre]=useState('');
    const [authorid,Setauthorid]=useState('');
    function submit(e){
            e.preventDefault();
            console.log(`book name is ${bookname} and the genre is ${genre} and the id is ${authorid}`)
            props.AddBK({
                variables:{
                    name:bookname,
                    genre:genre,
                    authorid:authorid
                },
                refetchQueries: [{ query: getBookList }]
            })

    }
       // console.log(`book is ${bookname} and the genre is ${genre}`)
    
    const displayAuthors=()=>{
        if(props.getAuthorsList.loading){
            return(
                <option>Loading authors</option>
            )
        }
        else{
            return(
                props.getAuthorsList.authors.map(author=>{
                    return (
                        <option key={author.id} value={author.id}>
                            {
                                author.name
                            }
                        </option>
                    )
                })
            )
        }
    }
   // console.log(props.data.authors[0].id);
    return (
        <div>
             <form id="add-book">
                <div className="field">
                    <label>Book name:</label>
                    <input type="text" onChange={(e)=>{Setbookname(e.target.value)}}/>
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" onChange={(e)=>{Setgenre(e.target.value)}}/>
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select  onChange={(e)=>{Setauthorid(e.target.value)}}>
                        <option>Select author</option>
                        { displayAuthors() }
                    </select>
                </div>
                <button onClick={submit}>+</button>

            </form>
        </div>
    )
}

export default compose(graphql(getAuthorsList,{ name: "getAuthorsList" }),graphql(getBookList),graphql(AddBK,{ name: "AddBK" }))(AddBook)
