
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Mail, MapPin, Phone, Clock, Send } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Your message has been sent successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-gray-900">Advocate Profile</Link>
            <div className="flex space-x-6">
              <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link to="/cases" className="text-gray-600 hover:text-gray-900">Cases</Link>
              <Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              <Link to="/contact" className="text-primary font-medium">Contact</Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">Contact Me</h1>
        <p className="text-gray-600 text-center mb-12">Get in touch for consultations and legal assistance</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>Fill out the form below to discuss your legal needs</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="Your full name" 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="your.email@example.com" 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        name="phone" 
                        type="tel" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        placeholder="(555) 123-4567" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input 
                        id="subject" 
                        name="subject" 
                        value={formData.subject} 
                        onChange={handleChange} 
                        placeholder="Brief subject of your inquiry" 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      value={formData.message} 
                      onChange={handleChange} 
                      placeholder="Please describe your legal situation or inquiry in detail" 
                      rows={6} 
                      required 
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Ways to reach me directly</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">contact@advocateprofile.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600">(555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Building className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Office</p>
                    <p className="text-gray-600">
                      Smith & Associates Law Firm<br />
                      123 Legal Street<br />
                      Lawton, CA 90210
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Office Hours</CardTitle>
                <CardDescription>When I'm available</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-primary mr-2" />
                    <span>Monday - Friday</span>
                  </div>
                  <span className="font-medium">9:00 AM - 5:30 PM</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-primary mr-2" />
                    <span>Saturday</span>
                  </div>
                  <span className="font-medium">10:00 AM - 2:00 PM</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-primary mr-2" />
                    <span>Sunday</span>
                  </div>
                  <span className="font-medium">Closed</span>
                </div>
                
                <p className="text-sm text-gray-600 mt-4">
                  Consultations are by appointment only. Virtual meetings are available for clients unable to visit the office in person.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Advocate Profile. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
