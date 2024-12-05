interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  createdAt: string;
}

interface SecondFormProps {
    user: User | null;
  }
  
  const SecondForm = ({ user }: SecondFormProps) => {
    if (!user) 
        return null; 

    const editUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        
        const data: Record<string, any> = Object.fromEntries(formData);
        console.log('OOPS X 4');
        console.log('OOPS X 5');
        console.log(data);
        
        
        const user = {
            id: data.id,  
            name: data.name,
            username: data.username,
            email: data.email,
            address: {
                street: data["address.street"],
                suite: data["address.suite"],
                city: data["address.city"],
                zipcode: data["address.zipcode"],
                geo: {
                    lat: data["address.geo.lat"],
                    lng: data["address.geo.lng"],
                },
            },
            phone: data.phone,
            website: data.website,
            company: {
                name: data["company.name"],
                catchPhrase: data["company.catchPhrase"],
                bs: data["company.bs"],
            },
            createdAt: new Date().toISOString(), 
        };
        console.log(user);
    
        try {
            console.log('oops part 1');
            const response = await fetch(`http://localhost:3500/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
    
            if (!response.ok) {
                console.log('oops part 2');
                const errorDetails = await response.json();
                throw new Error(`Error ${response.status}: ${errorDetails.error || 'Failed to update user'}`);
                
            }
            console.log('oops part 3');
            const result = await response.json();
            console.log("User edited successfully:", result);
           window.location.reload();
        } catch (error) {
            console.error("Failed to edit user:", error);
        }
    };
    
  
    return (
        <form className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 space-y-6" onSubmit= {editUser} >
        <h3 className="text-2xl font-bold text-center text-gray-800">User Info</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label  className="block text-gray-700 font-medium mb-1">ID:</label>
            <input
              type="text"
              name="id"
              id="id"
              value={user.id}
              title="Enter a unique ID for the user."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label  className="block text-gray-700 font-medium mb-1">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={user.name}
              title="Enter the user's full name."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label  className="block text-gray-700 font-medium mb-1">Username:</label>
            <input
              type="text"
              name="username"
              defaultValue={user.username}
              id="username"
              title="Enter a unique username."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label  className="block text-gray-700 font-medium mb-1">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              defaultValue={user.email}
              title="Enter a valid email address."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label  className="block text-gray-700 font-medium mb-1">Street:</label>
            <input
              type="text"
              name="address.street"
              id="street"
              defaultValue={user.address.street}
              title="Enter the street name."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label  className="block text-gray-700 font-medium mb-1">Suite:</label>
            <input
              type="text"
              name="address.suite"
              id="suite"
              defaultValue={user.address.suite}
              title="Enter the suite or apartment number."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label  className="block text-gray-700 font-medium mb-1">City:</label>
            <input
              type="text"
              name="address.city"
              id="city"
              defaultValue={user.address.city}
              title="Enter the city name."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label  className="block text-gray-700 font-medium mb-1">Zipcode:</label>
            <input
              type="text"
              name="address.zipcode"
              id="zipcode"
              defaultValue={user.address.zipcode}
              title="Enter the ZIP or postal code."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label  className="block text-gray-700 font-medium mb-1">Latitude:</label>
            <input
              type="text"
              name="address.geo.lat"
              id="lat"
              defaultValue={user.address.geo.lat}
              title="Enter the latitude coordinates."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Longitude:</label>
            <input
              type="text"
              name="address.geo.lng"
              id="lng"
              defaultValue={user.address.geo.lng}
              title="Enter the longitude coordinates."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label  className="block text-gray-700 font-medium mb-1">Phone:</label>
            <input
              type="text"
              name="phone"
              defaultValue={user.phone}
              id="phone"
              title="Enter the user's phone number."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label  className="block text-gray-700 font-medium mb-1">Website:</label>
            <input
              type="text"
              name="website"
              id="website"
              defaultValue={user.website}
              title="Enter the user's website URL."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Company Name:</label>
            <input
              type="text"
              name="company.name"
              id="companyName"
              defaultValue={user.company.name}
              title="Enter the company's name."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label  className="block text-gray-700 font-medium mb-1">Catchphrase:</label>
            <input
              type="text"
              name="company.catchPhrase"
              id="catchPhrase"
              defaultValue={user.company.catchPhrase}
              title="Enter the company's catchphrase."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label  className="block text-gray-700 font-medium mb-1">Business:</label>
            <input
              type="text"
              name="company.bs"
              id="bs"
              defaultValue={user.company.bs}
              title="Enter the company's business focus."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
        </div>
        
        <div className="text-center">
          <button
            type="submit"
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </form>
    );
  };

  export default SecondForm;