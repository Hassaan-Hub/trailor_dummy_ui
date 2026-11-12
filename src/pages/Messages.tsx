import { useState } from 'react'
import {
  MessageSquare,
  Send,
  Bell,
  Search,
  CheckCheck,
  Phone,
  Calendar,
  Clock,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { EmptyState } from '@/components/ui/EmptyState'
import { useToast } from '@/components/ui/Toast'
import { messages, customers } from '@/data/mockData'
import { cn } from '@/lib/utils'

export function Messages() {
  const { toast } = useToast()
  const [selectedCustomerId, setSelectedCustomerId] = useState('')
  const [search, setSearch] = useState('')
  const [inputText, setInputText] = useState('')

  const uniqueCustomerIds = [...new Set(messages.map((m) => m.customerId))]
  const customerList = uniqueCustomerIds
    .map((id) => customers.find((c) => c.id === id))
    .filter((c): c is NonNullable<typeof c> => !!c)
    .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))

  const conversation = messages.filter((m) => m.customerId === selectedCustomerId)
  const selectedCustomer = customers.find((c) => c.id === selectedCustomerId)
  const notifications = messages.filter((m) => m.type === 'notification')

  const handleSend = () => {
    if (inputText.trim() && selectedCustomerId) {
      toast('Message sent!', 'success')
      setInputText('')
    }
  }

  const handleSendReminder = (type: string) => {
    toast(`${type} reminder sent to customer!`, 'info')
  }

  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-navy-900 dark:text-white">Messages & Notifications</h1>
        <p className="text-sm text-navy-400 mt-1">Communicate with customers and send reminders</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversation List */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="px-4 pb-3">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search customers..."
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-navy-200 dark:border-navy-700 bg-white dark:bg-navy-800 text-navy-900 dark:text-navy-100 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-400/50 transition-all"
                />
              </div>
            </div>
            <div className="max-h-[400px] overflow-y-auto">
              {customerList.map((c) => {
                const lastMsg = messages.filter((m) => m.customerId === c.id).slice(-1)[0]
                const unread = messages.filter((m) => m.customerId === c.id && !m.read).length
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCustomerId(c.id)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 hover:bg-navy-50 dark:hover:bg-navy-800/50 transition-colors cursor-pointer text-left border-b border-navy-50 dark:border-navy-800/50',
                      selectedCustomerId === c.id && 'bg-gold-50 dark:bg-gold-950/20'
                    )}
                  >
                    <Avatar name={c.name} color={c.avatarColor} size="md" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-navy-800 dark:text-navy-100 truncate">{c.name}</p>
                      <p className="text-xs text-navy-400 truncate">{lastMsg?.text}</p>
                    </div>
                    {unread > 0 && (
                      <span className="text-xs px-1.5 py-0.5 rounded-full bg-red-500 text-white font-bold">
                        {unread}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <div className="lg:col-span-2">
          {!selectedCustomer ? (
            <Card className="h-full">
              <EmptyState
                icon={<MessageSquare size={28} />}
                title="Select a conversation"
                description="Choose a customer from the list to view your conversation."
              />
            </Card>
          ) : (
            <Card className="flex flex-col h-[600px]">
              {/* Chat Header */}
              <div className="flex items-center gap-3 px-5 py-3 border-b border-navy-100 dark:border-navy-800">
                <Avatar name={selectedCustomer.name} color={selectedCustomer.avatarColor} size="md" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-navy-800 dark:text-navy-100">{selectedCustomer.name}</p>
                  <p className="text-xs text-green-500 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Online
                  </p>
                </div>
                <button className="text-navy-400 hover:text-navy-600 dark:hover:text-navy-200 p-2 rounded-lg hover:bg-navy-50 dark:hover:bg-navy-800 cursor-pointer">
                  <Phone size={16} />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-navy-50/50 dark:bg-navy-950/30">
                {conversation.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      'flex gap-2 max-w-[80%]',
                      msg.sentBy === 'shop' ? 'ml-auto flex-row-reverse' : ''
                    )}
                  >
                    {msg.sentBy === 'customer' && (
                      <Avatar name={selectedCustomer.name} color={selectedCustomer.avatarColor} size="sm" />
                    )}
                    <div
                      className={cn(
                        'rounded-2xl px-4 py-2',
                        msg.sentBy === 'shop'
                          ? 'bg-gold-500 text-white rounded-tr-sm'
                          : 'bg-white dark:bg-navy-800 text-navy-800 dark:text-navy-100 rounded-tl-sm border border-navy-100 dark:border-navy-700'
                      )}
                    >
                      {msg.type === 'notification' && (
                        <p className="text-xs mb-1 opacity-70 flex items-center gap-1">
                          <Bell size={10} /> Notification
                        </p>
                      )}
                      <p className="text-sm">{msg.text}</p>
                      <p className={cn(
                        'text-[10px] mt-1',
                        msg.sentBy === 'shop' ? 'text-white/70' : 'text-navy-400'
                      )}>
                        {new Date(msg.timestamp).toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' })}
                        {msg.sentBy === 'shop' && <CheckCheck size={10} className="inline ml-1" />}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="px-4 py-2 border-t border-navy-100 dark:border-navy-800 flex gap-2 flex-wrap">
                <button
                  onClick={() => handleSendReminder('Trial')}
                  className="text-xs px-3 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Calendar size={12} /> Trial Reminder
                </button>
                <button
                  onClick={() => handleSendReminder('Delivery')}
                  className="text-xs px-3 py-1 rounded-lg bg-teal-50 dark:bg-teal-950/30 text-teal-700 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900/40 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Clock size={12} /> Delivery Reminder
                </button>
                <button
                  onClick={() => handleSendReminder('Measurement Confirmation')}
                  className="text-xs px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <CheckCheck size={12} /> Confirm Measurements
                </button>
              </div>

              {/* Input */}
              <div className="flex items-center gap-2 px-4 py-3 border-t border-navy-100 dark:border-navy-800">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1 rounded-lg border border-navy-200 dark:border-navy-700 bg-white dark:bg-navy-800 px-3 py-2 text-sm text-navy-900 dark:text-navy-100 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-400/50 transition-all"
                />
                <Button variant="primary" size="sm" onClick={handleSend} disabled={!inputText.trim()}>
                  <Send size={16} />
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Notifications Panel */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
          <Bell size={16} className="text-navy-400" />
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-navy-50 dark:divide-navy-800/50">
            {notifications.map((notif) => {
              const customer = customers.find((c) => c.id === notif.customerId)
              return (
                <div
                  key={notif.id}
                  className={cn(
                    'flex items-center gap-3 px-5 py-3 hover:bg-navy-50 dark:hover:bg-navy-800/30 transition-colors',
                    !notif.read && 'bg-gold-50/50 dark:bg-gold-950/10'
                  )}
                >
                  <Avatar name={notif.customerName} color={customer?.avatarColor} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-navy-800 dark:text-navy-100">
                      <span className="font-medium">{notif.customerName}</span>
                      <span className="text-navy-400"> — {notif.text}</span>
                    </p>
                    <p className="text-xs text-navy-400 mt-0.5">
                      {new Date(notif.timestamp).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {!notif.read && (
                    <span className="h-2 w-2 rounded-full bg-gold-500 shrink-0" />
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
