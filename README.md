# Virtual Study Group Platform

The Virtual Study Group Platform is a web application designed to facilitate the creation, management, and participation in online study groups. This platform allows users to create, join, and manage study groups, share resources, and engage in real-time discussions with peers. The application is built using Vue.js, Tailwind CSS, Firebase Authentication, and Firebase Firestore.

## Features

- **User Authentication:**
  - Registration
  - Login
  - Logout

- **Study Group Management:**
  - Create a new study group
  - Join existing study groups
  - View available study groups

- **Real-Time Interaction:**
  - Discussion board for posting and viewing messages
  - Resource sharing within study groups

- **Social Features:**
  - Like study groups
  - Delete study groups (by group creator)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Technical Details](#technical-details)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later)
- Firebase project setup

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/aalexandros47/virtual-study-group-platform.git
   ```

2. Navigate to the project directory:

   ```bash
   cd virtual-study-group-platform
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up Firebase:

   - Create a Firebase project at https://console.firebase.google.com/
   - Enable Firebase Authentication and Firestore in the Firebase console
   - Obtain your Firebase config object and replace the placeholder in `src/firebase.js`

5. Start the development server:

   ```bash
   npm run serve
   ```

## Usage

1. **Register a new account** to create or join study groups.
2. **Login** with your registered account.
3. **Create a new study group** by providing the group name, description, and expiry date.
4. **Join existing study groups** to participate in discussions and share resources.
5. **Like and delete study groups** as needed.

## Project Structure

```
virtual-study-group-platform/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   │   └── styles.css
│   ├── components/
│   │   ├── DiscussionBoard.vue
│   │   ├── Navbar.vue
│   │   ├── PopupNotification.vue
│   │   ├── ResourceShare.vue
│   │   ├── StudyGroup.vue
│   │   └── UserForm.vue
│   ├── router/
│   │   └── index.js
│   ├── store/
│   │   └── index.js
│   ├── views/
│   │   ├── CreateGroup.vue
│   │   ├── HomePage.vue
│   │   ├── StudyGroups.vue
│   │   ├── UserLogin.vue
│   │   └── UserRegister.vue
│   ├── App.vue
│   ├── firebase.js
│   └── main.js
├── .gitignore
├── README.md
├── package-lock.json
└── package.json
```

## Technical Details

### Frontend

- **Vue.js:** Used to build a dynamic, responsive, and modular frontend.
- **Tailwind CSS:** Utilized for styling the application with a mobile-first approach.
- **Vue Router:** Facilitates navigation between different pages of the application.
- **Vuex:** Manages the global state of the application.

### Backend

- **Firebase Authentication:** Provides secure user authentication.
- **Firebase Firestore:** Manages and stores study group data.

### Core Vue Directives

- **v-bind, v-model, v-if, v-for, v-on:** Used extensively to create interactive and reactive UIs.

### Accessibility

- Ensured that input forms and tables are accessible to all users, including those with disabilities.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`
3. Make your changes and commit them: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature-branch`
5. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

This README file provides a comprehensive guide to the Virtual Study Group Platform, ensuring that users can easily understand how to install, use, and contribute to the project.
