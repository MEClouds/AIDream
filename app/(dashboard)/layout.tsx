import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { getLimitCount } from "@/lib/use-limit";
import React from "react";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const limitCount = await getLimitCount();
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:insert-y-0 z-[80] bg-slate-800">
        <div className=" text-cyan-100 ">
          <Sidebar limitCount={limitCount} />
        </div>
      </div>
      <main className="md:pl-72 h-full bg-slate-200">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;

// Style Description
// Container (h-full relative):

// h-full: Sets the height of the container to 100% of its parent container.
// relative: Establishes a positioning context for its child elements.

// Sidebar (hidden h-full md:flex md:w-72 md:flex-col md:fixed md:insert-y-0 z-[80] bg-blue-950):

// hidden: Initially hides the element.
// h-full: Sets the height of the sidebar to 100% of its parent container.
// md:flex: Makes the sidebar a flex container on medium-sized screens and larger.
// md:w-72: Sets the width of the sidebar to 72 units on medium-sized screens and larger.
// md:flex-col: Arranges the flex items (children) in a column layout on medium-sized screens and larger.
// md:fixed: Fixes the position of the sidebar when the viewport is at least medium-sized.
// md:insert-y-0: Sets the top and bottom position of the fixed sidebar to 0 on medium-sized screens and larger.
// z-[80]: Sets the z-index of the sidebar to 80.
// bg-blue-950: Applies a background color of a specific shade of blue (you might have a custom color palette).

// Sidebar Content (text-cyan-100):
// text-cyan-100: Sets the text color to a specific shade of cyan (again, part of your custom color palette).

// Main Content (md:pl-72):
// md:pl-72: Adds left padding of 72 units on medium-sized screens and larger. This is to accommodate the width of the fixed sidebar.

// Navbar:
// It seems there is a Navbar component being rendered inside the main container.

// Dynamic Content ({children}):
// This is where the dynamic content specified by the parent component will be rendered.
// This structure creates a layout with a fixed sidebar on medium-sized screens and larger,
//  a main content area, and a responsive design that adapts based on the screen size.
//  The z-index property ensures that the sidebar appears above other elements with lower z-index values.
//  The md:pl-72 padding on the main content accommodates the width of the fixed sidebar.
