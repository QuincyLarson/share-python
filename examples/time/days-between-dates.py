# Days-between-dates calculator
# Edit: start_date and end_date using YYYY-MM-DD strings.
# Assumptions: calendar dates are valid ISO dates with no time-of-day component.
# Limitations: this reports absolute day counts and ignores business-day rules.
# Output: prints the signed and absolute number of days between the two dates.

from datetime import date

start_date = "2026-01-15"
end_date = "2026-03-29"

start = date.fromisoformat(start_date)
end = date.fromisoformat(end_date)
delta = end - start

print("Days between dates")
print("-" * 18)
print(f"Start date:  {start.isoformat()}")
print(f"End date:    {end.isoformat()}")
print(f"Signed days: {delta.days}")
print(f"Absolute:    {abs(delta.days)}")

