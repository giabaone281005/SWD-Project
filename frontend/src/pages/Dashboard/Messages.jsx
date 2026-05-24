import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { mockMessages, mockUsers } from '../../utils/mockData';
import { Send, MessageSquare, Search } from 'lucide-react';

export default function Messages() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [activeConvId, setActiveConvId] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!user) return;

    // Build mock active conversations list depending on role
    // For simplicity, we create a mock chat partner
    const partners = mockUsers.filter(u => u.role !== user.role);
    const convList = partners.map(p => {
      const convKey = user.role === 'tenant' ? `${user.id}_${p.id}` : `${p.id}_${user.id}`;
      const msgList = mockMessages[convKey] || [];
      const lastMsg = msgList[msgList.length - 1];
      return {
        key: convKey,
        partner: p,
        lastMessage: lastMsg ? lastMsg.text : 'Start a new conversation',
        timestamp: lastMsg ? lastMsg.timestamp : new Date().toISOString()
      };
    });

    setConversations(convList);
    if (convList.length > 0) {
      setActiveConvId(convList[0].key);
    }
  }, [user]);

  useEffect(() => {
    if (!activeConvId) return;
    const stored = JSON.parse(localStorage.getItem(`chat_${activeConvId}`));
    if (!stored) {
      const initial = mockMessages[activeConvId] || [];
      localStorage.setItem(`chat_${activeConvId}`, JSON.stringify(initial));
      setChatMessages(initial);
    } else {
      setChatMessages(stored);
    }
  }, [activeConvId]);

  useEffect(() => {
    // Scroll to bottom on new message
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConvId) return;

    const newMsgObj = {
      id: 'm_' + Date.now(),
      senderId: user.id,
      text: newMessage,
      timestamp: new Date().toISOString()
    };

    const updatedMsgs = [...chatMessages, newMsgObj];
    setChatMessages(updatedMsgs);
    localStorage.setItem(`chat_${activeConvId}`, JSON.stringify(updatedMsgs));
    setNewMessage('');

    // Update last message in conversations list
    setConversations(prev =>
      prev.map(c =>
        c.key === activeConvId
          ? { ...c, lastMessage: newMessage, timestamp: newMsgObj.timestamp }
          : c
      )
    );

    // Mock landlord/tenant reply in 1.5 seconds for premium interactive feel!
    setTimeout(() => {
      const activePartner = conversations.find(c => c.key === activeConvId)?.partner;
      if (!activePartner) return;
      
      const replyMsg = {
        id: 'm_reply_' + Date.now(),
        senderId: activePartner.id,
        text: `Thanks for messaging! This is a mock automated reply. I'll get back to you regarding the rooms shortly.`,
        timestamp: new Date().toISOString()
      };

      const withReply = [...updatedMsgs, replyMsg];
      // Check if user is still on the same active conversation
      if (activeConvId === activeConvId) {
        setChatMessages(withReply);
        localStorage.setItem(`chat_${activeConvId}`, JSON.stringify(withReply));
        
        setConversations(prev =>
          prev.map(c =>
            c.key === activeConvId
              ? { ...c, lastMessage: replyMsg.text, timestamp: replyMsg.timestamp }
              : c
          )
        );
      }
    }, 1500);
  };

  const getActivePartner = () => {
    return conversations.find(c => c.key === activeConvId)?.partner;
  };

  const activePartner = getActivePartner();

  if (!user) return null;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden h-[calc(100vh-12rem)] flex">
      {/* Conversation Sidebar */}
      <aside className="w-80 border-r border-gray-100 flex flex-col shrink-0">
        <div className="p-4 border-b border-gray-50 space-y-3">
          <h3 className="font-extrabold text-gray-800 text-sm">Active Conversations</h3>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search chat partners..."
              className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-primary-400 text-xs pl-8 pr-4 py-2 rounded-xl focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-y-auto flex-1 divide-y divide-gray-50">
          {conversations.map((c) => {
            const active = c.key === activeConvId;
            return (
              <button
                key={c.key}
                onClick={() => setActiveConvId(c.key)}
                className={`w-full p-4 flex gap-3 text-left transition-colors focus:outline-none ${
                  active ? 'bg-primary-50/50' : 'hover:bg-gray-50/30'
                }`}
              >
                <img
                  src={c.partner.avatar}
                  alt={c.partner.name}
                  className="h-10 w-10 rounded-full object-cover border border-primary-50 shrink-0"
                />
                <div className="flex-1 min-w-0 space-y-0.5">
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-bold text-gray-800 text-xs truncate pr-2">{c.partner.name}</h4>
                    <span className="text-[9px] text-gray-400">
                      {new Date(c.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-405 truncate font-medium">{c.lastMessage}</p>
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Chat Window */}
      <main className="flex-1 flex flex-col justify-between bg-gray-50/30">
        {activePartner ? (
          <>
            {/* Header */}
            <div className="bg-white border-b border-gray-50 px-6 py-3.5 flex items-center gap-3">
              <img
                src={activePartner.avatar}
                alt={activePartner.name}
                className="h-9 w-9 rounded-full object-cover border border-primary-100"
              />
              <div>
                <h4 className="font-extrabold text-gray-800 text-sm leading-none">{activePartner.name}</h4>
                <span className="text-[10px] text-gray-400 capitalize font-bold">{activePartner.role}</span>
              </div>
            </div>

            {/* Message History */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {chatMessages.map((msg) => {
                const isMe = msg.senderId === user.id;
                return (
                  <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-xs font-semibold shadow-sm leading-relaxed ${
                        isMe
                          ? 'bg-primary-600 text-white rounded-tr-none'
                          : 'bg-white text-gray-700 rounded-tl-none border border-gray-100'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span className={`text-[9px] block text-right mt-1 ${isMe ? 'text-primary-205' : 'text-gray-400'}`}>
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <form onSubmit={handleSendMessage} className="bg-white border-t border-gray-50 p-4 flex gap-3">
              <input
                type="text"
                placeholder="Type message details..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 bg-gray-50 border border-transparent focus:bg-white focus:border-primary-400 text-xs px-4 py-2.5 rounded-xl focus:outline-none text-gray-700 font-semibold"
              />
              <button
                type="submit"
                className="p-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl shadow-md transition-transform active:scale-95 flex items-center justify-center shrink-0 focus:outline-none"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-3">
            <div className="p-4 bg-primary-50 text-primary-500 rounded-full">
              <MessageSquare className="h-10 w-10" />
            </div>
            <h3 className="font-extrabold text-gray-800 text-sm">Open conversations</h3>
            <p className="text-xs text-gray-405 max-w-xs leading-relaxed">Select a user from the conversations list on the left to start checking logs.</p>
          </div>
        )}
      </main>
    </div>
  );
}
