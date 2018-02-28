'use strict';

const Memory = require('./memory');



class Array {
	constructor() {
		this.length = 0;
		this._capacity = 0;
		this.ptr = memory.allocate(this.length);
	}


	_resize(size) {
		const oldPtr = this.ptr;
		this.ptr = memory.allocate(size);
		if (this.ptr === null) {
			throw new Error('Out of memory');
		}
		memory.copy(this.ptr, oldPtr, this.length);
		memory.free(oldPtr);
		this._capacity = size;
	}

	//1. resize array, length +1
	//2. set the ptr to new length and push the value
	//3. increase the length by 1
	push(value) {
		if (this.length >= this._capacity) {
			this._resize((this.length + 1) * Array.SIZE_RATIO);
		}

		memory.set(this.ptr + this.length, value);
		this.length++;
	}

	get(index) {
		if (index < 0 || index >= this.length) {
			throw new Error('Index error');
		}
		return memory.get(this.ptr + index);
	}

	pop() {
		if (this.length == 0) {
			throw new Error('Index error');
		}
		const value = memory.get(this.ptr + this.length - 1);
		this.length--;
		return value;
	}

}

let memory = new Memory();

function main() {
	Array.SIZE_RATIO = 3;
	let arr = new Array();


	//array push
	arr.push(3);
	console.log('push', arr);
	arr.push(5);
	console.log('push', arr);
	arr.push(15);
	console.log('push', arr);
	arr.push(19);
	console.log('push', arr);
	arr.push(45);
	console.log('push', arr);
	arr.push(10);
	console.log('push', arr);

	//array pop
	arr.pop();
	console.log('pop', arr);
	arr.pop();
	console.log('pop', arr);
	arr.pop();
	console.log('pop', arr);
}

main();