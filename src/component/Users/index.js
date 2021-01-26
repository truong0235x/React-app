import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import { students } from "../../constants/students"
import User from "./User"


class Users extends React.Component {

  state = {
    students
  }

  deleteRow = id => {
    const newStudent = this.state.students.filter(item => item.id !== id)
    this.setState({
      students: [...newStudent]
    })
  }

  editRow = (id, isEdit) => {
    // const user = this.state.students.find(user => user.id === id)
    // if (!user) {
    //   return;
    // }

    // user.isEdit = isEdit

    const index = this.state.students.findIndex(user => user.id === id)
    const user = {...this.state.students[index]}
    user.isEdit = isEdit

    const newStudent = this.state.students
    newStudent[index] = user

    this.setState({
      students : [...newStudent]
    })
  }


  deleteTickRow = () => {
    const newStudent = this.state.students.filter(item => !item.checked)

    this.setState({
      students: [...newStudent]
    })
  }

  getIdNew = students => {
    let max = 0
    students.forEach(item => item.id > max ? max = item.id : max)
    return max + 1
  }

  addStudent = () => {
    const idNew = this.getIdNew(this.state.students)
    this.state.students.push({
        id: idNew,
        isEdit: true,
        checked: false,
        fullName: '',
        gender: 'male',
        age: ''
    })
    this.setState({
      students : [...this.state.students]
    })
  }

  checkAll = event => {
    let checked = event.target.checked

    this.state.students.forEach(item =>{
      item.checked = checked
    })

    this.setState({
      students : [...this.state.students]
    })
  }

  componentWillMount(){
    console.log('----componentWillMout---start')
    const addBtn = document.getElementById('add-btn')
    console.log(addBtn)
    console.log('----componentWillMout---end')
  }

  componentDidMount(){
    console.log('----componentdidMout---strat')
    const addBtn = document.getElementById('add-btn')
    console.log(addBtn)
    console.log('----componentdidMout---end')

  }

  render(){
    console.log('---render----start')
    const addBtn = document.getElementById('add-btn')
    console.log(addBtn)
    console.log('---render----end')
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col d-flex justify-content-end">
              <button className="btn btn-info m-2" id="add-btn" onClick={this.addStudent}>Add</button>
              <button className="btn btn-danger m-2" onClick={this.deleteTickRow}>Delete</button>
            </div>
          </div>

          <div className="row">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <td><input type="checkbox" onClick={this.checkAll} /></td>
                  <td>ID</td>
                  <td>Full Name</td>
                  <td>Gender</td>
                  <td>Age</td>
                  <td>Action</td>
                </tr>
              </thead>

              <tbody>
                {
                  this.state.students.map((user, index) =>
                  <User
                    key={index}
                    user={user}
                    editRow={this.editRow}
                    deleteRow={this.deleteRow}
                  />)
                }
              </tbody>
            </table>
          </div>
        </div>
      </>
    )
  }
  }

export default Users
