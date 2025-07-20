const pool = require('./config/db');
const bcrypt = require('bcryptjs');

const seedDatabase = async () => {
  try {
    console.log('Начинаем заполнение базы данных моковыми данными...');

    // Очищаем таблицы (сначала tasks, потом projects, потом users)
    await pool.query('DELETE FROM tasks');
    await pool.query('DELETE FROM projects');
    await pool.query('DELETE FROM users');

    // Создание пользователей
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const users = [
      { username: 'admin', email: 'admin@example.com', password: hashedPassword },
      { username: 'john_doe', email: 'john@example.com', password: hashedPassword },
      { username: 'jane_smith', email: 'jane@example.com', password: hashedPassword },
      { username: 'mike_wilson', email: 'mike@example.com', password: hashedPassword },
      { username: 'sarah_jones', email: 'sarah@example.com', password: hashedPassword }
    ];

    console.log('Добавляем пользователей...');
    for (const user of users) {
      await pool.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [user.username, user.email, user.password]
      );
    }

    // Получаем ID пользователей для создания проектов и задач
    const [userRows] = await pool.query('SELECT id FROM users');
    const userIds = userRows.map(row => row.id);

    // Создание проектов
    const projects = [
      { name: 'Веб-приложение TaskTracker', description: 'Разработка системы управления задачами', created_by: userIds[0] },
      { name: 'Мобильное приложение', description: 'Создание мобильной версии приложения', created_by: userIds[1] },
      { name: 'API документация', description: 'Написание документации для API', created_by: userIds[2] },
      { name: 'Тестирование системы', description: 'Комплексное тестирование всех функций', created_by: userIds[0] },
      { name: 'UI/UX дизайн', description: 'Улучшение пользовательского интерфейса', created_by: userIds[3] }
    ];

    console.log('Добавляем проекты...');
    for (const project of projects) {
      await pool.query(
        'INSERT INTO projects (name, description, created_by) VALUES (?, ?, ?)',
        [project.name, project.description, project.created_by]
      );
    }

    // Получаем ID проектов
    const [projectRows] = await pool.query('SELECT id FROM projects');
    const projectIds = projectRows.map(row => row.id);

    // Создание задач
    const tasks = [
      {
        title: 'Настройка базы данных',
        description: 'Создать схему базы данных и настроить подключение',
        project_id: projectIds[0],
        created_by: userIds[0],
        assigned_to: userIds[1],
        priority: 'high',
        status: 'in_progress',
        due_date: '2024-02-15'
      },
      {
        title: 'Создание API endpoints',
        description: 'Реализовать основные API endpoints для CRUD операций',
        project_id: projectIds[0],
        created_by: userIds[0],
        assigned_to: userIds[2],
        priority: 'high',
        status: 'todo',
        due_date: '2024-02-20'
      },
      {
        title: 'Аутентификация пользователей',
        description: 'Реализовать систему регистрации и входа',
        project_id: projectIds[0],
        created_by: userIds[0],
        assigned_to: userIds[3],
        priority: 'medium',
        status: 'done',
        due_date: '2024-02-10'
      },
      {
        title: 'Фронтенд компоненты',
        description: 'Создать React компоненты для интерфейса',
        project_id: projectIds[1],
        created_by: userIds[1],
        assigned_to: userIds[4],
        priority: 'medium',
        status: 'in_progress',
        due_date: '2024-02-25'
      },
      {
        title: 'Настройка навигации',
        description: 'Реализовать роутинг и навигацию в приложении',
        project_id: projectIds[1],
        created_by: userIds[1],
        assigned_to: userIds[0],
        priority: 'low',
        status: 'todo',
        due_date: '2024-03-01'
      },
      {
        title: 'Написание README',
        description: 'Создать подробную документацию проекта',
        project_id: projectIds[2],
        created_by: userIds[2],
        assigned_to: userIds[2],
        priority: 'medium',
        status: 'done',
        due_date: '2024-02-12'
      },
      {
        title: 'Примеры использования API',
        description: 'Создать примеры запросов и ответов',
        project_id: projectIds[2],
        created_by: userIds[2],
        assigned_to: userIds[1],
        priority: 'low',
        status: 'todo',
        due_date: '2024-02-28'
      },
      {
        title: 'Unit тесты',
        description: 'Написать unit тесты для всех функций',
        project_id: projectIds[3],
        created_by: userIds[0],
        assigned_to: userIds[4],
        priority: 'high',
        status: 'in_progress',
        due_date: '2024-02-18'
      },
      {
        title: 'Integration тесты',
        description: 'Создать integration тесты для API',
        project_id: projectIds[3],
        created_by: userIds[0],
        assigned_to: userIds[2],
        priority: 'medium',
        status: 'todo',
        due_date: '2024-02-22'
      },
      {
        title: 'Дизайн главной страницы',
        description: 'Создать макет главной страницы приложения',
        project_id: projectIds[4],
        created_by: userIds[3],
        assigned_to: userIds[3],
        priority: 'high',
        status: 'done',
        due_date: '2024-02-08'
      },
      {
        title: 'Адаптивный дизайн',
        description: 'Обеспечить корректное отображение на мобильных устройствах',
        project_id: projectIds[4],
        created_by: userIds[3],
        assigned_to: userIds[4],
        priority: 'medium',
        status: 'in_progress',
        due_date: '2024-02-29'
      }
    ];

    console.log('Добавляем задачи...');
    for (const task of tasks) {
      await pool.query(
        'INSERT INTO tasks (title, description, project_id, created_by, assigned_to, priority, status, due_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [task.title, task.description, task.project_id, task.created_by, task.assigned_to, task.priority, task.status, task.due_date]
      );
    }

    console.log('✅ База данных успешно заполнена моковыми данными!');
    console.log('\n📊 Статистика:');
    console.log(`- Пользователей: ${users.length}`);
    console.log(`- Проектов: ${projects.length}`);
    console.log(`- Задач: ${tasks.length}`);
    
    console.log('\n🔑 Тестовые учетные данные:');
    console.log('Email: admin@example.com, Password: password123');
    console.log('Email: john@example.com, Password: password123');
    console.log('Email: jane@example.com, Password: password123');

  } catch (error) {
    console.error('❌ Ошибка при заполнении базы данных:', error);
  } finally {
    await pool.end();
  }
};

// Запуск заполнения базы данных
seedDatabase(); 