import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ReadAllUsersAdmin = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleDelete = (_id) => {
    const token = localStorage.getItem('userToken');
    axios.delete(`http://localhost:5000/api/users/delete/${_id}`, {
      headers: {
        "x-auth-token": token,  // Sử dụng header "x-auth-token"
      },
    })
      .then(() => {
        getData();
      })
      .catch((error) => {
        console.error("Error deleting user: ", error);
        alert("Failed to delete user. Please try again.");
      });
  };

function getData() {
    setIsLoading(true);
    const token = localStorage.getItem('userToken');
  
    if (!token) {
      console.error("No token found");
      setIsLoading(false);
      return;  
    }
  
    axios.get("http://localhost:5000/api/users", {
      headers: {
        "x-auth-token": token,  
      },
    })
    .then((res) => {
      setData(res.data);
      setIsLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      console.log("Token: ", token);
      setIsLoading(false);
    });
  }


  useEffect(() => {
    getData();
  }, []);

  return (
    <section className="mt-28">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-2xl md:mx-auto mx-5">
        <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                FirstName
              </th>
              <th scope="col" className="px-6 py-3">
                LastName
              </th>
              <th scope="col" className="px-6 py-3">
                Admin
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Read
              </th>
              <th scope="col" className="px-6 py-3">
                Edit
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  <div role="status" className="flex justify-center">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No data available
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr
                  key={index}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td className="px-6 py-4">{item.firstname}</td>
                  <td className="px-6 py-4">{item.lastname}</td>
                  <td className="px-6 py-4">{item.isAdmin ? "Admin" : "User"}</td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/user-detail/${item._id}`}
                    >
                      {/* <button className="bg-green-800 px-7 py-1 text-white">
                        Edit
                      </button> */}
                      <button className="bg-green-700 px-5 py-1 text-white">
                        Xem
                      </button>
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/update-user/${item._id}`}
                    //   onClick={() =>
                    //     setToLocalStorage(item.id, item.name, item.email)
                    //   }
                    >
                      {/* <button className="bg-green-800 px-7 py-1 text-white">
                        Edit
                      </button> */}
                      <button className="bg-green-700 px-5 py-1 text-white">
                        Sua
                      </button>
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <button
                       onClick={() => handleDelete(item._id)}
                      className="bg-red-700 px-5 py-1 text-white"
                      disabled={item.isAdmin}
                    >
                      Xoa
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ReadAllUsersAdmin;