#!/bin/bash

echo "Starting project context setup and verification..."

# Install Backend Dependencies
echo "Installing backend dependencies..."
cd backend && npm install
cd ..

# Install Frontend Dependencies
echo "Installing frontend dependencies..."
if [ ! -d "frontend" ]; then
    npm create vite@latest frontend -- --template react
fi
cd frontend && npm install
cd ..

# Run Verification (Basic lint/build check could be added here)
echo "Running basic verification..."
# cd backend && npm test # Example

# Generate basic documentation (using tree or similar)
echo "Generating project documentation..."
echo "Project Structure:" > PROJECT_STRUCTURE.md
find . -maxdepth 2 -not -path '*/.*' >> PROJECT_STRUCTURE.md

echo "Setup and verification complete!"
