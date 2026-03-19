import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useRef, useEffect } from 'react';
import { useThemeCustom } from '@/context/theme';

export default function AI() {
  const { theme } = useThemeCustom();
  const isDark = theme === 'dark';

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);

  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: "Hi! I'm your AI team-builder. Tell me about your hackathon project and I'll find the perfect teammates for you.",
    },
  ]);

  const scrollRef = useRef<any>(null);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200);
  }, []);

  // 🎨 Theme
  const bg = isDark ? '#020617' : '#f8fafc';
  const card = isDark ? '#0f172a' : '#ffffff';
  const text = isDark ? '#fff' : '#000';
  const sub = isDark ? '#64748b' : '#475569';
  const border = isDark ? '#1e293b' : '#e2e8f0';

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { role: 'user', text: input },
      {
        role: 'bot',
        text: 'Got it! I’ll suggest a perfect team for this 🚀',
      },
    ];

    setMessages(newMessages);
    setInput('');

    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  // 🧱 SKELETON
  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: bg }]}>
        {[1, 2, 3, 4].map((_, i) => (
          <View key={i} style={[styles.skeletonMsg, { backgroundColor: card }]} />
        ))}
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: bg }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* HEADER */}
      <View style={[styles.header, { borderColor: border }]}>
        <View style={styles.left}>
          <View style={[styles.logo, { backgroundColor: card, borderColor: border }]}>
            <Ionicons name="hardware-chip" size={20} color="#06b6d4" />
          </View>

          <View>
            <Text style={[styles.title, { color: text }]}>HackMate AI</Text>
            <Text style={styles.status}>Active</Text>
          </View>
        </View>

        <TouchableOpacity style={[styles.refresh, { backgroundColor: card, borderColor: border }]}>
          <Ionicons name="refresh" size={18} color={sub} />
        </TouchableOpacity>
      </View>

      {/* CHAT */}
      <ScrollView
        ref={scrollRef}
        style={styles.chat}
        contentContainerStyle={{ padding: 18 }}
      >
        {messages.map((msg, i) => (
          <View
            key={i}
            style={[
              styles.messageRow,
              msg.role === 'user' && { justifyContent: 'flex-end' },
            ]}
          >
            {msg.role === 'bot' && (
              <View style={[styles.botIcon, { backgroundColor: card }]}>
                <Ionicons name="hardware-chip" size={14} color="#06b6d4" />
              </View>
            )}

            <View
              style={[
                styles.message,
                {
                  backgroundColor:
                    msg.role === 'user' ? '#0ea5e9' : card,
                  borderColor:
                    msg.role === 'user' ? '#0ea5e9' : border,
                },
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  { color: msg.role === 'user' ? '#020617' : text },
                ]}
              >
                {msg.text}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* INPUT */}
      <View style={[styles.inputBar, { borderColor: border }]}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Ask anything..."
          placeholderTextColor={sub}
          style={[styles.input, { backgroundColor: card, color: text }]}
        />

        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="send" size={18} color="#020617" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 50,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
  },

  status: {
    color: '#22c55e',
    fontSize: 12,
  },

  refresh: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },

  chat: {
    flex: 1,
  },

  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 10,
  },

  botIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },

  message: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    maxWidth: '75%',
  },

  messageText: {
    fontSize: 13,
  },

  inputBar: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    alignItems: 'center',
  },

  input: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    marginRight: 10,
  },

  sendButton: {
    backgroundColor: '#0ea5e9',
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // 🧱 skeleton
  skeletonMsg: {
    height: 50,
    borderRadius: 12,
    marginBottom: 10,
  },
});