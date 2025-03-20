
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Michael Johnson",
      company: "Johnson Manufacturing",
      text: "Working with John was a game-changer for our business. His expertise in contract law helped us restructure our supplier agreements, saving us millions while protecting our interests.",
      rating: 5,
      initials: "MJ"
    },
    {
      id: 2,
      name: "Sarah Williams",
      company: "Williams Properties",
      text: "I was facing a complex property dispute that threatened a major development project. John's strategic approach and deep knowledge of property law resulted in a favorable outcome that exceeded my expectations.",
      rating: 5,
      initials: "SW"
    },
    {
      id: 3,
      name: "David Chen",
      company: "Tech Innovations Inc.",
      text: "When our startup faced an intellectual property challenge from a larger competitor, John provided clear guidance and skillful representation. His work was instrumental in protecting our core IP assets.",
      rating: 5,
      initials: "DC"
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      company: "Rodriguez Family Trust",
      text: "John helped our family navigate a complicated inheritance dispute with sensitivity and professionalism. His ability to simplify complex legal concepts made a difficult situation much more manageable.",
      rating: 4,
      initials: "ER"
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
