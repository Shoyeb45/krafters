import React from "react";
import { Twitter, Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => { 
  return (
    <footer className=" text-black py-8 mt-auto relative">
      <div className=" mx-auto px-[100px] relatve w-full ">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mr-3">
            <h3 className="text-xl font-bold mb-4">Saksham</h3>
            <p>
              <b>Corporate Head Office:</b> PW,Sector 68 ,Noida,India
            </p>
            <p>
              <b>Phone:</b> 000-000-000
            </p>
            <p>
              <b>Fax:</b> 00-0000000000
            </p>
            <p>
              <b>Email:</b> info@saksham.com
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>Pricing</li>
              <li>Jobs</li>
              <li>Employer</li>
              <li>Careers</li>
              <li>Contact Us</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Others</h3>
            <ul className="space-y-2">
              <li>How it works</li>
              <li>Terms and Conditions</li>
              <li>Privacy Policy</li>
              <li>About Us</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <ul className="space-y-2">
              <li>Company Milestone</li>
              <li>Web Mail</li>
              <li>Board of Directors</li>
              <li>Senior Management</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-400 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Saksham. All rights reserved.
          </p>
          <div className="flex gap-5 mt-4 md:mt-0">
            <Twitter
              size={20}
              strokeWidth={1}
              className="text-black hover:text-blue-500 fill-current hover:cursor-pointer"
            />
            <Facebook
              size={20}
              strokeWidth={1}
              className="text-black hover:text-blue-700 fill-current hover:cursor-pointer"
            />
            <Instagram
              size={20}
              strokeWidth={1}
              className="text-black hover:text-pink-500 fill-current hover:cursor-pointer"
            />
            <Linkedin
              size={20}
              strokeWidth={1}
              className="text-black hover:text-blue-600 fill-current hover:cursor-pointer"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
