
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Suresh Naidu",
      company: "Naidu Enterprises",
      text: "Working with Rama Kanth sir was a game-changer for our business. His expertise in contract law helped us restructure our supplier agreements, saving us millions while protecting our interests.",
      rating: 5,
      initials: "SN",
      imageSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
    },
    {
      id: 2,
      name: "Lakshmi Reddy",
      company: "Reddy Properties",
      text: "I was facing a complex property dispute that threatened a major development project. Rama Kanth sir's strategic approach and deep knowledge of property law resulted in a favorable outcome that exceeded my expectations.",
      rating: 5,
      initials: "LR",
      imageSrc: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
    },
    {
      id: 3,
      name: "Venkat Sharma",
      company: "Tech Innovations",
      text: "When our startup faced an intellectual property challenge from a larger competitor, Rama Kanth sir provided clear guidance and skillful representation. His work was instrumental in protecting our core IP assets.",
      rating: 5,
      initials: "VS",
      imageSrc: "https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
    },
    {
      id: 4,
      name: "Sharada Patnaik",
      company: "Patnaik Family Trust",
      text: "Rama Kanth sir helped our family navigate a complicated inheritance dispute with sensitivity and professionalism. His ability to simplify complex legal concepts made a difficult situation much more manageable.",
      rating: 4,
      initials: "SP",
      imageSrc: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
    }
  ];

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {testimonials.map(testimonial => (
          <CarouselItem key={testimonial.id} className="sm:basis-1/2 lg:basis-1/3">
            <Card className="h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={`${i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} />
                  ))}
                </div>
                
                <p className="text-gray-700 flex-1">"{testimonial.text}"</p>
                
                <div className="flex items-center mt-6">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage src={testimonial.imageSrc} alt={testimonial.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-center mt-4">
        <CarouselPrevious className="static transform-none mx-2" />
        <CarouselNext className="static transform-none mx-2" />
      </div>
    </Carousel>
  );
};

export default Testimonials;
