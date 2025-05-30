import React from 'react';
import { Heart, Users, Target, Sparkles, BookOpen, Brain, Star } from 'lucide-react';
 import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
    const navigate = useNavigate();
    const handleLearnMore = () => {
        navigate('/');
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden mt-5">
        <div className="absolute inset-0 bg-gradient-to-r from-[#5A4BDA]/10 to-[#5A4BDA]/5"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-[#5A4BDA]/20 mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-[#5A4BDA]" />
              <span className="text-sm font-medium text-[#5A4BDA]">Empowering Every Child</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-[#5A4BDA] mb-6">
              About Saksham
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Transforming education for neurodiverse learners through innovative, 
              compassionate, and research-backed learning experiences.
            </p>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-[#5A4BDA]/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-[#5A4BDA]/15 rounded-full blur-xl animate-pulse delay-700"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-[#5A4BDA]/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative">
            <div className="absolute -inset-4 bg-[#5A4BDA]/20 rounded-2xl blur-xl"></div>
            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-white/80 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#5A4BDA] rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Our Story</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                At <span className="font-semibold text-[#5A4BDA]">Saksham</span>, we believe that every child deserves access to meaningful and engaging education—regardless of how they learn.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We are a passionate team of educators, designers, and developers working to create tailored learning experiences for children with <span className="font-semibold text-[#5A4BDA]">ADHD</span> and <span className="font-semibold text-[#5A4BDA]">dyslexia</span>.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-[#5A4BDA]/20 rounded-2xl blur-xl"></div>
            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-white/80 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#5A4BDA] rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Our Approach</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our platform combines calm visuals, interactive content, and structured pathways to help students thrive without feeling overwhelmed.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We build confidence through <span className="font-semibold text-[#5A4BDA]">visual learning, gamified exercises, and personalized support</span>. Saksham is not just a tool—it's a companion in your child's learning journey.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="relative mb-20">
          <div className="absolute inset-0 bg-[#5A4BDA]/5 rounded-3xl"></div>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-12 border border-white/70 shadow-2xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-16 h-16 bg-[#5A4BDA] rounded-2xl flex items-center justify-center">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
              </div>
              <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
                To empower neurodiverse learners by creating an inclusive, adaptive, and calm digital learning space—making education enjoyable, accessible, and effective for every child.
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Saksham?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover what makes our platform uniquely designed for neurodiverse learners
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Sparkles,
                title: "Gentle Design",
                description: "Calming colors and distraction-free interface designed for focus"
              },
              {
                icon: BookOpen,
                title: "Tailored Activities",
                description: "Personalized exercises that adapt to each child's learning style"
              },
              {
                icon: Brain,
                title: "Cognitive Support",
                description: "Guided learning with minimal cognitive load and clear structure"
              },
              {
                icon: Star,
                title: "Research-Backed",
                description: "Built on educational research and real classroom feedback"
              }
            ].map((feature, index) => (
              <div key={index} className="group hover:scale-105 transition-all duration-300">
                <div className="relative">
                  <div className="absolute -inset-2 bg-[#5A4BDA]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl"></div>
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-white/70 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="w-12 h-12 bg-[#5A4BDA] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-[#5A4BDA]/30 rounded-2xl blur-xl"></div>
            <div className="relative bg-[#5A4BDA] rounded-2xl p-8 text-white shadow-2xl">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Users className="w-8 h-8" />
                <h3 className="text-2xl font-bold">Join Our Community</h3>
              </div>
              <p className="text-white/90 mb-6 max-w-lg">
                Be part of a movement that's transforming education for neurodiverse learners worldwide.
              </p>
              <button 
                onClick={handleLearnMore}
              className="bg-white text-[#5A4BDA] px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Learn More About Saksham
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;