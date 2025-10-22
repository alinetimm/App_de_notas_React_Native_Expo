import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';

// Componente para a aba "Cadastro"
const RegisterTab = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');

  const handleRegister = () => {
    // Validação simples
    if (!name.trim() || !email.trim() || !dob.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return;
    }
    Alert.alert('Sucesso!', `Usuário ${name} cadastrado com sucesso.`);
    // Limpa os campos após o cadastro
    setName('');
    setEmail('');
    setDob('');
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles.tabContent}>
        <Text style={styles.label}>Nome Completo</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Digite seu nome aqui"
          value={name}
          onChangeText={setName}
          keyboardType="default" // Teclado padrão
        />

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.textInput}
          placeholder="seu.email@exemplo.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address" // Teclado otimizado para e-mail
          autoCapitalize="none"
        />

        <Text style={styles.label}>Data de Nascimento</Text>
        <TextInput
          style={styles.textInput}
          placeholder="DD/MM/AAAA"
          value={dob}
          onChangeText={setDob}
          keyboardType="numeric" // Teclado apenas numérico
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};


// Componente para a aba "Criar Nota"
const CreateNoteTab = ({ onSaveNote }) => {
  const [currentNote, setCurrentNote] = useState('');

  const handleSave = () => {
    // Validação simples: não salvar nota vazia
    if (currentNote.trim() === '') {
      Alert.alert('Atenção', 'Por favor, escreva algo na nota antes de salvar.');
      return;
    }
    onSaveNote(currentNote);
    setCurrentNote(''); // Limpa o campo após salvar
    Keyboard.dismiss(); // Fecha o teclado
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.tabContent}>
        <Text style={styles.label}>O que você está pensando?</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Digite sua nota aqui..."
          value={currentNote}
          onChangeText={setCurrentNote}
          multiline={true} // Permite múltiplas linhas
        />
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Salvar Anotação</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

// Componente para a aba "Ver Notas"
const ViewNotesTab = ({ notes }) => {
  return (
    <View style={styles.tabContent}>
      <ScrollView>
        {notes.length === 0 ? (
          <Text style={styles.emptyNotesText}>Nenhuma nota salva ainda.</Text>
        ) : (
          notes.map((note, index) => (
            <View key={index} style={styles.noteCard}>
              <Text style={styles.noteText}>{note}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};


export default function App() {
  // Estado para controlar qual aba está ativa ('register', 'create' ou 'view')
  const [activeTab, setActiveTab] = useState('register');
  // Estado para armazenar o array de notas salvas
  const [savedNotes, setSavedNotes] = useState([]);

  // Função para adicionar a nova nota ao array de notas
  const handleSaveNote = (newNote) => {
    // Usando a sintaxe de spread para adicionar a nova nota
    setSavedNotes([...savedNotes, newNote]);
    // Muda para a aba de visualização após salvar a nota
    setActiveTab('view');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meu Bloco de Notas</Text>
      </View>

      {/* Navegação entre abas */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'register' && styles.activeTab]}
          onPress={() => setActiveTab('register')}
        >
          <Text style={styles.tabText}>Cadastro</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'create' && styles.activeTab]}
          onPress={() => setActiveTab('create')}
        >
          <Text style={styles.tabText}>Criar Nota</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'view' && styles.activeTab]}
          onPress={() => setActiveTab('view')}
        >
          <Text style={styles.tabText}>Ver Notas</Text>
        </TouchableOpacity>
      </View>

      {/* Renderização condicional do conteúdo da aba */}
      {activeTab === 'register' ? (
          <RegisterTab />
        ) : activeTab === 'create' ? (
          <CreateNoteTab onSaveNote={handleSaveNote} />
        ) : (
          <ViewNotesTab notes={savedNotes} />
        )
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#944b84ff',
  },
  header: {
    backgroundColor: '#97297fff',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#b13cffff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1f1f1f',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#007AFF',
  },
  tabText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  tabContent: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    color: '#eee',
    marginBottom: 10,
    marginTop: 10,
  },
  textInput: {
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    minHeight: 50,
    textAlignVertical: 'top', 
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyNotesText: {
    color: '#888',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  },
  noteCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  noteText: {
    color: '#fff',
    fontSize: 16,
  },
});
