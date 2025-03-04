'use client';

import dynamic from 'next/dynamic';

const ChatContainer = dynamic(() => import('./ChatContainer').then(mod => mod.ChatContainer), {
  ssr: false,
});

export default function ClientPage() {
  return (
    <div className="min-h-screen bg-[#212121] text-[#ececf1]">
      <ChatContainer />
    </div>
  );
} 