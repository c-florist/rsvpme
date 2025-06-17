set export
set dotenv-load := true

# Default recipe to list all available recipes
_default:
    @just --list

# Install application dependencies
init:
    npm install

# Build the application
build:
    npm run build

# Run the astro dev server
dev:
    npm run dev

# Run linting and fix issues
tidy:
    npm run tidy

# Run type checking
typecheck:
    npm run typecheck
