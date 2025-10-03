"use client";

import { useEffect, useState } from "react";
import {
    addWorkout,
    getAllWorkouts,
    updateWorkout,
    deleteWorkout,
    Workout,
    WorkoutSet,
} from "../_lib/db";
import logo from './logo.png'

// Updated workoutData with detailed chest exercises including images
const workoutData: Record<string, { name: string; image: string }[]> = {
    Chest: [
        { name: "Barbell Bench Press", image: "/images/chest/barbell-bench-press.jpg" },
        { name: "Incline Dumbbell Bench Press", image: "/images/chest/incline-dumbbell-bench-press.jpg" },
        { name: "Dumbbell Bench Press", image: "/images/chest/dumbbell-bench-press.jpg" },
        { name: "Incline Bench Press (Barbell)", image: "/images/chest/incline-bench-press-barbell.jpg" },
        { name: "Decline Bench Press (Barbell)", image: "/images/chest/decline-bench-press-barbell.jpg" },
        { name: "Chest Dip", image: "/images/chest/chest-dip.jpg" },
        { name: "Dumbbell Pullover", image: "/images/chest/dumbbell-pullover.jpg" },
        { name: "Close Grip Dumbbell Press (Crush Press)", image: "/images/chest/close-grip-dumbbell-press.jpg" },
        { name: "Push-Up", image: "/images/chest/push-up.jpg" },
        { name: "Cable Chest Press", image: "/images/chest/cable-chest-press.jpg" },
        { name: "Incline Push-Up", image: "/images/chest/incline-push-up.jpg" },
        { name: "Smith Machine Incline Bench Press", image: "/images/chest/smith-incline-bench-press.jpg" }
    ],
    Back: [
        { name: "Pull-up", image: "/images/back/default.jpg" },
        { name: "Bent Over Row", image: "/images/back/default.jpg" },
        { name: "Lat Pulldown", image: "/images/back/default.jpg" },
        { name: "Barbell Deadlift", image: "/images/back/default.jpg" },
        { name: "Seated Cable Row", image: "/images/back/default.jpg" },
        { name: "Single-Arm Dumbbell Row", image: "/images/back/default.jpg" },
        { name: "T-Bar Row", image: "/images/back/default.jpg" },
        { name: "Face Pull", image: "/images/back/default.jpg" },
        { name: "Straight Arm Pulldown", image: "/images/back/default.jpg" },
        { name: "Inverted Row", image: "/images/back/default.jpg" },
        { name: "Machine Row (Hammer Strength)", image: "/images/back/default.jpg" },
        { name: "Rack Pull", image: "/images/back/default.jpg" }
    ],
    Shoulder: [
        { name: "Overhead Press", image: "/images/shoulder/default.jpg" },
        { name: "Lateral Raise", image: "/images/shoulder/default.jpg" },
        { name: "Front Raise", image: "/images/shoulder/default.jpg" },
        { name: "Arnold Press", image: "/images/shoulder/default.jpg" },
        { name: "Dumbbell Shoulder Press", image: "/images/shoulder/default.jpg" },
        { name: "Barbell Shoulder Press", image: "/images/shoulder/default.jpg" },
        { name: "Rear Delt Fly", image: "/images/shoulder/default.jpg" },
        { name: "Face Pull", image: "/images/shoulder/default.jpg" },
        { name: "Upright Row", image: "/images/shoulder/default.jpg" },
        { name: "Cable Lateral Raise", image: "/images/shoulder/default.jpg" },
        { name: "Seated Dumbbell Press", image: "/images/shoulder/default.jpg" },
        { name: "Landmine Press", image: "/images/shoulder/default.jpg" }
    ],
    Legs: [
        { name: "Squat", image: "/images/legs/default.jpg" },
        { name: "Deadlift", image: "/images/legs/default.jpg" },
        { name: "Leg Press", image: "/images/legs/default.jpg" },
        { name: "Lunges", image: "/images/legs/default.jpg" },
        { name: "Romanian Deadlift", image: "/images/legs/default.jpg" },
        { name: "Leg Curl (Machine)", image: "/images/legs/default.jpg" },
        { name: "Leg Extension", image: "/images/legs/default.jpg" },
        { name: "Bulgarian Split Squat", image: "/images/legs/default.jpg" },
        { name: "Step-Up", image: "/images/legs/default.jpg" },
        { name: "Calf Raise (Standing)", image: "/images/legs/default.jpg" },
        { name: "Calf Raise (Seated)", image: "/images/legs/default.jpg" },
        { name: "Glute Bridge / Hip Thrust", image: "/images/legs/default.jpg" }
    ],
    Arms: [
        { name: "Bicep Curl", image: "/images/arms/default.jpg" },
        { name: "Tricep Extension", image: "/images/arms/default.jpg" },
        { name: "Hammer Curl", image: "/images/arms/default.jpg" },
        { name: "Preacher Curl", image: "/images/arms/default.jpg" },
        { name: "Concentration Curl", image: "/images/arms/default.jpg" },
        { name: "Tricep Pushdown (Cable)", image: "/images/arms/default.jpg" },
        { name: "Overhead Dumbbell Tricep Extension", image: "/images/arms/default.jpg" },
        { name: "Skull Crushers (Lying Tricep Extension)", image: "/images/arms/default.jpg" },
        { name: "Close-Grip Bench Press", image: "/images/arms/default.jpg" },
        { name: "Zottman Curl", image: "/images/arms/default.jpg" },
        { name: "Reverse Curl", image: "/images/arms/default.jpg" },
        { name: "Dips (Bench or Parallel Bars)", image: "/images/arms/default.jpg" }
    ],
};

const fitnessQuotes = [
    "Fitness is not about being better than someone else; it's about being better than you used to be.",
    "The only bad workout is the one you didn't do.",
    "Strive for progress, not perfection.",
    "Your workout is your time; make it count.",
    "Do something today that your future self will thank you for.",
];

export default function Home() {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [category, setCategory] = useState("");
    const [workoutName, setWorkoutName] = useState("");
    const [sets, setSets] = useState<WorkoutSet[]>([]);
    const [weightInput, setWeightInput] = useState<number | "">("");
    const [repsInput, setRepsInput] = useState<number | "">("");
    const [loading, setLoading] = useState(false);
    const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null);
    const [notes, setNotes] = useState("");
    const [quoteIndex, setQuoteIndex] = useState(0);

    useEffect(() => {
        loadWorkouts();
    }, []);

    async function loadWorkouts() {
        const all = await getAllWorkouts();
        setWorkouts(all);
    }

    function addSet() {
        if (weightInput === "" || repsInput === "" || weightInput <= 0 || repsInput <= 0) {
            alert("Please enter valid weight and reps");
            return;
        }
        setSets([...sets, { weight: Number(weightInput), reps: Number(repsInput) }]);
        setWeightInput("");
        setRepsInput("");
    }

    function updateSet(index: number, field: "weight" | "reps", value: number) {
        setSets((prevSets) =>
            prevSets.map((set, i) => (i === index ? { ...set, [field]: value } : set))
        );
    }

    function removeSet(index: number) {
        setSets((prevSets) => prevSets.filter((_, i) => i !== index));
    }

    function resetForm() {
        setCategory("");
        setWorkoutName("");
        setSets([]);
        setWeightInput("");
        setRepsInput("");
        setLoading(false);
        setEditingWorkout(null);
        setNotes("");
    }

    async function saveWorkout() {
        if (!date || !category || !workoutName || sets.length === 0) {
            alert("Complete all fields and add at least one set");
            return;
        }
        setLoading(true);

        if (editingWorkout) {
            await updateWorkout({
                ...editingWorkout,
                date,
                category,
                workoutName,
                sets,
                notes,
            });
        } else {
            await addWorkout({
                date,
                category,
                workoutName,
                sets,
                notes,
            });
        }

        resetForm();
        await loadWorkouts();
    }

    function startEdit(workout: Workout) {
        setEditingWorkout(workout);
        setDate(workout.date);
        setCategory(workout.category);
        setWorkoutName(workout.workoutName);
        setSets(workout.sets);
        setNotes(workout.notes || "");
    }

    async function handleDelete(id: number | undefined) {
        if (!id) return;
        if (confirm("Are you sure you want to delete this workout?")) {
            await deleteWorkout(id);
            if (editingWorkout?.id === id) resetForm();
            await loadWorkouts();
        }
    }

    const filteredWorkouts = category ? workoutData[category] || [] : [];
    const workoutsForDate = workouts.filter((w) => w.date === date);

    // Find selected workout object (with image)
    const selectedWorkout =
        category && workoutName
            ? workoutData[category].find((w) => w.name === workoutName)
            : null;

    useEffect(() => {
        const intervalId = setInterval(() => {
            setQuoteIndex((prevIndex) => (prevIndex + 1) % fitnessQuotes.length);
        }, 10000); // change quote every 10 seconds

        return () => clearInterval(intervalId); // cleanup on unmount
    }, []);

    return (
        <main className="max-w-3xl mx-auto p-6 font-sans">
            <section className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded shadow text-center text-blue-900 font-medium italic transition-opacity duration-500 ease-in-out">
                <span className="inline-block mr-2 text-blue-600 text-xl">💬</span>
                {fitnessQuotes[quoteIndex]}
            </section>

<div className="bg-white p-6 rounded shadow-md space-y-6">
            {/* Date */}
            <div className="mb-6">
                <label className="block mb-1 font-semibold">Select Date:</label>
                <input
                    type="date"
                    className="border rounded px-3 py-2"
                    value={date}
                    max={new Date().toISOString().slice(0, 10)}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>

            {/* Category */}
            <div className="mb-6">
                <label className="block mb-1 font-semibold">Select Category:</label>
                <select
                    className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={category}
                    onChange={(e) => {
                        setCategory(e.target.value);
                        setWorkoutName("");
                    }}
                    disabled={loading}
                >
                    <option value="">--Choose Category--</option>
                    {Object.keys(workoutData).map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            {/* Workout */}
            <div className="mb-6">
                <label className="block mb-1 font-semibold">Select Workout:</label>
                <select
                    className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={workoutName}
                    onChange={(e) => setWorkoutName(e.target.value)}
                    disabled={!category || loading}
                >
                    <option value="">--Choose Workout--</option>
                    {filteredWorkouts.map(({ name }) => (
                        <option key={name} value={name}>
                            {name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Notes */}
            <div className="mb-6">
                <label className="block mb-1 font-semibold">Notes (optional):</label>
                <textarea
                    className="border px-3 py-2 rounded w-full"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    disabled={loading}
                    rows={3}
                    placeholder="Additional notes"
                />
                <p className="mt-1 text-sm text-gray-500 italic">
                    You can add details such as your protein intake, diet info, or any notes about today's workout here.
                </p>
            </div>

            {/* Editable Sets */}
            {workoutName && (
                <div className="mb-6 border p-4 rounded bg-gray-50">
                    <h3 className="font-semibold mb-2">Sets (Weight & Reps)</h3>

                    <div className="flex gap-3 mb-3">
                        <input
                            type="number"
                            placeholder="Weight (kg)"
                            min={0}
                            className="border px-3 py-2 rounded w-1/2"
                            value={weightInput}
                            onChange={(e) => setWeightInput(e.target.value === "" ? "" : Number(e.target.value))}
                            disabled={loading}
                        />
                        <input
                            type="number"
                            placeholder="Reps"
                            min={0}
                            className="border px-3 py-2 rounded w-1/2"
                            value={repsInput}
                            onChange={(e) => setRepsInput(e.target.value === "" ? "" : Number(e.target.value))}
                            disabled={loading}
                        />
                        <button
                            onClick={addSet}
                            className="bg-green-600 text-white px-4 rounded disabled:opacity-50"
                            disabled={weightInput === "" || repsInput === "" || loading}
                        >
                            Add
                        </button>
                    </div>

                    {/* Editable list of sets */}
                    <ul>
                        {sets.map((set, idx) => (
                            <li key={idx} className="mb-2 flex items-center gap-4">
                                <input
                                    type="number"
                                    min={0}
                                    className="border rounded w-24 px-2 py-1"
                                    value={set.weight}
                                    onChange={(e) => updateSet(idx, "weight", Number(e.target.value))}
                                />
                                <input
                                    type="number"
                                    min={0}
                                    className="border rounded w-24 px-2 py-1"
                                    value={set.reps}
                                    onChange={(e) => updateSet(idx, "reps", Number(e.target.value))}
                                />
                                <button onClick={() => removeSet(idx)} className="text-red-600 hover:underline">
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Save/Update buttons */}
            <div className="flex gap-4">
                <button
                    onClick={saveWorkout}
                    disabled={!date || !category || !workoutName || sets.length === 0 || loading}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? (editingWorkout ? "Updating..." : "Saving...") : editingWorkout ? "Update Workout" : "Save Workout"}
                </button>
                {editingWorkout && (
                    <button onClick={resetForm} disabled={loading} className="bg-gray-400 text-white px-6 py-2 rounded">
                        Cancel
                    </button>
                )}
            </div>

            </div>

            {/* Workout list */}
            <section className="mt-8 bg-white p-6 rounded shadow-md space-y-6">
                <h2 className="text-xl font-semibold mb-4">Workouts for {date}</h2>

                {workoutsForDate.length === 0 ? (
                    <p>No workouts logged for this day.</p>
                ) : (
                    <ul className="space-y-4">
                        {workoutsForDate.map(({ id, category, workoutName, sets, notes }) => (
                            <li
                                key={id}
                                className="border rounded p-4 bg-white shadow-sm flex justify-between items-start"
                            >
                                <div>
                                    <div className="font-semibold mb-1">
                                        {category} - {workoutName}
                                    </div>
                                    {notes && <div className="mb-1 italic text-gray-600">"{notes}"</div>}
                                    <ul>
                                        {sets.map((set, idx) => (
                                            <li key={idx}>
                                                Set {idx + 1}: {set.weight} kg x {set.reps} reps
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={() => startEdit(workoutsForDate.find((w) => w.id === id)!)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => id && handleDelete(id)}
                                        className="text-red-600 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    );
}
