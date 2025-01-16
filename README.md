# Project Documentation

## Overview

This document outlines the setup, requirements, and steps for running and testing the frontend and backend of the project. It also includes details about the technologies used, ports, environment variables, and seeding data.

---

## Requirements

### Backend Requirements

- **Technologies:**

  - Ruby on Rails
  - GraphQL
  - MySQL [install guide](https://dev.mysql.com/doc/refman/8.4/en/installing.html)
  - Redis (for ActionCable and Subscriptions)
  - Sidekiq

- **Dependencies:**
  - Rails 7+
  - Ruby 3.3.0
  - MySQL 8.4.0
  - GraphQL Ruby gem
  - Redis gem
  - Sidekiq gem

### Frontend Requirements

- **Technologies:**

  - React (Next.js)
  - TypeScript
  - Apollo Client
  - Tailwind CSS
  - FontAwesome for icons

- **Dependencies:**
  - @apollo/client
  - graphql
  - @fortawesome/react-fontawesome
  - tailwindcss

---

## Setup Instructions

### Clone repository

```bash
git clone git@github.com:oluosiname/meister-tasks.git
```

### Environment Variables

#### Backend `.env`

```env
DATABASE_USERNAME=root
DATABASE_PASSWORD=yourpassword
```

#### Frontend `.env.local`

Set the environment variables in `.env.local` in client folder.
If you're running rails on different port, be siure to change accordingly

```env
NEXT_PUBLIC_GRAPHQL_API_URL=http://localhost:3000/graphql
NEXT_PUBLIC_GRAPHQL_SUBSCRIPTION_URL=ws://localhost:3000/cable
```

### Set Up and Running the Application

1. **Start Redis:**
   Ensure redis is running. In a different window start your local redis server

   ```bash
   redis-server
   ```

   or however you manage your redis

2. **Start the development servers:**

   ```bash
   bin/server
   ```

This command will

- Install dependencies indempotently
- Setup and seed Database indempotently
- Run Servers for backend and frontend
- Start Sidekiq

Visit `http://localhost:5000` to view the app

### Manually creating tasks for projects

```bash
 rails c
```

```ruby
TaskCreatorJob.new.perform
```

---

## Ports Used

- **Backend:** Runs on `http://localhost:5000`
- **Frontend:** Runs on `http://localhost:3000`

---

## Running Tests

### Backend Tests

1. **Run tests with RSpec:**

```bash
bundle exec rspec
```

2. **Test Coverage:** Ensure all endpoints (including GraphQL subscriptions) are covered.

### Frontend Tests

1. **Run tests with Jest:**

   ```bash
   npm test
   ```

2. **Watch mode (optional):**
   ```bash
   npm test -- --watch
   ```

---

## Key Functionalities

### Backend Functionalities

- GraphQL API with queries and subscriptions.
- Task creation and management.
- ActionCable for real-time updates.
- Redis for subscription broadcasting.

### Frontend Functionalities

- Project selection and task display.
- Support for list and grid views.
- Dynamic updates via GraphQL subscriptions.
- Responsive and accessible UI built with Tailwind CSS.

---
