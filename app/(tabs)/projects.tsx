import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useThemeCustom } from '@/context/theme';
import { useEffect, useState } from 'react';

export default function Projects() {
  const router = useRouter();
  const { theme } = useThemeCustom();

  const isDark = theme === 'dark';
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200);
  }, []);

  // 🎨 Theme colors
  const bg = isDark ? '#020617' : '#f8fafc';
  const card = isDark ? '#0f172a' : '#ffffff';
  const text = isDark ? '#fff' : '#000';
  const sub = isDark ? '#64748b' : '#475569';
  const border = isDark ? '#1e293b' : '#e2e8f0';

  const projects = [
    {
      id: '1',
      title: 'MediSync AI',
      category: 'Health Tech',
      description:
        'AI-powered platform connecting patients with personalized plans.',
      tags: ['Python', 'LLMs', 'React', 'PostgreSQL', 'HIPAA'],
      owner: 'Priya Sharma',
      open: '2 open',
    },
    {
      id: '2',
      title: 'GreenChain',
      category: 'CleanTech',
      description:
        'Blockchain-based carbon credit marketplace.',
      tags: ['Solidity', 'React', 'Node.js', 'Web3'],
      owner: 'Kai Thompson',
      open: '2 open',
    },
  ];

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
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <Text style={[styles.title, { color: text }]}>Projects</Text>
        <Text style={[styles.subtitle, { color: sub }]}>
          5 active hackathon projects
        </Text>

        {/* FILTERS */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['All', 'Health Tech', 'CleanTech', 'Developer Tools'].map((item, i) => (
            <View
              key={i}
              style={[
                i === 0 ? styles.activeFilter : styles.filter,
                { backgroundColor: i === 0 ? '#0ea5e9' : card },
              ]}
            >
              <Text style={{ color: i === 0 ? '#020617' : text }}>
                {item}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* PROJECT CARDS */}
        {projects.map((p) => (
          <TouchableOpacity
            key={p.id}
            style={[styles.card, { backgroundColor: card, borderColor: border }]}
            onPress={() =>
              router.push({
                pathname: '/project/[id]',
                params: { id: p.id },
              })
            }
            activeOpacity={0.85}
          >
            {/* TOP */}
            <View style={styles.tagRow}>
              <View style={styles.categoryPill}>
                <Text style={styles.category}>{p.category}</Text>
              </View>

              <View style={styles.hotRow}>
                <Ionicons name="trending-up" size={12} color="#38bdf8" />
                <Text style={styles.hot}> Hot</Text>
              </View>
            </View>

            {/* TITLE */}
            <Text style={[styles.projectTitle, { color: text }]}>
              {p.title}
            </Text>

            {/* DESC */}
            <Text style={[styles.desc, { color: sub }]}>
              {p.description}
            </Text>

            {/* TAGS */}
            <View style={styles.tags}>
              {p.tags.map((t, i) => (
                <Text key={i} style={styles.tag}>{t}</Text>
              ))}
            </View>

            {/* FOOTER */}
            <View style={styles.footer}>
              <View style={styles.ownerRow}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {p.owner.split(' ')[0][0] +
                      p.owner.split(' ')[1][0]}
                  </Text>
                </View>
                <Text style={[styles.owner, { color: sub }]}>
                  {p.owner}
                </Text>
              </View>

              <View style={styles.open}>
                <Ionicons name="people" size={12} color="#edf1eeff" />
                <Text style={styles.openText}> {p.open}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
  },

  subtitle: {
    marginBottom: 15,
  },

  filter: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },

  activeFilter: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },

  card: {
    padding: 16,
    borderRadius: 18,
    marginTop: 15,
    borderWidth: 1,
  },

  tagRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  categoryPill: {
    backgroundColor: '#0de2b1ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },

  category: {
    color: '#f6f8f7ff',
    fontSize: 11,
  },

  hotRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  hot: {
    color: '#38bdf8',
    fontSize: 11,
  },

  projectTitle: {
    fontSize: 18,
    marginTop: 8,
    fontWeight: '700',
  },

  desc: {
    fontSize: 13,
    marginTop: 6,
  },

  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },

  tag: {
    backgroundColor: '#1135d2ff',
    color: '#e8eff1ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginRight: 6,
    marginBottom: 6,
    fontSize: 10,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },

  ownerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 28,
    height: 28,
    borderRadius: 20,
    backgroundColor: '#1e293b',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },

  avatarText: {
    color: '#e9f2f5ff',
    fontSize: 12,
    fontWeight: '700',
  },

  owner: {
    fontSize: 13,
  },

  open: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0ceeb9ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },

  openText: {
    color: '#f2f6f3ff',
    fontSize: 12,
  },

  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#0ea5e9',
    width: 62,
    height: 62,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  skeletonCard: {
    height: 120,
    borderRadius: 18,
    marginBottom: 12,
  },
});