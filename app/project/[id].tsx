import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useThemeCustom } from '@/context/theme';
import { useEffect, useState } from 'react';

export default function ProjectDetail() {
  const router = useRouter();
  const { theme } = useThemeCustom();

  const isDark = theme === 'dark';
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200);
  }, []);

  // 🎨 THEME COLORS
  const bg = isDark ? '#020617' : '#f8fafc';
  const card = isDark ? '#0f172a' : '#ffffff';
  const text = isDark ? '#fff' : '#000';
  const sub = isDark ? '#64748b' : '#475569';
  const border = isDark ? '#1e293b' : '#e2e8f0';

  // 🧱 SKELETON
  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: bg }]}>
        {[1, 2, 3, 4].map((_, i) => (
          <View key={i} style={[styles.skeletonCard, { backgroundColor: card }]} />
        ))}
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>

      {/* BACK */}
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={22} color={text} />
      </TouchableOpacity>

      {/* TITLE */}
      <Text style={[styles.category, { color: '#38bdf8' }]}>
        Health Tech
      </Text>

      <Text style={[styles.title, { color: text }]}>
        MediSync AI
      </Text>

      <View style={styles.metaRow}>
        <Text style={[styles.meta, { color: sub }]}>
          ⏱ 2 days ago
        </Text>

        <Text style={styles.trending}>
          ↗ Trending
        </Text>
      </View>

      {/* ABOUT */}
      <View style={[styles.card, { backgroundColor: card, borderColor: border }]}>
        <Text style={[styles.section, { color: sub }]}>ABOUT</Text>

        <Text style={[styles.text, { color: text }]}>
          AI-powered platform connecting patients with personalized plans using LLMs.
        </Text>
      </View>

      {/* PROGRESS */}
      <View style={[styles.card, { backgroundColor: card, borderColor: border }]}>
        <Text style={[styles.section, { color: sub }]}>
          TEAM PROGRESS
        </Text>

        <Text style={[styles.big, { color: text }]}>2/4</Text>

        <Text style={[styles.small, { color: sub }]}>
          2 spots remaining
        </Text>
      </View>

      {/* SKILLS */}
      <View style={[styles.card, { backgroundColor: card, borderColor: border }]}>
        <Text style={[styles.section, { color: sub }]}>
          SKILLS NEEDED
        </Text>

        <View style={styles.tags}>
          {['Python', 'LLMs', 'React', 'PostgreSQL', 'HIPAA'].map((t, i) => (
            <Text
              key={i}
              style={[
                styles.tag,
                {
                  backgroundColor: isDark ? '#020617' : '#e2e8f0',
                  color: '#38bdf8',
                },
              ]}
            >
              {t}
            </Text>
          ))}
        </View>
      </View>

      {/* CTA */}
      <TouchableOpacity style={styles.button} activeOpacity={0.85}>
        <Text style={styles.buttonText}>Request to Join</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  category: {
    marginTop: 20,
    fontSize: 13,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
  },

  metaRow: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },

  meta: {
    fontSize: 12,
  },

  trending: {
    color: '#38bdf8',
    fontSize: 12,
  },

  card: {
    padding: 16,
    borderRadius: 16,
    marginTop: 15,
    borderWidth: 1,
  },

  section: {
    fontSize: 12,
  },

  text: {
    marginTop: 6,
    fontSize: 13,
    lineHeight: 18,
  },

  big: {
    fontSize: 22,
    marginTop: 6,
    fontWeight: '700',
  },

  small: {
    fontSize: 12,
  },

  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },

  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginRight: 6,
    marginBottom: 6,
    fontSize: 10,
  },

  button: {
    marginTop: 'auto',
    backgroundColor: '#0ea5e9',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
  },

  buttonText: {
    color: '#020617',
    fontWeight: '700',
  },

  // 🧱 skeleton
  skeletonCard: {
    height: 80,
    borderRadius: 16,
    marginBottom: 12,
  },
});