//import React from 'react'
//import { useState } from "react";
function FormPart() {
  //const [addUserButton , setAddUserButton] = useState<boolean>(true);
  async function addUser(e: React.FormEvent<HTMLFormElement>) {
   // setAddUserButton(false);
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    
    const data: Record<string, any> = Object.fromEntries(formData);

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

    try {
        const response = await fetch('http://localhost:3500/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        const result = await response.json();
        if (!response.ok) {
           
            alert(result.msg);
            
        }

        //const result = await response.json();
        console.log("User added successfully:", result);
        window.location.reload();
    } catch (error) {
        console.error("Error adding user:", error);
    }
}


    
    
    
  return (
    <form className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 space-y-6" onSubmit={addUser}>
    <h3 className="text-2xl font-bold text-center text-gray-800">User Info</h3>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label  className="block text-gray-700 font-medium mb-1">ID:</label>
        <input
          type="text"
          name="id"
          id="id"
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
  
  )
}

export default FormPart