import {ACT_Attendance, Entity, Time, TimeSlot, Timetable, TS_Intersect} from './Entities.js';
import { NeuralNetwork } from './ArtificialInteligence.js';

export const ACT_Distribution = {
    DISTRIB_LIN: 0,
    DISTRIB_LIN_REVERSED: 1,
    DISTRIB_RND: 2,
}

class Population{

    _workers;
    _genCount;
    
    constructor(genSize){
        this._workers = [];
        for (let i = 0; i < genSize; i++) {
            this._workers.push(new Worker())            
        }
        this._genCount = 0;
    }

    prepare(timetable, halls, activities, timeUnit){
        this._workers.forEach(worker => {
            worker.init(new Timetable(timetable.numDays, timetable.openTime, timetable.closeTime),
                        halls, activities.slice(0), timeUnit);    
        });
    }

    execute(){
        this._workers.forEach(worker => {
            while(!worker.isDone()){
                worker.think();
            }    
        });
    }

    _pickOne(oldWorkers){
        let index = 0;
        let r = Math.random();

        while(r > 0){
            r = r - oldWorkers[index].fitness;
            index ++;
        }
        index --;

        let worker = oldWorkers[index];
        let child = new Worker(worker.brain);
        child.mutate(0.1);
        return child;
    }

    nextGeneration(){
        this._genCount ++;
        let scoreSum = 0;
        this._workers.forEach(worker => {
            scoreSum += worker.score;
        });
        this._workers.forEach(worker => {
            worker.calcFitness(scoreSum);
        });

        let newWorkers = [];
        for (let i = 0; i < this._workers.length; i++) {
            newWorkers.push(this._pickOne(this._workers));
        }
        this._workers = newWorkers;
    }

    bestWorker(){
        let bestW = undefined;
        let bestV = Infinity;

        this._workers.forEach(worker => {
            if(worker.score < bestV){
                bestV = worker.score;
                bestW = worker;
            }    
        });

        return bestW;
    }
}

class Worker{

    _brain;

    _timetable;
    _halls;
    _activities;
    _timeUnit;

    _score;
    _fitness;

    constructor(brain = null){
        if(brain){
            this._brain = brain.copy();
        }
        else{
            this._brain = new NeuralNetwork(2,4,1);
        }
    }

    get brain(){
        return this._brain;
    }
    get timetable(){
        return this._timetable;
    }
    get score(){
        return this._score;
    }
    get fitness(){
        return this._fitness;
    }

    isDone(){
        return this._activities.length <= 0;
    }

    init(timetable, halls, activities, timeUnit){
        this._timetable = timetable;
        this._halls = halls;
        this._activities = activities;
        this._timeUnit = timeUnit;

        this._score = 0;
        this._fitness = undefined;
    }

    think(){
        const activity = this._activities.splice(0, 1)[0];
        if(activity == undefined)
            return;

        let outputs = [];
        let locTime = [];
        this._timetable.forEachTs(this._timeUnit, ts => {
            if(!this._timetable.insideLimits(ts) || this._timetable.getTeacherOverlap(ts, activity.asignee))
                return;

            this._halls.forEach(hall => {
                if((hall.capacity < activity.attendees.length) || this._timetable.getHallOverlap(ts, hall))
                    return;

                let inputs = [];
                inputs[0] = this._timetable.getStudentOverlaps(ts, activity.attendees) / activity.attendees.length;
                inputs[1] = (hall.capacity - activity.attendees.length) / hall.capacity;

                const output = this._brain.predict(inputs);
                outputs.push(output[0]);
                locTime.push([hall, ts.copy()]);
            });
        });  
        let i = outputs.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
        this._timetable.addSlot(activity, locTime[i][0], locTime[i][1]);

        if(this._activities.length <= 0)
            this._score = TimetableEvaluator.evaluate(this._timetable);
    }

    mutate(prob){
        this._brain.mutate(prob);
    }

    calcFitness(scoreSum){
        this._fitness = 1 - (this._score / scoreSum);
    }
}

export class TimetableEvaluator{

    static srchIncr = new Time(0,1,0);
    static weights = [1]

    static _studentOverlaps(timetable){
        let cnt = 0;

        timetable.forEachTs(this.srchIncr, it => {
            let students = [];
            timetable.slots.forEach(slot => {
                if([TS_Intersect.INTERSECT_START, TS_Intersect.INTERSECT_MID].includes(slot.getTSIntersetion(it))){
                    students = students.concat(slot.activity.attendees);    
                }
            });

            cnt += students.length - (new Set(students)).size;
        });

        return cnt;
    }

    static _restrictionOverlap(timetable){
        let cnt = 0;

        timetable.forEachTs(this.srchIncr, it => {
            timetable.slots.forEach(slot => {
                if(slot.getTSIntersetion(it).includes([TS_Intersect.INTERSECT_START, TS_Intersect.INTERSECT_MID])){
                       
                }
            });
        });

        return cnt;
    }

    static _unweightedEvaluation(timetable){
        return [this._studentOverlaps(timetable)];
    }

    static evaluate(timetable){
        let results = this._unweightedEvaluation(timetable);
        let val = 0;
        for (let i = 0; i < results.length; i++) {
            val += results[i] * this.weights[i];            
        }

        return val;
    }

}

export class TimetableGenerator{

    _halls;
    _activities;

    _numDays;
    _startTime;
    _endTime;
    _timeUnit;

    _distribution;

    constructor(numDays, startTime, endTime, timeUnit){
        this._numDays = numDays;
        this._startTime = startTime;
        this._endTime = endTime;
        this._timeUnit = timeUnit;
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

    get distribution(){
        return this._distribution;
    }

    populateActivities(distribution){
        this._distribution = distribution;
        this._clearActivities();

        let actDict = {};
        this._activities.forEach(activity => {
            if(activity.course in actDict)
                return;
            actDict[activity.course] = [];
            activity.course.activities.forEach(cActivity => {
                actDict[activity.course].push(cActivity);    
            });    
        });

        for (const cId in actDict) {
            const activities = actDict[cId];
            const course = activities[0].course;
            let students = course.students;
            let eng = [];
            let sl = [];

            students.forEach(student => {
                if(student.foreign)
                    eng.push(student);
                else
                    sl.push(student);  
            });

            //TODO: SORT ARRAYS AS NEED BE

            let slAct = [];
            let engAct = [];

            activities.forEach(activity => {
                if(activity.attendance == ACT_Attendance.ALL)
                    activity.attendees = course.students;
                else if(activity.attendance == ACT_Attendance.FOREIGN)
                    engAct.push(activity);
                else
                    slAct.push(activity);                
            });

            let slK = Math.ceil(sl.length / slAct.length);
            let enK = Math.ceil(eng.length / engAct.length);

            slAct.forEach(activity => {
                activity.attendees = sl.splice(0, Math.min(slK, activity.maxAttendees));
            });

            engAct.forEach(activity => {
                activity.attendees = eng.splice(0, Math.min(enK, activity.maxAttendees));
                if(enK < activity.maxAttendees && sl.length > 0)
                    activity.attendees = sl.splice(0, activity.maxAttendees - activity.attendees).concat(activity.attendees);    
            });

            if(sl.length > 0 || eng.length > 0){
                console.warn("Error with distributing students");
            }
        }
    }

    _clearActivities(){
        for (let i = 0; i < this.activities.length; i++) {
            this.activities[i].attendees = [];
        }
    }

    train(popSize, iter){
        console.log("Starting training...");
        console.log(`Population size: ${popSize}, with ${iter} iterations/mutations.`);

        let timetable = new Timetable(this._numDays, this._startTime, this._endTime); 
        let pop = new Population(popSize);
        pop.prepare(timetable, this._halls, this._activities, this._timeUnit)

        let bestWorker;
        
        for (let i = 0; i < iter; i++) {
            pop.execute();
            bestWorker = pop.bestWorker();
            console.log(`Finished with generation ${i}`);
            console.log(`Best worker has score of ${bestWorker.score}`);
            pop.nextGeneration();
            pop.prepare(timetable, this._halls, this._activities, this._timeUnit);
        }

        console.log("Finnished training");
        bestWorker.timetable.debug();
    }

    generate(){
        
    }

}