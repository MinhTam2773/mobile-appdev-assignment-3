import { db } from "@/lib/firebase";
import { router } from "expo-router";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Mock Data
const mockPlaylists = [
  { id: 1, title: "Chill Vibes", songs: 35 },
  { id: 2, title: "Top Hits 2024", songs: 50 },
  { id: 3, title: "Focus & Study", songs: 28 },
];

const mockRecommended = [
  { id: 1, artist: "Lana Del Rey", song: "Candy Necklace" },
  { id: 2, artist: "The Weekend", song: "Blinding Lights" },
  { id: 3, artist: "Joji", song: "Glimpse of Us" },
];

export default function HomePage() {
  const auth = getAuth();
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        router.push("/sign-in");
      } else {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("uid", "==", firebaseUser.uid));

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.log("user not found")
          router.push("/sign-in");
        } else {
          setName(querySnapshot.docs[0].data().name);
        }
      }
    });

    return unsubscribe;
  }, []);


  const handleLogout = async () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully.");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <View>
          <Text> </Text>
        </View>
        <Text style={styles.header}>Welcome Back {name}🎧</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logout}>
          <Text style={{ fontWeight: "600" }}>Log out</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>Your music. Your vibe.</Text>

      {/* Playlist Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Playlists</Text>

        {mockPlaylists.map((p) => (
          <TouchableOpacity key={p.id} style={styles.card}>
            <Text style={styles.cardTitle}>{p.title}</Text>
            <Text style={styles.cardSubtitle}>{p.songs} songs</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Recommended Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommended For You</Text>

        {mockRecommended.map((r) => (
          <View key={r.id} style={styles.card}>
            <Text style={styles.cardTitle}>{r.song}</Text>
            <Text style={styles.cardSubtitle}>{r.artist}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f3f4f6",
    padding: 20,
    alignItems: "center",
  },
  logout: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
  header: {
    fontSize: 30,
    fontWeight: "700",
    marginTop: 10,
    color: "#111827",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  subtitle: {
    color: "#6b7280",
    marginBottom: 20,
    fontSize: 15,
  },
  section: {
    width: "100%",
    maxWidth: 460,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    color: "#111827",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e6e6e9",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#111827",
  },
  cardSubtitle: {
    color: "#6b7280",
    marginTop: 2,
  },
});
