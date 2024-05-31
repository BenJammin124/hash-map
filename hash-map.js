class LinkedList {
  constructor() {
    this.head = null;
  }

  append(key, value) {
    if (!this.head) {
      this.head = new Node(key, value);
    } else {
      let pointer = this.head;
      while (pointer.next) {
        pointer = pointer.next;
      }
      pointer.next = new Node(key, value);
    }
  }

  prepend(key, value) {
    const newNode = new Node(key, value);
    newNode.next = this.head;

    this.head = newNode;
  }

  size() {
    let pointer = this.head;
    let size = 0;
    while (pointer) {
      pointer = pointer.next;
      size++;
    }
    console.log(size);
    return size;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    let pointer = this.head;
    while (pointer.next !== null) {
      pointer = pointer.next;
    }
    return pointer;
  }

  at(index) {
    let pointer = this.head;
    let counter = 0;
    if (index < 0 || index >= this.size()) return null;
    while (counter !== index) {
      pointer = pointer.next;
      counter++;
    }
    return pointer;
  }

  pop() {
    let previous;
    let pointer = this.head;
    while (pointer.next !== null) {
      previous = pointer;
      pointer = pointer.next;
    }
    previous.next = null;
    return;
  }

  contains(key) {
    let pointer = this.head;
    while (pointer) {
      if (pointer.key === key) {
        return true;
      }
      pointer = pointer.next;
    }
    return false;
  }

  find(key) {
    let pointer = this.head;
    while (pointer) {
      if (pointer.key === key) return pointer.value;
      pointer = pointer.next;
    }
    return null;
  }

  toString() {
    let pointer = this.head;
    let mainArr = [];
    while (pointer) {
      let tempArr = [];
      tempArr.push(pointer.key + ", " + pointer.value);
      mainArr.push(tempArr);
      pointer = pointer.next;
    }
    return mainArr;
  }

  insertAt(key, value, index) {
    if (index < 0 || index > this.length) return;
    if (index === this.length) return this.append(key, value);
    if (index === 0) return this.prepend(key, value);

    const newNode = new Node(key, value);
    const previousNode = this.at(index - 1);
    let temp = previousNode.next;
    previousNode.next = newNode;
    newNode.next = temp;
  }

  allKeys() {
    let pointer = this.head;
    let tempArr = [];
    while (pointer) {
      tempArr.push(pointer.key);
      pointer = pointer.next;
    }
    return tempArr;
  }

  allValues() {
    let pointer = this.head;
    let tempArr = [];
    while (pointer) {
      tempArr.push(pointer.value);
      pointer = pointer.next;
    }
    return tempArr;
  }

  remove(key) {
    if (!this.head) {
      return null;
    }

    if (this.head.key === key) {
      this.head = this.head.next;
      return true;
    }

    let pointer = this.head;
    let previousNode = null;

    while (pointer && pointer.key !== key) {
      previousNode = pointer;
      pointer = pointer.next;
    }

    if (pointer === null) {
      return false;
    }

    previousNode.next = pointer.next;
    return true;
  }
}

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashMap {
  constructor(capacity = 16) {
    this.capacity = capacity;
    this.buckets = new Array(this.capacity);
    this.loadFactor = 0.8;
    this.size = 0;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const hashedIndex = this.hash(key);

    if (this.buckets[hashedIndex] === undefined) {
      this.buckets[hashedIndex] = new LinkedList();
    }

    const bucket = this.buckets[hashedIndex];
    if (bucket.contains(key)) {
      let pointer = bucket.head;
      while (pointer) {
        if (pointer.key === key) {
          pointer.value = value;
          return;
        }
        pointer = pointer.next;
      }
    } else {
      bucket.append(key, value);
    }
    this.size++;
    this.capacityCheck();
  }

  get(key) {
    const hashedIndex = this.hash(key);

    if (this.buckets[hashedIndex] === undefined) {
      return null;
    } else {
      return this.buckets[hashedIndex].find(key);
    }
  }

  has(key) {
    const bucket = this.getBucket(key);
    if (!bucket) return false;
    if (bucket.contains(key)) {
      return true;
    }
    return false;
  }

  remove(key) {
    const bucket = this.getBucket(key);
    if (!bucket) return false;
    this.size--;
    return bucket.remove(key);
  }

  length() {
    console.log(this.size);
    return this.size;
  }

  clear() {
    this.buckets = new HashMap();
  }

  keys() {
    let keyArray = [];
    this.buckets.forEach((bucket) => {
      // let tempArray = [];
      keyArray.push(bucket.allKeys());
    });
    return keyArray.flat();
  }

  values() {
    let valueArray = [];
    this.buckets.forEach((bucket) => {
      valueArray.push(bucket.allValues());
    });
    return valueArray.flat();
  }

  entries() {
    let arr = [];
    this.buckets.forEach((bucket) => {
      arr.push(bucket.toString());
    });
    return arr.flat();
  }

  capacityCheck() {
    let size = this.length();
    if (size >= this.capacity * this.loadFactor) {
      console.log("Above load factor, increasing size");
      const data = this.entries();
      const newInstance = new HashMap(this.capacity * 2);
      Object.assign(this, newInstance);
      data.forEach((dat) => {
        let key;
        [key] = dat;
        let newKey = key.split(", ");
        this.set(newKey[0], newKey[1]);
      });
      return newInstance;
    }
  }

  getBucket(key) {
    const hashedIndex = this.hash(key);
    if (hashedIndex < 0 || hashedIndex >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
    const bucket = this.buckets[hashedIndex];
    console.log(hashedIndex);
    return bucket;
  }
}
let h = new HashMap();
h.set("BenJamin", "n00b");
h.set("Paul", "newb");
h.set("Brianna", "fr00b");
h.set("Milo", "l333t");
h.set("Ryan", "noobie");
h.set("Rachel", "n00b");
h.set("Phil", "newbie");
h.set("Scottie", "meme Lord");
h.set("Jalen", "Pro");
h.set("Maggie", "n00b");
h.set("Jessica", "n3wb");
h.set("Amber", "nooob");
h.set("Jillian", "noobs");
