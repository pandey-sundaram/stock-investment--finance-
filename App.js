import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const stocks = [
  { symbol: "AAPL", name: "Apple Inc.", price: 175.55, change: "+1.2%" },
  { symbol: "TSLA", name: "Tesla", price: 257.93, change: "-2.1%" },
  { symbol: "HDFCBANK", name: "HDFC Bank", price: 1649.75, change: "+0.9%" }
];

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Stock Tracker</Text>
      <FlatList
        data={stocks}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Text style={styles.symbol}>{item.symbol}</Text>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>₹{item.price}</Text>
            <Text style={item.change[0] === '+' ? styles.gain : styles.loss}>{item.change}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.symbol}
      />
      <Text style={styles.chartHeader}>AAPL Price Trend</Text>
      <LineChart
        data={{
          labels: ["Mon","Tue","Wed","Thu","Fri"],
          datasets: [{ data: [170,172,169,171,175] }]
        }}
        width={360}
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#000428",
          backgroundGradientTo: "#004e92",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255,255,255,${opacity})`,
        }}
        style={{ borderRadius: 16, marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#18181a', padding: 20 },
  header: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  card: { backgroundColor: '#26263b', borderRadius: 12, padding: 18, marginBottom: 8 },
  symbol: { color: '#7cb342', fontSize: 20 },
  name: { color: '#fff', fontSize: 16 },
  price: { color: '#81d4fa', fontSize: 18, marginTop: 8 },
  gain: { color: '#4caf50', fontWeight: 'bold' },
  loss: { color: '#e53935', fontWeight: 'bold' },
  chartHeader: { color: "#fff", fontSize: 14, marginTop: 24 }
});
