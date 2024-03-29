import React, { Component } from 'react';
import MenuItem from './components/menuItem';
import Form from './components/form';
import './menu.css';
import { connect } from 'react-redux';
import { createItem, deleteItem, updateItem } from './actions/methods'
import uuid from 'uuid';

import './../node_modules/bootstrap/dist/css/bootstrap.min.css';

//main component that wraps major part of application
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = { openAddForm: false }
  }

  //function to trigger form rendering
  handleAddClick = () => this.setState({ openAddForm: true });

  //function to handle item addition
  handleAddItem = ({ name, price }) => {

    if (name === "") name = "untitled";
    if (price === "") price = 999;

    const newItem = {
      id: uuid.v4(),
      name, price
    }
    this.props.createItem(newItem);
    this.handleCancel();
  }

  //function to handle item deletion
  handleDeleteItem = (id) => this.props.deleteItem(id);

  //function to handle item updates
  handleUpdateItem = (item) => this.props.updateItem(item);

  //function to unmount form component or in short close it
  handleCancel = () => this.setState({ openAddForm: false });

  render() {
    return (
      <>
        {/* Heading */}
        <h1><i className="fas fa-list-alt"></i>React App</h1>

        {/* Menu component starts */}
        <div className="menu" >

          <div className="heading menu-row">
            <div className="menu-item-name">Name</div>
            <div className="menu-item-price">Price</div>
            <div className="operations"> Operations</div>
          </div>

          {this.props.menuItems.length > 0 ? this.props.menuItems.map((item, i) => {
            return <MenuItem key={item.name + "-" + item.price + "-" + item.id} id={item.id}
              name={item.name} price={item.price}
              handleDelete={this.handleDeleteItem}
              handleUpdate={this.handleUpdateItem}
              closeForm={this.handleCancel} />
          }) : (
              <div className="menu-row">
                <div className="msg">List is empty.</div>
              </div>
            )}

        </div>

  

        {/* Menu component ends */}

        {!this.state.openAddForm ? (
          <span onClick={this.handleAddClick} className="prueba"><i className="glyphicon glyphicon-plus"></i></span>
          
        ) : (
            <div className="menu"><Form addItem={this.handleAddItem} closeForm={this.handleCancel} /></div>
          )}
      </>
    )
  }
}

//subscribing to redux store updates
const mapStateToProps = ({ menuItems }) => ({
  menuItems
})

//connecting our main component to redux store
export default connect(mapStateToProps, { createItem, deleteItem, updateItem })(Menu);