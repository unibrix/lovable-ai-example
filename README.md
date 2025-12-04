## Lovable AI Showcase

A platform that showcases the power of multiple AI models within a single interface.
Lovable AI Showcase is a web application generated with Lovable AI and further customized to demonstrate real-world use cases of modern neural networks.

The site brings together text generation, image generation, and interactive AI chats — all powered by integrated AI providers such as Lovable, Gemini, and OpenAI.
Backend logic runs on Netlify Edge Functions, while Supabase is used for logging, history, and persistent data.

This project serves as an example of how AI-driven tools can be combined into a cohesive, user-friendly experience.


**URL**: https://lucent-cocada-58b395.netlify.app/


## ✨ Features

- 💬 **AI Chat** — dialog interface with a model (Gemini / Lovable)
- 📝 **Text generation** — articles, descriptions, ideas, lists, correspondence, etc.
- 🎨 **Image generation** — illustrations, art, UI templates.
- 🔗 **Integration with external AI agents** — Lovable, OpenAI, Gemini.
- 📦 **Proprietary API layer** via Netlify Edge Functions
- 💾 **Connection to Supabase database** (logging, request history, etc.)
- ⚡ **Instant deployment to Netlify**


<img src="./assets/Screenshot 2025-12-04 at 15.38.47.png" alt="UI Cite">
<img src="./assets/Screenshot 2025-12-04 at 15.57.31.png" alt="UI Cite">


## 🧩 Architecture

Frontend: React
Backend: Netlify Edge Functions  
Database: Supabase  
Build: Netlify  
AI Integrations: OpenAI / Gemini / Lovable  

High-level flow:
Client → Edge Functions → AI Provider → Response → UI
                     ↓
                Supabase DB


## 🔄 Loveable Site Overview

- **Generate Images with AI** 

<img src="./assets/Screenshot 2025-12-04 at 16.00.01.png" alt="UI Cite">


- **Generate Text with AI** 

<img src="./assets/Screenshot 2025-12-04 at 15.57.53.png" alt="UI Cite">



- **Chat with AI** 

<img src="./assets/Screenshot 2025-12-04 at 16.16.08.png" alt="UI Cite">


- **Database CRUD Operations** 

<img src="./assets/Screenshot 2025-12-04 at 16.00.14.png" alt="UI Cite">


- **Explore GitHub** 

<img src="./assets//Screenshot 2025-12-04 at 16.00.28.png" alt="UI Cite">


## 🚀 Local Development

```sh
# Step 1: Clone the repository using the project's Git URL.

git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.

cd <project_name>

# Step 3: Install dependencies

npm install

# Step 4: Create a .env file

SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_role_key (if needed)

# Step 5: Configure Supabase (if required)

If you want to deploy a local database with migrations:

supabase start
supabase migration up

# Step 6: Run the project in development mode

npm run dev
```


## Useful commands
```sh
npm run dev       # launch for development
npm run build     # build the project
npm run preview   # preview the final build
supabase start    # launch the local database
supabase functions serve   # launch edge functions
```

