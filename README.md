# Dynamic Portfolio Website - Kathir G

A modern, dark-themed full-stack portfolio website with dynamic content management capabilities.

## 🚀 Features

- **Modern Dark Theme**: Premium dark aesthetic with cyan/purple neon accents
- **Fully Responsive**: Mobile-first design that works on all devices
- **Dynamic Content**: All content fetched from backend API
- **Easy Updates**: Add/edit projects, certifications, and experience without code changes
- **REST API**: Complete CRUD operations for all content types
- **Real-time Updates**: Changes reflect immediately after editing data.json

## 🛠️ Tech Stack

### Frontend
- React 18 with Vite
- Axios for API calls
- CSS3 with custom properties
- Responsive grid layouts

### Backend
- Node.js + Express.js
- RESTful API architecture
- JSON file-based data storage
- CORS enabled

## 📁 Project Structure

```
portfolio/
├── server/              # Backend API
│   ├── server.js       # Express server with REST endpoints
│   ├── data.json       # Portfolio content (easily editable)
│   └── package.json
│
├── client/             # React frontend
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── api/        # API client
│   │   ├── styles/     # Global CSS
│   │   └── App.jsx     # Main app
│   └── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation & Running

1. **Start the Backend Server** (Terminal 1)
```bash
cd server
npm install
npm start
```
Backend will run on http://localhost:5000

2. **Start the Frontend** (Terminal 2)
```bash
cd client
npm install
npm run dev
```
Frontend will run on http://localhost:5173

3. **Open your browser**
Navigate to http://localhost:5173

## 📝 How to Update Content

### Method 1: Edit data.json (Easiest)

Open `server/data.json` and modify the content directly:

```json
{
  "profile": { ... },
  "education": [ ... ],
  "projects": [
    {
      "id": 4,
      "title": "My New Project",
      "description": "Description here",
      "technologies": ["React", "Node.js"],
      "date": "January 2026",
      "github": "https://github.com/yourrepo",
      "highlights": ["Feature 1", "Feature 2"]
    }
  ],
  ...
}
```

Save the file and **refresh the browser** - changes appear instantly!

### Method 2: Use API Endpoints

You can use tools like Postman or curl to interact with the API:

#### Add a new project:
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Project",
    "description": "Project description",
    "technologies": ["React", "Node.js"],
    "date": "January 2026"
  }'
```

#### Get all projects:
```bash
curl http://localhost:5000/api/projects
```

#### Update a project:
```bash
curl -X PUT http://localhost:5000/api/projects/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Title"}'
```

#### Delete a project:
```bash
curl -X DELETE http://localhost:5000/api/projects/1
```

## 🔧 Available API Endpoints

### Profile
- `GET /api/profile` - Get profile information
- `PUT /api/profile` - Update profile

### Education
- `GET /api/education` - Get all education entries
- `POST /api/education` - Add new education
- `PUT /api/education/:id` - Update education
- `DELETE /api/education/:id` - Delete education

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Add new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Experience
- `GET /api/experience` - Get all experience
- `POST /api/experience` - Add new experience
- `PUT /api/experience/:id` - Update experience
- `DELETE /api/experience/:id` - Delete experience

### Skills
- `GET /api/skills` - Get skills
- `PUT /api/skills` - Update skills

### Certifications
- `GET /api/certifications` - Get all certifications
- `POST /api/certifications` - Add new certification
- `PUT /api/certifications/:id` - Update certification
- `DELETE /api/certifications/:id` - Delete certification

## 🎨 Customization

### Colors
Edit CSS variables in `client/src/styles/global.css`:
```css
:root {
  --bg-primary: #0a0a0f;
  --accent-cyan: #00d9ff;
  --accent-purple: #b47eff;
  /* ... */
}
```

### Fonts
Fonts are loaded from Google Fonts in `client/index.html`. Change to your preferred fonts.

## 📦 Future Enhancements

- Admin panel UI for easier content management
- Database integration (MongoDB/PostgreSQL)
- Image uploads for projects
- Contact form
- Dark/Light theme toggle
- Blog section

## 📄 License

MIT License - feel free to use this portfolio for your own projects!

## 👤 Author

**Kathir G**
- LinkedIn: [kathir-ganesan](https://linkedin.com/in/kathir-ganesan)
- GitHub: [Kathir2911](https://github.com/Kathir2911)
- Email: kathirganesan11@gmail.com
