'use strict';


class Memory {
	constructor() {
		this.memory = new Float64Array(1024);
		this.head = 0;
	}

	allocate(size) {
		console.log('Enter allocate');
		if (this.head + size > this.memory.length) {
			return null;
		}
		console.log('current head =', this.head);
		let start = this.head;
		console.log('start =', start);
		this.head += size;
		console.log('new head =', this.head);
		return start;
	}

	free(ptr) {}

	copy(toIdx, fromIdx, size) {
		console.log('toIdx = ', toIdx, 'fromIdx = ', fromIdx);
		if (fromIdx === toIdx) {
			return;
		}

		if (fromIdx > toIdx) {
			// Iterate forwards
			for (let i = 0; i < size; i++) {
				console.log('toIdx + i = ', toIdx + i, 'fromIdx + i = ', fromIdx + i);
				this.set(toIdx + i, this.get(fromIdx + i));
			}
		} else {
			// Iterate backwards
			for (let i = size - 1; i >= 0; i--) {
				this.set(toIdx + i, this.get(fromIdx + i));
			}
		}
	}

	get(ptr) {
		return this.memory[ptr];
	}

	set(ptr, value) {
		this.memory[ptr] = value;
	}
}

module.exports = Memory;