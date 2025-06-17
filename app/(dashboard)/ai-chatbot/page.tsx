'use client';

import Navbar from '@/components/shared/Navbar';
import Image from 'next/image';
import React from 'react';
import iconAI from '@/public/assets/icon/icon_ai.svg';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { useLoading } from '@/context/LoadingContext';
import * as API_NUTRITION from '@/service/apiNutrition';
import { toast } from 'sonner';

type ChatMessage = {
  sender: 'user' | 'ai';
  message: string;
};

function ChatAI() {
  const [profile, setProfile] = React.useState<any>({});
  const [input, setInput] = React.useState('');
  const [chatHistory, setChatHistory] = React.useState<ChatMessage[]>([]);
  const { setLoading } = useLoading();

  const getProfile = async () => {
    setLoading(true);
    try {
      const res = await API_NUTRITION.getProfile();
      setProfile(res.data.data);
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChat = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { sender: 'user', message: input };
    setChatHistory((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const res = await API_NUTRITION.sendChat({ message: input });
      const aiReply: string = res.data.reply;

      const aiMessage: ChatMessage = { sender: 'ai', message: aiReply };
      setChatHistory((prev) => [...prev, aiMessage]);
    } catch (err: any) {
    //   toast.error(err?.response?.data?.message || 'Gagal mengirim pesan');
    } 
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleChat();
    }
  };

  const getHistory = async () => {
    setLoading(true);
    try {
      const res = await API_NUTRITION.getHistoryChat();
  
      const mapped = res.data.messages.map((item: any) => ({
        sender: item.role === 'user' ? 'user' : 'ai',
        message: item.content,
      }));
  
      setChatHistory(mapped);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Gagal memuat riwayat chat');
    } finally {
      setLoading(false);
    }
  };
  
  

  React.useEffect(() => {
    getProfile();
    getHistory();
  }, []);

  return (
    <main>
      <div className="bg-[#6B994D] flex items-center gap-5 px-6 py-2 rounded-t-[30px]">
        <Image
          src={iconAI}
          alt="AI Icon"
          width={60}
          height={60}
        />
        <h1 className="font-bold text-[56px] text-[#F0FFCD]">Nibit.</h1>
      </div>

      <div className="bg-[#F8FFF0] p-6 rounded-b-[30px] max-h-[100vh] overflow-y-hidden relative">
        <div className="flex flex-col gap-4 max-h-[100vh] overflow-y-auto pb-32">
          {chatHistory.map((chat, index) =>
            chat.sender === 'user' ? (
              <div key={index} className="flex justify-end items-start gap-2">
                <div className="bg-[#6B994D] text-white px-4 py-2 rounded-2xl rounded-br-sm max-w-xs">
                  {chat.message}
                </div>
                <Avatar className="cursor-pointer w-12 h-12">
                  <AvatarImage src={profile?.photo} />
                  <AvatarFallback>{profile?.name?.[0]}</AvatarFallback>
                </Avatar>
              </div>
            ) : (
              <div key={index} className="flex justify-start items-start gap-2">
                <Image
                  src={iconAI}
                  alt="AI Icon"
                  width={45}
                  height={45}
                  className="mt-1"
                />
                <div className="bg-white text-[#6B994D] px-4 py-2 rounded-2xl rounded-bl-sm max-w-xs border border-[#6B994D]">
                  {chat.message}
                </div>
              </div>
            )
          )}
        </div>

        <div className="mt-4 absolute bottom-0 left-0 right-0 flex items-center gap-3 bg-[#E9E9E9] p-3 rounded-lg shadow-lg">
          <Input
            className="w-full p-5 border-none focus:ring-0 focus:border-none bg-white rounded-lg"
            placeholder="Ketik pertanyaan untuk Nibit..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Send
            size={24}
            className="cursor-pointer text-[#6B994D]"
            onClick={handleChat}
          />
        </div>
      </div>
    </main>
  );
}

export default ChatAI;
