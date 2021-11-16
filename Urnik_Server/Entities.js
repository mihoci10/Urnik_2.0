//import * as tf from '@tensorflow/tfjs-node-gpu'

export class Entity{

    _id;

    constructor(id = undefined){
        this._id = id;
    }

    get id() {
        return this._id;    
    }

    
}

export const TS_Intersect = {
    INTERSECT_NON: 0,
    INTERSECT_START: 1,
    INTERSECT_MID: 2,
    INTERSECT_END: 3,
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

        this._hour += Math.floor(this._minutes / 60)
        this._minutes = this._minutes % 60;

        this._day += Math.floor(this._hour / 24);
        this._hour = this._hour % 24;
    }
    
    sub(time){
        this._day = this._day - time.day;
        this._hour = this._hour - time.hour;
        this._minutes = this._minutes - time.minutes;

        this._hour += Math.floor(this._minutes / 60)
        if(this.minutes < 0)
            this._minutes = 60 + this._minutes % 60;

        this._day += Math.floor(this._hour / 24);
        if(this._hour < 0)
            this._hour = 24 + this._hour % 24;
    }

    static equals(t1, t2){
        return t1.day === t2.day && t1.hour === t2.hour && t1.minutes === t2.minutes;
    }

    static isGreater(t1, t2){
        if(t1.day > t2.day)
            return true;
        if(t1.day == t2.day)
        {
            if(t1.hour > t2.hour)
                return true;
            if(t1.hour == t2.hour)
            {
                if(t1.minutes > t2.minutes)
                    return true;
            }
        }
        return false;
    }

    static isSmaller(t1, t2){
        if(t1.day < t2.day)
            return true;
        if(t1.day == t2.day)
        {
            if(t1.hour < t2.hour)
                return true;
            if(t1.hour == t2.hour)
            {
                if(t1.minutes < t2.minutes)
                    return true;
            }
        }
        return false;
    }

    isBetween(t1, t2){
        if(Time.equals(this, t1))
            return TS_Intersect.INTERSECT_START;

        if(Time.equals(this, t2))
            return TS_Intersect.INTERSECT_END;

        if(Time.isGreater(this, t1) && Time.isSmaller(this, t2))
            return TS_Intersect.INTERSECT_MID;

        return TS_Intersect.INTERSECT_NON;
    }

}

export const TS_Type = {
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

    static equals(p1, p2){
        return p1.id == p2.id;
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

    static equals(h1, h2){
        return h1.id == h2.id;
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

    get course(){
        return this._course;
    }

    get asignee(){
        return this._asignee;
    }

    get attendees(){
        return this._attendees;
    }

    get requirements(){
        return this._requirements;
    }

    get duration(){
        return this._duration;
    }
}

export class TimetableSlot extends Entity {

    _activity;
    _hall;
    _startTime;
    _endTime;

    constructor(activity, hall, startTime){
        super();
        this._activity = activity;
        this._hall = hall;
        this._startTime = new Time(startTime.day, startTime.hour, startTime.minutes);
        this._endTime = (new Time(startTime.day, startTime.hour, startTime.minutes)).add(this._activity.duration);
    }

    getTSIntersetion(time){
        return time.isBetween(this._startTime, this._endTime);
    }

    hasAsignee(asignee){
        return Person.equals(this._activity.asignee, asignee);
    }

    hasHall(hall){
        return Hall.equals(this._hall, hall);
    }

}

export class Timetable extends Entity{

    _numDays;
    _openTime;
    _closeTime;

    _slots;

    constructor(numDays, openTime, closeTime){
        super();
        this._numDays = numDays;
        this._openTime = openTime;
        this._closeTime = closeTime;
        this._slots = new Array();
    }

    get numDays(){
        return this._numDays;
    }

    get openTime(){
        return this._openTime;
    }

    get closeTime(){
        return this._closeTime;
    }

}