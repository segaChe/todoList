'use strict';
/**
 * @class Для работы с задачами: рендеринг, удаление, добавление
 */
class RenderTasks {
	/**
	 * [constructor description]
	 * @param  {Array} options options.data - массив с задачами
	 * @param  {HTMLElement}    options.elem - елемент страницы, контейнер для задач
	 */
	constructor (options) {
		this.data = options.data;
		this.elem = options.elem;

		this.render(this.data);
		this.initEvents('click', this._click);
	}

	initEvents (nameEvent, handler) {
		this.elem.addEventListener(nameEvent, handler.bind(this));
	}

	/**
	 * Выводим на страницу все задачи
	 * @param  {Array} data Массив задач
	 */
	render (data) {
		this.data = data;
		this.elem.innerHTML = '';

		if (this.data.length) {
			for (let i = 0; i < this.data.length; i++) {
				this.renderTask(this.data[i], i);
			}
		}
	}

	/**
	 * Создаем DOM для одной задачи
	 * @param  {object} data данные одной задачи
	 */
	renderTask (data, i) {
		let iter = '' + i;
		let task = document.createElement('div');
		task.classList.add('oneTask');
		task.setAttribute('data-index', iter);

		task.innerHTML = `
				<div class="not" data-importent="${data.state.importent}" 
				 data-done="${data.state.done}">
					<canvas id="canvas`+ iter +`"
					 width="40px" height="40px" class="stateImg">
					</canvas>
				</div> 
				<div class="not" data-urgently="${data.state.urgently}">
					${data.name}
				</div>
				<div class="close">&#215;</div>`;

		this.elem.appendChild(task);

		this.draw(data.state, 'canvas' + iter);
	}

	addTask (task) {
		this.data.push(task);
	}

	deleteTask (elem) {
		let indexTask = parseInt(elem.parentNode.dataset.index, 10);

		this.data = this.data.filter((elem, index) => {
			return index !== indexTask;
		});

		this.render(this.data);
	}

	changeState (elem) {
		let indexTask = parseInt(elem.parentNode.dataset.index, 10);

		for (let i = 0; i < this.data.length; i++) {
			if ( i === indexTask) {
				this.data[i].state.done = true;
			}
		}

		this.render(this.data);
	}

	sort (data) {
		data.sort(function(a, b) {
			if (a.state.done > b.state.done) return 1;
			if (a.state.done < b.state.done) return -1;
		});
	}

	_click (event) {
		let target = event.target;

		if ( target.classList.contains('not') ) {
		 	this.trigger('changeState', target);
		 }

		if ( target.classList.contains('close') ) {
			
			this.trigger('delete', target);
		}
	}

	/**
	 * [trigger description]
	 * @param  {String} name Имя создоваемого события
	 * @param  {HTMLElement} data элемент на котором произошло событие 
	 */
	trigger (name, data) {
		let widgetEvent = new CustomEvent(name, {
			bubbles: true,
			detail: data
		});
		this.elem.dispatchEvent(widgetEvent);
	}

	/**
	 * отрисовка состояния задачи 
	 * @param  {object} state состояния задачи
	 * @param {String} selectror Селектор элемента canvas
	 */
	draw(state, selector) {
		var canvas = document.getElementById(selector);
		var ctx;
		if (canvas.getContext){
        	ctx = canvas.getContext('2d');
    	}

    	if (state.done) {
    		//Галочка
    		ctx.beginPath();
			ctx.moveTo(10, 15);
			ctx.lineTo(10, 25);
			ctx.lineTo(20, 35);
			ctx.lineTo(35, 15);
			ctx.lineTo(35,5);
			ctx.lineTo(20, 25);
			ctx.fill();
    	} else if (state.importent) {
    		//восклицательный знак
			ctx.fillStyle = "#731000";
    		ctx.beginPath();
    		ctx.arc(20, 32, 5, 0, 2*Math.PI, true);
    		ctx.fill();
    		ctx.closePath();
    		ctx.beginPath();
    		ctx.moveTo(15, 4);
    		ctx.lineTo(16, 25);
    		ctx.lineTo(24, 25);
    		ctx.lineTo(25, 4);
    		ctx.fill();
    	} else {
			//окошко
    		ctx.fillRect(10, 10, 20, 20);
    		ctx.clearRect(15, 15, 10, 10);
		}
	}

}