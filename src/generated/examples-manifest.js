export const examples = [
  {
    "id": "hello-runner",
    "title": "Hello Runner",
    "category": "Getting started",
    "summary": "A tiny personalized script that makes the edit-and-rerun workflow obvious.",
    "tags": [
      "starter",
      "basics",
      "print"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "The default landing example with a few editable constants and text-only output.",
    "scriptPath": "examples/getting-started/hello-runner.py",
    "issueContext": "Starter example for the default landing experience.",
    "featured": true,
    "checks": [
      {
        "type": "includes",
        "value": "freeCodeCamp Python Runner"
      }
    ],
    "script": "# Hello Runner\n# ------------\n# What this script does:\n#   Prints a short personalized summary so learners can see the edit-and-rerun\n#   workflow without needing any extra concepts.\n#\n# Which variables to edit:\n#   - name\n#   - hours_saved\n#   - favorite_task\n#\n# Assumptions and limitations:\n#   - This is just a starter example.\n#   - It only prints text.\n#\n# Expected output shape:\n#   A few lines of terminal-style text.\n\nname = \"Avery\"\nhours_saved = 3.5\nfavorite_task = \"budget planning\"\n\nprint(\"freeCodeCamp Python Runner\")\nprint(\"---------------------------\")\nprint(f\"Hello, {name}!\")\nprint(f\"This tiny script says you saved about {hours_saved:.1f} hours.\")\nprint(f\"Next up: use Python to automate more of your {favorite_task}.\")\n"
  },
  {
    "id": "mortgage-payment",
    "title": "Mortgage payment calculator",
    "category": "Money & loans",
    "summary": "Estimate a monthly mortgage payment from principal, rate, and term.",
    "tags": [
      "mortgage",
      "loan",
      "finance"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "A fixed-rate monthly payment example with explicit assumptions and printed totals.",
    "scriptPath": "examples/finance/mortgage-payment.py",
    "issueContext": "Initial curated example pack",
    "featured": true,
    "checks": [
      {
        "type": "includes",
        "value": "Monthly payment:"
      }
    ],
    "script": "# Mortgage payment calculator\n# Edit: loan_amount, annual_interest_rate, and loan_term_years.\n# Assumptions: fixed-rate loan with equal monthly principal-and-interest payments.\n# Limitations: excludes taxes, insurance, HOA dues, and closing costs.\n# Output: prints the estimated monthly payment and total amount paid.\n\nloan_amount = 325000\nannual_interest_rate = 6.25\nloan_term_years = 30\n\nmonthly_rate = (annual_interest_rate / 100) / 12\npayment_count = loan_term_years * 12\n\npayment = loan_amount * (\n    monthly_rate * (1 + monthly_rate) ** payment_count\n) / ((1 + monthly_rate) ** payment_count - 1)\n\ntotal_paid = payment * payment_count\n\nprint(\"Mortgage payment estimate\")\nprint(\"-\" * 28)\nprint(f\"Monthly payment: ${payment:,.2f}\")\nprint(f\"Total of payments: ${total_paid:,.2f}\")\n\n"
  },
  {
    "id": "compound-interest",
    "title": "Compound interest calculator",
    "category": "Money & loans",
    "summary": "Project balance growth with regular monthly contributions.",
    "tags": [
      "savings",
      "interest",
      "investment"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Shows compounding with a small loop and clearly labeled outputs.",
    "scriptPath": "examples/finance/compound-interest.py",
    "issueContext": "Initial curated example pack",
    "featured": true,
    "checks": [
      {
        "type": "includes",
        "value": "Ending balance:"
      }
    ],
    "script": "# Compound interest calculator\n# Edit: starting_balance, monthly_contribution, annual_rate, and years.\n# Assumptions: contributions happen monthly and the annual rate compounds monthly.\n# Limitations: this is a simple growth estimate and does not model taxes or fees.\n# Output: prints the ending balance and total contributions over the full period.\n\nstarting_balance = 12000\nmonthly_contribution = 350\nannual_rate = 5.5\nyears = 18\n\nmonthly_rate = (annual_rate / 100) / 12\nmonths = years * 12\nbalance = starting_balance\n\nfor _ in range(months):\n    balance = (balance + monthly_contribution) * (1 + monthly_rate)\n\ntotal_contributions = starting_balance + monthly_contribution * months\ngrowth = balance - total_contributions\n\nprint(\"Compound growth estimate\")\nprint(\"-\" * 25)\nprint(f\"Ending balance:     ${balance:,.2f}\")\nprint(f\"Total contributions:${total_contributions:,.2f}\")\nprint(f\"Investment growth:  ${growth:,.2f}\")\n\n"
  },
  {
    "id": "timezone-deadline",
    "title": "Time zone deadline converter",
    "category": "Time & timezone",
    "summary": "Translate a UTC deadline into a few local times without hidden logic.",
    "tags": [
      "time",
      "timezone",
      "schedule"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "A simple meeting and deadline helper with explicit city offsets.",
    "scriptPath": "examples/time/timezone-deadline.py",
    "issueContext": "Time-zone example. Keep offsets explicit and note DST limitations.",
    "featured": true,
    "checks": [
      {
        "type": "includes",
        "value": "Deadline by time zone"
      }
    ],
    "script": "# Time Zone Deadline Converter\n# ----------------------------\n# What this script does:\n#   Converts a single deadline into a few local times so a team can coordinate\n#   without mental math.\n#\n# Which variables to edit:\n#   - deadline_utc\n#   - offsets\n#\n# Assumptions and limitations:\n#   - Offsets are fixed hours from UTC in this beginner-friendly example.\n#   - Daylight Saving Time adjustments are not handled automatically.\n#\n# Expected output shape:\n#   One line per city showing the converted local time.\n\nfrom datetime import datetime, timedelta\n\ndeadline_utc = \"2026-04-15 20:00\"\noffsets = {\n    \"Chicago\": -5,\n    \"New York\": -4,\n    \"London\": 1,\n    \"Berlin\": 2,\n    \"Tokyo\": 9,\n}\n\ndeadline = datetime.strptime(deadline_utc, \"%Y-%m-%d %H:%M\")\n\nprint(\"Deadline by time zone\")\nprint(\"---------------------\")\nprint(f\"UTC deadline: {deadline.strftime('%Y-%m-%d %H:%M')}\")\n\nfor city, offset in offsets.items():\n    local_time = deadline + timedelta(hours=offset)\n    print(f\"{city:10} {local_time.strftime('%Y-%m-%d %H:%M')}\")\n"
  },
  {
    "id": "days-between-dates",
    "title": "Days between dates",
    "category": "Time & timezone",
    "summary": "Compute signed and absolute day counts between two ISO dates.",
    "tags": [
      "date",
      "time",
      "calendar"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Uses the standard library date type to keep the calculation transparent.",
    "scriptPath": "examples/time/days-between-dates.py",
    "issueContext": "Initial curated example pack",
    "featured": true,
    "checks": [
      {
        "type": "includes",
        "value": "Signed days:"
      }
    ],
    "script": "# Days-between-dates calculator\n# Edit: start_date and end_date using YYYY-MM-DD strings.\n# Assumptions: calendar dates are valid ISO dates with no time-of-day component.\n# Limitations: this reports absolute day counts and ignores business-day rules.\n# Output: prints the signed and absolute number of days between the two dates.\n\nfrom datetime import date\n\nstart_date = \"2026-01-15\"\nend_date = \"2026-03-29\"\n\nstart = date.fromisoformat(start_date)\nend = date.fromisoformat(end_date)\ndelta = end - start\n\nprint(\"Days between dates\")\nprint(\"-\" * 18)\nprint(f\"Start date:  {start.isoformat()}\")\nprint(f\"End date:    {end.isoformat()}\")\nprint(f\"Signed days: {delta.days}\")\nprint(f\"Absolute:    {abs(delta.days)}\")\n\n"
  },
  {
    "id": "business-days-between-dates",
    "title": "Business days between dates",
    "category": "Time & timezone",
    "summary": "Count weekdays in a date range without introducing holiday logic.",
    "tags": [
      "date",
      "workday",
      "calendar"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "A loop-based workday counter that is easy to modify later.",
    "scriptPath": "examples/time/business-days-between-dates.py",
    "issueContext": "Initial curated example pack",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Business days:"
      }
    ],
    "script": "# Business-days-between-dates calculator\n# Edit: start_date and end_date using YYYY-MM-DD strings.\n# Assumptions: Monday-Friday are workdays and weekends are excluded.\n# Limitations: this simplified example does not account for holidays.\n# Output: prints the number of business days between the two dates, inclusive.\n\nfrom datetime import date, timedelta\n\nstart_date = \"2026-03-02\"\nend_date = \"2026-03-29\"\n\nstart = date.fromisoformat(start_date)\nend = date.fromisoformat(end_date)\nstep = timedelta(days=1)\nbusiness_days = 0\ncurrent = start\n\nwhile current <= end:\n    if current.weekday() < 5:\n        business_days += 1\n    current += step\n\nprint(\"Business-day count\")\nprint(\"-\" * 18)\nprint(f\"Range: {start.isoformat()} to {end.isoformat()}\")\nprint(f\"Business days: {business_days}\")\n\n"
  },
  {
    "id": "json-pretty-printer",
    "title": "JSON pretty-printer",
    "category": "Data & text utilities",
    "summary": "Format compact JSON text into readable, indented output.",
    "tags": [
      "json",
      "text",
      "developer"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "A simple data-text utility that keeps everything inline and text-only.",
    "scriptPath": "examples/data/json-pretty-printer.py",
    "issueContext": "Initial curated example pack",
    "featured": true,
    "checks": [
      {
        "type": "includes",
        "value": "Top-level type:"
      }
    ],
    "script": "# JSON pretty-printer\n# Edit: raw_json_text by pasting a compact JSON string into the triple quotes.\n# Assumptions: the input is valid JSON text and should be displayed readably.\n# Limitations: this script only prints text and does not validate against schemas.\n# Output: prints nicely indented JSON and a short structural summary.\n\nimport json\n\nraw_json_text = \"\"\"\n{\"name\":\"Ada\",\"languages\":[\"Python\",\"JavaScript\"],\"active\":true,\"projects\":3}\n\"\"\".strip()\n\nparsed = json.loads(raw_json_text)\nformatted = json.dumps(parsed, indent=2, sort_keys=True)\n\nprint(\"Pretty JSON\")\nprint(\"-\" * 11)\nprint(formatted)\nprint(\"\")\nprint(f\"Top-level type: {type(parsed).__name__}\")\nprint(f\"Top-level keys: {len(parsed)}\")\n\n"
  },
  {
    "id": "running-pace",
    "title": "Running pace calculator",
    "category": "Health & everyday metrics",
    "summary": "Convert a finish time into pace-per-mile and a projected 5K time.",
    "tags": [
      "pace",
      "fitness",
      "calculator"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "A small everyday-metrics example with transparent formulas and readable output.",
    "scriptPath": "examples/health/running-pace.py",
    "issueContext": "Initial curated example pack",
    "featured": true,
    "checks": [
      {
        "type": "includes",
        "value": "Pace per mile:"
      }
    ],
    "script": "# Running pace calculator\n# Edit: distance_miles and finish_time_minutes.\n# Assumptions: distance is entered in miles and total time is entered in minutes.\n# Limitations: this example does not convert from hours/minutes/seconds inputs.\n# Output: prints pace per mile and an estimated 5K finish time at the same pace.\n\ndistance_miles = 6.2\nfinish_time_minutes = 54\n\npace_minutes = finish_time_minutes / distance_miles\npace_whole_minutes = int(pace_minutes)\npace_seconds = round((pace_minutes - pace_whole_minutes) * 60)\nestimated_5k_minutes = pace_minutes * 3.10686\n\nprint(\"Running pace estimate\")\nprint(\"-\" * 21)\nprint(f\"Distance: {distance_miles:.2f} miles\")\nprint(f\"Finish time: {finish_time_minutes:.1f} minutes\")\nprint(f\"Pace per mile: {pace_whole_minutes}:{pace_seconds:02d}\")\nprint(f\"Estimated 5K: {estimated_5k_minutes:.1f} minutes\")\n\n"
  }
];
