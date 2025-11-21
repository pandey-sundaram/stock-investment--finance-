import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import StockDetail from './StockDetail';

const stockSymbols = [
  { symbol: "AAPL", name: "Apple Inc." },
  { symbol: "TSLA", name: "Tesla" },
  { symbol: "HDFCBANK.NS", name: "HDFC Bank" } // .NS for NSE-listed stocks
];

// Enter your API key here!
const FINNHUB_API_KEY = d4etdqhr01ql649g293gd4etdqhr01ql649g2940;

function HomeScreen({ navigation }) {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStockData = async () => {
    try {
      const responses = await Promise.all(
        stockSymbols.map(async (s) => {
          let url = `https://finnhub.io/api/v1/quote?symbol=${s.symbol}&token=${FINNHUB_API_KEY}`;
          let resp = await axios.get(url);
          return {
            symbol: s.symbol,
            name: s.name,
            price: resp.data.c,
            prevClose: resp.data.pc,
            change: resp.data.c && resp.data.pc ? ((resp.data.c - resp.data.pc) / resp.data.pc * 100).toFixed(2) : "0.00"
          };
        })
      );
      setStocks(responses);
    } catch (error) {
      Alert.alert("API Error", "Check your API key or internet!");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStockData();
    // Refresh every minute
    const interval = setInterval(fetchStockData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <ActivityIndicator color="#4caf50" size="large" style={{flex:1}} />;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Live Stock Tracker</Text>
      <FlatList
        data={stocks}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('StockDetail', { stock: item })}>
            <Text style={styles.symbol}>{item.symbol}</Text>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>₹{item.price}</Text>
            <Text style={parseFloat(item.change) >= 0 ? styles.gain : styles.loss}>
              {parseFloat(item.change) >= 0 ? "+" : ""}{item.change}%
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.symbol}
      />
      {/* Dummy chart for now, upgrade next! */}
      <Text style={styles.chartHeader}>Sample Price Trend</Text>
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

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="StockDetail" component={StockDetail} options={{ title: 'Stock Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
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
