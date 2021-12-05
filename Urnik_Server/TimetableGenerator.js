import {Entity, Timetable} from './Entities';
import { NeuralNetwork } from './ArtificialInteligence';

const AC_Distribution = {
    DISTRIB_LIN: 0,
    DISTRIB_LIN_REVERSED: 1,
    DISTRIB_RND: 2,
}

class Worker{

    _brain;

    _timetable;
    _halls;
    _activities;

    constructor(){
        this._brain = new NeuralNetwork(4,4,1);
    }

    init(timetable, halls, activities){
        this._timetable = timetable;
        this._halls = halls;
        this._activities = activities;
    }

    think(timestamp, activity){
        let inputs = [];
        inputs[0] = this._timetable.getStudentOverlaps(timestamp, activity.st)

        const output = this._brain.predict(inputs);
        if(output > 0.5){
            //place slot in timetable
        }
    }
}

export class TimetableGenerator{

    _halls;
    _activities;

    _numDays;
    _startTime;
    _endTime;

    constructor(numDays, startTime, endTime){
        this._numDays = numDays;
        this._startTime = startTime;
        this._endTime = endTime;
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