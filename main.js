'use strict';

//import AddingTaskForm from './blocks/adding_task_bar/adding_task';

let data = [{name: "Hello",
			state: {
				importent: true,
				urgently: false,
				done: false
			}
	}]; //все задачи хранятся здесь

//создаем модуль для обработки формы
var addingTaskForm = new AddingTaskForm({
	elem: document.querySelector('.addingTask_form')
});

//создаем модуль для задачь
var renderTasks = new RenderTasks({
	data: data,
	elem: document.querySelector('.tasks .container')
});

//добавляем новую задачу
addingTaskForm.elem.addEventListener('add', function(event) {
		renderTasks.addTask(event.detail);
		renderTasks.sort(renderTasks.data);
		renderTasks.render(renderTasks.data);

});

//Удаляем задачу
renderTasks.elem.addEventListener('delete', function(event) {
	renderTasks.deleteTask(event.detail);
});

//Меняем состоянием готовности и переносим выполненную в низ списка
renderTasks.elem.addEventListener('changeState', function (event) {
	renderTasks.changeState(event.detail);
	renderTasks.sort(renderTasks.data);
	renderTasks.render(renderTasks.data);
});