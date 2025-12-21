# Admin Panel - Portfolio Management

## Access the Admin Panel

Navigate to: **http://localhost:5173/admin**

## Features

The admin panel allows you to manage all your portfolio content directly from the browser. All changes are saved to MongoDB Atlas.

### Available Sections

1. **Projects** - Add, edit, and delete your projects
2. **Certifications** - Manage your certifications and courses
3. **Experience** - Update your work experience and internships
4. **Education** - Modify your educational background

## How to Use

### Adding New Content

1. Click on the tab for the content type you want to add (e.g., "Certifications")
2. Fill out the form with your information
3. Click the "Add" button
4. The new item will appear in the list below

### Editing Existing Content

1. Find the item you want to edit in the list
2. Click the "Edit" button on that item
3. The form will populate with the current data
4. Make your changes
5. Click "Update" to save

### Deleting Content

1. Find the item you want to delete
2. Click the "Delete" button
3. Confirm the deletion in the popup

## Form Fields

### Projects
- **Title**: Name of your project (required)
- **Description**: Detailed description
- **Technologies**: Comma-separated list (e.g., "React, Node.js, MongoDB")
- **GitHub URL**: Link to repository (optional)
- **Date**: When you built it (e.g., "January 2026")
- **Highlights**: One per line

### Certifications
- **Name**: Certification name (required)
- **Provider**: Organization that issued it (required)
- **Date**: When you completed it (e.g., "March 2025")
- **Link**: Certificate URL (optional)

### Experience
- **Role**: Job title/position (required)
- **Company**: Company name (required)
- **Duration**: Period worked (e.g., "June 2025 - July 2025")
- **Description**: What you did there
- **Technologies**: Comma-separated list
- **Highlights**: One per line

### Education
- **Institution**: School/college name (required)
- **Degree**: Program name (required)
- **CGPA**: Your CGPA (optional)
- **Percentage**: Your percentage (optional)
- **Year**: Graduation year (required)
- **Currently studying**: Check if ongoing

## Important Notes

✅ All changes are **instantly saved to MongoDB**  
✅ Your main portfolio at `/` will **automatically show updated data**  
✅ No need to restart the server or edit code  
✅ All data is stored securely in MongoDB Atlas

## Return to Portfolio

Click the "← Back to Portfolio" link in the top-right corner to view your public-facing portfolio.

## Security Note

⚠️ **The admin panel is currently unprotected.** Anyone with the URL can access it.

For production use, you should:
1. Add authentication (username/password)
2. Restrict the /admin route to authenticated users only
3. Use environment variables for admin credentials

## Technical Details

- **Frontend**: React with forms and state management
- **Backend**: MongoDB Atlas with Express REST API
- **Operations**: Full CRUD (Create, Read, Update, Delete)
- **Sync**: Real-time updates between admin and public portfolio
