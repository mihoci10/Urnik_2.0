//import * as tf from '@tensorflow/tfjs-node-gpu'

class Entity{

    _id;

    constructor(id = undefined){
        this._id = id;
    }

    getId() {
        return this._id;    
    }
}

class Person extends Entity {

    _name;
    _surname;

    constructor(name, surname){
        super();
        this._name = name;
        this._surname = surname;
    }

    toString(){
        return undefined;
    }

}

class Teacher extends Person{

    constructor(name, surname){
        super(name, surname);
    }

    toString(){
        return `${this._name} ${this._surname}`;
    }

}

class Student extends Person{

    _studentId;

    constructor(name, surname, studentId = undefined){
        super(name, surname);
        this._studentId = studentId; 
    }

    toString(){
        return `${this._name} ${this._surname}, ${this._studentId}`;
    }

}

class Group extends Entity{

    _userList;

    constructor(){
        super();
        this._userList = new Set(); 
    }

}

class Hall extends Entity{

    _name;
    _capacity;

    constructor(name, capacity){
        super();
        this._name = name;
        this._capacity = capacity;
    }

}

class Course extends Entity {

    _name;
    _lecturer;
    _asistants;

    constructor(name, lecturer, asistants){
        this._name = name;
        this._lecturer = lecturer;
        this._asistants = asistants;
    }

}

class Activity extends Entity {

    _course;
    _asignee;
    _attendees;
    _requirements;
    _duration;

    constructor(course, asignee, requirements, duration){
        this._course = course;
        this._asignee = asignee;
        this._requirements = requirements;
        this._duration = duration;
        this._attendees = new Array();
    }
}

class Timetable{
    constructor(){

    }
}