# Time Zone Deadline Converter
# ----------------------------
# What this script does:
#   Converts a single deadline into a few local times so a team can coordinate
#   without mental math.
#
# Which variables to edit:
#   - deadline_utc
#   - offsets
#
# Assumptions and limitations:
#   - Offsets are fixed hours from UTC in this beginner-friendly example.
#   - Daylight Saving Time adjustments are not handled automatically.
#
# Expected output shape:
#   One line per city showing the converted local time.

from datetime import datetime, timedelta

deadline_utc = "2026-04-15 20:00"
offsets = {
    "Chicago": -5,
    "New York": -4,
    "London": 1,
    "Berlin": 2,
    "Tokyo": 9,
}

deadline = datetime.strptime(deadline_utc, "%Y-%m-%d %H:%M")

print("Deadline by time zone")
print("---------------------")
print(f"UTC deadline: {deadline.strftime('%Y-%m-%d %H:%M')}")

for city, offset in offsets.items():
    local_time = deadline + timedelta(hours=offset)
    print(f"{city:10} {local_time.strftime('%Y-%m-%d %H:%M')}")
