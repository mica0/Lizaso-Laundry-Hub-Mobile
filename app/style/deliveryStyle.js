import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import { fonts } from "../../constants/fonts";

export const Styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontFamily: fonts.SemiBold,
    marginBottom: 15,
    color: COLORS.primary,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontFamily: fonts.SemiBold,
    fontSize: 18,
    color: COLORS.primary,
  },
  closeButton: {
    backgroundColor: COLORS.light,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 24,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  firstContainer: {
    padding: 16,
  },
  listContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 15,
  },
  title: {
    fontSize: 32,
    fontFamily: fonts.Bold,
    marginBottom: 16,
    color: "#333",
  },
  itemContainer: {
    padding: 18,
    backgroundColor: COLORS.white,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    width: "100%",
  },
  itemDetails: {
    flexDirection: "column",
    width: "100%",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  customerText: {
    fontSize: 16,
    fontFamily: fonts.Bold,
    color: COLORS.primary,
    marginBottom: 2,
    marginEnd: 10,
  },
  itemText: {
    fontSize: 12,
    fontFamily: fonts.Medium,
    color: COLORS.primary,
    marginBottom: 2,
  },
  locationText: {
    fontSize: 14,
    fontFamily: fonts.SemiBold,
    color: COLORS.secondary,
    marginBottom: 8,
  },
  default_divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 15,
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginBottom: 5,
    width: "100%",
  },
  requestStatusContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  dateContainer: {
    flexDirection: "row",
  },
  statusContainer: {
    flexDirection: "row",
  },
  labelText: {
    fontSize: 12,
    fontFamily: fonts.SemiBold,
    color: COLORS.primary,
  },
  dateText: {
    fontSize: 12,
    fontFamily: fonts.Regular,
    color: COLORS.black,
  },
  statusText: {
    fontSize: 12,
    fontFamily: fonts.Regular,
    color: COLORS.primary,
  },
  tabContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 12,
    gap: 12,
    alignItems: "center",
  },
  tab: {
    flex: 1,
    height: 40,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },

  tabText: {
    fontSize: 15,
    color: COLORS.secondary,
    fontFamily: fonts.SemiBold,
  },

  activeTabText: {
    color: COLORS.white,
  },
  button: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },

  messageButton: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    padding: 5,
  },
  badge: {
    position: "absolute",
    right: -5,
    top: -5,
    backgroundColor: COLORS.message,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },

  // for count
  container_header: {
    flexDirection: "row",
    marginTop: 10,
    paddingHorizontal: 16,
  },
  card: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginRight: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  readyCard: {
    backgroundColor: COLORS.pale_accent, // Light green background
    borderColor: COLORS.accent, // Green border
  },
  ongoingCard: {
    backgroundColor: COLORS.pale_sucess,
    borderColor: COLORS.success,
    marginRight: 0,
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: fonts.SemiBold,
  },
  readyText: {
    color: COLORS.accent,
  },
  ongoingText: {
    color: COLORS.success,
  },
  cardCount: {
    fontSize: 28,
    fontFamily: fonts.Bold,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 20,
    marginBottom: 30,
  },
  finishButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 55,
  },
  finishButtonText: {
    fontFamily: fonts.SemiBold,
    fontSize: 15,
    color: COLORS.white,
  },
  detailsCard: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 25,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: { fontFamily: fonts.Bold, fontSize: 14, color: COLORS.text3 },
  value: { fontFamily: fonts.Medium, fontSize: 14, color: COLORS.primary },
  success: { fontFamily: fonts.Medium, fontSize: 14, color: COLORS.success },
  submitButtonText: {
    color: COLORS.white,
    fontFamily: fonts.Bold,
    fontSize: 16,
  },
});
