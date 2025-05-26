const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'reg', 'users.json');

function loadUsers() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

function saveUsers(users) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

function registerUser(formData) {
  const { username, password, ime, prezime } = formData;
  const users = loadUsers();
  if (users.find(u => u.username === username)) {
    return { success: false, message: 'Korisnik već postoji' };
  }

  const user = {
    username,
    password,
    ime,
    prezime,
    role: username === 'admin@admin.com' ? 'admin' : 'user'
  };

  users.push(user);
  saveUsers(users);
  return { success: true };
}

function loginUser(username, password) {
  const users = loadUsers();
  const user = users.find(u => u.username === username && u.password === password);
  return user ? { success: true, role: user.role } : { success: false };
}

module.exports = { registerUser, loginUser };
