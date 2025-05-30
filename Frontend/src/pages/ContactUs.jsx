import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Users, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    contactReason: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        contactReason: ''
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden mt-5">
        <div className="absolute inset-0 bg-gradient-to-r from-[#5A4BDA]/10 to-[#5A4BDA]/5"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-[#5A4BDA]/20 mb-6 shadow-sm">
              <MessageCircle className="w-4 h-4 text-[#5A4BDA]" />
              <span className="text-sm font-medium text-[#5A4BDA]">We're Here to Help</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-[#5A4BDA] mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Have questions about Saksham? We'd love to hear from you. 
              Get in touch and we'll get back to you as soon as possible.
            </p>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-[#5A4BDA]/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-[#5A4BDA]/15 rounded-full blur-xl animate-pulse delay-700"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-[#5A4BDA]/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We're here to support you and your child's learning journey. 
                Reach out with any questions about our platform or how we can help.
              </p>

              {/* Contact Methods */}
              <div className="space-y-6">
                {[
                  {
                    icon: Mail,
                    title: "Email Us",
                    detail: "support@saksham.edu",
                    description: "Send us an email anytime"
                  },
                  {
                    icon: Phone,
                    title: "Call Us",
                    detail: "+91 98765 43210",
                    description: "Mon-Fri from 9am to 6pm"
                  },
                  {
                    icon: MapPin,
                    title: "Visit Us",
                    detail: "Bangalore, Karnataka",
                    description: "Schedule an appointment"
                  }
                ].map((contact, index) => (
                  <div key={index} className="group">
                    <div className="relative">
                      <div className="absolute -inset-2 bg-[#5A4BDA]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-sm"></div>
                      <div className="relative bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-white/70 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-[#5A4BDA] rounded-lg flex items-center justify-center flex-shrink-0">
                            <contact.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800 mb-1">{contact.title}</h3>
                            <p className="text-[#5A4BDA] font-medium mb-1">{contact.detail}</p>
                            <p className="text-sm text-gray-600">{contact.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Response Time */}
              <div className="mt-8 p-4 bg-[#5A4BDA]/5 rounded-xl border border-[#5A4BDA]/10">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-5 h-5 text-[#5A4BDA]" />
                  <h3 className="font-semibold text-gray-800">Quick Response</h3>
                </div>
                <p className="text-sm text-gray-600">
                  We typically respond within 24 hours during business days.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="relative">
              <div className="absolute -inset-4 bg-[#5A4BDA]/10 rounded-3xl blur-xl"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-white/70 shadow-xl">
                {!isSubmitted ? (
                  <>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-[#5A4BDA] rounded-xl flex items-center justify-center">
                        <Send className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800">Send us a Message</h2>
                    </div>

                    <div className="space-y-6">
                      {/* Contact Reason */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          What can we help you with?
                        </label>
                        <select
                          name="contactReason"
                          value={formData.contactReason}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#5A4BDA]/20 focus:border-[#5A4BDA] transition-colors duration-200 bg-white/80"
                          required
                        >
                          <option value="">Select a reason...</option>
                          <option value="general">General Inquiry</option>
                          <option value="support">Technical Support</option>
                          <option value="feedback">Feedback & Suggestions</option>
                          <option value="partnership">Partnership Opportunities</option>
                          <option value="demo">Request a Demo</option>
                        </select>
                      </div>

                      {/* Name and Email Row */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#5A4BDA]/20 focus:border-[#5A4BDA] transition-colors duration-200 bg-white/80"
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#5A4BDA]/20 focus:border-[#5A4BDA] transition-colors duration-200 bg-white/80"
                            placeholder="your.email@example.com"
                            required
                          />
                        </div>
                      </div>

                      {/* Subject */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Subject *
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#5A4BDA]/20 focus:border-[#5A4BDA] transition-colors duration-200 bg-white/80"
                          placeholder="Brief subject of your message"
                          required
                        />
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Message *
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={6}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#5A4BDA]/20 focus:border-[#5A4BDA] transition-colors duration-200 bg-white/80 resize-none"
                          placeholder="Tell us more about your inquiry, feedback, or how we can help you..."
                          required
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="pt-4">
                        <button
                          onClick={handleSubmit}
                          className="w-full bg-[#5A4BDA] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#4A3BC7] transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-3"
                        >
                          <Send className="w-5 h-5" />
                          Send Message
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  /* Success Message */
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Message Sent Successfully!</h3>
                    <p className="text-gray-600 leading-relaxed max-w-md mx-auto">
                      Thank you for reaching out to us. We've received your message and will get back to you within 24 hours.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Quick answers to common questions about Saksham
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                question: "How does Saksham help children with ADHD and dyslexia?",
                answer: "Our platform uses research-backed methods including visual learning, structured pathways, and distraction-free design to create an optimal learning environment for neurodiverse learners."
              },
              {
                question: "Is there a free trial available?",
                answer: "Yes! We offer a 14-day free trial so you can explore our platform and see how it works for your child before making any commitment."
              },
              {
                question: "What age groups is Saksham designed for?",
                answer: "Saksham is designed for children aged 6-16, with content and activities tailored to different developmental stages and learning abilities."
              },
              {
                question: "Do you provide support for parents and teachers?",
                answer: "Absolutely! We offer comprehensive resources, training materials, and dedicated support to help parents and educators make the most of our platform."
              }
            ].map((faq, index) => (
              <div key={index} className="group">
                <div className="relative">
                  <div className="absolute -inset-2 bg-[#5A4BDA]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-sm"></div>
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-white/70 shadow-sm hover:shadow-md transition-all duration-300">
                    <h3 className="font-semibold text-gray-800 mb-3 text-lg">{faq.question}</h3>
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;