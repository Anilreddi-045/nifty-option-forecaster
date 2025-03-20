
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact Adv. N. Rama Kanth Reddy</h1>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-6">
            Have a legal question or need representation? I'm ready to help you navigate your legal challenges.
          </p>
          
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Legal consultation request"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Please describe your legal issue or inquiry..."
              ></textarea>
            </div>
            
            <Button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Send Message
            </Button>
          </form>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Office Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900 mb-2">Contact Details</h3>
              <p className="text-gray-600 flex items-center gap-2">
                <MapPin size={18} className="flex-shrink-0 text-gray-500" />
                <span>H.NO 64-1-826, Opp. Dist Court, Near Saibaba Temple, Kurnool-518001 (A.P)</span>
              </p>
              <p className="text-gray-600 flex items-center gap-2">
                <Phone size={18} className="flex-shrink-0 text-gray-500" />
                <span>(+91) 9876543210</span>
              </p>
              <p className="text-gray-600 flex items-center gap-2">
                <Mail size={18} className="flex-shrink-0 text-gray-500" />
                <a href="mailto:advocate.ramakanth@gmail.com" className="hover:text-gray-900">advocate.ramakanth@gmail.com</a>
              </p>
              <p className="text-gray-600 flex items-center gap-2">
                <Linkedin size={18} className="flex-shrink-0 text-gray-500" />
                <a href="https://www.linkedin.com/in/ramakanthreddy" className="hover:text-gray-900">linkedin.com/in/ramakanthreddy</a>
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Office Hours</h3>
              <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p className="text-gray-600">Saturday: 10:00 AM - 2:00 PM</p>
              <p className="text-gray-600">Sunday: Closed</p>
              <p className="text-gray-600 mt-2">
                Consultations by appointment only
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Contact;
