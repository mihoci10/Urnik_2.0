//import * as tf from '@tensorflow/tfjs-node-gpu'

export class Entity{

    _id;

    constructor(id = undefined){
        this._id = id;
    }

    getId() {
        return this._id;    
    }
}

export class Time extends Entity {

    _day;
    _hour;
    _minutes;

    constructor(day, hour, minutes){
        super();
        this._day = day;
        this._hour = hour;
        this._minutes = minutes;
    }

    get day(){
        return this._day;
    }
    get hour(){
        return this._hour;
    }
    get minutes(){
        return this._minutes;
    }

    toString(){
        return `Day ${this._day} ${this._hour}:${this._minutes}`;
    }
    
    add(time){
        this._day = this._day + time.day;
        this._hour = this._hour + time.hour;
        this._minutes = this._minutes + time.minutes;
    }

    sub(time){
        this._day = this._day - time.day;
        this._hour = this._hour - time.hour;
        this._minutes = this._minutes - time.minutes;
    }

}

export const TimeSlotType = {
    DESIRABLE: 0,
    UNDESIRABLE: 1,
}

export class TimeSlot extends Entity {
    
    _startTime;
    _duration;

    constructor(startTime, duration){
        super();
        this._startTime = startTime;
        this._duration = duration;
    }

    get startTime(){
        return this._startTime;
    }

    get duration(){
        return this._duration;
    }

}

export class TimeSlotRestrictor extends TimeSlot{

    _type;

    constructor(startTime, duration, type){
        super(startTime, duration);
        this._type = type;
    }

    get type(){
        return this._type;
    }

}

export class Person extends Entity {

    _name;
    _surname;

    constructor(name, surname){
        super();
        this._name = name;
        this._surname = surname;
    }

    get name(){
        return this._name;
    }

    get surname(){
        return this._surname;
    }

    toString(){
        return undefined;
    }

}

export class Teacher extends Person{

    _restrictionSlots;

    constructor(name, surname){
        super(name, surname);
        this._restrictionSlots = new Array();
    }

    get timeSlots(){
        return this._restrictionSlots;
    }

    toString(){
        return `${this._name} ${this._surname}`;
    }

}

export class Student extends Person{

    _studentId;

    constructor(name, surname, studentId = undefined){
        super(name, surname);
        this._studentId = studentId; 
    }

    get _studentId(){
        return this._studentId;
    }

    toString(){
        return `${this._name} ${this._surname}, ${this._studentId}`;
    }

}

export class Group extends Entity{

    _userList;

    constructor(){
        super();
        this._userList = new Set(); 
    }

    get userList(){
        return this._userList;
    }

}

export class Hall extends Entity{

    _name;
    _capacity;

    constructor(name, capacity){
        super();
        this._name = name;
        this._capacity = capacity;
    }

    get name(){
        return this._name;
    }

    get capacity(){
        this._capacity;
    }

}

export class Course extends Entity {

    _name;
    _lecturer;
    _asistants;

    constructor(name, lecturer){
        super();
        this._name = name;
        this._lecturer = lecturer;
        this._asistants = new Array();
    }

    get name(){
        return this._name;
    }

    get lecturer(){
        return this._lecturer;
    }

    get asistants(){
        return this._asistants;
    }

}

export class Activity extends Entity {

    _course;
    _asignee;
    _attendees;
    _requirements;
    _duration;

    constructor(course, asignee, requirements, duration){
        super();
        this._course = course;
        this._asignee = asignee;
        this._requirements = requirements;
        this._duration = duration;
        this._attendees = new Array();
    }
}

export class Timetable{

    constructor(){

    }
    
}