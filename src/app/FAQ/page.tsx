import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants } from "@/components/ui/tabs/Tabs"


const FAQ = () => {
    return (
        <section className="snap-start w-full bg-black min-h-screen" style={{ backgroundImage: 'url(/turkey.jpg)', backgroundAttachment: 'fixed', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'grayscale(0.3) contrast(1) saturate(2) sepia(0.15)' }}>
            <div className="flex flex-col w-full justify-start items-center gap-4 py-20 " >
                <Tabs defaultValue="overview" className="w-3/4 max-w-2xl">
                <TabsList className="rounded-lg border border-white/15 bg-black/40 backdrop-blur-md shadow-xl overflow-hidden">
                    <TabsTrigger value="overview" className="text-white hover:text-gray-100 text-shadow-lg data-[state=active]:bg-black/50">Nomadia</TabsTrigger>
                    <TabsTrigger value="payments" className="text-white hover:text-gray-100 text-shadow-lg data-[state=active]:bg-black/50">Payments</TabsTrigger>
                    <TabsTrigger value="security" className="text-white hover:text-gray-100 text-shadow-lg data-[state=active]:bg-black/50">Security</TabsTrigger>
                    <TabsTrigger value="data" className="text-white hover:text-gray-100 text-shadow-lg data-[state=active]:bg-black/50">Data</TabsTrigger>
                    <TabsTrigger value="support" className="text-white hover:text-gray-100 text-shadow-lg data-[state=active]:bg-black/50">Support</TabsTrigger>
                    <TabsTrigger value="accessibility" className="text-white hover:text-gray-100 text-shadow-lg data-[state=active]:bg-black/50">Accessibility</TabsTrigger>
                </TabsList>
                </Tabs>

                {/*  */}
                <h1 className="text-4xl mt-18 font-bold text-white text-shadow-lg font-made-outer">Questions? We’ve got answers.</h1>
                <p className="mb-18 text-lg text-white text-shadow-lg font-made-outer">Learn how Nomadia works, how we handle payments, and how your data stays protected.</p>
                <Accordion
                    type="single"
                    collapsible
                    // defaultValue="item-1"
                    className="w-3/4 max-w-2xl rounded-lg border border-white/15 bg-black/40 backdrop-blur-md shadow-xl overflow-hidden"
                >
                    <AccordionItem value="item-1" className="border-b border-white/10 last:border-b-0 hover:bg-black/50 transition-colors ">
                        <AccordionTrigger className="text-white hover:text-gray-100 px-6 py-4 hover:no-underline text-shadow-lg">
                            How does the AI travel planner work?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-300 px-6 pb-4 ">
                            Nomadia asks a few questions about your destination, travel style, budget, and interests.
                            Using that information, it generates a personalized day-by-day itinerary with suggested places, routes, and activities. You can then customize the itinerary, add or remove places, and save it for your trip.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2" className="border-b border-white/10 last:border-b-0 hover:bg-black/50 transition-colors">
                        <AccordionTrigger className="text-white hover:text-gray-100 px-6 py-4 hover:no-underline text-shadow-lg">
                            Can I edit the itinerary after it’s generated?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-300 px-6 pb-4">
                            Yes, you can edit the itinerary after it’s generated. You can add or remove places, change the order of activities, and update details to better suit your preferences.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3" className="border-b border-white/10 last:border-b-0 hover:bg-black/50 transition-colors">
                        <AccordionTrigger className="text-white hover:text-gray-100 px-6 py-4 hover:no-underline text-shadow-lg">
                            Do I need to know exactly where I want to go?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-300 px-6 pb-4">
                            Not at all. You can start with something simple like “a 5-day trip in Italy” or “a low-budget trip to Rome,” and Nomadia will guide you through the rest. You can specify your interests, preferred pace, and any must-see places, and Nomadia will create an itinerary that fits your style.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4" className="border-b border-white/10 last:border-b-0 hover:bg-black/50 transition-colors">
                        <AccordionTrigger className="text-white hover:text-gray-100 px-6 py-4 hover:no-underline text-shadow-lg">
                            Is there a free plan?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-300 px-6 pb-4">
                            Yes. The Backpacker plan is completely free and lets you generate your first trip and explore the core features. Please check our pricing page for more details on the features included in each plan and the benefits of upgrading to the Globetrotter or Nomad plans.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5" className="border-b border-white/10 last:border-b-0 hover:bg-black/50 transition-colors">
                        <AccordionTrigger className="text-white hover:text-gray-100 px-6 py-4 hover:no-underline text-shadow-lg">
                            What’s included in the premium plans?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-300 px-6 pb-4">
                            Premium plans unlock unlimited trips, smarter route optimization, itinerary adjustments, PDF export, and additional customization options. The Globetrotter plan is ideal for frequent travelers who want to create multiple itineraries, while the Nomad plan is perfect for digital nomads and travel enthusiasts who want the full range of features and priority support. Please check our pricing page for more details on the features included in each plan and the benefits of upgrading.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-6" className="border-b border-white/10 last:border-b-0 hover:bg-black/50 transition-colors">
                        <AccordionTrigger className="text-white hover:text-gray-100 px-6 py-4 hover:no-underline text-shadow-lg">
                            Can I use Nomadia on mobile?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-300 px-6 pb-4">
                            Yes. Nomadia works on desktop, tablet, and mobile so you can access your itinerary anywhere during your trip. The interface is optimized for mobile use, allowing you to view your itinerary, get directions, and make adjustments on the go.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-7" className="border-b border-white/10 last:border-b-0 hover:bg-black/50 transition-colors">
                        <AccordionTrigger className="text-white hover:text-gray-100 px-6 py-4 hover:no-underline text-shadow-lg">
                            Are bookings included?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-300 px-6 pb-4">
                            No, Nomadia does not handle bookings directly. However, it provides links to recommended accommodations, restaurants, and activities, making it easy for you to book through trusted platforms. You can also export your itinerary and share it with friends or travel agents who can assist with bookings.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-8" className="border-b border-white/10 last:border-b-0 hover:bg-black/50 transition-colors">
                        <AccordionTrigger className="text-white hover:text-gray-100 px-6 py-4 hover:no-underline text-shadow-lg">
                            Can I share my trip with others?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-300 px-6 pb-4">
                            Yes. You can share your itinerary with friends or travel companions so everyone stays aligned on the plan. You can share a link to your itinerary or export it as a PDF for easy sharing and reference during your trip depending on your subscription plan.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-9" className="border-b border-white/10 last:border-b-0 hover:bg-black/50 transition-colors">
                        <AccordionTrigger className="text-white hover:text-gray-100 px-6 py-4 hover:no-underline text-shadow-lg">
                            How are payments handled?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-300 px-6 pb-4">
                            All payments are processed securely through our payment provider. Nomadia does not store your full credit card details on our servers. Transactions are encrypted and handled by certified payment infrastructure.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-10" className="border-b border-white/10 last:border-b-0 hover:bg-black/50 transition-colors">
                        <AccordionTrigger className="text-white hover:text-gray-100 px-6 py-4 hover:no-underline text-shadow-lg">
                            Can I cancel my subscription anytime?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-300 px-6 pb-4">
                            Yes. You can cancel your subscription at any time from your account settings. Your plan will remain active until the end of the current billing period, and you will not be charged again after cancellation.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-11" className="border-b border-white/10 last:border-b-0 hover:bg-black/50 transition-colors">
                        <AccordionTrigger className="text-white hover:text-gray-100 px-6 py-4 hover:no-underline text-shadow-lg">
                            Is my personal data secure?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-300 px-6 pb-4">
                            Yes. We take data security seriously. Your information is stored using secure infrastructure and protected with industry-standard encryption and access controls.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-12" className="border-b border-white/10 last:border-b-0 hover:bg-black/50 transition-colors">
                        <AccordionTrigger className="text-white hover:text-gray-100 px-6 py-4 hover:no-underline text-shadow-lg">
                            Is Nomadia GDPR compliant?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-300 px-6 pb-4">
                            Yes. Nomadia follows the requirements of the General Data Protection Regulation (GDPR). Users have the right to access, modify, or request deletion of their personal data at any time.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-13" className="border-b border-white/10 last:border-b-0 hover:bg-black/50 transition-colors">
                        <AccordionTrigger className="text-white hover:text-gray-100 px-6 py-4 hover:no-underline text-shadow-lg">
                            What personal data does Nomadia collect?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-300 px-6 pb-4">
                            We only collect the information necessary to provide the service, such as your account details, travel preferences, and the itineraries you generate. This helps us personalize your travel planning experience.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </section>
    )
}

export default FAQ;