export default function Footer() {
    return (
        <footer className="bg-[#111] text-[#EAEAE8] py-24 border-t border-white/10">
            <div className="container mx-auto px-6 md:px-12 xl:px-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

                    <div className="flex flex-col gap-6">
                        <h5 className="font-serif text-2xl">Designer World</h5>
                        <p className="font-sans text-sm font-light opacity-70 max-w-sm leading-relaxed">
                            Four generations of integrated watchmaking excellence. From bespoke OEM solutions to premium direct-to-consumer timepieces.
                        </p>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h6 className="font-sans text-xs tracking-widest uppercase opacity-50">Quick Links</h6>
                        <div className="flex flex-col gap-3 font-sans text-sm">
                            <a href="#" className="hover:text-white transition-colors">Our Story</a>
                            <a href="#" className="hover:text-white transition-colors">Designer Collection</a>
                            <a href="#" className="hover:text-white transition-colors">Escort Collection</a>
                            <a href="#" className="hover:text-white transition-colors">OEM Manufacturing</a>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h6 className="font-sans text-xs tracking-widest uppercase opacity-50">Legal</h6>
                        <div className="flex flex-col gap-3 font-sans text-sm">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-white transition-colors">Shipping & Returns</a>
                            <a href="#" className="hover:text-white transition-colors">Warranty Info</a>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h6 className="font-sans text-xs tracking-widest uppercase opacity-50">Stay Updated</h6>
                        <form className="flex border-b border-white/20 pb-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-transparent border-none outline-none text-sm w-full placeholder:text-white/30"
                            />
                            <button type="submit" className="font-sans text-xs tracking-widest uppercase hover:text-accent transition-colors">
                                Subscribe
                            </button>
                        </form>
                    </div>

                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 font-sans text-xs opacity-50 gap-4">
                    <p>&copy; {new Date().getFullYear()} Designer World / Nagpal Group. All rights reserved.</p>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-white transition-colors text-lg">IG</a>
                        <a href="#" className="hover:text-white transition-colors text-lg">LI</a>
                        <a href="#" className="hover:text-white transition-colors text-lg">TW</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
