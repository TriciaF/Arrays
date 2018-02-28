'use strict';

const Memory = require('./memory');



class Array {
	constructor() {
		this.length = 0;
		this._capacity = 0;
		this.ptr = memory.allocate(this.length);
	}


	_resize(size) {
		console.log('Enter resize');
		const oldPtr = this.ptr;
		this.ptr = memory.allocate(size);
		console.log('size = ', size);
		console.log('oldPtr = ', oldPtr);
		console.log('current ptr = ', this.ptr);
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
		console.log('Enter push');
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

	for (let i = 0; i < 25; i++) {
		arr.push(i);
		console.log('push', arr);
	}



	//array push
	// arr.push(3);
	// console.log('push', arr);
	// arr.push(5);
	// console.log('push', arr);
	// arr.push(15);
	// console.log('push', arr);
	// arr.push(19);
	// console.log('push', arr);
	// arr.push(45);
	// console.log('push', arr);
	// arr.push(10);
	// console.log('push', arr);
	// arr.push(10);
	// console.log('push', arr);
	// arr.push(5);
	// console.log('push', arr);
	// arr.push(40);
	// console.log('push', arr);
	// arr.push(43);
	// console.log('push', arr);
	// arr.push(7);
	// console.log('push', arr);
	// arr.push(10);
	// console.log('push', arr);

	//array pop
	// arr.pop();
	// console.log('pop', arr);
	// arr.pop();
	// console.log('pop', arr);
	// arr.pop();
	// console.log('pop', arr);
	// arr.pop();
	// console.log('pop', arr);
	// arr.pop();
	// console.log('pop', arr);
	// arr.pop();
	// console.log('pop', arr);
	// arr.push('tauhida');
}

main();