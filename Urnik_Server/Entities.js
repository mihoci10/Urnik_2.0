import { randomBytes } from "crypto";

export class Entity{

    _id;

    constructor(id = undefined){
        if(id == undefined)
            this._id = randomBytes(20);
        else
            this._id = id;
    }

    get id() {
        return this._id;    
    }

    toString(){
        return this._id.toString('hex');
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

    format(){
        return `${this._day}:${this._hour}:${this._minutes}`;
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

    copy(){
        return new Time(this._day, this._hour, this._minutes);
    }

}

export const TS_Type = {
    DESIRABLE: 0,
    UNDESIRABLE: 1,
}

export class TimeSlot extends Entity {
    
    _startTime;
    _endTime;

    constructor(startTime, endTime){
        super();
        this._startTime = startTime.copy();
        this._endTime = endTime.copy();
    }

    get startTime(){
        return this._startTime;
    }

    get endTime(){
        return this._endTime;
    }

    getIntersection(time){
        return time.isBetween(this._startTime, this._endTime);
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

    static equals(p1, p2){
        return p1.id == p2.id;
    }

}

export class Teacher extends Person{

    _restrictionSlots;

    constructor(name, surname){
        super(name, surname);
        this._restrictionSlots = [];
    }

    get timeSlots(){
        return this._restrictionSlots;
    }

}

export class Student extends Person{

    _studentId;
    _foreign;

    constructor(name, surname, foreign = false, studentId = undefined){
        super(name, surname);
        this._foreign = foreign
        this._studentId = studentId; 
    }

    get studentId(){
        return this._studentId;
    }

    get foreign(){
        return this._foreign;
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
        return this._capacity;
    }

    static equals(h1, h2){
        return h1.id == h2.id;
    }

}

export class Course extends Entity {

    _name;
    _lecturer;
    _asistants;
    _students;
    _activities;

    constructor(name, lecturer){
        super();
        this._name = name;
        this._lecturer = lecturer;
        this._asistants = new Array();
        this._students = [];
        this._activities = [];
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
    set asistants(asistants){
        this._asistants = asistants;
    }

    get students(){
        return this._students;
    }
    set students(students){
        this._students = students;
    }

    get activities(){
        return this._activities;
    }
    addActivity(activity){
        this._activities.push(activity);
    }

}

export const ACT_Attendance = {
    ALL: 0,
    FOREIGN: 1,
    NATIVE: 2,
}

export class Activity extends Entity {

    _course;
    _asignee;
    _requirements;
    _duration;
    _attendees;
    _attendance;
    _maxAttendees;

    constructor(course, asignee, duration, attendance, maxAttendees = 0){
        super();
        this._course = course;
        this._asignee = asignee;
        this._requirements = [];
        this._duration = duration;
        this._attendees = [];
        this._attendance = attendance;
        this._maxAttendees = maxAttendees;

        this._course.addActivity(this);
    }

    get course(){
        return this._course;
    }

    get asignee(){
        return this._asignee;
    }

    get requirements(){
        return this._requirements;
    }
    set requirements(requirements){
        this._requirements = requirements;
    }

    get duration(){
        return this._duration;
    }

    get attendees(){
        return this._attendees;
    }
    set attendees(attendees){
        this._attendees = attendees;
    }
    addAttendee(attendee){
        this._attendees.push(attendee);
    }
    
    get attendance(){
        return this._attendance;
    }

    get maxAttendees(){
        return this._maxAttendees;
    }
}

export class TimetableSlot extends Entity {

    _activity;
    _hall;
    _timeSlot;

    constructor(activity, hall, startTime){
        super();
        this._activity = activity;
        this._hall = hall;

        let endT = new Time(startTime.day, startTime.hour, startTime.minutes);
        endT.add(this._activity.duration);
        this._timeSlot = new TimeSlot(startTime, endT);
    }

    get activity(){
        return this._activity;
    }
    get timeslot(){
        return this._timeSlot;
    }
    get hall(){
        return this._hall;
    }

    getTSIntersetion(time){
        return this._timeSlot.getIntersection(time);
    }
    hasAsignee(asignee){
        return Person.equals(this._activity.asignee, asignee);
    }
    hasHall(hall){
        return Hall.equals(this._hall, hall);
    }
    hasAttendee(attendee){
        for (i = 0; i < this._activity.attendees.length; i++)
            if(Person.equals(attendee, this._activity.attendees[i]))
                return true;
        return false;
    }
    countAtendees(attendees){
        let c = 0;
        for (let i = 0; i < this._activity.attendees.length; i++)
            if(attendees.includes(this._activity.attendees[i]))
                c += 1;
        return c;
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
        this._slots = [];
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
    get slots(){
        return this._slots;
    }

    addSlot(activity, hall, timestamp){
        this._slots.push(new TimetableSlot(activity, hall, timestamp));
    }

    insideLimits(ts){
        let start = new Time(ts.day, this._openTime.hour, this._openTime.minutes);
        let end = new Time(ts.day, this._closeTime.hour, this._closeTime.minutes);
        let slot = new TimeSlot(start, end);
        return [TS_Intersect.INTERSECT_START, TS_Intersect.INTERSECT_MID].includes(slot.getIntersection(ts));
    }

    getStudentOverlaps(ts, students){
        let overlap = 0;
        for (let i = 0; i < this._slots.length; i++) {
            if([TS_Intersect.INTERSECT_START, TS_Intersect.INTERSECT_MID].includes(this._slots[i].getTSIntersetion(ts))){
                overlap += this._slots[i].countAtendees(students);
            }
        }
        return overlap;
    }

    getTeacherOverlap(ts, teacher){
        let overlap = false;
        for (let i = 0; i < this._slots.length; i++) {
            if([TS_Intersect.INTERSECT_START, TS_Intersect.INTERSECT_MID].includes(this._slots[i].getTSIntersetion(ts))){
                overlap = overlap || (this._slots[i].activity.asignee == teacher);
            }
        }
        return overlap;
    }

    getHallOverlap(ts, hall){
        let overlap = false;
        for (let i = 0; i < this._slots.length; i++) {
            if([TS_Intersect.INTERSECT_START, TS_Intersect.INTERSECT_MID].includes(this._slots[i].getTSIntersetion(ts))){
                overlap = overlap || (this._slots[i].hall == hall);
            }
        }
        return overlap;
    }
    
    forEachTs(srchIncr, func){
        let it = this._openTime.copy();
        let end = new Time(this._numDays - 1, this._closeTime.hour, this._closeTime.minutes);

        while(!Time.equals(it, end)){

            func(it.copy())

            it.add(srchIncr);
            if(it.hour > end.hour && it.minutes > end.minutes)
                it = new Time(it.day + 1, this._openTime.hour, this._openTime.minutes);
        }
    }

    debug(){
        let cnt = 0;
        console.log("=== Timetable output ===");
        this._slots.forEach(slot => {
            console.log(`Item ${cnt}: ${slot.activity.course.name}`);
            console.log(`   Assignee: ${slot.activity.asignee.surname}, ${slot.activity.asignee.name}`);
            console.log(`   Hall: ${slot.hall.name}`);
            console.log(`   From ${slot.timeslot.startTime.format()} to ${slot.timeslot.endTime.format()}`);
            cnt++;
        }); 
        console.log("===  End timetable   ===");
    }

}