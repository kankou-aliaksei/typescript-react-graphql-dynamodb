import React, { ChangeEventHandler, Component, FormEventHandler } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { ItemDto, SaveItemInput} from '../API';
import { saveItem } from '../graphql/mutations';

export class SaveItem extends Component<{}, Partial<ItemDto> > {
  state: Partial<ItemDto> = {
    name: "",
    description: ""
  }

  onChangeItem: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = event => this.setState({
    [event.target.name] : event.target.value
  })

  onSubmit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault()

    const input: SaveItemInput = {
      name: this.state.name!
    }

    if (this.state.description !== "") {
      input.description = this.state.description;
    }

    await API.graphql(graphqlOperation(saveItem, { input }));

    this.setState({ name: "", description: "" });
  }

  render() {
    return (
      <form className="add-item"
            onSubmit={this.onSubmit} >

        <input style={{ font: '19px'}}
               type="text"
               placeholder="An item name"
               name="name"
               required
               value={this.state.name}
               onChange={this.onChangeItem}
        />

        <textarea
          name="description"
          rows={3}
          cols={40}
          required
          placeholder="An item description"
          value={this.state.description!}
          onChange={this.onChangeItem}
        />

        <input  type="submit"
                className="btn"
                style={{ fontSize: '19px'}}/>

      </form>
    )
  }
}
