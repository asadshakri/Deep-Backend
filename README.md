---TECH STACK---
Backend: Node.js, Express
Database: MongoDB
File Uploads: Multer
Architecture: MVC-style (Routes, Controllers, Utils)

This project is a RESTful backend service built using Node.js, Express, and MongoDB to manage events with full CRUD functionality. The system allows users to create, view, update, and delete events while supporting image uploads, pagination and filtering.

Key backend features include:

- Create Event API with multipart form-data support for image uploads
- Read Events API with pagination, type-based filtering, and single-event retrieval using eventId
- Update Event bu]y its unique id.
- Delete Event API for permanent removal of events
- Multer-based image handling with validation for image-only uploads
- timestamping (createdAt, updatedAt) for data tracking

