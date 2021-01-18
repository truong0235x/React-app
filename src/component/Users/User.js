import React from 'react'

class User extends React.Component {

  state = {
    edittingUser: { ...this.props.user }
  }

  checkedCheckbox = () => {
    const { user } = this.props
    user.checked = !user.checked

    this.setState({
      edittingUser: {...this.state.edittingUser}
    })
  }

  get display() {
    const { user } = this.props
    return (
        <tr>
          <td><input type="checkbox" onChange={this.checkedCheckbox} checked={user.checked ? 'checked' : ''} /></td>
          <td>{user.id}</td>
          <td>{user.fullName}</td>
          <td>{user.gender === 'male' ? 'Nam' : 'Nữ'}</td>
          <td>{user.age}</td>
          <td>
            <button className="btn btn-info mr-2" onClick={()=> this.props.editRow(user.id,true)}>Edit</button>
            <button className="btn btn-danger" onClick={()=> this.props.deleteRow(user.id)}>Delete</button>
          </td>
        </tr>
    )
  }

  changeName = event => {
    const value = event.target.value
    this.setState({
      edittingUser: {
        ...this.state.edittingUser,
        fullName: value
      }
    })
  }

  changeAge = event => {
    const value = event.target.value
    this.setState({
      edittingUser: {
        ...this.state.edittingUser,
        age: value
      }
    })
  }

  changeSelect = event => {
    const value = event.target.value
    this.setState({
      edittingUser: {
        ...this.state.edittingUser,
        gender: value
      }
    })
  }

  saveUser = (id) => {

    const { user } = this.props

    user.fullName = this.state.edittingUser.fullName
    user.gender = this.state.edittingUser.gender
    user.age = this.state.edittingUser.age

    user.isEdit = false
    this.props.editRow(user.id, user.isEdit)
  }

  get editingRow() {
    const userEditting = this.state.edittingUser
    const { user } = this.props

    return(
      <tr>
        <td><input type="checkbox" onChange={this.checkedCheckbox} checked={user.checked ? 'checked' : ''} /></td>
        <td>{user.id}</td>

        <td>
          <input value={userEditting.fullName} onChange={this.changeName}/>
        </td>

        <td>
          <select className="from-control" value={userEditting.gender} onChange={this.changeSelect}>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
          </select>
        </td>

        <td><input value={userEditting.age} onChange={this.changeAge}/></td>

        <td>
          <button className="btn btn-warning mr-2" onClick={()=> this.saveUser(user.id)}>Save</button>
          <button className="btn btn-info mr-2" onClick={()=> this.props.editRow(user.id,false)}>Cancel</button>
          <button className="btn btn-danger mr-2" onClick={()=> this.props.deleteRow(user.id)}>Delete</button>
        </td>
      </tr>
    )
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      edittingUser: {
        ...this.props,
        nextProps
      }
    })
  }

  // shouldComponentUpdate() {
  //   return false
  // }

  componentWillUnmount() {
    console.log('---unMount-st')
    console.log(this.props.user)
    console.log('---unMount-end')
  }

  render() {
    const { user } = this.props

    return (
      <>
        { user.isEdit ? this.editingRow : this.display }
      </>
    )
  }
}

export default User