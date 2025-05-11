# תומר תמסות - משרד עורכי דין לתעבורה

A modern, responsive website for a traffic law attorney, built with React, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern and responsive design
- ⚡ Built with React and TypeScript
- 🎭 Smooth animations with Framer Motion
- 📱 Mobile-first approach
- 🌐 RTL support for Hebrew
- 🔍 SEO optimized
- 📝 Contact form integration
- 💬 WhatsApp integration

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Vite
- Lucide Icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/tamsut.git
cd tamsut
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Build for production
```bash
npm run build
# or
yarn build
```

## Project Structure

```
src/
├── components/     # React components
├── assets/         # Static assets (images, fonts)
├── App.tsx         # Main application component
├── main.tsx       # Application entry point
└── index.css      # Global styles
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Tomer Tamsot - [tomer@tamsot-law.co.il](mailto:tomer@tamsot-law.co.il)

Project Link: [https://github.com/your-username/tamsut](https://github.com/your-username/tamsut)

## Brevo Lead Collection

This project uses Brevo (formerly Sendinblue) for lead collection. When users submit the contact form, their information is sent to Brevo where they can be managed as leads.

### Setup

1. Create a Brevo account at [https://www.brevo.com/](https://www.brevo.com/)
2. Generate an API key in your Brevo account under API & Integration > API Keys
3. Create a contact list in Brevo to store your leads
4. Copy `.env.example` to `.env` and update with your API key and list ID:
   ```
   VITE_BREVO_API_KEY=your_brevo_api_key_here
   VITE_BREVO_LEADS_LIST_ID=your_list_id_here  # Usually a number like 2
   ```

### Customization

You can customize the lead attributes and collection process by modifying the `brevoService.ts` file.

# Brevo Integration with Netlify Functions

## Overview

This project uses [Netlify Functions](https://docs.netlify.com/functions/overview/) to securely integrate with Brevo API without exposing API keys on the client side. Instead of using a separate backend server, we leverage Netlify's serverless functions to handle API requests.

## How It Works

1. The frontend form collects user data (name, email, phone, inquiry type)
2. When submitted, the data is sent to a Netlify serverless function
3. The serverless function uses the Brevo API to add or update contacts
4. Custom attributes are used to store the inquiry type data

## Setup and Development

### Prerequisites
- Node.js and npm
- Netlify CLI (installed as a dev dependency)

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Create a contact list in Brevo to store your leads
4. Copy `.env.example` to `.env` and update with your API key and list ID:
   ```
   VITE_BREVO_API_KEY=your_brevo_api_key_here
   VITE_BREVO_LEADS_LIST_ID=your_list_id_here  # Usually a number like 2
   ```

### Local Development
Run the development server with Netlify Dev to test serverless functions locally:
```
npm run dev
```

### Deployment
Deploy to Netlify:
```
npx netlify deploy
```

## Brevo Configuration

For the inquiry type to be saved properly in Brevo:

1. Go to your Brevo account
2. Navigate to Contacts → Settings → Custom Attributes
3. Create the following custom attributes (all of Text type):
   - CONTACT_TYPE
   - TYPE
   - INQUIRY_TYPE

We're using multiple formats to ensure maximum compatibility with Brevo's system. At least one of these should work properly.

## Customization

You can customize the lead attributes and collection process by modifying:
- `src/services/brevoService.ts` - Frontend service for sending data to the serverless function
- `netlify/functions/brevo-api.ts` - The serverless function that communicates with Brevo API

## Troubleshooting

If the type isn't being saved in Brevo UI:
1. Verify the custom attributes exist in your Brevo account (TYPE and INQUIRY_TYPE)
2. Check the serverless function logs in Netlify dashboard
3. Ensure your Netlify environment variables are correctly set

# Running the project with Netlify Functions

When developing this project, there are two ways to run it:

1. **Standard Development (Front-end only)**
   ```
   npm run dev
   ```
   This will start the Vite development server on port 3000. In this mode, the contact form will work in a "mock mode" without actually sending data to Brevo. This is useful for UI development.

2. **Full-stack Development (Front-end + Netlify Functions)**
   ```
   npm run netlify:dev
   ```
   This will start both the Vite development server and the Netlify Functions development server. In this mode, form submissions will be processed by the serverless function and actually sent to Brevo.

## Deployment

Deploy to Netlify with:
```
npm run deploy
```

This will build the application and deploy it to your Netlify account. Make sure to configure the environment variables in your Netlify dashboard:

1. Go to Site settings > Environment variables
2. Add the following variables:
   - `VITE_BREVO_API_KEY` - Your Brevo API key
   - `VITE_BREVO_LEADS_LIST_ID` - Your Brevo list ID

## Troubleshooting

### Common Issues:

1. **"Failed to load resource: the server responded with a status of 404 (Not Found)"**
   - If you're running with `npm run dev`, this is expected - use `npm run netlify:dev` to enable the serverless functions
   - If you're running with `npm run netlify:dev`, ensure the function exists in the `netlify/functions` directory

2. **"Error adding contact to Brevo: Error: Failed to add contact to Brevo"**
   - Check that your .env file has the correct API key and list ID
   - Verify that the custom attributes exist in your Brevo account
   - Review the Netlify function logs in the console

---

# Brevo Integration with Netlify Functions

## Overview

This project uses [Netlify Functions](https://docs.netlify.com/functions/overview/) to securely integrate with Brevo API without exposing API keys on the client side. Instead of using a separate backend server, we leverage Netlify's serverless functions to handle API requests.

## How It Works

1. The frontend form collects user data (name, email, phone, inquiry type)
2. When submitted, the data is sent to a Netlify serverless function
3. The serverless function uses the Brevo API to add or update contacts
4. Custom attributes are used to store the inquiry type data

## Setup and Development

### Prerequisites
- Node.js and npm
- Netlify CLI (installed as a dev dependency)

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Create a contact list in Brevo to store your leads
4. Copy `.env.example` to `.env` and update with your API key and list ID:
   ```
   VITE_BREVO_API_KEY=your_brevo_api_key_here
   VITE_BREVO_LEADS_LIST_ID=your_list_id_here  # Usually a number like 2
   ```

### Local Development
Run the development server with Netlify Dev to test serverless functions locally:
```
npm run dev
```

### Deployment
Deploy to Netlify:
```
npx netlify deploy
```

## Brevo Configuration

For the inquiry type to be saved properly in Brevo:

1. Go to your Brevo account
2. Navigate to Contacts → Settings → Custom Attributes
3. Create the following custom attributes (all of Text type):
   - CONTACT_TYPE
   - TYPE
   - INQUIRY_TYPE

We're using multiple formats to ensure maximum compatibility with Brevo's system. At least one of these should work properly.

## Customization

You can customize the lead attributes and collection process by modifying:
- `src/services/brevoService.ts` - Frontend service for sending data to the serverless function
- `netlify/functions/brevo-api.ts` - The serverless function that communicates with Brevo API

## Troubleshooting

If the type isn't being saved in Brevo UI:
1. Verify the custom attributes exist in your Brevo account (TYPE and INQUIRY_TYPE)
2. Check the serverless function logs in Netlify dashboard
3. Ensure your Netlify environment variables are correctly set

# Running the project with Netlify Functions

When developing this project, there are two ways to run it:

1. **Standard Development (Front-end only)**
   ```
   npm run dev
   ```
   This will start the Vite development server on port 3000. The serverless functions will not be available.

2. **Full-stack Development (Front-end + Netlify Functions)**
   ```
   npm run netlify:dev
   ```
   This will start both the Vite development server and the Netlify Functions development server.

## Deployment

Deploy to Netlify with:
```
npm run deploy
```

This will build the application and deploy it to your Netlify account. 