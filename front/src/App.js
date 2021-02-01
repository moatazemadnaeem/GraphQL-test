
import './App.css';
import BookList from './components/BookList'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import AddBook from './components/AddBook'
const client =new ApolloClient({
  uri:"http://localhost:3000/graphql"
})
function App() {
  
  return (
    <ApolloProvider client={client}>
        <div className="App">
     <h1>hello moataz</h1>
     <BookList/>
     <AddBook/>
    </div>
    </ApolloProvider>
  
  );
}

export default App;
