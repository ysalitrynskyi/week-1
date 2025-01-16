# DBee Builder: Frame V2 Starter Experience

Welcome to **DBee Builder**, your ultimate solution for kickstarting development with **Frames V2** on Farcaster. Built for the **Weekly Hackathon: Week One**, this project is a production-ready website and Frame V2 experience designed to make it easy for developers—and even no-code users—to start building and deploying Frames.

---

## 🚀 Mission

The goal of DBee Builder is to provide a **seamless onboarding experience** for creators and developers looking to explore the potential of Frames V2. It bridges the gap between creators and Farcaster’s innovative framing technology by offering:

- Comprehensive documentation.
- Interactive examples.
- A powerful and intuitive interface for building Frames.

This project is fully **mobile-friendly**, **open-source**, and licensed for reuse and modification to maximize its impact on the developer community.

---

## 🎯 Features

### 1. **Frame V2 Starter Experience**
DBee Builder provides a **quick-start guide** to help developers create and deploy their first Frame V2 in no time.

- **Step-by-step instructions** for setup and deployment.
- Integration examples to showcase real-world use cases.

### 2. **Interactive Examples**
Experience Frames in action with **live, interactive examples**. Users can:
- Modify parameters.
- Preview results in real-time.
- Export configurations for use in their projects.

### 3. **Frame Conversion Toolkit**
- **Seamlessly convert websites into Frames** with just a few steps.
- Tools to optimize and preview your website as a Frame.

### 4. **Privy-Powered Authentication**
DBee Builder leverages **Privy** for wallet-based authentication:
- Secure user login via Ethereum wallets.
- Access control for creating and managing Frames.

### 5. **Farcaster Integration**
- Real-time integration with **Neynar API** for fetching Farcaster-specific user data.
- Display follower counts, profiles, and more directly within the app.

### 6. **Cloudflare Tunnel Integration**
The project includes a **Cloudflare Tunnel setup**:
- Stable configuration using your own domain.
- Seamless reconnection using a single command.
- Detailed setup instructions and commands included in `package.json` for running the app and tunnel concurrently.

### 7. **Responsive Design**
A fully **mobile-optimized** UI ensures accessibility on all devices.

### 8. **Open Source**
The project adheres to an open-source license, allowing anyone to reuse, modify, and contribute.

---

## 🛠️ Technology Stack

### Frontend
- **SvelteKit**: Lightweight and performant framework for building interactive web apps.
- **Tailwind CSS**: Utility-first CSS for responsive design.
- **Privy**: Wallet-based authentication for decentralized login.
- **Farcaster V2 Frame SDK**: Simplified tools for Frame creation and interaction.

### Backend
- **Neynar API**: Integration for Farcaster data.
- **SvelteKit API Endpoints**: Flexible server-side capabilities.

---

## 🌟 Getting Started

### Prerequisites
1. **Node.js**: Version 18+.
2. **Privy Account**: Required for wallet-based login.
3. **API Keys**:
   - Neynar API Key (`VITE_NEYNAR_API_KEY`).
   - Privy App ID (`VITE_PUBLIC_PRIVY_APP_ID`).
4. **Cloudflare Tunnel**: Install the `cloudflared` CLI and set up your Cloudflare account.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ysalitrynskyi/week-1
   cd dbee-builder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file using `.env.example` as a template and add your API keys.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Run the app and Cloudflare Tunnel concurrently:
   ```bash
   npm run dev-expose
   ```

6. Open your browser at the configured Cloudflare Tunnel URL.

---

## 📝 Hackathon Submission Details

This project adheres to all **Weekly Hackathon: Week One** requirements:

- **Production-Ready Website**: Fully functional, deployed version at [builder.dbee.be](https://builder.dbee.be).
- **Mobile-Friendly Design**: Responsive layout for all devices.
- **Interactive Examples**: Live tools for exploring and deploying Frames.
- **Open Source**: Licensed for reuse and modification.

---

## 📂 Project Structure

```
src/
│
├── lib/
│   ├── components/           # Reusable UI components
│   ├── layout/               # Header, Footer, and Layout files
│   ├── stores/               # Svelte stores for managing state
│   └── supabase.ts           # Optional Supabase client for data management
│
├── routes/
│   ├── api/                  # API endpoints
│   ├── dashboard/            # User dashboard for managing Frames
│   └── (app)/                # Main app functionality
│
├── app.css                   # Global styles
├── vite.config.ts            # Vite configuration
├── package.json              # Project dependencies and scripts
└── README.md                 # Project documentation
```

---

## 🔮 Future Enhancements

1. **No-Code Builder**:
   - Drag-and-drop tools for creating Frames without writing code.

2. **Advanced Analytics**:
   - Insights into Frame performance and user interactions.

3. **Multi-Wallet Support**:
   - Enable switching between multiple wallets for advanced use cases.

4. **Frame Templates**:
   - Pre-designed templates for popular use cases.

---

## 🏆 Judging Criteria Alignment

DBee Builder addresses the hackathon's core requirements by:
- **Simplifying the onboarding process** for Frames V2.
- **Empowering creators** through interactive examples and tools.
- **Providing a reusable open-source solution** for the Farcaster community.

---

## 📜 License

This project is licensed under the Apache License 2.0. Contributions and modifications are encouraged!

---

## 💬 Contact and Support

For any questions, reach out to:
- **Farcaster**: [@dalresin](https://farcaster.com/dalresin)
- **Hackathon Organizer**: [@jpfraneto.eth](https://warpcast.com/~/inbox/create/16098?text=gm)

Good luck building with Frames! 🚀