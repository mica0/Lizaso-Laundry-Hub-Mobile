import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Popup = ({ visible, onClose, service }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.popup}>
          {service && (
            <>
              <Text style={styles.title}>Service: {service.name}</Text>
              <Text style={styles.subtitle}>Location: {service.location}</Text>
            </>
          )}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  popup: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
    color: "#555",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#4690FF",
    borderRadius: 5,
  },
  closeText: {
    color: "#fff",
  },
});

export default Popup;

// import React, { useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Modal,
//   TouchableOpacity,
//   Animated,
// } from "react-native";

// const Popup = ({ visible, onClose, service }) => {
//   const translateY = useRef(new Animated.Value(300)).current;

//   useEffect(() => {
//     Animated.timing(translateY, {
//       toValue: visible ? 0 : 300,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();
//   }, [visible]);

//   return (
//     <Modal
//       transparent={true}
//       visible={visible}
//       onRequestClose={onClose}
//       animationType="none"
//     >
//       <View style={styles.overlay}>
//         <Animated.View style={[styles.popup, { transform: [{ translateY }] }]}>
//           <View style={styles.content}>
//             <Text style={styles.serviceText}>Service: {service}</Text>
//             <TouchableOpacity onPress={onClose} style={styles.closeButton}>
//               <Text style={styles.closeButtonText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </Animated.View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     justifyContent: "flex-end",
//     backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
//   },
//   popup: {
//     backgroundColor: "#fff",
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//     padding: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: -2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   content: {
//     alignItems: "center",
//   },
//   serviceText: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   closeButton: {
//     marginTop: 10,
//     padding: 10,
//     backgroundColor: "#ddd",
//     borderRadius: 8,
//   },
//   closeButtonText: {
//     fontSize: 16,
//   },
// });

// export default Popup;
