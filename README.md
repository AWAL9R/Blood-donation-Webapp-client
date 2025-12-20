# BloodLink - A blood donation management system
## This is client side repository
- Server Repository [https://github.com/AWAL9R/Blood-donation-Webapp-server.git](https://github.com/AWAL9R/Blood-donation-Webapp-server.git)
## Objectives
- To bridge the gap between potential donors and medical facilities in need of life-saving blood supplies. By centralizing donor registrations and real-time inventory tracking, the platform ensures that hospitals can quickly locate compatible blood types during emergencies.
## Key features
- One can register and make a donation request on behalf.
- User can search users by blood group.
- User can accept request to give blood.
- User dashboard to manage own donation requests.
- User can edit his profile.
- Admin and Volunteer can manage all donation requests. 
- Admin can manage all users, assign roles. 
- User can donate to fundings.
## Demo
- Live link: [https://blood-link-awal9r.web.app](https://blood-link-awal9r.web.app)

## 🛠️ Tech Stack & Dependencies

### Core Architecture
* **React 19 & Vite**: Built on the latest version of React for improved performance and Vite for lightning-fast development and optimized bundling.
* **React Router 7**: Handles complex client-side routing and navigation with ease.

### Data Fetching & Backend Integration
* **TanStack Query (React Query) v5**: Manages server state, providing powerful caching, background updates, and stale-data management.
* **Firebase**: Powers the authentication layer and real-time database capabilities.
* **Axios**: Utilized for robust, promise-based HTTP requests to backend services.

### UI & Styling
* **Tailwind CSS v4 & DaisyUI**: A cutting-edge styling setup using utility-first CSS and a comprehensive component library for a polished, professional look.
* **React Icons**: Provides a wide array of scalable vector icons for a more intuitive user experience.
* **React Hot Toast & SweetAlert2**: Ensures clear communication with the user through elegant notifications and interactive modal dialogs.

### Data Visualization
* **Recharts & React Minimal Pie Chart**: Interactive and responsive charts used to visualize blood inventory, donor statistics, and emergency requirements.

### Form Management
* **React Hook Form**: Minimizes re-renders and simplifies form validation for donor registration and request forms.

---

## 🚀 Getting Started

### Prerequisites
* **Node.js** (Latest LTS recommended)
* **npm** or **yarn**

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/AWAL9R/Blood-donation-Webapp-client.git
   ```
2. Navigate to the project directory:
    ```bash
    cd Blood-donation-Webapp-client
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

### Available Scripts
In the project directory, you can run:

`npm run dev`: Runs the app in development mode.

`npm run build`: Builds the app for production to the dist folder.

`npm run lint`: Identifies and fixes linting errors in your code.

`npm run preview`: Locally previews your production build.