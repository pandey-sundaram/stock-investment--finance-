import { StyleSheet, Text, View } from 'react-native';

export default function StockDetail({ route }) {
  const { stock } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{stock.name} ({stock.symbol})</Text>
      <Text style={styles.price}>Current Price: ₹{stock.price}</Text>
      <Text style={stock.change[0] === '+' ? styles.gain : styles.loss}>
        Change: {stock.change}
      </Text>
      <Text style={styles.details}>
        {/* Add more fields here as needed */}
        Detailed chart, company facts, live API data, etc.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#18181a', padding:30 },
  header: { fontSize:26, color:'#fff', fontWeight:'bold', marginBottom:10 },
  price: { fontSize:22, color:'#81d4fa', marginBottom:8 },
  gain: { color:'#4caf50', fontWeight:'bold', fontSize:18 },
  loss: { color:'#e53935', fontWeight:'bold', fontSize:18 },
  details: { color:'#ccc', fontSize:18, marginTop:20 }
});
