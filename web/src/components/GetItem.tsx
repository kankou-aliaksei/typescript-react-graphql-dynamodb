import { Component } from 'react';
import { ItemDto } from '../API';

interface GetItemProps {
  item: Partial<ItemDto>;
}

interface GetItemState {
  show: boolean;
  item: Partial<ItemDto>;
}

export class GetItem extends Component<GetItemProps, GetItemState> {
  state: GetItemState = {
    show: false,
    item: {
      name: "",
      description: "",
      createdAt: "",
      id: ""
    }
  }

  componentDidMount() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  onClick = async (item: Partial<ItemDto>) => {
    this.state.item = item;
    this.setState({show: true})
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  onClose = () => {
    this.setState({ show: false })
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  render() {
    const item = this.props.item;
    return (
      <>
        {this.state.show && (
          <div className="modal">
            <button className="close"
                    onClick={this.onClose}>
              X
            </button>

            <div className="items">
              <h1> {this.state.item.name}</h1>
              <span>
               ID: {this.state.item.id}
              </span>
              <br />
              {this.state.item.description && <span style={{fontStyle: "italic", color: "#0ca5e297"}}>
                {this.state.item.description}
              </span>}
              <br/>
              <span>
                <time style={{fontStyle: "italic"}}>
                  {"Created at: "}
                  {new Date(this.state.item.createdAt!).toISOString()}
                </time>
              </span>

            </div>
          </div>
          )
        }
        <button onClick={() => this.onClick(item)}>Details</button>
      </>
    );
  }
}
