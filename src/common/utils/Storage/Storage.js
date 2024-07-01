import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItem = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log("Error storing data:", error);
  }
};

export const getItem = async (key) => {
  try {
    val = await AsyncStorage.getItem(key);
  } catch (error) {
    console.log("Error retrieving data:", error);
  }
  return val;
};

export const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log("Item removed successfully.");
  } catch (error) {
    console.log("Error removing item:", error);
  }
};
