import "./App.css";
import React, { useState } from "react";

const initialValues = {
  userName: "",
  userSurname: "",
  userAge: "",
  userSalary: "",
};

function App() {
  const [userData, setUserData] = useState(initialValues);
  const [users, setUsers] = useState([]);
  const [editableUserData,seteditableUserData] = useState({
    isEdit:false,
    userIndex:null
  })

  const handleRemoveClick = (index)=>{
    setUsers(users.filter((user,userIndex)=>{
      return userIndex !== index
    }))
  }

  const isFilledFields = userData.userName && userData.userSurname && userData.userAge && userData.userSalary

  const handleSubmitUser = (event) => {
    event.preventDefault();
    if(isFilledFields){
      if(editableUserData.isEdit){
        const editData = users;
        editData.splice(editableUserData.userIndex,1,userData);
        setUserData(editData)

        seteditableUserData({
          isEdit:false,
          userIndex:null
        })
      }else{
        setUsers((prevState) => {
          return [...prevState, userData];
        });
      }
   
    setUserData(initialValues);
  }
  };

  const handleCleanClick = ()=>{
    setUserData(initialValues)
  }

  const handleEditClick = (data,index)=>{
    setUserData(data)
    seteditableUserData({
      isEdit:true,
      userIndex:index
    })
  }
  return (
    <div className="wrapper">
      <div className="wrapper_content">
        <div className="table_data">
          <table>
            <th>#</th>
            <th>Name</th>
            <th>LastName</th>
            <th>Age</th>
            <th>Salary</th>
            <th>Actions</th>

            <tbody>
              {users.map((user,index) => {
                return (
                  <tr>
                    <td>{index+1}</td>
                    <td>{user.userName}</td>
                    <td>{user.userSurname}</td>
                    <td>{user.userAge}</td>
                    <td>{user.userSalary}</td>
                    <td>
                      <div className="as">
                        <button className="edit_action" onClick={()=>handleEditClick(user,index)}>Edit</button>
                        <button className="remove_action" onClick={()=>handleRemoveClick(index)}>Remove</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div>
          <form onSubmit={handleSubmitUser} onReset={handleCleanClick}>
            <input
              type={"text"}
              placeholder="Name"
              onChange={(e) => {
                setUserData((prevState) => ({
                  ...prevState,
                  userName: e.target.value,
                }));
              }}
              value={userData.userName}
            />
            <input
              type={"text"}
              placeholder="LastName"
              onChange={(e) => {
                setUserData((prevState) => ({
                  ...prevState,
                  userSurname: e.target.value,
                }));
              }}
              value={userData.userSurname}
            />
            <input
              type={"number"}
              placeholder="Age"
              onChange={(e) => {
                setUserData((prevState) => ({
                  ...prevState,
                  userAge: e.target.value,
                }));
              }}
              value={userData.userAge}
            />
            <input
              type={"number"}
              placeholder="Salary"
              onChange={(e) => {
                setUserData((prevState) => ({
                  ...prevState,
                  userSalary: e.target.value,
                }));
              }}
              value={userData.userSalary}
            />

            <div className="buttons_wrapper">
              <button type="reset">Delete</button>
              <button disabled={!isFilledFields} type="submit">{editableUserData.isEdit?"Edit":"add"}</button>
            </div>
          </form>  
          
        </div>
      </div>
    </div>
  );
}

export default App;
