import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const testimonials = [
  {
    name: "John Doe",
    avatar: "J",
    title: "Web Developer",
    description:
      "This is an amazing AI tool! It has greatly improved my workflow and productivity.",
  },
  {
    name: "Jane Smith",
    avatar: "J",
    title: "Graphic Designer",
    description:
      "I can't imagine my design process without this AI tool. It's a game changer!",
  },
  {
    name: "Mike Johnson",
    avatar: "M",
    title: "Digital Marketer",
    description:
      "The AI features in this tool have helped me optimize my marketing campaigns and achieve better results.",
  },
  {
    name: "Sarah Thompson",
    avatar: "S",
    title: "Content Writer",
    description:
      "As a writer, I rely on this AI tool for generating creative ideas and improving my writing quality.",
  },
];

const LandingContent = () => {
  return (
    <div className="px-10 pb-16">
      <h2 className="text-center text-4xl text-slate-100 font-extrabold mb-9">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((item) => (
          <Card
            key={item.description}
            className="bg-blue-800/5 border-none text-white rounded-lg"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div className="mx-3 bg-white text-blue-800 w-8 h-8 rounded-full flex items-center justify-center">
                  {item.avatar}
                </div>
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-zinc-500 text-sm">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LandingContent;
