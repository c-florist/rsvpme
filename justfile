set export
set dotenv-load := true

# Default recipe to list all available recipes
_default:
    @just --list

# Install application dependencies
init:
    pnpm install
    pnpm run sync

# Build the application
build:
    pnpm run build

# Run the astro dev server
dev:
    pnpm run dev

# Run unit tests
test:
    pnpm run test:unit

# Run unit tests in watch mode
tdd:
    pnpm run test:unit:watch

# Run linting and fix issues
tidy:
    pnpm run tidy

# Run type checking
typecheck:
    pnpm run typecheck

# Generate types for Astro modules
sync:
    pnpm run sync

# Create a new database migration
migrations-generate name:
    pnpm run db:generate {{name}}

# Run database migrations
migrations-run:
    pnpm run db:migrate

# Remove a migration [!NB]: This will not remove the record in public.__drizzle_migrations, only the SQL file in db/migrations
migrations-drop:
    pnpm run db:migrations:drop
