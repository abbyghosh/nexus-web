class LinkedList {
  constructor(value) {
    this.head = {
      value: value,
      next: null,
    };

    this.tail = {
      value: this.head,
    };

    this.length = 1;
  }

  append(value) {}
}

let numberList = new LinkedList(10);

console.log(numberList);
numberList.append(4);
// 10 --> 5 --> 16
