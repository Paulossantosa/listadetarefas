// Espera todo o conteúdo da página ser carregado para executar o script
document.addEventListener('DOMContentLoaded', () => {

    // --- Seleção dos Elementos do HTML ---
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const dateDisplay = document.getElementById('date-display');
    const timeDisplay = document.getElementById('time-display');
    const quoteDisplay = document.getElementById('quote-display');

    // --- Funcionalidade de Data e Hora ---
    const updateDateTime = () => {
        const now = new Date();
        // Formata a data para o padrão brasileiro (dia/mês/ano)
        dateDisplay.textContent = now.toLocaleDateString('pt-BR');
        // Formata a hora para o padrão brasileiro (hora:minuto:segundo)
        timeDisplay.textContent = now.toLocaleTimeString('pt-BR');
    };

    // --- Funcionalidade de Frase Inspiradora ---
    const quotes = [
        "Comece onde você está. Use o que você tem. Faça o que você pode.",
        "O segredo para progredir é começar.",
        "Acredite que você pode, assim você já está no meio do caminho.",
        "Um passo de cada vez. Você consegue!",
        "A disciplina é a ponte entre metas e realizações."
    ];

    const displayRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteDisplay.textContent = `"${quotes[randomIndex]}"`;
    };

    // --- Funcionalidades da Lista de Tarefas ---

    // Carrega as tarefas do Armazenamento Local (localStorage)
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => createTaskElement(task.text, task.completed));
    };

    // Salva o estado atual de todas as tarefas no localStorage
    const saveTasks = () => {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(li => {
            tasks.push({
                text: li.querySelector('.task-text').textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Cria um novo item de tarefa na tela
    const createTaskElement = (taskText, isCompleted = false) => {
        const li = document.createElement('li');

        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        taskSpan.className = 'task-text';

        if (isCompleted) {
            li.classList.add('completed');
        }

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '×';
        deleteBtn.className = 'delete-btn';

        li.appendChild(taskSpan);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    };

    // --- Event Listeners (Ouvintes de Eventos) ---

    // Envio do formulário para adicionar nova tarefa
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            createTaskElement(taskText);
            saveTasks();
            taskInput.value = '';
            taskInput.focus();
        }
    });

    // Clique na lista para marcar como concluída ou deletar
    taskList.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI' || e.target.classList.contains('task-text')) {
            const li = e.target.closest('li');
            li.classList.toggle('completed');
        } else if (e.target.classList.contains('delete-btn')) {
            const li = e.target.closest('li');
            li.remove();
        }

        saveTasks();
    });

    // --- Inicialização das Funções ---

    // Atualiza a hora a cada segundo (1000 milissegundos)
    setInterval(updateDateTime, 1000);
    // Chama a função uma vez no início para não haver atraso
    updateDateTime();
    // Mostra uma frase aleatória ao carregar a página
    displayRandomQuote();
    // Carrega as tarefas salvas
    loadTasks();
});