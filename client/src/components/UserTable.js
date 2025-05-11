import React from "react";
import "./UserTable.css";

const UserTable = ({ users, onUpdate, onDelete }) => {
  return (
    <div className="user-table-container">
      <h2 className="table-title">Registered Participants</h2>
      {users.length === 0 ? (
        <p className="empty-message">No users registered yet.</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                  <button className="edit-btn" onClick={() => onUpdate(user)}>
                    ✏️ Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this user?"
                        )
                      ) {
                        onDelete(user._id);
                      }
                    }}
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserTable;
