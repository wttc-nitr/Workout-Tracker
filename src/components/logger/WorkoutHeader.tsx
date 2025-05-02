import { View, Text } from "@/components/general/Themed";
import { useEffect, useRef, useState } from "react";
import { calculateDurationHourMinutes } from "@/utils/time";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useWorkouts } from "@/store";

export default function WorkoutHeader() {
  const [timer, setTimer] = useState("0:00");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const workout = useWorkouts((state) => state.currentWorkout); // 'workout' refer to the same object every time,

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const duration = calculateDurationHourMinutes(
        new Date(workout?.createdAt || ""),
        new Date(),
      );
      setTimer(duration);
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [workout]); // so no need to worry about it being a dependency (which can cause Effect to re-run more often)

  return (
    <View style={{ gap: 10, backgroundColor: "transparent", marginBottom: 20 }}>
      <Text style={{ fontWeight: "bold", fontSize: 24 }}>Workout tracker</Text>
      <Text style={{ fontSize: 18 }}>
        <FontAwesome5 name="clock" size={18} color="gray" /> {timer}
      </Text>
    </View>
  );
}
