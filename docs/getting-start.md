---
title: Getting Started
description: Get started with MOLTGHOST
---

# Getting Started

This guide will walk you through the basics of getting started with MOLTGHOST.

## Installation

### Prerequisites

Before you begin, make sure you have:
- Node.js 18+ installed
- npm or yarn package manager

### Steps

1. Clone the repository:
```bash
git clone https://github.com/moltghost/docs.git
cd moltghost_docs
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## Project Structure

```
moltghost_docs/
├── src/
│   └── app/
│       ├── layout.tsx
│       ├── page.tsx
│       └── globals.css
├── docs/
│   ├── welcome.md
│   └── getting-start.md
├── public/
│   └── images/
└── package.json
```

## Basic Configuration

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Next Steps

- Explore the main documentation
- Check out [Welcome](/welcome) for an overview
- Read through additional guides as needed

## Support

For help and support:
- 📧 Email: support@moltghost.com
- 💬 Discord: [Join our community](https://discord.gg/moltghost)
- 🐛 Issues: [GitHub Issues](https://github.com/moltghost/docs/issues)

Happy documenting! 🚀
