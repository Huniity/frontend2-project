import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion/Accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs/Tabs";
import { FaPlaneDeparture } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa6";
import { IoShieldCheckmark } from "react-icons/io5";
import { HiCloudDownload } from "react-icons/hi";
import { MdContactSupport } from "react-icons/md";
import { IoAccessibility } from "react-icons/io5";


const FAQ = () => {
    return (
        <section className="snap-start w-full bg-black min-h-screen overflow-clip" style={{ backgroundImage: 'url(/rome.jpg)', backgroundAttachment: 'fixed', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'grayscale(0.3) contrast(1) saturate(2) sepia(0.15)' }}>
            <div className="flex flex-col w-full justify-start items-center gap-4 py-40 " >
                <h1 className="text-5xl font-bold text-white text-shadow-lg font-made-outer">Questions? We’ve got answers.</h1>
                <p className="mb-12 text-lg text-white text-shadow-lg font-made-outer">Learn how Nomadia works, how we handle payments, and how your data stays protected.</p>
                <Tabs defaultValue="nomadia" className="w-3/4 max-w-280 flex flex-col items-center text-center">
                    <TabsList className="rounded-lg border border-white/15 bg-black/40 backdrop-blur-md shadow-xl overflow-hidden flex justify-center">
                        <TabsTrigger value="nomadia" className="text-white hover:text-gray-100 text-shadow-lg data-[state=active]:bg-black/50">
                            <FaPlaneDeparture /> Nomadia
                        </TabsTrigger>
                        <TabsTrigger value="payments" className="text-white hover:text-gray-100 text-shadow-lg data-[state=active]:bg-black/50">
                            <FaCreditCard /> Payments
                        </TabsTrigger>
                        <TabsTrigger value="security" className="text-white hover:text-gray-100 text-shadow-lg data-[state=active]:bg-black/50">
                            <IoShieldCheckmark /> Security
                        </TabsTrigger>
                        <TabsTrigger value="data" className="text-white hover:text-gray-100 text-shadow-lg data-[state=active]:bg-black/50">
                            <HiCloudDownload /> Data
                        </TabsTrigger>
                        <TabsTrigger value="support" className="text-white hover:text-gray-100 text-shadow-lg data-[state=active]:bg-black/50">
                            <MdContactSupport /> Support
                        </TabsTrigger>
                        <TabsTrigger value="accessibility" className="text-white hover:text-gray-100 text-shadow-lg data-[state=active]:bg-black/50">
                            <IoAccessibility /> Accessibility
                        </TabsTrigger>
                    </TabsList>

                    {/* -------------------- NOMADIA -------------------- */}
                    <TabsContent value="nomadia" className="p-4 flex items-center justify-center w-full">
                        <Accordion
                            type="single"
                            collapsible
                            className="w-3/4 max-w-2xl rounded-lg border border-white/15 bg-black/40 backdrop-blur-md shadow-xl overflow-hidden"
                        >
                            <AccordionItem value="nomadia-1" className="border-b border-white/10 last:border-b-0 hover:bg-black/50 transition-colors">
                                <AccordionTrigger className="text-white hover:text-gray-100 px-6 py-4 hover:no-underline text-shadow-lg">
                                    How does the AI travel planner work?
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-300 px-6 pb-4">
                                    Nomadia asks a few questions about your destination, dates, budget, and travel style. Using that context, it generates a personalized day-by-day itinerary with suggested places, routes, and activities.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="nomadia-2" className="border-b border-white/10 last:border-b-0 hover:bg-black/50 transition-colors">
                                <AccordionTrigger className="text-white hover:text-gray-100 px-6 py-4 hover:no-underline text-shadow-lg">
                                    Can I edit the itinerary after it’s generated?
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-300 px-6 pb-4">
                                    Yes. You can swap activities, regenerate days, adjust the pace, and refine preferences anytime. The plan updates based on your changes.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="nomadia-3" className="border-b border-white/10 last:border-b-0 hover:bg-black/50 transition-colors">
                                <AccordionTrigger className="text-white hover:text-gray-100 px-6 py-4 hover:no-underline text-shadow-lg">
                                    Do I need to know everything before I start?
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-300 px-6 pb-4">
                                    Not at all. You can start with something simple like “5 days in Rome on a budget,” and Nomadia will ask the right questions to fill in the missing details.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="nomadia-4" className="border-b border-white/10 last:border-b-0 hover:bg-black/50 transition-colors">
                                <AccordionTrigger className="text-white hover:text-gray-100 px-6 py-4 hover:no-underline text-shadow-lg">
                                    Is there a free plan?
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-300 px-6 pb-4">
                                    Yes. The Backpacker plan is free and lets you generate a trip and try the core planning experience. Premium plans unlock unlimited trips and advanced customization.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="nomadia-5" className="border-b border-white/10 last:border-b-0 hover:bg-black/50 transition-colors">
                                <AccordionTrigger className="text-white hover:text-gray-100 px-6 py-4 hover:no-underline text-shadow-lg">
                                    Can I use Nomadia on mobile?
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-300 px-6 pb-4">
                                    Yes. Nomadia is responsive and works across desktop, tablet, and mobile so you can access your itinerary anywhere during your trip.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="nomadia-6" className="border-b border-white/10 last:border-b-0 hover:bg-black/50 transition-colors">
                                <AccordionTrigger className="text-white hover:text-gray-100 px-6 py-4 hover:no-underline text-shadow-lg">
                                    Can I share my trip with others?
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-300 px-6 pb-4">
                                    Yes. You can share your itinerary with friends or travel companions so everyone stays aligned on the plan. You can share a link to your itinerary or export it as a PDF for easy sharing and reference during your trip depending on your subscription plan.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </TabsContent>

                    {/* -------------------- PAYMENTS -------------------- */}
                    <TabsContent value="payments" className="p-4 flex items-center justify-center w-full">
                        <Accordion
                            type="single"
                            collapsible
                            className="w-3/4 max-w-2xl rounded-lg border border-white/15 bg-black/40 backdrop-blur-md shadow-xl overflow-hidden"
                        >
                            <AccordionItem value="payments-1" className="border-b border-white/10 last:border-b-0 hover:bg-black/50 transition-colors">
                                <AccordionTrigger className="text-white hover:text-gray-100 px-6 py-4 hover:no-underline text-shadow-lg">
                                    How are payments handled?
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-300 px-6 pb-4">
                                    All payments are processed securely through our payment provider. Nomadia does not store your full credit card details on our servers. Transactions are encrypted and handled by certified payment infrastructure.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="payments-2" className="border-b border-white/10 last:border-b-0 hover:bg-black/50 transition-colors">
                                <AccordionTrigger className="text-white hover:text-gray-100 px-6 py-4 hover:no-underline text-shadow-lg">
                                    Is my payment information secure?
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-300 px-6 pb-4">
                                    Yes. Payment processing is handled by a PCI-compliant provider and protected with industry-standard encryption. Nomadia never stores complete card numbers.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="payments-3" className="border-b border-white/10 last:border-b-0 hover:bg-black/50 transition-colors">
                                <AccordionTrigger className="text-white hover:text-gray-100 px-6 py-4 hover:no-underline text-shadow-lg">
                                    Can I cancel my subscription anytime?
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-300 px-6 pb-4">
                                    Yes. You can cancel anytime from your account settings. Your plan stays active until the end of your current billing period and you won’t be charged again after cancellation.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="payments-4" className="border-b border-white/10 last:border-b-0 hover:bg-black/50 transition-colors">
                                <AccordionTrigger className="text-white hover:text-gray-100 px-6 py-4 hover:no-underline text-shadow-lg">
                                    Do you offer refunds?
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-300 px-6 pb-4">
                                    If you experience an issue or were charged by mistake, contact support and we’ll review your request. Our goal is to be fair and transparent.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="payments-5" className="border-b border-white/10 last:border-b-0 hover:bg-black/50 transition-colors">
                                <AccordionTrigger className="text-white hover:text-gray-100 px-6 py-4 hover:no-underline text-shadow-lg">
                                    Will I be charged automatically?
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-300 px-6 pb-4">
                                    For paid plans, billing renews automatically each period unless you cancel. You can manage your subscription and view invoices from your account settings.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </TabsContent>

                    {/* -------------------- SECURITY -------------------- */}
                    <TabsContent value="security" className="p-4 flex items-center justify-center w-full">
                        <Accordion
                            type="single"
                            collapsible
                            className="w-3/4 max-w-2xl rounded-lg border border-white/15 bg-black/40 backdrop-blur-md shadow-xl overflow-hidden"
                        >
                            <AccordionItem value="security-1" className="border-b border-white/10 last:border-b-0 hover:bg-black/50 transition-colors">
                                <AccordionTrigger className="text-white hover:text-gray-100 px-6 py-4 hover:no-underline text-shadow-lg">
                                    Is my personal data secure?
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-300 px-6 pb-4">
                                    Yes. We take data security seriously. Your information is protected with industry-standard security measures, including encryption and strict access controls.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="security-2" className="border-b border-white/10 last:border-b-0 hover:bg-black/50 transition-colors">
                                <AccordionTrigger className="text-white hover:text-gray-100 px-6 py-4 hover:no-underline text-shadow-lg">
                                    Do you store my full credit card details?
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-300 px-6 pb-4">
                                    No. Your card details are handled by our payment provider. Nomadia only receives payment status and billing identifiers needed to manage your subscription.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="security-3" className="border-b border-white/10 last:border-b-0 hover:bg-black/50 transition-colors">
                                <AccordionTrigger className="text-white hover:text-gray-100 px-6 py-4 hover:no-underline text-shadow-lg">
                                    Who can access my trips and itineraries?
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-300 px-6 pb-4">
                                    By default, only you can access your saved trips. If you choose to share a trip link or export it, you control who sees it.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="security-4" className="border-b border-white/10 last:border-b-0 hover:bg-black/50 transition-colors">
                                <AccordionTrigger className="text-white hover:text-gray-100 px-6 py-4 hover:no-underline text-shadow-lg">
                                    Do you sell my data?
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-300 px-6 pb-4">
                                    No. We never sell your personal data. Any third-party processing is limited to trusted providers needed to operate the platform (e.g., payments and hosting).
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="security-5" className="border-b border-white/10 last:border-b-0 hover:bg-black/50 transition-colors">
                                <AccordionTrigger className="text-white hover:text-gray-100 px-6 py-4 hover:no-underline text-shadow-lg">
                                    What should I do if I notice suspicious activity?
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-300 px-6 pb-4">
                                    Contact support as soon as possible. We can help investigate and secure your account. We also recommend using a strong, unique password for your Nomadia account.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </TabsContent>

                    {/* -------------------- DATA (GDPR) -------------------- */}
                    <TabsContent value="data" className="p-4 flex items-center justify-center w-full">
                        <Accordion
                            type="single"
                            collapsible
                            className="w-3/4 max-w-2xl rounded-lg border border-white/15 bg-black/40 backdrop-blur-md shadow-xl overflow-hidden"
                        >
                            <AccordionItem value="data-1" className="border-b border-white/10 last:border-b-0 hover:bg-black/50 transition-colors">
                                <AccordionTrigger className="text-white hover:text-gray-100 px-6 py-4 hover:no-underline text-shadow-lg">
                                    Is Nomadia GDPR compliant?
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-300 px-6 pb-4">
                                    Yes. Nomadia follows GDPR requirements. You can access, correct, export, or request deletion of your personal data at any time.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="data-2" className="border-b border-white/10 last:border-b-0 hover:bg-black/50 transition-colors">
                                <AccordionTrigger className="text-white hover:text-gray-100 px-6 py-4 hover:no-underline text-shadow-lg">
                                    What personal data does Nomadia collect?
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-300 px-6 pb-4">
                                    We collect only what’s needed to provide the service, such as your account details, travel preferences, and generated itineraries. This helps personalize your planning experience.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="data-3" className="border-b border-white/10 last:border-b-0 hover:bg-black/50 transition-colors">
                                <AccordionTrigger className="text-white hover:text-gray-100 px-6 py-4 hover:no-underline text-shadow-lg">
                                    Can I request access or deletion of my data?
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-300 px-6 pb-4">
                                    Yes. You can request a copy of the personal data we store, request corrections, or ask for deletion. You can do this in your account settings or by contacting support.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="data-4" className="border-b border-white/10 last:border-b-0 hover:bg-black/50 transition-colors">
                                <AccordionTrigger className="text-white hover:text-gray-100 px-6 py-4 hover:no-underline text-shadow-lg">
                                    What happens to my data if I delete my account?
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-300 px-6 pb-4">
                                    When you delete your account, your personal data and saved trips are permanently removed from our systems in accordance with applicable data protection regulations.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="data-5" className="border-b border-white/10 last:border-b-0 hover:bg-black/50 transition-colors">
                                <AccordionTrigger className="text-white hover:text-gray-100 px-6 py-4 hover:no-underline text-shadow-lg">
                                    Where is my data stored?
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-300 px-6 pb-4">
                                    Your data is stored on trusted infrastructure providers that follow strict security and privacy standards. We use appropriate safeguards to protect your data.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="data-6" className="border-b border-white/10 last:border-b-0 hover:bg-black/50 transition-colors">
                                <AccordionTrigger className="text-white hover:text-gray-100 px-6 py-4 hover:no-underline text-shadow-lg">
                                    Do you share my data with third parties?
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-300 px-6 pb-4">
                                    We don’t sell your personal data. Some data may be processed by trusted service providers (like payments or hosting) only to operate and improve the platform.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </TabsContent>

                    {/* -------------------- SUPPORT -------------------- */}
                    <TabsContent value="support" className="p-4 flex items-center justify-center w-full">
                        <Accordion
                            type="single"
                            collapsible
                            className="w-3/4 max-w-2xl rounded-lg border border-white/15 bg-black/40 backdrop-blur-md shadow-xl overflow-hidden"
                        >
                            <AccordionItem value="support-1" className="border-b border-white/10 last:border-b-0 hover:bg-black/50 transition-colors">
                                <AccordionTrigger className="text-white hover:text-gray-100 px-6 py-4 hover:no-underline text-shadow-lg">
                                    How can I contact support?
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-300 px-6 pb-4">
                                    You can reach our support team from the Contact page or directly from your dashboard. We’ll respond as quickly as possible.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="support-2" className="border-b border-white/10 last:border-b-0 hover:bg-black/50 transition-colors">
                                <AccordionTrigger className="text-white hover:text-gray-100 px-6 py-4 hover:no-underline text-shadow-lg">
                                    What if the itinerary doesn’t match what I want?
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-300 px-6 pb-4">
                                    You can adjust your preferences and regenerate parts of the plan. If something still feels off, contact support and we’ll help you troubleshoot or improve your result.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="support-3" className="border-b border-white/10 last:border-b-0 hover:bg-black/50 transition-colors">
                                <AccordionTrigger className="text-white hover:text-gray-100 px-6 py-4 hover:no-underline text-shadow-lg">
                                    Are bookings included?
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-300 px-6 pb-4">
                                    Nomadia can suggest places to stay, eat, and visit, and can link to booking platforms. You stay in control of where and how you book.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="support-4" className="border-b border-white/10 last:border-b-0 hover:bg-black/50 transition-colors">
                                <AccordionTrigger className="text-white hover:text-gray-100 px-6 py-4 hover:no-underline text-shadow-lg">
                                    Can I export or download my itinerary?
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-300 px-6 pb-4">
                                    Yes. Depending on your plan, you can export your itinerary as a PDF for offline access, sharing, and easy reference during your trip.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="support-5" className="border-b border-white/10 last:border-b-0 hover:bg-black/50 transition-colors">
                                <AccordionTrigger className="text-white hover:text-gray-100 px-6 py-4 hover:no-underline text-shadow-lg">
                                    Can I change my plan later?
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-300 px-6 pb-4">
                                    Yes. You can upgrade or downgrade your subscription anytime. Changes take effect according to your billing period and will be visible in your account settings.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </TabsContent>

                    {/* -------------------- ACCESSIBILITY -------------------- */}
                    <TabsContent value="accessibility" className="p-4 flex items-center justify-center w-full">
                        <Accordion
                            type="single"
                            collapsible
                            className="w-3/4 max-w-2xl rounded-lg border border-white/15 bg-black/40 backdrop-blur-md shadow-xl overflow-hidden"
                        >
                            <AccordionItem value="accessibility-1" className="border-b border-white/10 last:border-b-0 hover:bg-black/50 transition-colors">
                                <AccordionTrigger className="text-white hover:text-gray-100 px-6 py-4 hover:no-underline text-shadow-lg">
                                    Is Nomadia accessible for keyboard users?
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-300 px-6 pb-4">
                                    Yes. Nomadia is designed to be usable with a keyboard, including navigating tabs, accordions, and interactive elements.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="accessibility-2" className="border-b border-white/10 last:border-b-0 hover:bg-black/50 transition-colors">
                                <AccordionTrigger className="text-white hover:text-gray-100 px-6 py-4 hover:no-underline text-shadow-lg">
                                    Does Nomadia support screen readers?
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-300 px-6 pb-4">
                                    We aim to support screen readers by using semantic UI components and accessible labels for interactive controls.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="accessibility-3" className="border-b border-white/10 last:border-b-0 hover:bg-black/50 transition-colors">
                                <AccordionTrigger className="text-white hover:text-gray-100 px-6 py-4 hover:no-underline text-shadow-lg">
                                    Can I reduce animations and motion effects?
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-300 px-6 pb-4">
                                    Yes. Nomadia respects your device accessibility settings like “Reduce Motion” where possible, and we keep animations subtle to avoid distraction.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="accessibility-4" className="border-b border-white/10 last:border-b-0 hover:bg-black/50 transition-colors">
                                <AccordionTrigger className="text-white hover:text-gray-100 px-6 py-4 hover:no-underline text-shadow-lg">
                                    Is the interface optimized for mobile?
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-300 px-6 pb-4">
                                    Yes. The layout is responsive and optimized for mobile screens so you can plan and access your itinerary on the go.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="accessibility-5" className="border-b border-white/10 last:border-b-0 hover:bg-black/50 transition-colors">
                                <AccordionTrigger className="text-white hover:text-gray-100 px-6 py-4 hover:no-underline text-shadow-lg">
                                    How can I report an accessibility issue?
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-300 px-6 pb-4">
                                    If you encounter an accessibility issue, contact support with details (device, browser, and what happened). We’ll prioritize improvements.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    )
}

export default FAQ;