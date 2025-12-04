## AI Playground - Loveable AI Site 

A platform that combines the power of several AI models in one convenient interface.
AI Playground is a web platform that combines several AI models in a single interface.
It supports text and image generation and interactive AI chats.
All logic runs through Netlify Edge Functions and Supabase.

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
<img src="./assets/Screenshot 2025-12-04 at 15.44.39.png" alt="UI Cite">
<img src="./assets/Screenshot 2025-12-04 at 15.49.28.png" alt="UI Cite">


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

- **Generate Images** 

<img src="./assets/Screenshot 2025-12-04 at 14.47.44.png" alt="UI Cite">


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

