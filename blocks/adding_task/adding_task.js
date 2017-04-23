'use strict';

/**
 *@class [description]
 */
class AddingTaskForm {

	/**
	 * [constructor description]
	 * @param  {[type]} options [description]
	 * @return {[type]}         [description]
	 */
	constructor (options) {
		this.elem = options.elem;
		this.initEvents('submit', this.onSubmit);
	}

	/**
	 * [initEvents description]
	 * @param  {[type]} nameEvent [description]
	 * @param  {[type]} handler   [description]
	 * @return {[type]}           [description]
	 */
	initEvents (nameEvent, handler) {
		this.elem.addEventListener(nameEvent, handler.bind(this));
	}

	/**
	 * Обработчик события - добавляет задачу
	 * @param  {object} event - объект события
	 */
	onSubmit (event) {
		event.preventDefault();

		if ( this.data.name || this.data.description) {
			this.trigger('add', this.data);
		} else {
			this.showNotice('ЗАПОЛНИ это поле');
		}

		event.target.reset();
	}

	/**
	 * [data description]
	 * @return {[type]} [description]
	 */
	get data () {
		let nameTask = document.querySelector('#nameTask');
		let importentTask = document.querySelector('#importentTask');
		let urgentlyTask = document.querySelector('#urgentlyTask'); 

		return {
			name: nameTask.value,
			state: {
				importent: this.checkState(importentTask),
				urgently: this.checkState(urgentlyTask),
				done: false
			}
		};
	}

	checkState (elem) {
			return (elem.checked) ? true : false;
	}

	trigger (name, data) {
		let widgetEvent = new CustomEvent(name, {
			bubbles: true,
			detail: data
		});
		this.elem.dispatchEvent(widgetEvent);
	}

	showNotice (text) {
		let noticeElem = document.querySelector('.notice');
		noticeElem.innerHTML = text;
		noticeElem.style.opacity = 1;

		setTimeout( function () {noticeElem.style.opacity = 0;}, 2200);
	}
}

//export default  AddingTaskForm;