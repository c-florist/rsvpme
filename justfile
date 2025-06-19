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

# Create a new database migration
migrations-generate name:
    npm run db:generate {{name}}

# Run database migrations
migrations-run:
    npm run db:migrate

# Remove a migration [!NB]: This will not remove the record in public.__drizzle_migrations, only the SQL file in db/migrations
migrations-drop:
    npm run db:migrations:drop
