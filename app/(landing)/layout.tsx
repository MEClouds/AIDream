import { Children } from "react";

const LandingPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full bg-[#111938] overflow-auto">
      <div className="mx-auto max-w-screen-xl h-full w-full">{children}</div>
    </main>
  );
};

export default LandingPage;
