# Coding Standards and Quality Guidelines

## Frontend (React + Tailwind CSS)
- **Component-Based Architecture**: Keep components small, reusable, and focused on a single responsibility.
- **Functional Components**: Use React hooks (`useState`, `useEffect`, `useCallback`) exclusively.
- **Tailwind CSS**: Use utility classes for styling. Follow mobile-first design principles.
- **Data Fetching**: Use `axios` for API calls. Implement proper loading and error states.
- **Props Validation**: If using TypeScript (optional), define interfaces. Otherwise, ensure clear prop documentation.

## Backend (Node.js + Express + MongoDB)
- **RESTful API**: Follow standard REST conventions for status codes and HTTP methods.
- **Mongoose Models**: Define schemas clearly with validation. Use references (`ObjectId`) for relationships.
- **Error Handling**: Use centralized error handling middleware. Return meaningful error messages.
- **Environment Variables**: Never hardcode secrets. Use `.env` files.
- **Code Structure**: Separate concerns into models, routes, and controllers/services.

## Testing Requirements
- **Manual Verification**: Test the full booking flow (User -> Booking -> Admin Table).
- **API Testing**: Verify all endpoints (`GET`, `POST`) using `curl` or Postman.
- **Responsiveness**: Verify layout on mobile, tablet, and desktop screens.

## Review Checklist
- [ ] Is the code clean and well-commented?
- [ ] Are there any hardcoded secrets?
- [ ] Is the UI responsive?
- [ ] Do all API endpoints return the correct status codes?
- [ ] Is the error handling robust?
- [ ] Are all frontend components properly modularized?
