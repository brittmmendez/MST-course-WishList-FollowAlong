import React, { Component } from 'react';
import { observer } from "mobx-react"
import WishListItemEdit from "./WishListItemEdit"
import { clone, getSnapshot, applySnapshot } from "mobx-state-tree"

class WishListItemView extends Component {
    constructor() {
        super()
        this.state = {
            isEditing: false,
        }
    }
    render() {
        const {item, readonly} = this.props
      return this.state.isEditing ? (
              this.renderEditable()
            ) : (
            <li className="item">
                    {item.image && <img src={item.image} alt={item.image} />}
                    <h3> {item.name} </h3>
                    <span> ${item.price} </span>
                    {!readonly &&(
                    <span> 
                        <button onClick={this.onToggleEdit}> Edit </button>
                        <button onClick={item.remove}> Remove </button>
                    </span>)}
            </li>
      )
    }

    renderEditable () {
        return (
            <li className="item" >
                <WishListItemEdit item={this.state.clone} />
                <button onClick={this.onSaveEdit}> Save </button>
                <button onClick={this.onCanceleEdit}> Cancel </button>
            </li>
        )
    }

    onToggleEdit = () => {
        this.setState({ 
            isEditing: !this.state.isEditing,
        clone: clone(this.props.item) })
    }

    onCanceleEdit = () => {
        this.setState({ isEditing: !this.state.isEditing })
    }

    onSaveEdit = () => {
        const itemToSave = getSnapshot(this.state.clone)
        applySnapshot(this.props.item, itemToSave)
        this.setState({ 
            isEditing: !this.state.isEditing,
        clone: null })
    }
    
}

export default observer(WishListItemView)