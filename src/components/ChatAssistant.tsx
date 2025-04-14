
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { HelpCircle, X, Bot, MessageSquare, Sparkles, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { gsap } from 'gsap';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const FREQUENTLY_ASKED_QUESTIONS = [
  {
    question: "How do I track my order?",
    answer: "You can track your order by logging into your account and visiting the 'Orders' section. There you'll find all your order details and tracking information."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, Apple Pay, and Google Pay. All transactions are secure and encrypted."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to most countries worldwide. Shipping times and costs vary depending on your location."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for most items. Products must be in original condition with all packaging and accessories."
  },
  {
    question: "Are your products covered by warranty?",
    answer: "Yes, all our products come with a minimum 1-year manufacturer warranty. Premium items may have extended warranty options."
  },
  {
    question: "How can I contact customer support?",
    answer: "You can reach our customer support team via email at support@techtrove.com or through the Contact Us page on our website."
  }
];

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{sender: 'user' | 'bot', text: string}[]>([
    {sender: 'bot', text: 'Hello! How can I help you today with your tech shopping needs?'}
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasUserSeen, setHasUserSeen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const filteredFaqs = searchQuery
    ? FREQUENTLY_ASKED_QUESTIONS.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : FREQUENTLY_ASKED_QUESTIONS;

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setHasUserSeen(true);
    
    if (!isOpen) {
      gsap.fromTo(
        '.chat-panel',
        { scale: 0.8, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
      );
    }
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, {sender: 'user', text: message}]);
    setMessage('');
    setIsTyping(true);
    
    // Simulate AI response after delay
    setTimeout(() => {
      let response = "I'd be happy to help you find the right tech products for your needs. What specific type of device are you looking for?";
      
      if (message.toLowerCase().includes('headphone')) {
        response = "We have a great selection of headphones! Our best sellers include the Premium Wireless Headphones with noise cancellation. Would you like me to tell you more about them?";
      } else if (message.toLowerCase().includes('laptop')) {
        response = "Our laptop collection includes the Ultra-Thin Laptop Pro with the latest processors. Would you like to see our current laptop deals?";
      } else if (message.toLowerCase().includes('phone') || message.toLowerCase().includes('smartphone')) {
        response = "We offer the latest smartphones from all major brands. Are you looking for any specific features in your new phone?";
      } else if (message.toLowerCase().includes('price') || message.toLowerCase().includes('cost')) {
        response = "Our products range from budget-friendly options to premium devices. Could you tell me more about what you're looking for so I can suggest something in your price range?";
      } else if (message.toLowerCase().includes('thank')) {
        response = "You're welcome! Feel free to ask if you have any other questions. Happy shopping!";
      } else if (message.toLowerCase().includes('shipping') || message.toLowerCase().includes('delivery')) {
        response = "We offer free standard shipping on orders over $50. Express delivery is also available for an additional fee. Most orders are delivered within 3-5 business days.";
      } else if (message.toLowerCase().includes('warranty')) {
        response = "All our products come with a standard manufacturer's warranty. Premium items include extended warranty options. Would you like more details about warranty coverage?";
      } else if (message.toLowerCase().includes('return')) {
        response = "We have a 30-day return policy. If you're not satisfied with your purchase, you can return it for a full refund or exchange it for another product.";
      }
      
      setMessages(prev => [...prev, {sender: 'bot', text: response}]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const toggleFaq = (index: number) => {
    setExpandedFaqs(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  const handleFaqClick = (question: string, answer: string) => {
    setActiveTab('chat');
    // Add the question as a user message
    setMessages(prev => [...prev, {sender: 'user', text: question}]);
    
    // Simulate typing
    setIsTyping(true);
    
    // After a delay, add the answer as a bot message
    setTimeout(() => {
      setMessages(prev => [...prev, {sender: 'bot', text: answer}]);
      setIsTyping(false);
    }, 800);
  };

  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Highlight the chat icon if the user hasn't seen it yet
  useEffect(() => {
    if (!hasUserSeen) {
      const interval = setInterval(() => {
        gsap.to('.chat-bubble', {
          scale: 1.1,
          duration: 0.2,
          repeat: 1,
          yoyo: true,
          ease: 'power1.inOut'
        });
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [hasUserSeen]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="chat-panel absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-xl shadow-2xl overflow-hidden mb-2 flex flex-col border border-gray-200">
          <div className="bg-primary text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <h3 className="font-medium">AI Shopping Assistant</h3>
            </div>
            <button 
              onClick={toggleChat}
              className="text-white/80 hover:text-white transition-colors focus:outline-none"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger 
                value="chat" 
                className="data-[state=active]:bg-primary/10 transition-all duration-200"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat
              </TabsTrigger>
              <TabsTrigger 
                value="faq" 
                className="data-[state=active]:bg-primary/10 transition-all duration-200"
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                FAQ
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="p-0">
              <div 
                ref={chatContainerRef}
                className="flex-1 p-4 max-h-96 overflow-y-auto bg-gray-50 min-h-[300px]"
              >
                {messages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`mb-3 ${msg.sender === 'user' ? 'text-right' : ''} animate-fade-in`}
                  >
                    <div 
                      className={`inline-block px-4 py-2 rounded-lg ${
                        msg.sender === 'user' 
                          ? 'bg-primary text-white rounded-tr-none' 
                          : 'bg-gray-200 text-gray-800 rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="mb-3">
                    <div className="inline-block px-4 py-2 rounded-lg bg-gray-200 text-gray-800 rounded-tl-none">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                        <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200">
                <div className="flex gap-2">
                  <Input 
                    type="text" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    placeholder="Ask about our products..." 
                    className="flex-1 py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button 
                    type="submit"
                    className="bg-primary hover:bg-primary/90 transition-all duration-200"
                    aria-label="Send message"
                  >
                    Send
                  </Button>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="faq" className="p-0">
              <div className="p-3 border-b border-gray-200">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search FAQs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-full focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              
              <ScrollArea className="h-[300px] p-3">
                {filteredFaqs.length > 0 ? (
                  <div className="space-y-2">
                    {filteredFaqs.map((faq, index) => (
                      <div 
                        key={index} 
                        className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:border-primary/50"
                      >
                        <button
                          onClick={() => toggleFaq(index)}
                          className="w-full flex items-center justify-between p-3 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                        >
                          <span className="font-medium">{faq.question}</span>
                          {expandedFaqs.includes(index) ? (
                            <ChevronUp className="h-4 w-4 text-gray-500" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-gray-500" />
                          )}
                        </button>
                        
                        {expandedFaqs.includes(index) && (
                          <div className="p-3 bg-white border-t border-gray-200 animate-accordion-down">
                            <p className="text-gray-700">{faq.answer}</p>
                            <Button
                              variant="link"
                              className="text-primary p-0 h-auto mt-2 text-sm"
                              onClick={() => handleFaqClick(faq.question, faq.answer)}
                            >
                              Ask in chat
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full py-8 text-center">
                    <HelpCircle className="h-12 w-12 text-gray-300 mb-3" />
                    <p className="text-gray-500">No FAQs match your search.</p>
                    <p className="text-gray-400 text-sm mt-1">Try a different keyword or phrase.</p>
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      )}
      
      <div className="relative">
        {!hasUserSeen && !isOpen && (
          <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse"></span>
        )}
        
        <Button
          onClick={toggleChat}
          size={isMobile ? "default" : "lg"}
          className="chat-bubble bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg flex items-center justify-center relative transition-all duration-300 animate-fade-in"
          aria-label="Chat with AI shopping assistant"
        >
          {isOpen ? (
            <X size={24} />
          ) : (
            <>
              <Sparkles size={20} className="mr-2 animate-pulse" />
              <span className="ml-1 hidden sm:inline-block">AI Shopping Assistant</span>
            </>
          )}
        </Button>
        
        {!isOpen && !hasUserSeen && (
          <div className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 px-3 py-1.5 rounded-lg shadow-md text-sm whitespace-nowrap animate-fade-in">
            <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-white"></div>
            Ask me about products or click for FAQs!
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatAssistant;
