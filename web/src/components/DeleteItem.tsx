import { Component } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { deleteItem } from '../graphql/mutations';

interface DeleteItemProps {
  id: string
}

export class DeleteItem extends Component<DeleteItemProps> {
  onClick = async (id: string) => {
    await API.graphql(graphqlOperation(deleteItem, { id }))
  }

  render() {
    const id = this.props.id;

    return (
      <button onClick={ () => this.onClick(id) }>Delete</button>
    );
  }
}
