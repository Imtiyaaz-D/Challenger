class Person{
    #firstName = "";
    constructor(firstName) {
        this.#firstName = firstName
    }
    walk() {
        console.log(`${this.#firstName} is walking`);
    }
    dance() {
        console.log(`${this.#firstName} is dancing`);
    }
}
const person1 = new Person("Mish-Al")
const person2 = new Person("Uthmaan")
person1.dance()
person2.walk()