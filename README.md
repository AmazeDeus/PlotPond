# PlotPond

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Docker Setup](#docker-setup)
- [Development Status](#development-status)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

PlotPond is a community platform where users can connect, create, share, and explore unique stories and scenarios. While the platform is designed to be self-reliant, a heavy focus during development will be on compatibility with the NovelAI platform, enabling efficient sharing and transportation of text data between both platforms.

## Features

- **Content Creation & Sharing**: Create and share unique stories and scenarios
- **NovelAI Integration**: Seamless compatibility with NovelAI platform
- **Community Features**: User profiles, following system, and community-driven content
- **Content Discovery**: Tag-based browsing and exploration with advanced filters
- **Engagement Tools**: Interactive features (likes, comments, bookmarks)
- **World Building**: Comprehensive world info/lore crafting system

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes (Up for change)
- **Database**: PostgreSQL with Drizzle ORM
- **Infrastructure**: Docker support for development and deployment

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Package manager: npm, yarn, or pnpm
- PostgreSQL database

### Installation

1. Clone the repository:
```bash
git clone https://github.com/AmazeDeus/PlotPond.git
cd PlotPond
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Fill in the required environment variables in `.env`

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [localhost:3000](http://localhost:3000) to view the application

### Docker Setup

#### For Windows Users

You have two options:

1. **Recommended for most users**: Install [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/)
   - Documentation:
     - [Install Docker Desktop on Windows](https://docs.docker.com/desktop/setup/install/windows-install/)
     - [Setting up WSL with Docker Desktop](https://docs.docker.com/desktop/features/wsl/)

2. **Advanced option**: Set up a Linux VM (e.g., using [Oracle VirtualBox](https://www.virtualbox.org/))
   - For this approach, consider using [Vagrant](https://developer.hashicorp.com/vagrant) to set up the environment
   - A detailed walkthrough will be provided in the future

#### Running with Docker

1. Build the Docker image:
```bash
docker build -t plotpond --build-arg NEXT_PUBLIC_CLIENTVAR=clientvar .
```

2. Run the Docker container:
```bash
docker run -p 3000:3000 -e DATABASE_URL="database_url_goes_here" plotpond
```

3. Access the application at [localhost:3000](http://localhost:3000)

## Development Status

### Completed Features
- ✅ Basic project setup
- ✅ Initial UI implementation
- ✅ Development deployment

### In Progress
- [ ] Database setup and data model implementation
- [ ] Authentication system
- [ ] Explore route
- [ ] Tag-based browsing

### Planned Features
- [ ] Post view route
- [ ] File uploading system
- [ ] User bookmark/save functionality
- [ ] Post likes/views tracking
- [ ] Scenario download functionality
- [ ] Advanced browsing filters (date, trending)
- [ ] Dynamic trending posts
- [ ] User follow system
- [ ] User profile routes
- [ ] Post comments
- [ ] Private messaging
- [ ] Post sharing
- [ ] World info/lore crafting system
- [ ] Resources route for downloadable content (?)

## Deployment

A development version of PlotPond is currently deployed on Render. You can access it at [https://t3-plotpond.onrender.com/](https://t3-plotpond.onrender.com/)

## Contributing

Contributions are welcome! If you're interested in the project, please feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Totally added some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or suggestions, please [open an issue](https://github.com/AmazeDeus/PlotPond/issues) in the repository.