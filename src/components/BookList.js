import React from 'react'
import { Menu, Container } from "semantic-ui-react";
import Book from './Book'

export default class BookList extends React.Component {
  
  state = {
    books: [],
    selectedBookId: ""
  }

  componentDidMount() {
    fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then(data => {
      this.setState({
        books: data
      })
    })
  }

  handleClick = (book) => {
    this.setState({
      selectedBookId: book.id
    })
  }

  addLike = (id, user = {"id": 1, "username": "pouros"}) => {
    //handle case when user has already liked the book
    const book = this.state.books.find(book => book.id === id)
    
    const configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({users: [...book.users, user]})
    }

    fetch(`http://localhost:3000/books/${id}`, configObj)
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error("Something went wrong")
      }
    })
    .then(data => {
      console.log(data)
      this.setState(state => {
        const i = state.books.findIndex(book => book.id === data.id)
        return {
          books: [...state.books.slice(0, i), data, ...state.books.slice(i + 1)]
        }
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    console.log(this.state.books)
    return (
      <>
      <Menu vertical inverted>
        {this.state.books.map(book => {
            return (
              <Menu.Item key={book.id} as={"a"} onClick={() => this.handleClick(book)}>
                {book.title}
              </Menu.Item>
            )
          })
        }
      </Menu>
      <Container text>
        {/* {<Book book={this.state.selectedBook} /> } */}
        {Number.isFinite(this.state.selectedBookId)  ? <Book book={this.state.books.find(book => this.state.selectedBookId === book.id)} addLike={this.addLike} /> : "Select a book to start" }
      </Container>
      </>
    )
  }
}

