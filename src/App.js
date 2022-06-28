import React, { useState } from "react";
import "./App.css";

const initialValues = {
  userName: "",
  userSurname: "",
  userAge: "",
  userSalary: "",
};
const App = (props) => {

    function getAge(dateString) 
    {
      if(typeof(dateString)==="string"){

        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
        {
            age--;
        }
      }else{
        age = dateString;
      }

        return age;
  };
  const [userData, setUserData] = useState(initialValues);
  const [users, setUsers] = useState([]);
  const [editableUserData, seteditableUserData] = useState({
    isEdit: false,
    userIndex: null,
  });

  const handleRemoveClick = (index) => {
    setUsers(
      
      users.filter((user, userIndex) => {
        return userIndex !== index;
      })
    );
  };

  const isFilledFields =
    userData.userName &&
    userData.userSurname &&
    userData.userAge &&
    userData.userSalary;

  const handleSubmitUser = (event) => {
    event.preventDefault();
    if (isFilledFields) {
      if (editableUserData.isEdit) {
        const editData = users;

        editData.splice(editableUserData.userIndex, 1, userData); 
        editData[0].userAge = getAge(editData[0].userAge); 

        setUserData(editData);

        seteditableUserData({
          isEdit: false,
          userIndex: null,
        });
      } else {
        setUsers((prevState) => {
          
          prevState.userAge = getAge(userData.userAge);  
          userData.userAge = getAge(userData.userAge);  
          return [...prevState,userData];
        });
      }
      setUserData(initialValues);
    }
  };

  const handleCleanClick = (props) => {
    setUserData(initialValues);
  };

  const handleEditClick = (data, index) => {
    data.userAge = getAge(data.userAge)
    setUserData(data);
    seteditableUserData({
      isEdit: true,
      userIndex: index,
    });
  };
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
              {users.map((user, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{user.userName}</td>
                    <td>{user.userSurname}</td>
                    <td>{user.userAge}</td>
                    <td>{user.userSalary}</td>
                    <td>
                      <div className="as">
                        <button
                          className="edit_action"
                          onClick={() => handleEditClick(user, index)}
                        >
                          Edit
                        </button>
                        <button
                          className="remove_action"
                          onClick={() => handleRemoveClick(index)}
                        >
                          Remove
                        </button>
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
              type={"date"}
              placeholder="Age"
              onChange={(e) => {
                setUserData((prevState) => ({
                  ...prevState,
                  userAge: e.target.value,
                }));
              }}
              value={userData.age}
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
              <button disabled={!isFilledFields} type="submit">
                {editableUserData.isEdit ? "Edit" : "add"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div></div>
      {/* <DateInput /> */}
    </div>
  );
};

export default App;
