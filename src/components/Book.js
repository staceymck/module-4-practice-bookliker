import React, { Component } from 'react'
import UserList from './UserList'
import {
  Container,
  Header,
  Menu,
  Button,
  List,
  Image
} from "semantic-ui-react";

const Book = ({book, addLike}) => {
  return (
    <div>
      <Header>{book.title}</Header>
      <Image
        src={book.img_url}
        size="small"
      />
      <p>{book.description}</p>
      <Button
        color="red"
        content="Like"
        icon="heart"
        onClick={() => addLike(book.id)}
        label={{
          basic: true,
          color: "red",
          pointing: "left",
          content: book.users.length
        }}
      />
      <Header>Liked by</Header>
      <UserList users={book.users} />
    </div>
  )
}

export default Book