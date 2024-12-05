import express from 'express';
import fs from "fs";
import path from "path";
import cors from "cors";

const port = 3500;  

const app = express();
import { fileURLToPath } from 'url';

// Define __dirname for ES modules
//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);
const usersFilePath = 'C:\\Users\\hazhaz\\u-m-d\\data\\users.json';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/users', (req, res) => {
    const newUser = req.body;
    console.log("Received data:", req.body);

    // Extract user properties from newUser
    const { id, username, email } = newUser;

    // Check if all required fields are present
    if (!id || !username || !email) {
        return res.status(400).json({ error: 'Missing required fields (id, username, or email)' });
    }

    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to read users file' });
        }

        let users = [];
        let userExists = false;
        if (data) {
            try {
                const jsonData = JSON.parse(data); // Parse the existing data
                users = jsonData.users || []; // Access the "users" array from the root object

                // Check if a user with the same id, username, or email already exists
                userExists = users.some(
                    (user) => user.id === id || user.username === username || user.email === email
                );

            } catch (e) {
                console.error("Error parsing JSON:", e);
                return res.status(500).json({ error: 'Invalid JSON format in users file' });
            }
        }

        if (userExists) {
            return res.status(400).json({
                msg: 'User with this Id, Username, or Email already exists. Please try again.'
            });
        } else {
            // Add the new user to the users array
            users.push(newUser);

            // Write the updated users array back to the file
            const updatedData = { users: users }; // Wrap the users array in an object
            fs.writeFile(usersFilePath, JSON.stringify(updatedData, null, 2), 'utf8', (writeErr) => {
                if (writeErr) {
                    console.error(writeErr);
                    return res.status(500).json({ error: 'Failed to update users file' });
                }

                res.status(200).json({ message: 'User added successfully' });
            });
        }
    });
});


app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body;

    console.log("Received data:", req.body);
   // const {username, email } = updatedUser;

    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to read users file' });
        }

        let users = [];
        if (data) {
            try {
                const jsonData = JSON.parse(data); 
                users = Array.isArray(jsonData.users) ? jsonData.users : []; 
                 
               /*  const userExists = users.some(
                    (user) => user.username === username || user.email === email
                );*/

            } catch (e) {
                console.error("Error parsing JSON:", e);
                return res.status(500).json({ error: 'Invalid JSON format in users file' });
            }
        }
       
        const userIndex = users.findIndex(user => user.id.toString() === id);

        if (userIndex === -1) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the user data
        users[userIndex] = { ...users[userIndex], ...updatedUser };

        // Ensure the required fields exist in updatedUser (optional validation step)
        if (!updatedUser.name || !updatedUser.email || !updatedUser.phone) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Write the updated users array back to the file
        fs.writeFile(usersFilePath, JSON.stringify({ users }, null, 2), 'utf8', (writeErr) => {
            if (writeErr) {
                console.error(writeErr);
                return res.status(500).json({ error: 'Failed to save updated user' });
            }

            return res.status(200).json({
                message: 'User updated successfully',
                user: users[userIndex],
            });
        });
    });
});



app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;

    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to read users file' });
        }

        let users = data ? JSON.parse(data) : [];

        // Find the index of the user to delete
        const userIndex = users.findIndex(user => user.id === userId);

        if (userIndex === -1) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Remove the user from the array
        users.splice(userIndex, 1);

        // Write the updated list back to the file
        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), 'utf8', (writeErr) => {
            if (writeErr) {
                console.error(writeErr);
                return res.status(500).json({ error: 'Failed to update users file' });
            }

            res.status(200).json({ message: 'User deleted successfully' });
        });
    });
});


app.listen(3500, () => {
    console.log('Server running on http://localhost:3500');
});