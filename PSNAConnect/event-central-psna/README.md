# CampusConnect - PSNA College Event Portal

CampusConnect is a centralized event and resource portal for PSNA College of Engineering. It allows students to discover, register for, and manage campus events, clubs, and placement activities. The platform features authentication, personalized profiles, and (optionally) AI-powered features.

---

## Features
- User authentication (sign up, sign in, profile management)
- Event discovery and registration
- Club and placement information
- Notification panel
- AI Description Generator (planned, using Vertex AI)
- Admin and student dashboards (planned)

---

## Technologies Used
- **React** (with TypeScript)
- **Vite** (build tool)
- **Tailwind CSS** (utility-first styling)
- **shadcn-ui** (UI components)
- **Firebase Authentication** (user auth)
- **Firebase Firestore** (cloud database for user profiles, events, etc.)
- **EmailJS** (for registration confirmation emails)
- **Google Vertex AI** (planned, for AI-powered features)

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- Firebase project with Authentication and Firestore enabled

### Setup
1. **Clone the repository:**
   ```sh
   git clone <YOUR_GIT_URL>
   cd event-central-psna
   ```
2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```
3. **Configure Firebase:**
   - Copy your Firebase config to `src/lib/firebase.ts`.
   - Enable Email/Password authentication and Firestore in your Firebase Console.
4. **(Optional) Configure EmailJS:**
   - Set up your EmailJS service and template.
   - Add your EmailJS public key and template IDs to the registration form.

### Development
```sh
npm run dev
# or
yarn dev
```
- The app will be available at `http://localhost:5173` (or as shown in your terminal).

### Deployment
- You can deploy to Vercel, Netlify, Firebase Hosting, or any static hosting provider.
- For custom domain setup, follow your hosting provider's instructions.

---

## Google Technologies Used
- **Firebase Authentication**: Secure user sign-up/sign-in.
- **Firestore**: Store user profiles, events, and other data.
- **(Planned) Vertex AI**: For AI-powered features like description generation or chatbots.
- **(Legacy) Google Apps Script**: Previously used for Google Sheets integration (now replaced by Firestore).

---

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License
[MIT](LICENSE)
