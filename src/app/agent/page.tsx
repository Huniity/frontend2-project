
import ChatBox from "@/components/ui/chat/ChatBox";

const Agent = () => {
    return (
        <div className="min-h-screen bg-black text-white">
            <div className="w-full pt-52 pb-20 px-12">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <h1 className="text-7xl font-made-outer-alt font-black text-white text-shadow-lg">
                        nomad.ia
                    </h1>
                    <p className="text-lg font-made-outer text-gray-400 max-w-21xl mx-auto leading-relaxed">
                        Your personal travel assistant, powered by AI. Plan your next adventure with ease and confidence.
                    </p>
                </div>
                <div className="mt-12 flex justify-center">
                    <ChatBox />
                </div>
            </div>
        </div>
    )
}

export default Agent;