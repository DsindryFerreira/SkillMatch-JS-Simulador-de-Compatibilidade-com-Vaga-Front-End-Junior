# SkillMatch-JS-Simulador-de-Compatibilidade-com-Vaga-Front-End-Junior

Primeiro mini projeto do curso Front-End React T4. (Carreira Tech do SCTEC)

---

O **SkillMatch** é um programa em JavaScript (Node.js) desenvolvido para simular o funcionamento de um sistema de vagas. O código cria um perfil de candidato com suas habilidades e faz a simulação de compatibilidade com vagas criadas por empresas parceiras, gerando relatórios de match e dicas de estudo.

## 💡 Respostas aos Critérios da Avaliação

### 1. O que o sistema faz e para que serve
O sistema serve para comparar de forma automática as habilidades de um candidato com os requisitos exigidos pelas vagas de emprego. Ele ajuda o profissional a ver a sua porcentagem de match em cada oportunidade e aponta exatamente o que falta estudar para se qualificar.

### 2. Regra de Cálculo da Compatibilidade
A regra adotada faz o cálculo percentual básico (Regra de Três). O algoritmo conta quantos requisitos da vaga o candidato tem (acertos), divide pelo total de requisitos que a vaga pede e multiplica por 100.
- **Por que esta regra:** É uma lógica matemática simples e direta que evita erros. Com base na nota, o sistema usa uma estrutura de `if-else` para classificar o resultado em três faixas: **Alta** (maior ou igual a 80%), **Média** (maior ou igual a 50%) ou **Baixa Compatibilidade** (menor que 50%).

### 3. Critério de Priorização das Habilidades no Plano de Estudos
O plano de estudos usa a função gerarRecomendacaoEstudos com o método `.filter()` para selecionar apenas as vagas onde o condidato não atingiu 100% de compatibilidade.
- **Critério:** O sistema descobre o que está faltando e usa o `.map()` para listar essas habilidades de forma organizada para cada cargo. Isso prioriza o tempo do candidato, mostrando exatamente o que ele precisa focar para preencher os requisitos de cada empresa. 

### 4. Arquitetura Cliente-Servidor no Projeto
A arquitetura cliente-servidor funciona dividindo as tarefas: o Cliente faz os pedidos e mostra os dados, e o Servidor guarda e envia as informações.
- **Como aparece no código:** Criamos uma simulação assíncrona. Na inicialização do programa, o sistema exibe uma mensagem de carregamento e usa uma **Promise** com um atraso de 1,5 segundos (via `setTimeout`) para simular o tempo que um servidor real levaria para responder. O código sa a sintaxe **`async/await`** para esperar esse tempo passar antes de liberar a lista de vagas na tela. 

## Conceitos Aplicados no Código

- **Variáveis (`let` e `const`):** Uso de `const` para valores que não mudam (como o perfil) e `let` para contagens e loops.
- **Estruturas de Decisão (`if-else`):** Usado para classificar as faixas de compatibilidade e para validar o saldo de visualizações.
- **Estrutura de Repetição (`for`):** Loops tradicionais usados para percorrer a lista de vagas e imprimir os resultados.
- **Métodos Modernos de Array:** Uso de **`.filter()`** (para separar vagas incompletas), **`.map()`** (para listar habilidades em falta) e **`.find()`** (para buscar a primeira vaga compatível de Alta Compatibilidade).
- **Programação Orientada a Objetos (POO):** Uso de **Herança (`extends`)** onde a classe `Empresa` herda da classe mãe `Usuario`. A classe `Empresa` foi especializada com o atributo `cidade` e o método `publicarVaga()`, que cria objetos de vagas e os insere no array usando o `.push()`.
- **Uso do `this`:** Utilizado nos construtores das classes para associar os dados a cada objeto criado.
- **Uso do Callback:** Função `processarRelatorio()` que recebe a lista de vagas e uma função por parâmetro (callback) para controlar a exibição dos dados na tela.
- **Uso de Closure:** Função ` limitadorDeVisualizacao` que mantém uma variável interna trancada na memória para controlar o limite de 3 visualizações da vagas para contas gratuitas, sem usar variáveis globais. 

## Extensões Utilizadas no VS Code
Para o desenvolvimento e organização deste projeto, foram utilizadas as seguintes extensões:
1. **Prettier - Code formatter:** Responsável pelo alinhamento e formatação automática do código JavaScript.
2. **Dracula Official:** Tema escuro adotado para melhorar o contraste e a visualização da sintaxe do código.

## Como Executar o Projeto

1. Certifique-se de que você tem o **Node.js** instalado na máquina.
2. Abra o terminal na pasta do projeto e digite:
 ```bash
   node skillmatch.js
   ```

--- 

