const fs = require("fs").promises;
const path = require("path");

const projectStructure = {
  app: {
    api: {
      auth: {
        "[...nextauth]": {
          "route.ts": "// NextAuth configuration goes here",
        },
      },
      "product-sourcing": {
        "route.ts": "// Product sourcing API route goes here",
      },
      "sample-request": {
        "route.ts": "// Sample request API route goes here",
      },
      users: {
        "route.ts": "// Users API route goes here",
      },
    },
    components: {
      "dashboard.tsx": "// Dashboard component goes here",
      "login-form.tsx": "// Login form component goes here",
      "product-sourcing-form.tsx":
        "// Product sourcing form component goes here",
      "register-form.tsx": "// Register form component goes here",
      "sample-request-form.tsx": "// Sample request form component goes here",
    },
    contexts: {
      "auth-context.tsx": "// Auth context goes here",
    },
    dashboard: {
      "page.tsx": "// Dashboard page goes here",
    },
    login: {
      "page.tsx": "// Login page goes here",
    },
    "product-sourcing": {
      "page.tsx": "// Product sourcing page goes here",
    },
    register: {
      "page.tsx": "// Register page goes here",
    },
    "sample-request": {
      "page.tsx": "// Sample request page goes here",
    },
    "layout.tsx": "// Root layout goes here",
    "page.tsx": "// Home page goes here",
  },
  prisma: {
    "schema.prisma": "// Prisma schema goes here",
  },
  ".env":
    'DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"\n',
  ".env.local":
    "NEXTAUTH_SECRET=your_nextauth_secret\nNEXTAUTH_URL=http://localhost:3000\n",
  ".gitignore": "node_modules\n.next\n.env\n.env.local\n",
  "package.json":
    '{\n  "name": "request-management-system",\n  "version": "0.1.0",\n  "private": true,\n  "scripts": {\n    "dev": "next dev",\n    "build": "next build",\n    "start": "next start",\n    "lint": "next lint"\n  }\n}',
};

async function createDirectoryStructure(basePath, structure) {
  for (const [name, content] of Object.entries(structure)) {
    const currentPath = path.join(basePath, name);
    if (typeof content === "object") {
      await fs.mkdir(currentPath, { recursive: true });
      await createDirectoryStructure(currentPath, content);
    } else {
      await fs.writeFile(currentPath, content);
    }
  }
}

async function setupProject() {
  try {
    await createDirectoryStructure(process.cwd(), projectStructure);
    console.log("Project structure created successfully!");
  } catch (error) {
    console.error("Error creating project structure:", error);
  }
}

setupProject();
