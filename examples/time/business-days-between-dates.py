# Business-days-between-dates calculator
# Edit: start_date and end_date using YYYY-MM-DD strings.
# Assumptions: Monday-Friday are workdays and weekends are excluded.
# Limitations: this simplified example does not account for holidays.
# Output: prints the number of business days between the two dates, inclusive.

from datetime import date, timedelta

start_date = "2026-03-02"
end_date = "2026-03-29"

start = date.fromisoformat(start_date)
end = date.fromisoformat(end_date)
step = timedelta(days=1)
business_days = 0
current = start

while current <= end:
    if current.weekday() < 5:
        business_days += 1
    current += step

print("Business-day count")
print("-" * 18)
print(f"Range: {start.isoformat()} to {end.isoformat()}")
print(f"Business days: {business_days}")

