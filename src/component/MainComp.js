import { Card, Button } from "antd";
import {
  HeartOutlined,
  EditOutlined,
  DeleteOutlined,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  HeartFilled,
} from "@ant-design/icons";
import "bootstrap/dist/css/bootstrap.min.css";
import {   useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  setEditUserDetails,
  updateLike,
  saveUserList,
} from "../redux/user.slice";
import Loader from "./Loader";
import { useEffect, useState } from "react";


const UserCard = ({ user,index }) => {
  const dispatch = useDispatch();
  const { list: users, loading, } = useSelector((state) => state.users);
   

  const getUserData = async () => {
    try {
      let url = `https://jsonplaceholder.typicode.com/users`;
      let response = await fetch(url);
      let data = await response.json();
      dispatch(saveUserList([...data]));
      // setLoading(false); 
    } catch (error) {
      alert(error.message);
      
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh"}} >
        <Loader/>
        </div>
      ) : (
        <>
          {users.map((user, index) => {
            return (
              <div className="col-md-4 pt-3 mb-3 col-8 col-lg-3 m-auto" >
                <Card   size="small"
                  cover={
                    <div style={{ backgroundColor: "#f0f0f0", }}>
                    <img
                      alt={user.name}
                      src={`https://api.dicebear.com/8.x/avataaars/svg?seed=${user.name}`}
                      className="pt-2 pl-2 ps-2"
                    />
                    </div>  
                  }
                  
                  actions={[
                    user.like ? ( <HeartFilled
                      key="heart"
                      onClick={() => dispatch(updateLike(index))}
                      style={{ color: "red" }}  // Fill color when liked
                    />) :(
                    <HeartOutlined 
                      key="heart"
                      onClick={() => dispatch(updateLike(index))}
                      style={{ color: "black" }}
                    />  ) ,
                    <EditOutlined
                    key="edit"
                    data-bs-toggle="modal"
                    data-bs-target="#user-edit"
                    onClick={() => dispatch(setEditUserDetails(index))}
                  />,
                    <DeleteOutlined
                      onClick={() => dispatch(deleteUser(index))}
                      key="delete"
                    />,
                   ]}
                >
                  <Card.Meta
                    title={user.name}
                    description={
                      <div >
                        <p>
                          <MailOutlined /> {user.email}
                        </p>
                        <p>
                          <PhoneOutlined /> {user.phone}
                        </p>
                        <p>
                          <GlobalOutlined /> {user.website}
                        </p>
                      </div>
                    }
                  />
                </Card>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default UserCard;
