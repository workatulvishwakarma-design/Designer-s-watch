"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, ChevronRight, Watch } from "lucide-react";
import Link from "next/link";

type Message = {
    id: string;
    text: string;
    sender: "bot" | "user";
    options?: { label: string; action: string }[];
};

export default function ChatbotWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            text: "Hello! Welcome to Designer World. How can we assist you today?",
            sender: "bot",
            options: [
                { label: "Track my order", action: "track_order" },
                { label: "Need a recommendation", action: "recommend" },
                { label: "Warranty & Repairs", action: "warranty" },
                { label: "Contact Support", action: "contact" }
            ]
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom when messages change
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isOpen]);

    const handleSend = (text: string) => {
        if (!text.trim()) return;

        // Add user message
        const userMsg: Message = { id: Date.now().toString(), text, sender: "user" };
        setMessages(prev => [...prev, userMsg]);
        setInputValue("");

        // Simulate bot typing/response delay
        setTimeout(() => {
            let botReply: Message = { id: (Date.now() + 1).toString(), text: "", sender: "bot" };

            const lowerText = text.toLowerCase();
            if (lowerText.includes("order") || lowerText.includes("track")) {
                botReply.text = "To track your order, please visit the 'My Orders' section in your account dashboard. You'll need your Order ID.";
            } else if (lowerText.includes("recommend") || lowerText.includes("gift")) {
                botReply.text = "We have wonderful collections! Are you looking for a Men's or Women's timepiece?";
                botReply.options = [
                    { label: "Men's Watches", action: "link_men" },
                    { label: "Women's Watches", action: "link_women" }
                ];
            } else if (lowerText.includes("warranty") || lowerText.includes("repair")) {
                botReply.text = "All Designer World timepieces come with a standard 1-year warranty covering manufacturing defects. Would you like to file a repair request?";
            } else {
                botReply.text = "Thank you for reaching out. Our support team operates from 10 AM to 6 PM IST. We will get back to you shortly, or you can check our FAQ page.";
                botReply.options = [
                    { label: "Contact Us", action: "contact" }
                ];
            }

            setMessages(prev => [...prev, botReply]);
        }, 1000);
    };

    const handleOptionClick = (action: string, label: string) => {
        handleSend(label);

        // Special actions that open links
        if (action === "link_men") {
            setTimeout(() => window.location.href = "/collections/men", 1500);
        } else if (action === "link_women") {
            setTimeout(() => window.location.href = "/collections/women", 1500);
        } else if (action === "contact") {
            setTimeout(() => window.location.href = "/contact", 1500);
        }
    };

    return (
        <>
            {/* Floating Toggle Button */}
            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 w-16 h-16 bg-[#B8935A] rounded-full text-white flex items-center justify-center shadow-[0_10px_40px_rgba(184,147,90,0.4)] z-50 hover:bg-[#003926] transition-colors duration-300"
                style={{
                    boxShadow: "0 0 0 0 rgba(184, 147, 90, 0.5)",
                    animation: isOpen ? "none" : "pulse-gold 2s infinite"
                }}
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </motion.button>

            {/* Chat Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-28 right-6 lg:right-10 w-[350px] max-w-[calc(100vw-48px)] h-[500px] max-h-[60vh] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-[#EDE8DF]"
                    >
                        {/* Header */}
                        <div className="bg-[#003926] p-4 text-white flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                <Watch size={20} className="text-[#B8935A]" />
                            </div>
                            <div>
                                <h3 className="font-dm font-medium text-sm">Designer World Concierge</h3>
                                <p className="text-[10px] text-white/70">Typically replies immediately</p>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 p-4 overflow-y-auto bg-[#FAF8F4] flex flex-col gap-4">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                                    <div
                                        className={`max-w-[85%] p-3 rounded-2xl text-[13px] font-dm ${msg.sender === "user"
                                                ? "bg-[#B8935A] text-white rounded-br-sm"
                                                : "bg-white text-[#1A1918] border border-[#EDE8DF] rounded-bl-sm"
                                            }`}
                                    >
                                        {msg.text}
                                    </div>

                                    {/* Options Bubbles */}
                                    {msg.options && msg.options.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-3 pl-2">
                                            {msg.options.map((opt) => (
                                                <button
                                                    key={opt.action}
                                                    onClick={() => handleOptionClick(opt.action, opt.label)}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#B8935A]/30 bg-white text-[#003926] text-[11px] font-dm hover:bg-[#B8935A] hover:text-white transition-colors"
                                                >
                                                    {opt.label} <ChevronRight size={12} />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-[#EDE8DF] flex gap-2 items-center">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend(inputValue)}
                                placeholder="Type a message..."
                                className="flex-1 outline-none font-dm text-[13px] px-2"
                            />
                            <button
                                onClick={() => handleSend(inputValue)}
                                disabled={!inputValue.trim()}
                                className="w-8 h-8 rounded-full bg-[#1A1918] text-white flex items-center justify-center disabled:opacity-50 transition-opacity"
                            >
                                <Send size={14} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx global>{`
                @keyframes pulse-gold {
                    0% { box-shadow: 0 0 0 0 rgba(184, 147, 90, 0.6); }
                    70% { box-shadow: 0 0 0 15px rgba(184, 147, 90, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(184, 147, 90, 0); }
                }
            `}</style>
        </>
    );
}
