import React from "react";
import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";

// ✅ Define styles with proper spacing, alignment, and structure
const styles = StyleSheet.create({
  page: { 
    flexDirection: "row", 
    backgroundColor: "#e0f2fe", 
    padding: 25, 
    justifyContent: "center" 
  },
  card: {
    width: 500, // More width for better spacing
    height: "350", // Let it adjust dynamically
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 5,
    border: "2px solid #0c4a6e",
    alignItems: "center",
  },
  header: {
    backgroundColor: "#0c4a6e",
    color: "white",
    textAlign: "center",
    paddingVertical: 16,
    fontSize: 18,
    fontWeight: "bold",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    width: "100%",
  },
  profileContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  profileImage: {
    width: 100, 
    height: 100,
    borderRadius: 50,
    border: "3px solid #0c4a6e",
  },
  infoContainer: {
    marginTop: 20,
    alignItems: "center",
    display:"flex",
    flexDirection:"column",
    width: "100%",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
    // paddingHorizontal: 10,
  },
  infoTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#1e293b",
    width: "40%",
    textAlign: "center",
  },
  infoText: {
    fontSize: 10,
    color: "#475569",
    width: "55%",
    textAlign: "left",
  },
  footer: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 25, 
    color: "#0c4a6e",
    fontWeight: "bold",
    borderTop: "1px solid #ddd",
    paddingTop: 12,
  },
});

// ✅ ID Card PDF Component (Now fully spaced out properly)
const IDCardPDF = ({ user }) => (
  <Document>
    <Page size="A6" style={styles.page}>
      <View style={styles.card}>
        {/* ✅ Hospital Header */}
        <Text style={styles.header}>SAGE HOSPITAL</Text>

        {/* ✅ Profile Image */}
        <View style={styles.profileContainer}>
          <Image src={user.profileImage || "/default-profile.png"} style={styles.profileImage} />
        </View>

        {/* ✅ User Details (Grid Layout for Better Spacing) */}
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoTitle}>Name:</Text>
            <Text style={styles.infoText}>{user.firstName} {user.lastName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoTitle}>Email:</Text>
            <Text style={styles.infoText}>{user.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoTitle}>Phone:</Text>
            <Text style={styles.infoText}>{user.phone}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoTitle}>Patient ID:</Text>
            <Text style={styles.infoText}>{user.id}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoTitle}>Issued:</Text>
            <Text style={styles.infoText}>{new Date(user.createdAt).toDateString()}</Text>
          </View>
        </View>

        {/* ✅ Footer */}
        <Text style={styles.footer}>Authorized by Sage Hospital</Text>
      </View>
    </Page>
  </Document>
);

export default IDCardPDF;
