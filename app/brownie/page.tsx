"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Zap,
  Brain,
  Code,
  Smartphone,
  Globe,
  Users,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Lightbulb,
  Rocket,
  Shield,
} from "lucide-react"

export default function BrownieLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-amber-800 to-amber-700 font-sans">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-amber-400/20"></div>
        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
                <Lightbulb className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                Brownie
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-amber-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transforming ideas into powerful web applications and intelligent AI solutions
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                className="bg-amber-500 hover:bg-amber-400 text-white border-0 backdrop-blur-sm transition-all duration-300 hover:scale-105 shadow-lg"
                size="lg"
              >
                <Rocket className="h-5 w-5 mr-2" />
                Get Started
              </Button>
              <Button
                variant="outline"
                className="bg-transparent hover:bg-white/10 text-white border-white/30 hover:border-white/50 transition-all duration-300"
                size="lg"
              >
                <Users className="h-5 w-5 mr-2" />
                View Portfolio
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Services</h2>
            <p className="text-xl text-amber-100 max-w-2xl mx-auto">
              We specialize in cutting-edge technology solutions that drive business growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Web Applications */}
            <Card className="bg-white/10 backdrop-blur-sm border-amber-200/20 text-white hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-amber-300" />
                </div>
                <CardTitle className="text-2xl font-bold">Web Applications</CardTitle>
                <CardDescription className="text-amber-200">
                  Modern, responsive, and scalable web solutions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-amber-400" />
                    <span className="text-amber-100">React & Next.js Development</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-amber-400" />
                    <span className="text-amber-100">Full-Stack Solutions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-amber-400" />
                    <span className="text-amber-100">Cloud Deployment</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* AI Solutions */}
            <Card className="bg-white/10 backdrop-blur-sm border-amber-200/20 text-white hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-amber-300" />
                </div>
                <CardTitle className="text-2xl font-bold">AI Solutions</CardTitle>
                <CardDescription className="text-amber-200">Intelligent systems that learn and adapt</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-amber-400" />
                    <span className="text-amber-100">Machine Learning Models</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-amber-400" />
                    <span className="text-amber-100">Natural Language Processing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-amber-400" />
                    <span className="text-amber-100">Computer Vision</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Mobile Apps */}
            <Card className="bg-white/10 backdrop-blur-sm border-amber-200/20 text-white hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-8 w-8 text-amber-300" />
                </div>
                <CardTitle className="text-2xl font-bold">Mobile Applications</CardTitle>
                <CardDescription className="text-amber-200">Native and cross-platform mobile solutions</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-amber-400" />
                    <span className="text-amber-100">iOS & Android Development</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-amber-400" />
                    <span className="text-amber-100">React Native & Flutter</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-amber-400" />
                    <span className="text-amber-100">App Store Optimization</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose Brownie?</h2>
            <p className="text-xl text-amber-100 max-w-2xl mx-auto">
              We combine technical expertise with creative innovation to deliver exceptional results
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-10 w-10 text-amber-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Lightning Fast</h3>
              <p className="text-amber-200 leading-relaxed">
                We deliver high-performance solutions optimized for speed and efficiency, ensuring your users have the
                best experience possible.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-10 w-10 text-amber-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Secure & Reliable</h3>
              <p className="text-amber-200 leading-relaxed">
                Security is at the core of everything we build. Our solutions are robust, scalable, and built to last.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Code className="h-10 w-10 text-amber-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Clean Code</h3>
              <p className="text-amber-200 leading-relaxed">
                We write maintainable, well-documented code that follows industry best practices and standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-amber-300 mb-2">50+</div>
              <div className="text-amber-200">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-300 mb-2">25+</div>
              <div className="text-amber-200">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-300 mb-2">3+</div>
              <div className="text-amber-200">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-300 mb-2">99%</div>
              <div className="text-amber-200">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <Card className="bg-gradient-to-r from-amber-600/20 to-amber-500/20 backdrop-blur-sm border-amber-200/20 text-white">
            <CardContent className="text-center py-16">
              <h2 className="text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
              <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
                Let's discuss how we can help bring your ideas to life with cutting-edge technology solutions.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  className="bg-amber-500 hover:bg-amber-400 text-white border-0 transition-all duration-300 hover:scale-105 shadow-lg"
                  size="lg"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Contact Us
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent hover:bg-white/10 text-white border-white/30 hover:border-white/50 transition-all duration-300"
                  size="lg"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Schedule Call
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-900/50 backdrop-blur-sm border-t border-white/10">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                  <Lightbulb className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Brownie</h3>
              </div>
              <p className="text-amber-200 leading-relaxed">
                Transforming ideas into powerful digital solutions through innovative web applications and AI
                technology.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
              <ul className="space-y-2 text-amber-200">
                <li>Web Application Development</li>
                <li>AI & Machine Learning</li>
                <li>Mobile App Development</li>
                <li>Cloud Solutions</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
              <div className="space-y-2 text-amber-200">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>hello@brownie.dev</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-amber-200">© 2024 Brownie. All rights reserved. Built with passion and innovation.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
