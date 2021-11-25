import {Entity, Timetable} from './Entities';

export class TimetableGenerator{

    _timetable;
    _halls;
    _activities;

    constructor(numDays, startTime, endTime){
        this._timetable = new Timetable(numDays, startTime, endTime);
        this._halls = [];
        this._activities = [];
    }

    set halls(halls){
        this._halls = halls;
    }
    get halls(){
        return this._halls;
    }

    set activities(activities){
        this._activities = activities;
    }
    get activities(){
        return this._activities;
    }

    generate(){
        
    }

}