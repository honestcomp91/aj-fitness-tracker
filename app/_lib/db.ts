import { openDB } from "idb";

const DB_NAME = "fitness-tracker-db";
const DB_VERSION = 1;
const STORE_NAME = "workouts";

export interface WorkoutSet {
  weight: number;
  reps: number;
}

export interface Workout {
  id?: number;
  date: string;
  category: string;
  workoutName: string;
  sets: WorkoutSet[];
  notes?: string;
}

export async function initDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
      }
    },
  });
}

export async function addWorkout(workout: Omit<Workout, "id">) {
  const db = await initDB();
  return db.add(STORE_NAME, workout);
}

export async function getAllWorkouts() {
  const db = await initDB();
  return db.getAll(STORE_NAME);
}

export async function updateWorkout(workout: Workout) {
  if (!workout.id) throw new Error("Workout id required for update");
  const db = await initDB();
  return db.put(STORE_NAME, workout);
}

export async function deleteWorkout(id: number) {
  const db = await initDB();
  return db.delete(STORE_NAME, id);
}
