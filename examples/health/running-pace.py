# Running pace calculator
# Edit: distance_miles and finish_time_minutes.
# Assumptions: distance is entered in miles and total time is entered in minutes.
# Limitations: this example does not convert from hours/minutes/seconds inputs.
# Output: prints pace per mile and an estimated 5K finish time at the same pace.

distance_miles = 6.2
finish_time_minutes = 54

pace_minutes = finish_time_minutes / distance_miles
pace_whole_minutes = int(pace_minutes)
pace_seconds = round((pace_minutes - pace_whole_minutes) * 60)
estimated_5k_minutes = pace_minutes * 3.10686

print("Running pace estimate")
print("-" * 21)
print(f"Distance: {distance_miles:.2f} miles")
print(f"Finish time: {finish_time_minutes:.1f} minutes")
print(f"Pace per mile: {pace_whole_minutes}:{pace_seconds:02d}")
print(f"Estimated 5K: {estimated_5k_minutes:.1f} minutes")

