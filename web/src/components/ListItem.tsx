import {Component} from 'react';
import {API, graphqlOperation} from 'aws-amplify';
import {listItem} from '../graphql/queries';
import {DeleteItemOutput, Filter, ItemDto, ItemOutput, ListItemInput, ListItemOutput} from '../API';
import {GraphqlResponse, ListItemResponse} from '../model/graphql.model';
import {onDeleteItem, onSaveItem} from '../graphql/subscriptions';
import Observable from 'zen-observable-ts';
import {DeleteItem} from './DeleteItem';
import {GetItem} from "./GetItem";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";

interface ListItemState {
  items: ItemDto[];
  filter: {
    fromTs: number
    toTs: number
  } | {};
  page: {
    size: number
    startToken?: string | null
  }
}

interface ItemId {
  id: string
}

interface OnSaveItemResponse {
  value: {
    data: {
      onSaveItem: ItemOutput
    }
  }
}

interface OnDeleteItemResponse {
  value: {
    data: {
      onDeleteItem: DeleteItemOutput
    }
  }
}

export class ListItem extends Component<any, ListItemState> {
  saveItemListener: any;
  deleteItemListener: any;

  state: ListItemState = {
    items: [],
    filter: {},
    page: {
      size: 3 // Default
    }
  };

  getItems = async () => {
    const input: ListItemInput = { filter: this.state.filter as Filter };

    input.page = { size: this.state.page.size, startToken: this.state.page.startToken };

    console.log(this.state)

    const response = await API.graphql(graphqlOperation(listItem, { input })) as GraphqlResponse<ListItemResponse<ListItemOutput>>;

    const result = response.data.listItem.result;
    if (result) {
      this.setState({ items: result.items as ItemDto[], page: { ...this.state.page, startToken: result.nextToken }})
    }
  }

  componentDidMount = async () => {
    await this.getItems();

    this.saveItemListener = (API.graphql(graphqlOperation(onSaveItem)) as Observable<OnSaveItemResponse>)
      .subscribe({
        next: event => {
          const newItem = event.value.data.onSaveItem.result as ItemDto;
          const prevItems = this.state.items.filter(item => item.id !== newItem.id)
          const updatedItems = [newItem, ...prevItems];
          this.setState({ items: updatedItems });
        }
      });

    this.deleteItemListener = (API.graphql(graphqlOperation(onDeleteItem)) as Observable<OnDeleteItemResponse>)
      .subscribe({
        next: event => {
          const id = (event.value.data.onDeleteItem.result as ItemId).id;
          const updatedItems = this.state.items.filter(item => item.id !== id);
          this.setState({ items: updatedItems });
        }
      });
  }

  componentWillUnmount() {
    this.saveItemListener.unsubscribe();
    this.deleteItemListener.unsubscribe();
  }

  onFromFilter = async (event: any) => {
    this.setState({
      filter: {...this.state.filter, fromTs: event._d.getTime() },
      page: { ...this.state.page, startToken: null }
    }, this.getItems);
  }

  onToFilter = async (event: any) => {
    this.setState({
      filter: {...this.state.filter, toTs: event._d.getTime() },
      page: { ...this.state.page, startToken: null }
    }, this.getItems);
  }

  render() {
    return (<>
      <div>
        From: <Datetime onChange={this.onFromFilter} utc={true} />
        To: <Datetime onChange={this.onToFilter}  utc={true} />
      </div>
      <div>
        {this.state.items.map(item => {
          return (
            <div className="items" style={rowStyle} key={item.name}>
              <h1> {item.name}</h1>
              {item.description && <span style={{fontStyle: "italic", color: "#0ca5e297"}}>
                {item.description}
              </span>}
              <br/>
              <span>
                <time style={{fontStyle: "italic"}}>
                  {"Created at: "}
                  {new Date(item.createdAt).toISOString()}
                </time>
              </span>
              <span>
                <DeleteItem id={item.id}/>
                <GetItem item={this.state.items.filter(entry => entry.id = item.id)[0]}/>
              </span>
            </div>
          )
        })}
      </div>
      <span>
        { <div style={centerStyle}>
            <button className={"page-button"} onClick={ async () => {
              this.setState({ page: { size: this.state.page.size, startToken: null } }, async () => {
                await this.getItems();
              });
            }
            }>First</button>&nbsp;
          { this.state.page && this.state.page.startToken
              && <button className={"page-button"} style={centerStyle} onClick={this.getItems}>Next</button> }
          </div>
        }
      </span>
    </>);
  }
}

const rowStyle = {
  background: '#f4f4f4',
  padding: '10px',
  border: '1px #ccc dotted',
  margin: '14px'
}

const centerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}
