import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";
interface HeadingProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  bgColor?: string;
}
const Heading = ({
  title,
  description,
  icon: Icon,
  iconColor,
  bgColor,
}: HeadingProps) => {
  return (
    <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
      <div className={cn("p-2 w-fit rounded-md", bgColor)}>
        <Icon className={cn("w-10 h-10", iconColor)} />
      </div>
      <div>
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className=" text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default Heading;

// Container (px-4 lg:px-8 flex items-center gap-x-3 mb-8):

// px-4: Sets horizontal padding to 4 units.
// lg:px-8: Sets horizontal padding to 8 units on large screens and larger.
// flex: Establishes a flex container.
// items-center: Aligns items in the center along the cross-axis.
// gap-x-3: Sets a horizontal gap of 3 units between flex items.
// mb-8: Sets margin-bottom to 8 units.
// Icon Container (cn("p-2 w-fit rounded-md", bgColor)):

// cn: A utility function (possibly custom) that conditionally applies classes based on the provided arguments.
// p-2: Sets padding to 2 units.
// w-fit: Sets the width to fit the content.
// rounded-md: Applies medium rounded corners.
// bgColor: A dynamic background color, potentially passed as a prop.
// Icon (Icon className={cn("w-10 h-10", iconColor)}):

// w-10 h-10: Sets the width and height of the icon to 10 units each.
// iconColor: A dynamic color for the icon, potentially passed as a prop.
// Text Content (<div> with h2 and p elements):

// text-3xl: Sets the font size to 3xl.
// font-bold: Applies bold font weight.
// text-sm: Sets the font size to sm for the description.
// text-muted-foreground: A dynamic text color, potentially a muted foreground color passed as a custom class or prop.
// mb-8: Sets margin-bottom to 8 units.
// Overall, this component is designed to display a heading with an icon, title, and description. The styling is flexible,
//  allowing for dynamic colors and sizes based on the provided props. The cn utility function is likely used for conditionally
//  applying classes, allowing for more dynamic styling.
