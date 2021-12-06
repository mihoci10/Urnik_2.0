import { Activity, ACT_Attendance, Course, Hall, Student, Teacher, Time } from "./Entities.js";
import { ACT_Distribution, TimetableGenerator } from "./TimetableGenerator.js";
import tf from "@tensorflow/tfjs-node"

tf.setBackend('cpu');

let tg = new TimetableGenerator(1, new Time(0,0,0), new Time(0,8,0), new Time(0,1,0));

let halls = [];
halls.push(new Hall("A", 100), new Hall("B", 50), new Hall("C", 10));

let st = [new Student("Asfaltina", "Betončič"), new Student("Ante", "KiTeGledaIzKante"), new Student("KruhMed", "Paštetovič"),
new Student("Pedro", "Opeka"), new Student("Rikardo", "Mortimir"), new Student("Kastelic", "Jakob"), new Student("Dobr", "Man"),
new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),
new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),
new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),
new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),
new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),
new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),
new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("",""),new Student("","")];

let T1 = new Teacher("T1", "Čajkovski")
let A1 = new Teacher("A1", "Dostojevski")

let T2 = new Teacher("T2", "Robi");

let C1 = new Course("Uvod", T1);
C1.asistants = [A1];
C1.students = st.slice(0, 30);
let C2 = new Course("Športna", T2);
C2.students = st.slice(20,50)

let activities = [];
activities.push(new Activity(C1, T1, new Time(0,3,0), ACT_Attendance.ALL),
                new Activity(C1, A1, new Time(0,2,0), ACT_Attendance.NATIVE, 45),
                new Activity(C2, T2, new Time(0,3,0), ACT_Attendance.ALL));

tg.activities = activities;
tg.halls = halls;


tg.populateActivities(ACT_Distribution.DISTRIB_LIN);
tg.train(100, 100);