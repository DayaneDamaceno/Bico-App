import { ReactNode, SetStateAction, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, TextInput, FlatList } from "react-native";
import axios from "axios";
import Busca from "./components/Busca";



export default function App() {
  return(
    <Busca/>
  );
}
