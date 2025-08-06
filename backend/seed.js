const pool = require('./config/db');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

const seedDatabase = async () => {
  try {
    console.log('Начинаем заполнение базы данных моковыми данными...');

    // Очищаем таблицы (в правильном порядке)
    await pool.query('DELETE FROM task_time_logs');
    await pool.query('DELETE FROM task_assignees');
    await pool.query('DELETE FROM tasks');
    await pool.query('DELETE FROM projects');
    await pool.query('DELETE FROM users');

    // 1. Пользователи (10+)
    const hashedPassword = await bcrypt.hash('password123', 10);
    const roles = ['admin', 'user', 'manager'];
    const users = [
      { username: 'admin', email: 'admin@example.com', password: hashedPassword, role: 'admin' },
      { username: 'john_ceo', email: 'john.ceo@company.com', password: hashedPassword, role: 'manager' },
      { username: 'jane_hr', email: 'jane.hr@company.com', password: hashedPassword, role: 'manager' },
      { username: 'mike_dev', email: 'mike.dev@company.com', password: hashedPassword, role: 'user' },
      { username: 'sarah_pm', email: 'sarah.pm@company.com', password: hashedPassword, role: 'manager' },
      { username: 'alex_designer', email: 'alex.designer@company.com', password: hashedPassword, role: 'user' },
      { username: 'olga_tester', email: 'olga.tester@company.com', password: hashedPassword, role: 'user' },
      { username: 'ivan_dev', email: 'ivan.dev@company.com', password: hashedPassword, role: 'user' },
      { username: 'lisa_marketing', email: 'lisa.marketing@company.com', password: hashedPassword, role: 'user' },
      { username: 'peter_support', email: 'peter.support@company.com', password: hashedPassword, role: 'user' },
      { username: 'nina_finance', email: 'nina.finance@company.com', password: hashedPassword, role: 'user' }
    ];
    console.log('Добавляем пользователей...');
    for (const user of users) {
      await pool.query(
        'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
        [user.username, user.email, user.password, user.role]
      );
    }
    const [userRows] = await pool.query('SELECT id, username FROM users');
    const userIds = userRows.map(row => row.id);

    // 2. Проекты (5-7)
    const projects = [
      { name: 'TaskTracker Core', description: 'Backend и бизнес-логика', created_by: userIds[1] },
      { name: 'TaskTracker Frontend', description: 'React SPA', created_by: userIds[3] },
      { name: 'HR Automation', description: 'Автоматизация HR-процессов', created_by: userIds[2] },
      { name: 'Mobile App', description: 'Мобильное приложение для сотрудников', created_by: userIds[4] },
      { name: 'Marketing Website', description: 'Промо-сайт компании', created_by: userIds[8] },
      { name: 'Support Portal', description: 'Портал поддержки клиентов', created_by: userIds[9] }
    ];
    console.log('Добавляем проекты...');
    for (const project of projects) {
      await pool.query(
        'INSERT INTO projects (name, description, created_by) VALUES (?, ?, ?)',
        [project.name, project.description, project.created_by]
      );
    }
    const [projectRows] = await pool.query('SELECT id FROM projects');
    const projectIds = projectRows.map(row => row.id);

    // 3. Задачи (20+), разные статусы, estimated_hours, массивы исполнителей
    const statuses = ['todo', 'in_progress', 'done', 'frozen'];
    const priorities = ['low', 'medium', 'high'];
    const tasks = [];
    for (let i = 0; i < 22; i++) {
      const project_id = faker.random.arrayElement(projectIds);
      const created_by = faker.random.arrayElement(userIds);
      const status = faker.random.arrayElement(statuses);
      const priority = faker.random.arrayElement(priorities);
      const estimated_hours = faker.random.number({ min: 4, max: 40 });
      const due_date = faker.date.between('2024-03-01', '2024-04-30');
      const title = faker.company.bs();
      const description = faker.lorem.sentence();
      tasks.push({
        title,
        description,
        project_id,
        created_by,
        priority,
        status,
        due_date: due_date.toISOString().slice(0, 10),
        estimated_hours
      });
    }
    console.log('Добавляем задачи...');
    for (const task of tasks) {
      await pool.query(
        'INSERT INTO tasks (title, description, project_id, created_by, priority, status, due_date, estimated_hours) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [task.title, task.description, task.project_id, task.created_by, task.priority, task.status, task.due_date, task.estimated_hours]
      );
    }
    const [taskRows] = await pool.query('SELECT id FROM tasks');
    const taskIds = taskRows.map(row => row.id);

    // 4. Назначения исполнителей (2-4 на задачу)
    console.log('Назначаем исполнителей задач...');
    for (const taskId of taskIds) {
      const assignees = faker.helpers.shuffle(userIds).slice(0, faker.random.number({ min: 2, max: 4 }));
      for (const userId of assignees) {
        await pool.query('INSERT INTO task_assignees (task_id, user_id) VALUES (?, ?)', [taskId, userId]);
      }
    }

    // 5. Логи времени (task_time_logs) — для части задач, разные пользователи, даты, комментарии
    console.log('Генерируем логи времени...');
    for (const taskId of taskIds.slice(0, 15)) { // только для части задач
      const days = faker.random.number({ min: 2, max: 6 });
      const assignees = (await pool.query('SELECT user_id FROM task_assignees WHERE task_id = ?', [taskId]))[0].map(r => r.user_id);
      for (let d = 0; d < days; d++) {
        const log_date = faker.date.between('2024-03-01', '2024-04-30').toISOString().slice(0, 10);
        const user_id = faker.random.arrayElement(assignees);
        const hours = faker.random.number({ min: 1, max: 8 });
        const comment = faker.hacker.phrase();
        await pool.query(
          'INSERT INTO task_time_logs (task_id, user_id, log_date, hours, comment) VALUES (?, ?, ?, ?, ?)',
          [taskId, user_id, log_date, hours, comment]
        );
      }
    }

    console.log('✅ База данных успешно заполнена разнообразными моковыми данными!');
    console.log('\n📊 Статистика:');
    console.log(`- Пользователей: ${users.length}`);
    console.log(`- Проектов: ${projects.length}`);
    console.log(`- Задач: ${tasks.length}`);
    console.log(`- Назначений: ~${tasks.length * 3}`);
    console.log(`- Логов времени: ~${15 * 4}`);
    console.log('\n🔑 Тестовые учетные данные:');
    users.slice(0, 5).forEach(u => console.log(`Email: ${u.email}, Password: password123`));

  } catch (error) {
    console.error('❌ Ошибка при заполнении базы данных:', error);
  } finally {
    await pool.end();
  }
};

// Запуск заполнения базы данных
seedDatabase(); 