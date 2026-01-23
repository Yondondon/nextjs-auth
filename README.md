# Nextjs Auth App

## Technologies

- **Next.js**
- **Better Auth**
- **Postgres**
- **Shadcn UI**

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database
- pnpm (or npm/yarn)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd nextjs-auth
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Fill in your environment variables:

- `DATABASE_URI` - Your PostgreSQL connection string
- `BETTER_AUTH_SECRET` - Secret key for Better Auth (generate a random string)
- `BETTER_AUTH_URL` - Your application URL (e.g., `http://localhost:3000`)

4. Run database migrations to create tables:

```bash
npx @better-auth/cli migrate
```

5. Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- User authentication (sign in / sign up)
- Protected dashboard routes
- Modern UI with Shadcn components
- Dark mode support
- Form validation

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/auth/          # Auth API routes
│   ├── auth/              # Auth pages (sign-in, sign-up)
│   └── dashboard/         # Protected dashboard pages
├── components/            # React components
│   ├── form/             # Form components
│   └── ui/               # Shadcn UI components
└── lib/                  # Utility libraries
    ├── auth.ts           # Better Auth configuration
    └── auth-client.ts    # Client-side auth utilities
```
