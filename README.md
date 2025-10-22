# de Anotações em React Native

Este é um aplicativo simples, criado com React Native e Expo, para demonstrar os conceitos fundamentais da aula de "Componentes, Estado e Validação".

# Funcionalidades

O aplicativo possui uma interface com duas abas principais:

Criar Nota: Uma tela onde o usuário pode digitar uma nova anotação em um campo de texto de múltiplas linhas e salvá-la.

Ver Notas: Uma tela que exibe uma lista de todas as anotações que foram salvas.

# Tecnologias e Conceitos Aplicados

Este projeto foi construído para exemplificar o uso de:

Componentes Funcionais: A estrutura do app é toda baseada em componentes funcionais.

Hook useState: Utilizado para gerenciar dois estados principais:

O controle da aba ativa (qual tela está sendo exibida).

O armazenamento do array de notas salvas.

Componente TextInput: Para a captura de texto do usuário, configurado com a propriedade multiline para permitir anotações mais longas.

Componente TouchableOpacity: Usado para criar botões interativos com feedback visual de opacidade ao serem pressionados.

Props: Para a comunicação entre componentes. Por exemplo, a função de salvar nota é passada do componente App para o CreateNoteTab.

Renderização Condicional: Para exibir a tela correta com base na aba que está ativa.

Função .map(): Para renderizar dinamicamente a lista de notas salvas.

StyleSheet: Para a estilização básica da interface.

# Como Executar o Projeto

Pré-requisitos

Node.js e npm/yarn instalados.

Expo Go instalado em seu dispositivo móvel (Android ou iOS) ou um emulador configurado.

Passos

Clone o repositório ou salve o arquivo App.js em um novo projeto Expo.

npx create-expo-app meu-app-de-notas
cd meu-app-de-notas
# Substitua o conteúdo do App.js pelo código fornecido


Instale as dependências (se estiver criando um novo projeto, o Expo já cuida disso).

npm install


Inicie o servidor de desenvolvimento.

npx expo start


Abra o app: Escaneie o QR code exibido no terminal com o aplicativo Expo Go no seu celular.