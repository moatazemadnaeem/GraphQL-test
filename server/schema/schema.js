
const book=require('../models/book')
const author=require('../models/author')
const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema,GraphQLInt,GraphQLID ,GraphQLList,GraphQLNonNull} = graphql;

// dummy data
// var books = [
//     { name: 'Name of the Wind', genre: 'Fantasy', id: '1rtgrtgtrgrtggrtg3443', authorid: '1' },
//     { name: 'The Final Empire', genre: 'Fantasy', id: 'erfrefergrgge2', authorid: '2' },
//     { name: 'The Hero of Ages', genre: 'Fantasy', id: 'regergregerg4', authorid: '2' },
//     { name: 'The Long Earth', genre: 'Sci-Fi', id: '3ergergergreg', authorid: '3' },
//     { name: 'The Colour of Magic', genre: 'Fantasy', id: '5ergergergerg', authorid: '3' },
//     { name: 'The Light Fantastic', genre: 'Fantasy', id: '6fedwfwrfrfr56', authorid: '3' },
// ];

// var authors = [
//     { name: 'Patrick Rothfuss', age: 44, _id->authorid: '1' },
//     { name: 'Brandon Sanderson', age: 42, _id->authorid: '2' },
//     { name: 'Terry Pratchett', age: 66, _id->authorid: '3' }
// ];



const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ( ) => ({
        id: { type:GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author:{
            type:AuthorType,
            resolve(parent,args){
                return author.findById(parent.authorid);
            }
        }
    })
});
//name: 'Patrick Rothfuss', age: 44, _id id-->args
//id -->author-->id name age
const AuthorType = new GraphQLObjectType({
    name: 'author',
    fields: ( ) => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                return book.find({authorid:parent.id});//return all the books the have the authorid
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                // code to get data from db / other source
              return book.findById(args.id);//book is a collection in the database
            }
         
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return author.findById(args.id);
            }
        },
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
               return book.find({});//find all the books in the collection then return it
            }
        },
        authors:{
            type:new GraphQLList(AuthorType),
            resolve(parent,args){
               return author.find({});
            }
        }
    }
});
const Mutation=new GraphQLObjectType({

        name:'Mutation',
        fields:{

            addAuthor:{
                type:AuthorType,
                args:{
                    name:{type:new GraphQLNonNull(GraphQLString)},
                    age:{type:new GraphQLNonNull(GraphQLInt)}
                },
                resolve(parent,args){
                    let auth=new author({
                        name:args.name,
                        age:args.age
                    })
                 return auth.save()
                }

            },
            
            addBook:{
                type:BookType,
                args:{
                    name:{type:new GraphQLNonNull(GraphQLString)},
                    genre:{type:new GraphQLNonNull(GraphQLString)},
                    authorid:{type:new GraphQLNonNull(GraphQLID)}
                },
                resolve(parent,args){
                    let Bk=new book({
                        name:args.name,
                        genre:args.genre,
                        authorid:args.authorid//id is author id
                    })
                 return Bk.save()
                }

            }

        }

})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation:Mutation
});

