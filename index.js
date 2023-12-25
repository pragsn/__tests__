const todoList = () => {
    const all = [];

    const add = (todoItem) => {
        all.push(todoItem);
    };

    const markAsComplete = (index) => {
        if (index >= 0 && index < all.length) {
            all[index].completed = true;
        } else {
            console.log('Invalid index.');
        }
    };

    const overDue = () => {
        const today = new Date();
        return all.filter((todoItem) => !todoItem.completed && new Date(todoItem.dueDate) < today);
    };

    const dueToday = () => {
        const today = new Date();
        return all.filter((todoItem) => !todoItem.completed && isSameDay(new Date(todoItem.dueDate), today));
    };

    const dueLater = () => {
        const today = new Date();
        return all.filter((todoItem) => !todoItem.completed && new Date(todoItem.dueDate) > today);
    };

    const toDisplayableList = (list) => {
        return list.map((todoItem) => {
            const status = todoItem.completed ? '[x]' : '[ ]';
            const formattedDueDate = todoItem.dueDate ? ` ${formattedDate(new Date(todoItem.dueDate))}` : '';
            return `${status} ${todoItem.title}${formattedDueDate}`;
        });
    };

    const formattedDate = (date) => {
        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const isSameDay = (date1, date2) => {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    };

    return {
        all,
        add,
        markAsComplete,
        overDue,
        dueToday,
        dueLater,
        toDisplayableList,
    };
};

// Example usage:
const todos = todoList();
const formattedDate = d => {
    return d.toISOString().split('T')[0]
}
var dateToday = new Date()
const today = formattedDate(dateToday)
const yesterday = formattedDate(new Date(new Date().setDate(dateToday.getDate()-1)))
const tomorrow = formattedDate(new Date(new Date().setDate(dateToday.getDate()+1)))
todos.add({ title: 'Submit assignment', dueDate: yesterday, completed: false });
todos.add({ title: 'Pay rent', dueDate: today, completed: true });
todos.add({ title: 'Service vehicle', dueDate: today, completed: false });
todos.add({ title: 'File taxes', dueDate: tomorrow, completed: false });
todos.add({ title: 'Pay electric bill', dueDate: tomorrow, completed: false });

console.log('My To-Do List\n\n');

console.log('Overdue');
const overdueItems = todos.overDue();
console.log(todos.toDisplayableList(overdueItems));
console.log('\n\n');

console.log('Due Today');
const dueTodayItems = todos.dueToday();
console.log(todos.toDisplayableList(dueTodayItems));
console.log('\n\n');

console.log('Due Later');
const dueLaterItems = todos.dueLater();
console.log(todos.toDisplayableList(dueLaterItems));
console.log('\n\n');
