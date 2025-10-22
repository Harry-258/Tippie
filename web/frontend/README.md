This directory contains the frontend for Tippie, a web app built with React, Next.js and Tailwind CSS for styling.

## Getting Started

Clone the repository:

```bash
git clone git@github.com:Harry-258/Tippie.git
cd Tippie/web/frontend
```

Install the dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

## Features

### Authentication

The authentication system was implemented with Firebase and currently uses email- and Google-based authentication. This can easily be extended using Firebase implementations.

The entire app is wrapped inside a `<AuthProvider/>` to use as a context for authentication. It keeps track of the user being logged in or out. Check `src > contexts > authContext > index.jsx` for an implementation of the context and `src > firebase > auth.js` for the logic behind it.
