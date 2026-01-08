"use client";
import axios from "axios";
import { HTTP_BACKEND } from "@/config";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Pencil, Users, ArrowRight, Loader2, Plus, LogIn } from "lucide-react";

export default function RoomPage() {
    const router = useRouter();
    const [roomName, setRoomName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<'create' | 'join'>('create');

    const handleAction = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const token = localStorage.getItem("authorization");
        
        if (!token) {
            alert("Please login first");
            router.push("/signin");
            setIsLoading(false);
            return;
        }

        try {
            if (activeTab === 'create') {
                const res = await axios.post(`${HTTP_BACKEND}/room`, {
                    name: roomName
                }, {
                    headers: { authorization: token }
                });
                router.push(`/canvas/${res.data.roomId}`);
            } else {
                // Join logic: Get room by slug first
                const res = await axios.get(`${HTTP_BACKEND}/room/${roomName}`);
                if (res.data.room && res.data.room.id) {
                     router.push(`/canvas/${res.data.room.id}`);
                } else {
                     alert("Room not found with this name");
                }
            }
        } catch(e: any) {
            console.error(e);
            const msg = e.response?.data?.message || `Failed to ${activeTab} room`;
            alert(msg);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
             {/* Background Decoration */}
             <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[100px] -z-10" />
             <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] -z-10" />

            <div className="w-full max-w-md">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center p-3 bg-violet-600/10 rounded-xl mb-4 text-violet-400">
                        {activeTab === 'create' ? <Pencil className="w-8 h-8" /> : <Users className="w-8 h-8" />}
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-2">
                        {activeTab === 'create' ? 'Create a Space' : 'Join a Space'}
                    </h1>
                    <p className="text-slate-400">
                        {activeTab === 'create' 
                            ? 'Start a new collaboration session' 
                            : 'Enter an existing room name to join'}
                    </p>
                </div>

                {/* Tab Switcher */}
                <div className="flex p-1 bg-white/5 rounded-xl mb-8 border border-white/10">
                    <button
                        onClick={() => setActiveTab('create')}
                        className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                            activeTab === 'create' 
                            ? 'bg-violet-600 text-white shadow-lg' 
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        <Plus className="w-4 h-4" /> Create Room
                    </button>
                    <button
                        onClick={() => setActiveTab('join')}
                        className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                            activeTab === 'join' 
                            ? 'bg-violet-600 text-white shadow-lg' 
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        <LogIn className="w-4 h-4" /> Join Room
                    </button>
                </div>

                <form onSubmit={handleAction} className="space-y-6 bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-xl">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 ml-1">Room Name</label>
                        <input 
                            type="text" 
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
                            placeholder={activeTab === 'create' ? "e.g., Brainstorming Session" : "e.g., project-alpha"}
                            className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all"
                            required
                        />
                    </div>

                    <button 
                        type="submit"
                        disabled={isLoading || !roomName.trim()}
                        className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-violet-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                {activeTab === 'create' ? 'Create New Room' : 'Join Room'}
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
