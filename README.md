# Tourism E-commerce CMS

A comprehensive CMS system for tourism e-commerce based on Payload CMS.

## Implementation Progress

### Phase 1: Foundation

- [x] Project Initialization
  - [x] Created Payload project with PostgreSQL
  - [x] Updated TypeScript configuration
  - [x] Set up basic project structure

- [x] Database Configuration
  - [x] Updated environment variables
  - [x] Docker configuration (PostgreSQL)

- [x] Server Configuration
  - [x] Created seed script
  - [x] Set up Payload configuration
  - [x] Configured admin UI settings
  - [x] Set up CORS and CSRF protection

- [x] Endpoint Setup
  - [x] Health check endpoint
  - [x] Configuration endpoint

- [x] Plugin Structure
  - [x] Created plugin directory structure
  - [x] Set up Users plugin skeleton 
  - [x] Set up Media plugin skeleton

### To-Do

- [ ] Fix TypeScript issues
  - [ ] Resolve endpoint handler types
  - [ ] Fix collection type declarations
  - [ ] Implement proper plugin type imports

- [ ] Complete Users Plugin Implementation
  - [ ] Configure collection fields
  - [ ] Set up authentication
  - [ ] Configure role-based access control

- [ ] Complete Media Plugin Implementation
  - [ ] Set up image processing
  - [ ] Configure upload settings
  - [ ] Set up access control

## Known Issues

There are several TypeScript type errors that need to be resolved:

1. Endpoint handler types are not properly aligned with PayloadHandler
   - Custom endpoints have been temporarily commented out in the configuration
   - The main issue is that the handler signature in Payload v3 has changed to return a Response object
   - These will be properly implemented in Phase 2
2. Access control functions have typing issues
3. Plugin imports are not correctly set up
4. Seed script field types need to be fixed

## Development

### Running the Project

```bash
# Start the Docker containers
docker-compose up -d

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

### Database Access

The PostgreSQL database is configured with the following credentials:

- Host: postgres
- Port: 5432
- Database: tourism_ecommerce_cms
- User: postgres
- Password: postgres

### Admin Panel

Once running, the admin panel is accessible at: http://localhost:3000/admin

Default admin credentials:
- Email: admin@example.com
- Password: password

## Project Structure

```
├── src/
│   ├── access/              # Access control functions
│   ├── collections/         # Collection definitions
│   ├── endpoints/           # Custom API endpoints
│   │   ├── health/          # Health check endpoint
│   │   ├── config/          # Config endpoint
│   │   └── seed/            # Database seeding
│   ├── plugins/             # Plugins directory
│   │   └── core/            # Core plugins
│   │       ├── users/       # Users plugin
│   │       └── media/       # Media plugin
│   ├── utilities/           # Utility functions
│   └── payload.config.ts    # Payload CMS configuration
├── .env                     # Environment variables
├── docker-compose.yml       # Docker configuration
└── tsconfig.json            # TypeScript configuration
```

## Quick start

To spin up this template locally, follow these steps:

1. Clone the repository
2. Copy `.env.example` to `.env` and update the environment variables
3. Run `docker-compose up -d` to start the PostgreSQL database
4. Run `pnpm install` to install dependencies
5. Run `pnpm dev` to start the development server
6. Open http://localhost:3000/admin to access the admin panel

## Quick Start - local setup

To spin up this template locally, follow these steps:

### Clone

After you click the `Deploy` button above, you'll want to have standalone copy of this repo on your machine. If you've already cloned this repo, skip to [Development](#development).

### Development

1. First [clone the repo](#clone) if you have not done so already
2. `cd my-project && cp .env.example .env` to copy the example environment variables. You'll need to add the `MONGODB_URI` from your Cloud project to your `.env` if you want to use S3 storage and the MongoDB database that was created for you.

3. `pnpm install && pnpm dev` to install dependencies and start the dev server
4. open `http://localhost:3000` to open the app in your browser

That's it! Changes made in `./src` will be reflected in your app. Follow the on-screen instructions to login and create your first admin user. Then check out [Production](#production) once you're ready to build and serve your app, and [Deployment](#deployment) when you're ready to go live.

#### Docker (Optional)

If you prefer to use Docker for local development instead of a local MongoDB instance, the provided docker-compose.yml file can be used.

To do so, follow these steps:

- Modify the `MONGODB_URI` in your `.env` file to `mongodb://127.0.0.1/<dbname>`
- Modify the `docker-compose.yml` file's `MONGODB_URI` to match the above `<dbname>`
- Run `docker-compose up` to start the database, optionally pass `-d` to run in the background.

## How it works

The Payload config is tailored specifically to the needs of most websites. It is pre-configured in the following ways:

### Collections

See the [Collections](https://payloadcms.com/docs/configuration/collections) docs for details on how to extend this functionality.

- #### Users (Authentication)

  Users are auth-enabled collections that have access to the admin panel.

  For additional help, see the official [Auth Example](https://github.com/payloadcms/payload/tree/main/examples/auth) or the [Authentication](https://payloadcms.com/docs/authentication/overview#authentication-overview) docs.

- #### Media

  This is the uploads enabled collection. It features pre-configured sizes, focal point and manual resizing to help you manage your pictures.

### Docker

Alternatively, you can use [Docker](https://www.docker.com) to spin up this template locally. To do so, follow these steps:

1. Follow [steps 1 and 2 from above](#development), the docker-compose file will automatically use the `.env` file in your project root
1. Next run `docker-compose up`
1. Follow [steps 4 and 5 from above](#development) to login and create your first admin user

That's it! The Docker instance will help you get up and running quickly while also standardizing the development environment across your teams.

## Questions

If you have any issues or questions, reach out to us on [Discord](https://discord.com/invite/payload) or start a [GitHub discussion](https://github.com/payloadcms/payload/discussions).
