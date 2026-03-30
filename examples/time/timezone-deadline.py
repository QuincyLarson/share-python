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

date_part, time_part = deadline_utc.split(" ")
year_text, month_text, day_text = date_part.split("-")
hour_text, minute_text = time_part.split(":")

deadline = datetime(
    int(year_text),
    int(month_text),
    int(day_text),
    int(hour_text),
    int(minute_text),
)


def format_datetime(value):
    return "{:04d}-{:02d}-{:02d} {:02d}:{:02d}".format(
        value.year,
        value.month,
        value.day,
        value.hour,
        value.minute,
    )


def pad_right(text, width):
    padding = width - len(text)
    if padding <= 0:
        return text
    return text + (" " * padding)


deadline_label = format_datetime(deadline)

print("Deadline by time zone")
print("---------------------")
print("UTC deadline: " + deadline_label)

for city, offset in offsets.items():
    local_time = deadline + timedelta(hours=offset)
    local_label = format_datetime(local_time)
    print(pad_right(city, 10) + " " + local_label)
