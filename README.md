# AI DREAM

AI DREAM is a cutting-edge SaaS platform that leverages the power of artificial intelligence to offer a rich array of services. From intelligent AI chatbots to image, code, music, and video generation, AI DREAM is designed to unlock creativity and streamline tasks.

## Features

- **AI Chatbot:** Engage users with dynamic and intelligent conversation experiences.
- **Image Generation:** Transform text prompts into stunning visual representations.
- **Code Generation:** Simplify coding tasks with AI-generated code snippets.
- **Music Generation:** Unleash creativity by generating unique musical compositions.
- **Video Generation:** Create captivating videos effortlessly through AI-driven processes.

## Usage

1. **Sign Up:** Create an account on AI DREAM to access a diverse range of AI services.
2. **Free Tier:** Every new user enjoys a complimentary 5-generation free tier for each service.
3. **Upgrade:** For extended usage, upgrade to a premium plan to continue exploring and utilizing AI capabilities.

## Development Status

AI DREAM is actively under development to enhance the user interface and incorporate additional features. We are continually collaborating with various AI service providers to expand the array of offerings.

## Getting Started

To set up AI DREAM locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/MEClouds/AIDream.git
   cd ai-dream
   ```

2. **Create a .env file:**

   Copy the following environment variables into a `.env` file at the root of your project:

   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=

   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

   OPENAI_API_KEY=
   REPLICATE_API_TOKEN=
   # https://www.prisma.io/blog/database-access-on-the-edge-8F0t1s1BqOJE
   DATABASE_URL=

   STRIPE_API_KEY=
   STRIPE_WEBHOOK_SECRET=

   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

3. **Setup Prisma:**

   Ensure Prisma is installed globally:

   ```bash
   npm install -g prisma
   ```

   Add a MySQL database (e.g., using PlanetScale). Then, run the following commands:

   ```bash
   npx prisma db push
   ```

4. **Start the app:**

   ```bash
   npm run dev
   ```

   This will launch the application locally. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to access AI DREAM.

Now, you're ready to explore and develop with AI DREAM on your local environment.

## Contributing

We welcome contributions! If you have ideas, bug reports, or feature requests, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to customize this template further based on your specific project details and requirements.
