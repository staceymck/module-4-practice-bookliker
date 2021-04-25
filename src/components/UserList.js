import React from 'react'
import { List } from "semantic-ui-react";

const UserList = (props) => {
  return (
    <List>
      {props.users ? props.users.map(user => {
        return <List.Item key={user.id} icon="user" content={user.username} />
      }) : null
      }
    </List>
  )
}

export default UserList