import axios from "axios";
import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from 'react-icons/fa'; 
import DropdownExample from "./DropDown";
import SearchBar from "./SearchBar";
import FormPart from "./FormPart";
import SecondForm from "./SecondForm";



/*interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    zipcode: string;
  };
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}*/

/*interface FormPartProps {
  msg: User;
}*/
function TableComponent() {
  const [users, setUsers] = useState<any[]>([]); 
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]); 
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editedUser , setEditedUser] = useState<boolean>(false);
  const [selectedUser , setSelectedUser] = useState(null);
  //const [formData, setFormData] = useState<any>({});
  const [addUserButton , setAddUserButton] = useState<boolean>(false);
  const usersPerPage = 5;

  
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      const data = response.data;
      setUsers(data);
      setFilteredUsers(data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError('Failed to fetch users');
      console.error(e);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  const numberOfPages = Math.ceil(filteredUsers.length / usersPerPage);
  const currentUsers = filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  
  const deleteUser = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/users/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        console.log(`Failed To Delete User With Id ${id}`);
      } else {
        console.log(`User With Id ${id} Deleted Successfully`);
        fetchUsers(); 
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSort = (sortType: string) => {
    let sortedUsers = [...users]; 
  
    if (sortType === 'Last 7 Days') {
      const today = new Date();
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - 7);
  
      sortedUsers = sortedUsers.filter((user) => {
        const userCreatedAt = new Date(user.createdAt);
        return userCreatedAt >= sevenDaysAgo;
      });
    }
  
    if (sortType === 'Last 30 Days') {
      const today = new Date();
      const thirtyDaysAgo = new Date(today);
      thirtyDaysAgo.setDate(today.getDate() - 30);
  
      sortedUsers = sortedUsers.filter((user) => {
        const userCreatedAt = new Date(user.createdAt);
        return userCreatedAt >= thirtyDaysAgo;
      });
    }
  
    if (sortType === 'Descending Id Order') {
      sortedUsers = sortedUsers.sort((a, b) => parseInt(b.id) - parseInt(a.id)); // Sort by descending ID
    }
  
    setFilteredUsers(sortedUsers); 
    setCurrentPage(1);
  };
  
  
  const handleSearch = (query: string) => {
    const filtered = users.filter((user) => user.id.toString().includes(query) || user.name.toString().includes(query));
    setFilteredUsers(filtered); 
    setCurrentPage(1); 
  };

  const handleEdit = (user: any) => {
    console.log('OOPS X 3');
    setEditedUser(true);
    setSelectedUser(user); 
    
    
};

const handleAddUser = () => {
  setAddUserButton(!addUserButton);
}

  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <>
            <DropdownExample onSort={handleSort} />
            <br />
            <SearchBar onSearch={handleSearch} />

            <br />
            <table className="min-w-full table-auto border-collapse bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Username</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Phone</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Website</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Company</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Address</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{user.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{user.username}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{user.phone}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{user.website}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {user.company.name}, {user.company.catchPhrase}, {user.company.bs}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 flex space-x-2">
                      <button title="edit?" className="text-blue-500 hover:text-blue-700"  onClick={() => handleEdit(user)}>
                        <FaEdit size={18} />
                      </button>
                      <button title="delete?" onClick={() => deleteUser(user.id)} className="text-red-500 hover:text-red-700">
                        <FaTrash size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6 flex justify-center space-x-2">
              {Array.from({ length: numberOfPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 rounded-lg text-sm ${
                    currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <br/>
            <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md 
            hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => handleAddUser()}
              >
  Add User
</button>

          </>
        )}
      </div>
     
    </div>
    <div>
      {addUserButton && (
      <div className="mt-4">
        <FormPart />
     
      
      
    </div>
    )}
    </div>
    {editedUser && (
  <div className="mt-4">
    <SecondForm user={selectedUser} />
  </div>
)}

    </>
    

);
}

export default TableComponent;
