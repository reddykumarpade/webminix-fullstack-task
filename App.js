import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch } from 'react-native';
import axios from 'axios';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [dashboard, setDashboard] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://10.0.2.2:8085/api/login', { email, password });
      setMessage(res.data.message);
      if (res.data.status === 'success') {
        const dash = await axios.get('http://10.0.2.2:8085/api/dashboard');
        setDashboard(JSON.parse(dash.data));
      }
    } catch (err) {
      setMessage('Login error');
    }
  };

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <Text style={[styles.heading, darkMode && styles.darkText]}>Login</Text>
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
      <Text style={{ marginTop: 10 }}>{message}</Text>

      {dashboard && (
        <View>
          <Text style={[styles.heading, darkMode && styles.darkText]}>{dashboard.welcome}</Text>
          {dashboard.tasks.map(task => (
            <Text key={task.id} style={darkMode && styles.darkText}>- {task.title}</Text>
          ))}
        </View>
      )}

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
        <Text style={darkMode && styles.darkText}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  input: { borderWidth: 1, marginVertical: 8, padding: 8 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  darkContainer: { backgroundColor: '#333', flex: 1 },
  darkText: { color: '#fff' },
});