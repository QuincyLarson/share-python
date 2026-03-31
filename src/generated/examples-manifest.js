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
    "script": "# Mortgage payment calculator\n# Edit: loan_amount, annual_interest_rate, and loan_term_years.\n# Assumptions: fixed-rate loan with equal monthly principal-and-interest payments.\n# Limitations: excludes taxes, insurance, HOA dues, and closing costs.\n# Output: prints the estimated monthly payment and total amount paid.\n\nloan_amount = 325000\nannual_interest_rate = 6.25\nloan_term_years = 30\n\nmonthly_rate = (annual_interest_rate / 100) / 12\npayment_count = loan_term_years * 12\n\npayment = loan_amount * (\n    monthly_rate * (1 + monthly_rate) ** payment_count\n) / ((1 + monthly_rate) ** payment_count - 1)\n\ntotal_paid = payment * payment_count\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"${}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\nlines = [\n    \"Mortgage payment estimate\",\n    \"-\" * 28,\n    \"Monthly payment: \" + format_currency(payment),\n    \"Total of payments: \" + format_currency(total_paid),\n]\n\nprint(\"\\n\".join(lines))\n"
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
    "script": "# Time Zone Deadline Converter\n# ----------------------------\n# What this script does:\n#   Converts a single deadline into a few local times so a team can coordinate\n#   without mental math.\n#\n# Which variables to edit:\n#   - deadline_utc\n#   - offsets\n#\n# Assumptions and limitations:\n#   - Offsets are fixed hours from UTC in this beginner-friendly example.\n#   - Daylight Saving Time adjustments are not handled automatically.\n#\n# Expected output shape:\n#   One line per city showing the converted local time.\n\nfrom datetime import datetime, timedelta\n\ndeadline_utc = \"2026-04-15 20:00\"\noffsets = {\n    \"Chicago\": -5,\n    \"New York\": -4,\n    \"London\": 1,\n    \"Berlin\": 2,\n    \"Tokyo\": 9,\n}\n\ndate_part, time_part = deadline_utc.split(\" \")\nyear_text, month_text, day_text = date_part.split(\"-\")\nhour_text, minute_text = time_part.split(\":\")\n\ndeadline = datetime(\n    int(year_text),\n    int(month_text),\n    int(day_text),\n    int(hour_text),\n    int(minute_text),\n)\n\n\ndef format_datetime(value):\n    return \"{:04d}-{:02d}-{:02d} {:02d}:{:02d}\".format(\n        value.year,\n        value.month,\n        value.day,\n        value.hour,\n        value.minute,\n    )\n\n\ndef pad_right(text, width):\n    padding = width - len(text)\n    if padding <= 0:\n        return text\n    return text + (\" \" * padding)\n\n\ndeadline_label = format_datetime(deadline)\n\nprint(\"Deadline by time zone\")\nprint(\"---------------------\")\nprint(\"UTC deadline: \" + deadline_label)\n\nfor city, offset in offsets.items():\n    local_time = deadline + timedelta(hours=offset)\n    local_label = format_datetime(local_time)\n    print(pad_right(city, 10) + \" \" + local_label)\n"
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
    "pageGroup": "Health",
    "pageSection": "Fitness",
    "routeSlug": "pace-calculator",
    "pagePath": "/health-calculators/pace-calculator/",
    "seoTitle": "Pace Calculator Python Script | SharePython.com",
    "seoDescription": "Convert running time into pace-per-mile and projected race time with a simple Python script you can edit in the browser.",
    "checks": [
      {
        "type": "includes",
        "value": "Pace per mile:"
      }
    ],
    "script": "# Running pace calculator\n# Edit: distance_miles and finish_time_minutes.\n# Assumptions: distance is entered in miles and total time is entered in minutes.\n# Limitations: this example does not convert from hours/minutes/seconds inputs.\n# Output: prints pace per mile and an estimated 5K finish time at the same pace.\n\ndistance_miles = 6.2\nfinish_time_minutes = 54\n\npace_minutes = finish_time_minutes / distance_miles\npace_whole_minutes = int(pace_minutes)\npace_seconds = round((pace_minutes - pace_whole_minutes) * 60)\nestimated_5k_minutes = pace_minutes * 3.10686\n\nprint(\"Running pace estimate\")\nprint(\"-\" * 21)\nprint(f\"Distance: {distance_miles:.2f} miles\")\nprint(f\"Finish time: {finish_time_minutes:.1f} minutes\")\nprint(f\"Pace per mile: {pace_whole_minutes}:{pace_seconds:02d}\")\nprint(f\"Estimated 5K: {estimated_5k_minutes:.1f} minutes\")\n\n"
  },
  {
    "id": "recipe-fraction-scaler",
    "title": "Recipe fraction scaler",
    "category": "Food & household",
    "summary": "Scale a simple ingredient list with exact fractional amounts.",
    "tags": [
      "recipe",
      "fractions",
      "kitchen"
    ],
    "runtime": "full",
    "difficulty": "beginner",
    "description": "Uses Python's fractions module to keep small measurement math readable and exact.",
    "scriptPath": "examples/everyday/recipe-fraction-scaler.py",
    "issueContext": "First curated Full Python example for compatibility coverage and learner guidance.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Scaled ingredient list"
      }
    ],
    "script": "# Recipe fraction scaler\n# ----------------------\n# What this script does:\n#   Scales a simple ingredient list while keeping exact fractional measurements.\n#\n# Which variables to edit:\n#   - desired_batches\n#   - ingredients\n#\n# Assumptions and limitations:\n#   - Fractions stay as exact numerator/denominator values in the output.\n#   - This example does not convert between kitchen units automatically.\n#\n# Expected output shape:\n#   One heading plus one scaled amount per ingredient.\n\nfrom fractions import Fraction\n\ndesired_batches = Fraction(3, 2)\ningredients = [\n    (\"flour (cups)\", Fraction(2, 1)),\n    (\"olive oil (tablespoons)\", Fraction(3, 2)),\n    (\"salt (teaspoons)\", Fraction(3, 4)),\n]\n\n\ndef format_fraction(value):\n    if value.denominator == 1:\n        return str(value.numerator)\n\n    return f\"{value.numerator}/{value.denominator}\"\n\n\nprint(\"Scaled ingredient list\")\nprint(\"----------------------\")\nprint(f\"Batch multiplier: {format_fraction(desired_batches)}x\")\n\nfor label, amount in ingredients:\n    scaled = amount * desired_batches\n    print(f\"{label:26} {format_fraction(scaled)}\")\n"
  },
  {
    "id": "mortgage-calculator",
    "title": "Mortgage Calculator",
    "category": "Mortgage and Real Estate",
    "summary": "Estimate a fixed-rate mortgage payment, total paid, and total interest.",
    "tags": [
      "mortgage",
      "loan",
      "home"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate a fixed-rate mortgage payment, total paid, and total interest. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Mortgage Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Monthly payment:"
      }
    ],
    "routeSlug": "mortgage-calculator",
    "seoTitle": "Mortgage Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate a fixed-rate mortgage payment, total paid, and total interest. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Mortgage Calculator\n# Edit: loan_amount, annual_interest_rate, and loan_term_years.\n# Assumptions: fixed-rate amortizing loan with equal monthly payments.\n# Limitations: excludes taxes, insurance, fees, and irregular payment schedules.\n# Output: prints the monthly payment, total paid, and total interest.\n\nloan_amount = 325000\nannual_interest_rate = 6.25\nloan_term_years = 30\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef monthly_payment(principal, annual_rate_percent, years):\n    payment_count = int(years * 12)\n    monthly_rate = (annual_rate_percent / 100) / 12\n\n    if monthly_rate == 0:\n        return principal / payment_count\n\n    growth = (1 + monthly_rate) ** payment_count\n    return principal * (monthly_rate * growth) / (growth - 1)\n\n\npayment = monthly_payment(loan_amount, annual_interest_rate, loan_term_years)\npayment_count = int(loan_term_years * 12)\ntotal_paid = payment * payment_count\ntotal_interest = total_paid - loan_amount\n\nlines = [\n    \"Mortgage payment summary\",\n    \"-\" * len(\"Mortgage payment summary\"),\n    \"Monthly payment: \" + format_currency(payment),\n    \"Total paid: \" + format_currency(total_paid),\n    \"Total interest: \" + format_currency(total_interest),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Mortgage and Real Estate",
    "pagePath": "/financial-calculators/mortgage-calculator/"
  },
  {
    "id": "amortization-calculator",
    "title": "Amortization Calculator",
    "category": "Mortgage and Real Estate",
    "summary": "Print a compact amortization summary and the opening payment rows.",
    "tags": [
      "amortization",
      "mortgage",
      "loan"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Print a compact amortization summary and the opening payment rows. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Amortization Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Scheduled payment:"
      }
    ],
    "routeSlug": "amortization-calculator",
    "seoTitle": "Amortization Calculator Python Script | SharePython.com",
    "seoDescription": "Print a compact amortization summary and the opening payment rows. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Amortization Calculator\n# Edit: loan_amount, annual_interest_rate, loan_term_years, and extra_monthly_payment.\n# Assumptions: fixed-rate loan and monthly extra payments applied directly to principal.\n# Limitations: shows only a summary plus the first three scheduled payments.\n# Output: prints payment details, payoff month count, and the opening schedule rows.\n\nloan_amount = 325000\nannual_interest_rate = 6.15\nloan_term_years = 30\nextra_monthly_payment = 0\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef monthly_payment(principal, annual_rate_percent, years):\n    payment_count = int(years * 12)\n    monthly_rate = (annual_rate_percent / 100) / 12\n\n    if monthly_rate == 0:\n        return principal / payment_count\n\n    growth = (1 + monthly_rate) ** payment_count\n    return principal * (monthly_rate * growth) / (growth - 1)\n\n\npayment = monthly_payment(loan_amount, annual_interest_rate, loan_term_years)\nmonthly_rate = (annual_interest_rate / 100) / 12\nbalance = loan_amount\nschedule = []\nmonth = 0\n\nwhile balance > 0.01 and month < 1000:\n    month += 1\n    interest = balance * monthly_rate\n    principal_paid = min(balance, payment + extra_monthly_payment - interest)\n    balance = max(0.0, balance - principal_paid)\n\n    if month <= 3:\n        schedule.append(\n            \"Month {:>2}: principal {} | interest {} | balance {}\".format(\n                month,\n                format_currency(principal_paid),\n                format_currency(interest),\n                format_currency(balance),\n            )\n        )\n\nlines = [\n    \"Amortization Calculator\",\n    \"-\" * len(\"Amortization Calculator\"),\n    \"Scheduled payment: \" + format_currency(payment),\n    \"Extra monthly payment: \" + format_currency(extra_monthly_payment),\n    \"Estimated payoff month: \" + str(month),\n    \"\",\n] + schedule\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Mortgage and Real Estate",
    "pagePath": "/financial-calculators/amortization-calculator/"
  },
  {
    "id": "mortgage-payoff-calculator",
    "title": "Mortgage Payoff Calculator",
    "category": "Mortgage and Real Estate",
    "summary": "Estimate how extra monthly payments change a mortgage payoff timeline.",
    "tags": [
      "mortgage",
      "payoff",
      "loan"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate how extra monthly payments change a mortgage payoff timeline. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Mortgage Payoff Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Estimated payoff months:"
      }
    ],
    "routeSlug": "mortgage-payoff-calculator",
    "seoTitle": "Mortgage Payoff Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate how extra monthly payments change a mortgage payoff timeline. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Mortgage Payoff Calculator\n# Edit: starting_balance, annual_interest_rate, monthly_payment, and extra_monthly_payment.\n# Assumptions: interest compounds monthly and payments are made at the end of each month.\n# Limitations: does not model late fees or rate changes.\n# Output: prints the payoff month count and total interest paid.\n\nstarting_balance = 285000\nannual_interest_rate = 6.1\nmonthly_payment = 2150\nextra_monthly_payment = 300\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\nmonthly_rate = (annual_interest_rate / 100) / 12\nbalance = starting_balance\nmonth = 0\ntotal_interest = 0.0\n\nwhile balance > 0.01 and month < 1200:\n    month += 1\n    interest = balance * monthly_rate\n    total_interest += interest\n    principal_paid = max(0.0, monthly_payment + extra_monthly_payment - interest)\n    balance = max(0.0, balance - principal_paid)\n\nlines = [\n    \"Mortgage Payoff Calculator\",\n    \"-\" * len(\"Mortgage Payoff Calculator\"),\n    \"Total monthly payment: \" + format_currency(monthly_payment + extra_monthly_payment),\n    \"Estimated payoff months: \" + str(month),\n    \"Total interest paid: \" + format_currency(total_interest),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Mortgage and Real Estate",
    "pagePath": "/financial-calculators/mortgage-payoff-calculator/"
  },
  {
    "id": "house-affordability-calculator",
    "title": "House Affordability Calculator",
    "category": "Mortgage and Real Estate",
    "summary": "Estimate a supported loan amount from income, rate, and a target housing ratio.",
    "tags": [
      "housing",
      "affordability",
      "mortgage"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate a supported loan amount from income, rate, and a target housing ratio. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for House Affordability Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Estimated supported loan amount:"
      }
    ],
    "routeSlug": "house-affordability-calculator",
    "seoTitle": "House Affordability Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate a supported loan amount from income, rate, and a target housing ratio. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# House Affordability Calculator\n# Edit: gross_monthly_income, target_dti_ratio, annual_interest_rate, and loan_term_years.\n# Assumptions: monthly housing cost is capped by the chosen debt-to-income ratio.\n# Limitations: excludes taxes, insurance, HOA, and lender overlays.\n# Output: prints an estimated maximum monthly payment and supported loan amount.\n\ngross_monthly_income = 8800\ntarget_dti_ratio = 0.28\nannual_interest_rate = 6.0\nloan_term_years = 30\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef format_percent(value):\n    return \"{:.2f}%\".format(value * 100)\n\n\ndef monthly_payment(principal, annual_rate_percent, years):\n    payment_count = int(years * 12)\n    monthly_rate = (annual_rate_percent / 100) / 12\n\n    if monthly_rate == 0:\n        return principal / payment_count\n\n    growth = (1 + monthly_rate) ** payment_count\n    return principal * (monthly_rate * growth) / (growth - 1)\n\n\ndef solve_rate(target_function, low=0.0, high=1.0, steps=80):\n    lower = low\n    upper = high\n\n    while target_function(upper) < 0:\n        upper *= 2\n        if upper > 100:\n            break\n\n    for _ in range(steps):\n        midpoint = (lower + upper) / 2\n        value = target_function(midpoint)\n\n        if value == 0:\n            return midpoint\n\n        if value > 0:\n            upper = midpoint\n        else:\n            lower = midpoint\n\n    return (lower + upper) / 2\n\n\ntarget_payment = gross_monthly_income * target_dti_ratio\n\ndef payment_gap(principal):\n    return monthly_payment(principal, annual_interest_rate, loan_term_years) - target_payment\n\nsupported_loan_amount = solve_rate(payment_gap, low=0.0, high=1000000.0)\n\nlines = [\n    \"House Affordability Calculator\",\n    \"-\" * len(\"House Affordability Calculator\"),\n    \"Target housing ratio: \" + format_percent(target_dti_ratio),\n    \"Maximum monthly payment: \" + format_currency(target_payment),\n    \"Estimated supported loan amount: \" + format_currency(supported_loan_amount),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Mortgage and Real Estate",
    "pagePath": "/financial-calculators/house-affordability-calculator/"
  },
  {
    "id": "rent-calculator",
    "title": "Rent Calculator",
    "category": "Mortgage and Real Estate",
    "summary": "Compare current rent costs with a simple income-based target.",
    "tags": [
      "rent",
      "housing",
      "budget"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Compare current rent costs with a simple income-based target. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Rent Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Housing ratio:"
      }
    ],
    "routeSlug": "rent-calculator",
    "seoTitle": "Rent Calculator Python Script | SharePython.com",
    "seoDescription": "Compare current rent costs with a simple income-based target. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Rent Calculator\n# Edit: gross_monthly_income, monthly_rent, and monthly_utilities.\n# Assumptions: a 30% housing-cost target is used as the reference point.\n# Limitations: does not model debt payments, taxes, or local cost-of-living rules.\n# Output: prints the current housing ratio and a recommended target rent.\n\ngross_monthly_income = 6200\nmonthly_rent = 1850\nmonthly_utilities = 175\ntarget_ratio = 0.30\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef format_percent(value):\n    return \"{:.2f}%\".format(value * 100)\n\n\nhousing_cost = monthly_rent + monthly_utilities\nhousing_ratio = housing_cost / gross_monthly_income\nrecommended_rent = gross_monthly_income * target_ratio - monthly_utilities\n\nlines = [\n    \"Rent Calculator\",\n    \"-\" * len(\"Rent Calculator\"),\n    \"Current housing cost: \" + format_currency(housing_cost),\n    \"Housing ratio: \" + format_percent(housing_ratio),\n    \"Target rent at 30%: \" + format_currency(recommended_rent),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Mortgage and Real Estate",
    "pagePath": "/financial-calculators/rent-calculator/"
  },
  {
    "id": "debt-to-income-ratio-calculator",
    "title": "Debt-to-Income Ratio Calculator",
    "category": "Mortgage and Real Estate",
    "summary": "Compute a gross monthly debt-to-income ratio from income and debt payments.",
    "tags": [
      "dti",
      "ratio",
      "loan"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Compute a gross monthly debt-to-income ratio from income and debt payments. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Debt-to-Income Ratio Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Debt-to-income ratio:"
      }
    ],
    "routeSlug": "debt-to-income-ratio-calculator",
    "seoTitle": "Debt-to-Income Ratio Calculator Python Script | SharePython.com",
    "seoDescription": "Compute a gross monthly debt-to-income ratio from income and debt payments. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Debt-to-Income Ratio Calculator\n# Edit: gross_monthly_income and monthly_debt_payments.\n# Assumptions: the ratio uses gross income before taxes.\n# Limitations: does not classify which debts a lender may exclude.\n# Output: prints the current debt-to-income ratio.\n\ngross_monthly_income = 7500\nmonthly_debt_payments = 2125\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef format_percent(value):\n    return \"{:.2f}%\".format(value * 100)\n\n\ndti_ratio = monthly_debt_payments / gross_monthly_income\n\nlines = [\n    \"Debt-to-Income Ratio Calculator\",\n    \"-\" * len(\"Debt-to-Income Ratio Calculator\"),\n    \"Gross monthly income: \" + format_currency(gross_monthly_income),\n    \"Debt payments: \" + format_currency(monthly_debt_payments),\n    \"Debt-to-income ratio: \" + format_percent(dti_ratio),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Mortgage and Real Estate",
    "pagePath": "/financial-calculators/debt-to-income-ratio-calculator/"
  },
  {
    "id": "real-estate-calculator",
    "title": "Real Estate Calculator",
    "category": "Mortgage and Real Estate",
    "summary": "Summarize cap rate, cash flow, and a simple appreciation scenario for a property.",
    "tags": [
      "real-estate",
      "property",
      "investing"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Summarize cap rate, cash flow, and a simple appreciation scenario for a property. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Real Estate Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Cap rate:"
      }
    ],
    "routeSlug": "real-estate-calculator",
    "seoTitle": "Real Estate Calculator Python Script | SharePython.com",
    "seoDescription": "Summarize cap rate, cash flow, and a simple appreciation scenario for a property. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Real Estate Calculator\n# Edit: purchase_price, down_payment_percent, annual_rent, annual_expenses, and appreciation_rate.\n# Assumptions: cash flow uses a simple first-year estimate.\n# Limitations: ignores taxes on gains, financing details, and irregular maintenance.\n# Output: prints cap rate, first-year cash flow, and a five-year value estimate.\n\npurchase_price = 360000\ndown_payment_percent = 0.25\nannual_rent = 34200\nannual_expenses = 9800\nannual_appreciation_rate = 0.03\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef format_percent(value):\n    return \"{:.2f}%\".format(value * 100)\n\n\ndown_payment = purchase_price * down_payment_percent\nnet_operating_income = annual_rent - annual_expenses\ncap_rate = net_operating_income / purchase_price\nfive_year_value = purchase_price * (1 + annual_appreciation_rate) ** 5\n\nlines = [\n    \"Real Estate Calculator\",\n    \"-\" * len(\"Real Estate Calculator\"),\n    \"Down payment: \" + format_currency(down_payment),\n    \"Net operating income: \" + format_currency(net_operating_income),\n    \"Cap rate: \" + format_percent(cap_rate),\n    \"Five-year value estimate: \" + format_currency(five_year_value),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Mortgage and Real Estate",
    "pagePath": "/financial-calculators/real-estate-calculator/"
  },
  {
    "id": "refinance-calculator",
    "title": "Refinance Calculator",
    "category": "Mortgage and Real Estate",
    "summary": "Compare current and proposed refinance payments and closing-cost break-even timing.",
    "tags": [
      "refinance",
      "mortgage",
      "loan"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Compare current and proposed refinance payments and closing-cost break-even timing. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Refinance Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Closing-cost break-even months:"
      }
    ],
    "routeSlug": "refinance-calculator",
    "seoTitle": "Refinance Calculator Python Script | SharePython.com",
    "seoDescription": "Compare current and proposed refinance payments and closing-cost break-even timing. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Refinance Calculator\n# Edit: current_balance, current_rate, current_years_left, new_rate, new_years, and closing_costs.\n# Assumptions: both loans are fixed-rate and comparable except for rate, term, and costs.\n# Limitations: does not include escrow or cash-out proceeds.\n# Output: prints payment change and the closing-cost break-even months.\n\ncurrent_balance = 295000\ncurrent_rate = 6.75\ncurrent_years_left = 26\nnew_rate = 5.9\nnew_years = 25\nclosing_costs = 5200\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef monthly_payment(principal, annual_rate_percent, years):\n    payment_count = int(years * 12)\n    monthly_rate = (annual_rate_percent / 100) / 12\n\n    if monthly_rate == 0:\n        return principal / payment_count\n\n    growth = (1 + monthly_rate) ** payment_count\n    return principal * (monthly_rate * growth) / (growth - 1)\n\n\ncurrent_payment = monthly_payment(current_balance, current_rate, current_years_left)\nnew_payment = monthly_payment(current_balance, new_rate, new_years)\nmonthly_savings = current_payment - new_payment\nbreak_even_months = closing_costs / monthly_savings if monthly_savings > 0 else 0\n\nlines = [\n    \"Refinance Calculator\",\n    \"-\" * len(\"Refinance Calculator\"),\n    \"Current payment: \" + format_currency(current_payment),\n    \"New payment: \" + format_currency(new_payment),\n    \"Monthly savings: \" + format_currency(monthly_savings),\n    \"Closing-cost break-even months: \" + \"{:.1f}\".format(break_even_months),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Mortgage and Real Estate",
    "pagePath": "/financial-calculators/refinance-calculator/"
  },
  {
    "id": "rental-property-calculator",
    "title": "Rental Property Calculator",
    "category": "Mortgage and Real Estate",
    "summary": "Estimate annual cash flow and cash-on-cash return for a rental property.",
    "tags": [
      "rental-property",
      "real-estate",
      "investing"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate annual cash flow and cash-on-cash return for a rental property. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Rental Property Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Cash-on-cash return:"
      }
    ],
    "routeSlug": "rental-property-calculator",
    "seoTitle": "Rental Property Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate annual cash flow and cash-on-cash return for a rental property. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Rental Property Calculator\n# Edit: monthly_rent, vacancy_rate, monthly_expenses, and all_in_cash_invested.\n# Assumptions: cash flow is modeled on a simple stabilized year.\n# Limitations: ignores financing changes, taxes, and appreciation.\n# Output: prints annual cash flow and cash-on-cash return.\n\nmonthly_rent = 2650\nvacancy_rate = 0.06\nmonthly_expenses = 980\nall_in_cash_invested = 92000\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef format_percent(value):\n    return \"{:.2f}%\".format(value * 100)\n\n\neffective_annual_rent = monthly_rent * 12 * (1 - vacancy_rate)\nannual_cash_flow = effective_annual_rent - (monthly_expenses * 12)\ncash_on_cash_return = annual_cash_flow / all_in_cash_invested\n\nlines = [\n    \"Rental Property Calculator\",\n    \"-\" * len(\"Rental Property Calculator\"),\n    \"Effective annual rent: \" + format_currency(effective_annual_rent),\n    \"Annual cash flow: \" + format_currency(annual_cash_flow),\n    \"Cash-on-cash return: \" + format_percent(cash_on_cash_return),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Mortgage and Real Estate",
    "pagePath": "/financial-calculators/rental-property-calculator/"
  },
  {
    "id": "apr-calculator",
    "title": "APR Calculator",
    "category": "Mortgage and Real Estate",
    "summary": "Estimate a loan APR from fees, payment amount, and term length.",
    "tags": [
      "apr",
      "loan",
      "fees"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate a loan APR from fees, payment amount, and term length. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for APR Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Estimated APR:"
      }
    ],
    "routeSlug": "apr-calculator",
    "seoTitle": "APR Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate a loan APR from fees, payment amount, and term length. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# APR Calculator\n# Edit: loan_amount, upfront_fees, monthly_payment, and loan_term_years.\n# Assumptions: APR is solved from a level-payment loan with upfront fees added to borrowing cost.\n# Limitations: uses a simple binary search and ignores odd payment timing.\n# Output: prints the estimated annual percentage rate.\n\nloan_amount = 24000\nupfront_fees = 650\nmonthly_payment = 488\nloan_term_years = 5\n\n\ndef format_percent(value):\n    return \"{:.2f}%\".format(value * 100)\n\n\ndef solve_rate(target_function, low=0.0, high=1.0, steps=80):\n    lower = low\n    upper = high\n\n    while target_function(upper) < 0:\n        upper *= 2\n        if upper > 100:\n            break\n\n    for _ in range(steps):\n        midpoint = (lower + upper) / 2\n        value = target_function(midpoint)\n\n        if value == 0:\n            return midpoint\n\n        if value > 0:\n            upper = midpoint\n        else:\n            lower = midpoint\n\n    return (lower + upper) / 2\n\n\npayment_count = int(loan_term_years * 12)\nnet_proceeds = loan_amount - upfront_fees\n\ndef payment_gap(monthly_rate):\n    if monthly_rate == 0:\n        present_value = monthly_payment * payment_count\n    else:\n        growth = (1 + monthly_rate) ** payment_count\n        present_value = monthly_payment * (1 - (1 / growth)) / monthly_rate\n\n    return present_value - net_proceeds\n\nmonthly_rate = solve_rate(payment_gap, low=0.0, high=0.05)\nestimated_apr = monthly_rate * 12\n\nlines = [\n    \"APR Calculator\",\n    \"-\" * len(\"APR Calculator\"),\n    \"Net loan proceeds: \" + str(round(net_proceeds, 2)),\n    \"Estimated APR: \" + format_percent(estimated_apr),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Mortgage and Real Estate",
    "pagePath": "/financial-calculators/apr-calculator/"
  },
  {
    "id": "fha-loan-calculator",
    "title": "FHA Loan Calculator",
    "category": "Mortgage and Real Estate",
    "summary": "Estimate a simplified FHA payment including monthly mortgage insurance.",
    "tags": [
      "fha",
      "mortgage",
      "insurance"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate a simplified FHA payment including monthly mortgage insurance. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for FHA Loan Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Monthly MIP:"
      }
    ],
    "routeSlug": "fha-loan-calculator",
    "seoTitle": "FHA Loan Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate a simplified FHA payment including monthly mortgage insurance. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# FHA Loan Calculator\n# Edit: home_price, down_payment_percent, annual_interest_rate, annual_mip_rate, and loan_term_years.\n# Assumptions: mortgage insurance is modeled as a simple annual percentage of the loan balance.\n# Limitations: does not model changing MIP rules or county loan limits.\n# Output: prints the estimated base payment and monthly insurance.\n\nhome_price = 315000\ndown_payment_percent = 0.035\nannual_interest_rate = 6.1\nannual_mip_rate = 0.0055\nloan_term_years = 30\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef monthly_payment(principal, annual_rate_percent, years):\n    payment_count = int(years * 12)\n    monthly_rate = (annual_rate_percent / 100) / 12\n\n    if monthly_rate == 0:\n        return principal / payment_count\n\n    growth = (1 + monthly_rate) ** payment_count\n    return principal * (monthly_rate * growth) / (growth - 1)\n\n\ndown_payment = home_price * down_payment_percent\nbase_loan_amount = home_price - down_payment\nbase_payment = monthly_payment(base_loan_amount, annual_interest_rate, loan_term_years)\nmonthly_mip = (base_loan_amount * annual_mip_rate) / 12\n\nlines = [\n    \"FHA Loan Calculator\",\n    \"-\" * len(\"FHA Loan Calculator\"),\n    \"Down payment: \" + format_currency(down_payment),\n    \"Base payment: \" + format_currency(base_payment),\n    \"Monthly MIP: \" + format_currency(monthly_mip),\n    \"Estimated total payment: \" + format_currency(base_payment + monthly_mip),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Mortgage and Real Estate",
    "pagePath": "/financial-calculators/fha-loan-calculator/"
  },
  {
    "id": "va-mortgage-calculator",
    "title": "VA Mortgage Calculator",
    "category": "Mortgage and Real Estate",
    "summary": "Estimate a simplified VA mortgage payment with a rolled-in funding fee.",
    "tags": [
      "va",
      "mortgage",
      "loan"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate a simplified VA mortgage payment with a rolled-in funding fee. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for VA Mortgage Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Funding fee:"
      }
    ],
    "routeSlug": "va-mortgage-calculator",
    "seoTitle": "VA Mortgage Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate a simplified VA mortgage payment with a rolled-in funding fee. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# VA Mortgage Calculator\n# Edit: home_price, down_payment_amount, funding_fee_rate, annual_interest_rate, and loan_term_years.\n# Assumptions: the funding fee is rolled into the financed balance.\n# Limitations: does not model disability exemptions or county-specific rules.\n# Output: prints the financed balance and estimated monthly payment.\n\nhome_price = 410000\ndown_payment_amount = 0\nfunding_fee_rate = 0.0215\nannual_interest_rate = 5.95\nloan_term_years = 30\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef monthly_payment(principal, annual_rate_percent, years):\n    payment_count = int(years * 12)\n    monthly_rate = (annual_rate_percent / 100) / 12\n\n    if monthly_rate == 0:\n        return principal / payment_count\n\n    growth = (1 + monthly_rate) ** payment_count\n    return principal * (monthly_rate * growth) / (growth - 1)\n\n\nbase_loan_amount = home_price - down_payment_amount\nfunding_fee = base_loan_amount * funding_fee_rate\nfinanced_balance = base_loan_amount + funding_fee\npayment = monthly_payment(financed_balance, annual_interest_rate, loan_term_years)\n\nlines = [\n    \"VA Mortgage Calculator\",\n    \"-\" * len(\"VA Mortgage Calculator\"),\n    \"Funding fee: \" + format_currency(funding_fee),\n    \"Financed balance: \" + format_currency(financed_balance),\n    \"Monthly payment: \" + format_currency(payment),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Mortgage and Real Estate",
    "pagePath": "/financial-calculators/va-mortgage-calculator/"
  },
  {
    "id": "home-equity-loan-calculator",
    "title": "Home Equity Loan Calculator",
    "category": "Mortgage and Real Estate",
    "summary": "Estimate a fixed-rate home equity loan payment and total interest.",
    "tags": [
      "home-equity",
      "loan",
      "mortgage"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate a fixed-rate home equity loan payment and total interest. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Home Equity Loan Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Monthly payment:"
      }
    ],
    "routeSlug": "home-equity-loan-calculator",
    "seoTitle": "Home Equity Loan Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate a fixed-rate home equity loan payment and total interest. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Home Equity Loan Calculator\n# Edit: loan_amount, annual_interest_rate, and loan_term_years.\n# Assumptions: fixed-rate amortizing loan with equal monthly payments.\n# Limitations: excludes taxes, insurance, fees, and irregular payment schedules.\n# Output: prints the monthly payment, total paid, and total interest.\n\nloan_amount = 70000\nannual_interest_rate = 8.35\nloan_term_years = 15\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef monthly_payment(principal, annual_rate_percent, years):\n    payment_count = int(years * 12)\n    monthly_rate = (annual_rate_percent / 100) / 12\n\n    if monthly_rate == 0:\n        return principal / payment_count\n\n    growth = (1 + monthly_rate) ** payment_count\n    return principal * (monthly_rate * growth) / (growth - 1)\n\n\npayment = monthly_payment(loan_amount, annual_interest_rate, loan_term_years)\npayment_count = int(loan_term_years * 12)\ntotal_paid = payment * payment_count\ntotal_interest = total_paid - loan_amount\n\nlines = [\n    \"Home equity loan summary\",\n    \"-\" * len(\"Home equity loan summary\"),\n    \"Monthly payment: \" + format_currency(payment),\n    \"Total paid: \" + format_currency(total_paid),\n    \"Total interest: \" + format_currency(total_interest),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Mortgage and Real Estate",
    "pagePath": "/financial-calculators/home-equity-loan-calculator/"
  },
  {
    "id": "heloc-calculator",
    "title": "HELOC Calculator",
    "category": "Mortgage and Real Estate",
    "summary": "Estimate draw-period interest-only payments and later repayment-period payments.",
    "tags": [
      "heloc",
      "home-equity",
      "loan"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate draw-period interest-only payments and later repayment-period payments. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for HELOC Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Interest-only draw payment:"
      }
    ],
    "routeSlug": "heloc-calculator",
    "seoTitle": "HELOC Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate draw-period interest-only payments and later repayment-period payments. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# HELOC Calculator\n# Edit: credit_line_balance, annual_interest_rate, draw_period_years, and repayment_years.\n# Assumptions: the draw period uses interest-only payments.\n# Limitations: does not model variable-rate resets or future draws.\n# Output: prints draw-period and repayment-period payment estimates.\n\ncredit_line_balance = 85000\nannual_interest_rate = 7.4\ndraw_period_years = 10\nrepayment_years = 15\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef monthly_payment(principal, annual_rate_percent, years):\n    payment_count = int(years * 12)\n    monthly_rate = (annual_rate_percent / 100) / 12\n\n    if monthly_rate == 0:\n        return principal / payment_count\n\n    growth = (1 + monthly_rate) ** payment_count\n    return principal * (monthly_rate * growth) / (growth - 1)\n\n\nmonthly_rate = (annual_interest_rate / 100) / 12\ndraw_payment = credit_line_balance * monthly_rate\nrepayment_payment = monthly_payment(credit_line_balance, annual_interest_rate, repayment_years)\n\nlines = [\n    \"HELOC Calculator\",\n    \"-\" * len(\"HELOC Calculator\"),\n    \"Interest-only draw payment: \" + format_currency(draw_payment),\n    \"Repayment-period payment: \" + format_currency(repayment_payment),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Mortgage and Real Estate",
    "pagePath": "/financial-calculators/heloc-calculator/"
  },
  {
    "id": "down-payment-calculator",
    "title": "Down Payment Calculator",
    "category": "Mortgage and Real Estate",
    "summary": "Convert a home price and down payment rate into cash down and financed balance.",
    "tags": [
      "down-payment",
      "mortgage",
      "home"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Convert a home price and down payment rate into cash down and financed balance. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Down Payment Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Down payment amount:"
      }
    ],
    "routeSlug": "down-payment-calculator",
    "seoTitle": "Down Payment Calculator Python Script | SharePython.com",
    "seoDescription": "Convert a home price and down payment rate into cash down and financed balance. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Down Payment Calculator\n# Edit: home_price and down_payment_percent.\n# Assumptions: the down payment is expressed as a simple percent of the purchase price.\n# Limitations: does not estimate closing costs or reserves.\n# Output: prints the down payment amount and remaining loan balance.\n\nhome_price = 365000\ndown_payment_percent = 0.20\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef format_percent(value):\n    return \"{:.2f}%\".format(value * 100)\n\n\ndown_payment_amount = home_price * down_payment_percent\nremaining_loan_balance = home_price - down_payment_amount\n\nlines = [\n    \"Down Payment Calculator\",\n    \"-\" * len(\"Down Payment Calculator\"),\n    \"Down payment rate: \" + format_percent(down_payment_percent),\n    \"Down payment amount: \" + format_currency(down_payment_amount),\n    \"Estimated loan balance: \" + format_currency(remaining_loan_balance),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Mortgage and Real Estate",
    "pagePath": "/financial-calculators/down-payment-calculator/"
  },
  {
    "id": "rent-vs-buy-calculator",
    "title": "Rent vs. Buy Calculator",
    "category": "Mortgage and Real Estate",
    "summary": "Compare simplified multi-year rent costs with a buy-side cash outlay estimate.",
    "tags": [
      "rent-vs-buy",
      "housing",
      "comparison"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Compare simplified multi-year rent costs with a buy-side cash outlay estimate. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Rent vs. Buy Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Difference (rent - buy):"
      }
    ],
    "routeSlug": "rent-vs-buy-calculator",
    "seoTitle": "Rent vs. Buy Calculator Python Script | SharePython.com",
    "seoDescription": "Compare simplified multi-year rent costs with a buy-side cash outlay estimate. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Rent vs. Buy Calculator\n# Edit: home_price, down_payment_percent, annual_rent, annual_home_maintenance, and years_to_compare.\n# Assumptions: buying costs use a simplified maintenance estimate and ignore tax effects.\n# Limitations: does not model moving decisions, appreciation uncertainty, or closing costs in detail.\n# Output: prints simplified cumulative five-year rent and buy costs.\n\nhome_price = 385000\ndown_payment_percent = 0.20\nannual_rent = 28800\nannual_home_maintenance = 4600\nyears_to_compare = 5\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndown_payment = home_price * down_payment_percent\nrent_cost = annual_rent * years_to_compare\nbuy_cost = down_payment + annual_home_maintenance * years_to_compare\n\nlines = [\n    \"Rent vs. Buy Calculator\",\n    \"-\" * len(\"Rent vs. Buy Calculator\"),\n    \"Rent cost over period: \" + format_currency(rent_cost),\n    \"Buying cash outlay over period: \" + format_currency(buy_cost),\n    \"Difference (rent - buy): \" + format_currency(rent_cost - buy_cost),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Mortgage and Real Estate",
    "pagePath": "/financial-calculators/rent-vs-buy-calculator/"
  },
  {
    "id": "auto-loan-calculator",
    "title": "Auto Loan Calculator",
    "category": "Auto",
    "summary": "Estimate a monthly auto loan payment from price, rate, and term.",
    "tags": [
      "auto",
      "loan",
      "vehicle"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate a monthly auto loan payment from price, rate, and term. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Auto Loan Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Monthly payment:"
      }
    ],
    "routeSlug": "auto-loan-calculator",
    "seoTitle": "Auto Loan Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate a monthly auto loan payment from price, rate, and term. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Auto Loan Calculator\n# Edit: loan_amount, annual_interest_rate, and loan_term_years.\n# Assumptions: fixed-rate amortizing loan with equal monthly payments.\n# Limitations: excludes taxes, insurance, fees, and irregular payment schedules.\n# Output: prints the monthly payment, total paid, and total interest.\n\nloan_amount = 32000\nannual_interest_rate = 6.4\nloan_term_years = 6\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef monthly_payment(principal, annual_rate_percent, years):\n    payment_count = int(years * 12)\n    monthly_rate = (annual_rate_percent / 100) / 12\n\n    if monthly_rate == 0:\n        return principal / payment_count\n\n    growth = (1 + monthly_rate) ** payment_count\n    return principal * (monthly_rate * growth) / (growth - 1)\n\n\npayment = monthly_payment(loan_amount, annual_interest_rate, loan_term_years)\npayment_count = int(loan_term_years * 12)\ntotal_paid = payment * payment_count\ntotal_interest = total_paid - loan_amount\n\nlines = [\n    \"Auto loan payment summary\",\n    \"-\" * len(\"Auto loan payment summary\"),\n    \"Monthly payment: \" + format_currency(payment),\n    \"Total paid: \" + format_currency(total_paid),\n    \"Total interest: \" + format_currency(total_interest),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Auto",
    "pagePath": "/financial-calculators/auto-loan-calculator/"
  },
  {
    "id": "cash-back-or-low-interest-calculator",
    "title": "Cash Back or Low Interest Calculator",
    "category": "Auto",
    "summary": "Compare a rebate plus regular APR against a low promotional financing rate.",
    "tags": [
      "auto",
      "rebate",
      "apr"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Compare a rebate plus regular APR against a low promotional financing rate. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Cash Back or Low Interest Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Cash-back monthly payment:"
      }
    ],
    "routeSlug": "cash-back-or-low-interest-calculator",
    "seoTitle": "Cash Back or Low Interest Calculator Python Script | SharePython.com",
    "seoDescription": "Compare a rebate plus regular APR against a low promotional financing rate. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Cash Back or Low Interest Calculator\n# Edit: vehicle_price, cash_back_offer, regular_apr, promo_apr, loan_term_years, and down_payment.\n# Assumptions: both financing offers use the same term and down payment.\n# Limitations: excludes taxes and registration fees.\n# Output: prints the monthly payment and total paid for both financing choices.\n\nvehicle_price = 38500\ncash_back_offer = 2500\nregular_apr = 6.25\npromo_apr = 1.9\nloan_term_years = 5\ndown_payment = 4500\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef monthly_payment(principal, annual_rate_percent, years):\n    payment_count = int(years * 12)\n    monthly_rate = (annual_rate_percent / 100) / 12\n\n    if monthly_rate == 0:\n        return principal / payment_count\n\n    growth = (1 + monthly_rate) ** payment_count\n    return principal * (monthly_rate * growth) / (growth - 1)\n\n\ncash_back_loan = vehicle_price - down_payment - cash_back_offer\npromo_loan = vehicle_price - down_payment\ncash_back_payment = monthly_payment(cash_back_loan, regular_apr, loan_term_years)\npromo_payment = monthly_payment(promo_loan, promo_apr, loan_term_years)\n\nlines = [\n    \"Cash Back or Low Interest Calculator\",\n    \"-\" * len(\"Cash Back or Low Interest Calculator\"),\n    \"Cash-back monthly payment: \" + format_currency(cash_back_payment),\n    \"Promo-rate monthly payment: \" + format_currency(promo_payment),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Auto",
    "pagePath": "/financial-calculators/cash-back-or-low-interest-calculator/"
  },
  {
    "id": "auto-lease-calculator",
    "title": "Auto Lease Calculator",
    "category": "Auto",
    "summary": "Estimate a simplified auto lease payment from price, residual, and money factor.",
    "tags": [
      "auto-lease",
      "vehicle",
      "lease"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate a simplified auto lease payment from price, residual, and money factor. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Auto Lease Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Pretax monthly payment:"
      }
    ],
    "routeSlug": "auto-lease-calculator",
    "seoTitle": "Auto Lease Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate a simplified auto lease payment from price, residual, and money factor. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Auto Lease Calculator\n# Edit: negotiated_price, residual_value, money_factor, lease_term_months, and sales_tax_rate.\n# Assumptions: lease payment uses a simplified depreciation-plus-finance formula.\n# Limitations: excludes fees, rebates, and local tax quirks.\n# Output: prints the estimated pretax and after-tax monthly lease payment.\n\nnegotiated_price = 39200\nresidual_value = 22100\nmoney_factor = 0.0021\nlease_term_months = 36\nsales_tax_rate = 0.0725\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\nmonthly_depreciation = (negotiated_price - residual_value) / lease_term_months\nmonthly_finance_charge = (negotiated_price + residual_value) * money_factor\npretax_payment = monthly_depreciation + monthly_finance_charge\nafter_tax_payment = pretax_payment * (1 + sales_tax_rate)\n\nlines = [\n    \"Auto Lease Calculator\",\n    \"-\" * len(\"Auto Lease Calculator\"),\n    \"Pretax monthly payment: \" + format_currency(pretax_payment),\n    \"After-tax monthly payment: \" + format_currency(after_tax_payment),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Auto",
    "pagePath": "/financial-calculators/auto-lease-calculator/"
  },
  {
    "id": "interest-calculator",
    "title": "Interest Calculator",
    "category": "Investment",
    "summary": "Project a balance with compounding and optional monthly contributions.",
    "tags": [
      "interest",
      "investment",
      "growth"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Project a balance with compounding and optional monthly contributions. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Interest Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Ending balance:"
      }
    ],
    "routeSlug": "interest-calculator",
    "seoTitle": "Interest Calculator Python Script | SharePython.com",
    "seoDescription": "Project a balance with compounding and optional monthly contributions. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Interest Calculator\n# Edit: starting_balance, annual_return_rate, years, monthly_contribution, and annual_fee_rate.\n# Assumptions: returns compound monthly and contributions are made at month end.\n# Limitations: uses a constant rate of return and fee rate.\n# Output: prints the ending balance and total contributions.\n\nstarting_balance = 12000\nannual_return_rate = 5.8\nyears = 8\nmonthly_contribution = 0\nannual_fee_rate = 0\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef project_balance(starting_balance, annual_return_percent, years, monthly_contribution=0.0):\n    monthly_rate = (annual_return_percent / 100) / 12\n    months = int(years * 12)\n    balance = starting_balance\n\n    for _ in range(months):\n        balance = balance * (1 + monthly_rate) + monthly_contribution\n\n    return balance\n\n\nnet_annual_return = annual_return_rate - annual_fee_rate\nending_balance = project_balance(\n    starting_balance,\n    net_annual_return,\n    years,\n    monthly_contribution=monthly_contribution,\n)\ntotal_contributions = starting_balance + (monthly_contribution * int(years * 12))\n\nlines = [\n    \"Interest Calculator\",\n    \"-\" * len(\"Interest Calculator\"),\n    \"Ending balance: \" + format_currency(ending_balance),\n    \"Total contributed: \" + format_currency(total_contributions),\n    \"Investment growth: \" + format_currency(ending_balance - total_contributions),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Investment",
    "pagePath": "/financial-calculators/interest-calculator/"
  },
  {
    "id": "investment-calculator",
    "title": "Investment Calculator",
    "category": "Investment",
    "summary": "Project long-term investment growth with a starting balance and monthly additions.",
    "tags": [
      "investment",
      "savings",
      "compound"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Project long-term investment growth with a starting balance and monthly additions. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Investment Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Ending balance:"
      }
    ],
    "routeSlug": "investment-calculator",
    "seoTitle": "Investment Calculator Python Script | SharePython.com",
    "seoDescription": "Project long-term investment growth with a starting balance and monthly additions. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Investment Calculator\n# Edit: starting_balance, annual_return_rate, years, monthly_contribution, and annual_fee_rate.\n# Assumptions: returns compound monthly and contributions are made at month end.\n# Limitations: uses a constant rate of return and fee rate.\n# Output: prints the ending balance and total contributions.\n\nstarting_balance = 18000\nannual_return_rate = 7\nyears = 15\nmonthly_contribution = 350\nannual_fee_rate = 0\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef project_balance(starting_balance, annual_return_percent, years, monthly_contribution=0.0):\n    monthly_rate = (annual_return_percent / 100) / 12\n    months = int(years * 12)\n    balance = starting_balance\n\n    for _ in range(months):\n        balance = balance * (1 + monthly_rate) + monthly_contribution\n\n    return balance\n\n\nnet_annual_return = annual_return_rate - annual_fee_rate\nending_balance = project_balance(\n    starting_balance,\n    net_annual_return,\n    years,\n    monthly_contribution=monthly_contribution,\n)\ntotal_contributions = starting_balance + (monthly_contribution * int(years * 12))\n\nlines = [\n    \"Investment Calculator\",\n    \"-\" * len(\"Investment Calculator\"),\n    \"Ending balance: \" + format_currency(ending_balance),\n    \"Total contributed: \" + format_currency(total_contributions),\n    \"Investment growth: \" + format_currency(ending_balance - total_contributions),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Investment",
    "pagePath": "/financial-calculators/investment-calculator/"
  },
  {
    "id": "finance-calculator",
    "title": "Finance Calculator",
    "category": "Investment",
    "summary": "Summarize a simple time-value-of-money scenario from present value, rate, term, and monthly deposits.",
    "tags": [
      "finance",
      "tvm",
      "future-value"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Summarize a simple time-value-of-money scenario from present value, rate, term, and monthly deposits. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Finance Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Future value:"
      }
    ],
    "routeSlug": "finance-calculator",
    "seoTitle": "Finance Calculator Python Script | SharePython.com",
    "seoDescription": "Summarize a simple time-value-of-money scenario from present value, rate, term, and monthly deposits. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Finance Calculator\n# Edit: present_value, annual_rate, years, and monthly_payment.\n# Assumptions: uses a plain time-value-of-money growth model with monthly contributions.\n# Limitations: does not solve every variable automatically like a spreadsheet.\n# Output: prints the future value implied by the current inputs.\n\npresent_value = 25000\nannual_rate = 6.0\nyears = 12\nmonthly_payment = 300\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef project_balance(starting_balance, annual_return_percent, years, monthly_contribution=0.0):\n    monthly_rate = (annual_return_percent / 100) / 12\n    months = int(years * 12)\n    balance = starting_balance\n\n    for _ in range(months):\n        balance = balance * (1 + monthly_rate) + monthly_contribution\n\n    return balance\n\n\nfuture_value = project_balance(\n    present_value,\n    annual_rate,\n    years,\n    monthly_contribution=monthly_payment,\n)\n\nlines = [\n    \"Finance Calculator\",\n    \"-\" * len(\"Finance Calculator\"),\n    \"Present value: \" + format_currency(present_value),\n    \"Future value: \" + format_currency(future_value),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Investment",
    "pagePath": "/financial-calculators/finance-calculator/"
  },
  {
    "id": "compound-interest-calculator",
    "title": "Compound Interest Calculator",
    "category": "Investment",
    "summary": "Estimate compound growth from a starting balance and recurring monthly contributions.",
    "tags": [
      "compound-interest",
      "savings",
      "investment"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate compound growth from a starting balance and recurring monthly contributions. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Compound Interest Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Ending balance:"
      }
    ],
    "routeSlug": "compound-interest-calculator",
    "seoTitle": "Compound Interest Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate compound growth from a starting balance and recurring monthly contributions. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Compound Interest Calculator\n# Edit: starting_balance, annual_return_rate, years, monthly_contribution, and annual_fee_rate.\n# Assumptions: returns compound monthly and contributions are made at month end.\n# Limitations: uses a constant rate of return and fee rate.\n# Output: prints the ending balance and total contributions.\n\nstarting_balance = 25000\nannual_return_rate = 6.4\nyears = 20\nmonthly_contribution = 300\nannual_fee_rate = 0\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef project_balance(starting_balance, annual_return_percent, years, monthly_contribution=0.0):\n    monthly_rate = (annual_return_percent / 100) / 12\n    months = int(years * 12)\n    balance = starting_balance\n\n    for _ in range(months):\n        balance = balance * (1 + monthly_rate) + monthly_contribution\n\n    return balance\n\n\nnet_annual_return = annual_return_rate - annual_fee_rate\nending_balance = project_balance(\n    starting_balance,\n    net_annual_return,\n    years,\n    monthly_contribution=monthly_contribution,\n)\ntotal_contributions = starting_balance + (monthly_contribution * int(years * 12))\n\nlines = [\n    \"Compound Interest Calculator\",\n    \"-\" * len(\"Compound Interest Calculator\"),\n    \"Ending balance: \" + format_currency(ending_balance),\n    \"Total contributed: \" + format_currency(total_contributions),\n    \"Investment growth: \" + format_currency(ending_balance - total_contributions),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Investment",
    "pagePath": "/financial-calculators/compound-interest-calculator/"
  },
  {
    "id": "interest-rate-calculator",
    "title": "Interest Rate Calculator",
    "category": "Investment",
    "summary": "Solve for the annual return needed to reach a target balance on a simple growth model.",
    "tags": [
      "interest-rate",
      "target",
      "investment"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Solve for the annual return needed to reach a target balance on a simple growth model. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Interest Rate Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Required annual return:"
      }
    ],
    "routeSlug": "interest-rate-calculator",
    "seoTitle": "Interest Rate Calculator Python Script | SharePython.com",
    "seoDescription": "Solve for the annual return needed to reach a target balance on a simple growth model. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Interest Rate Calculator\n# Edit: starting_balance, target_balance, years, and monthly_contribution.\n# Assumptions: rate solving uses a simple bisection search on a monthly compounding model.\n# Limitations: returns one constant annual rate and may not match real market sequences.\n# Output: prints the annual return needed to hit the target balance.\n\nstarting_balance = 15000\ntarget_balance = 250000\nyears = 20\nmonthly_contribution = 450\n\n\ndef format_percent(value):\n    return \"{:.2f}%\".format(value * 100)\n\n\ndef project_balance(starting_balance, annual_return_percent, years, monthly_contribution=0.0):\n    monthly_rate = (annual_return_percent / 100) / 12\n    months = int(years * 12)\n    balance = starting_balance\n\n    for _ in range(months):\n        balance = balance * (1 + monthly_rate) + monthly_contribution\n\n    return balance\n\n\ndef solve_rate(target_function, low=0.0, high=1.0, steps=80):\n    lower = low\n    upper = high\n\n    while target_function(upper) < 0:\n        upper *= 2\n        if upper > 100:\n            break\n\n    for _ in range(steps):\n        midpoint = (lower + upper) / 2\n        value = target_function(midpoint)\n\n        if value == 0:\n            return midpoint\n\n        if value > 0:\n            upper = midpoint\n        else:\n            lower = midpoint\n\n    return (lower + upper) / 2\n\n\ndef balance_gap(annual_rate):\n    return project_balance(\n        starting_balance,\n        annual_rate * 100,\n        years,\n        monthly_contribution=monthly_contribution,\n    ) - target_balance\n\nrequired_rate = solve_rate(balance_gap, low=0.0, high=0.2)\n\nlines = [\n    \"Interest Rate Calculator\",\n    \"-\" * len(\"Interest Rate Calculator\"),\n    \"Required annual return: \" + format_percent(required_rate),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Investment",
    "pagePath": "/financial-calculators/interest-rate-calculator/"
  },
  {
    "id": "savings-calculator",
    "title": "Savings Calculator",
    "category": "Investment",
    "summary": "Project a savings balance from a starting amount, rate, and recurring deposits.",
    "tags": [
      "savings",
      "interest",
      "goal"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Project a savings balance from a starting amount, rate, and recurring deposits. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Savings Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Ending balance:"
      }
    ],
    "routeSlug": "savings-calculator",
    "seoTitle": "Savings Calculator Python Script | SharePython.com",
    "seoDescription": "Project a savings balance from a starting amount, rate, and recurring deposits. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Savings Calculator\n# Edit: starting_balance, annual_return_rate, years, monthly_contribution, and annual_fee_rate.\n# Assumptions: returns compound monthly and contributions are made at month end.\n# Limitations: uses a constant rate of return and fee rate.\n# Output: prints the ending balance and total contributions.\n\nstarting_balance = 8000\nannual_return_rate = 4.6\nyears = 10\nmonthly_contribution = 500\nannual_fee_rate = 0\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef project_balance(starting_balance, annual_return_percent, years, monthly_contribution=0.0):\n    monthly_rate = (annual_return_percent / 100) / 12\n    months = int(years * 12)\n    balance = starting_balance\n\n    for _ in range(months):\n        balance = balance * (1 + monthly_rate) + monthly_contribution\n\n    return balance\n\n\nnet_annual_return = annual_return_rate - annual_fee_rate\nending_balance = project_balance(\n    starting_balance,\n    net_annual_return,\n    years,\n    monthly_contribution=monthly_contribution,\n)\ntotal_contributions = starting_balance + (monthly_contribution * int(years * 12))\n\nlines = [\n    \"Savings Calculator\",\n    \"-\" * len(\"Savings Calculator\"),\n    \"Ending balance: \" + format_currency(ending_balance),\n    \"Total contributed: \" + format_currency(total_contributions),\n    \"Investment growth: \" + format_currency(ending_balance - total_contributions),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Investment",
    "pagePath": "/financial-calculators/savings-calculator/"
  },
  {
    "id": "simple-interest-calculator",
    "title": "Simple Interest Calculator",
    "category": "Investment",
    "summary": "Compute a non-compounding simple-interest balance over a fixed term.",
    "tags": [
      "simple-interest",
      "interest",
      "loan"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Compute a non-compounding simple-interest balance over a fixed term. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Simple Interest Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Ending balance:"
      }
    ],
    "routeSlug": "simple-interest-calculator",
    "seoTitle": "Simple Interest Calculator Python Script | SharePython.com",
    "seoDescription": "Compute a non-compounding simple-interest balance over a fixed term. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Simple Interest Calculator\n# Edit: principal, annual_interest_rate, and years.\n# Assumptions: interest is not compounded.\n# Limitations: does not include fees or partial periods.\n# Output: prints the simple-interest amount and ending balance.\n\nprincipal = 12500\nannual_interest_rate = 5.4\nyears = 3.5\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ninterest = principal * (annual_interest_rate / 100) * years\nending_balance = principal + interest\n\nlines = [\n    \"Simple Interest Calculator\",\n    \"-\" * len(\"Simple Interest Calculator\"),\n    \"Interest earned: \" + format_currency(interest),\n    \"Ending balance: \" + format_currency(ending_balance),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Investment",
    "pagePath": "/financial-calculators/simple-interest-calculator/"
  },
  {
    "id": "cd-calculator",
    "title": "CD Calculator",
    "category": "Investment",
    "summary": "Estimate certificate-of-deposit growth at a fixed rate over a fixed term.",
    "tags": [
      "cd",
      "deposit",
      "savings"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate certificate-of-deposit growth at a fixed rate over a fixed term. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for CD Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Ending balance:"
      }
    ],
    "routeSlug": "cd-calculator",
    "seoTitle": "CD Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate certificate-of-deposit growth at a fixed rate over a fixed term. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# CD Calculator\n# Edit: starting_balance, annual_return_rate, years, monthly_contribution, and annual_fee_rate.\n# Assumptions: returns compound monthly and contributions are made at month end.\n# Limitations: uses a constant rate of return and fee rate.\n# Output: prints the ending balance and total contributions.\n\nstarting_balance = 15000\nannual_return_rate = 4.9\nyears = 4\nmonthly_contribution = 0\nannual_fee_rate = 0\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef project_balance(starting_balance, annual_return_percent, years, monthly_contribution=0.0):\n    monthly_rate = (annual_return_percent / 100) / 12\n    months = int(years * 12)\n    balance = starting_balance\n\n    for _ in range(months):\n        balance = balance * (1 + monthly_rate) + monthly_contribution\n\n    return balance\n\n\nnet_annual_return = annual_return_rate - annual_fee_rate\nending_balance = project_balance(\n    starting_balance,\n    net_annual_return,\n    years,\n    monthly_contribution=monthly_contribution,\n)\ntotal_contributions = starting_balance + (monthly_contribution * int(years * 12))\n\nlines = [\n    \"CD Calculator\",\n    \"-\" * len(\"CD Calculator\"),\n    \"Ending balance: \" + format_currency(ending_balance),\n    \"Total contributed: \" + format_currency(total_contributions),\n    \"Investment growth: \" + format_currency(ending_balance - total_contributions),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Investment",
    "pagePath": "/financial-calculators/cd-calculator/"
  },
  {
    "id": "bond-calculator",
    "title": "Bond Calculator",
    "category": "Investment",
    "summary": "Estimate a bond price from face value, coupon rate, yield, and years to maturity.",
    "tags": [
      "bond",
      "yield",
      "fixed-income"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate a bond price from face value, coupon rate, yield, and years to maturity. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Bond Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Estimated bond price:"
      }
    ],
    "routeSlug": "bond-calculator",
    "seoTitle": "Bond Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate a bond price from face value, coupon rate, yield, and years to maturity. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Bond Calculator\n# Edit: face_value, coupon_rate, market_yield, and years_to_maturity.\n# Assumptions: coupon payments are annual and priced with a basic discounted-cashflow model.\n# Limitations: does not model day-count conventions or accrued interest.\n# Output: prints the estimated bond price.\n\nface_value = 1000\ncoupon_rate = 0.045\nmarket_yield = 0.052\nyears_to_maturity = 8\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ncoupon_payment = face_value * coupon_rate\nprice = 0.0\n\nfor year in range(1, years_to_maturity + 1):\n    price += coupon_payment / ((1 + market_yield) ** year)\n\nprice += face_value / ((1 + market_yield) ** years_to_maturity)\n\nlines = [\n    \"Bond Calculator\",\n    \"-\" * len(\"Bond Calculator\"),\n    \"Annual coupon: \" + format_currency(coupon_payment),\n    \"Estimated bond price: \" + format_currency(price),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Investment",
    "pagePath": "/financial-calculators/bond-calculator/"
  },
  {
    "id": "mutual-fund-calculator",
    "title": "Mutual Fund Calculator",
    "category": "Investment",
    "summary": "Project a fund balance after an annual expense ratio and recurring deposits.",
    "tags": [
      "mutual-fund",
      "investment",
      "fees"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Project a fund balance after an annual expense ratio and recurring deposits. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Mutual Fund Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Ending balance:"
      }
    ],
    "routeSlug": "mutual-fund-calculator",
    "seoTitle": "Mutual Fund Calculator Python Script | SharePython.com",
    "seoDescription": "Project a fund balance after an annual expense ratio and recurring deposits. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Mutual Fund Calculator\n# Edit: starting_balance, annual_return_rate, years, monthly_contribution, and annual_fee_rate.\n# Assumptions: returns compound monthly and contributions are made at month end.\n# Limitations: uses a constant rate of return and fee rate.\n# Output: prints the ending balance and total contributions.\n\nstarting_balance = 22000\nannual_return_rate = 7.2\nyears = 18\nmonthly_contribution = 300\nannual_fee_rate = 0.65\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef project_balance(starting_balance, annual_return_percent, years, monthly_contribution=0.0):\n    monthly_rate = (annual_return_percent / 100) / 12\n    months = int(years * 12)\n    balance = starting_balance\n\n    for _ in range(months):\n        balance = balance * (1 + monthly_rate) + monthly_contribution\n\n    return balance\n\n\nnet_annual_return = annual_return_rate - annual_fee_rate\nending_balance = project_balance(\n    starting_balance,\n    net_annual_return,\n    years,\n    monthly_contribution=monthly_contribution,\n)\ntotal_contributions = starting_balance + (monthly_contribution * int(years * 12))\n\nlines = [\n    \"Mutual Fund Calculator\",\n    \"-\" * len(\"Mutual Fund Calculator\"),\n    \"Ending balance: \" + format_currency(ending_balance),\n    \"Total contributed: \" + format_currency(total_contributions),\n    \"Investment growth: \" + format_currency(ending_balance - total_contributions),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Investment",
    "pagePath": "/financial-calculators/mutual-fund-calculator/"
  },
  {
    "id": "average-return-calculator",
    "title": "Average Return Calculator",
    "category": "Investment",
    "summary": "Compare arithmetic and geometric average returns from a list of annual returns.",
    "tags": [
      "average-return",
      "returns",
      "investment"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Compare arithmetic and geometric average returns from a list of annual returns. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Average Return Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Geometric average:"
      }
    ],
    "routeSlug": "average-return-calculator",
    "seoTitle": "Average Return Calculator Python Script | SharePython.com",
    "seoDescription": "Compare arithmetic and geometric average returns from a list of annual returns. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Average Return Calculator\n# Edit: annual_returns.\n# Assumptions: returns are expressed as decimals such as 0.08 for 8%.\n# Limitations: geometric return assumes the full list is one continuous sequence.\n# Output: prints arithmetic and geometric average returns.\n\nannual_returns = [0.12, -0.08, 0.15, 0.07, 0.05]\n\n\ndef format_percent(value):\n    return \"{:.2f}%\".format(value * 100)\n\n\narithmetic_average = sum(annual_returns) / len(annual_returns)\ngrowth = 1.0\nfor annual_return in annual_returns:\n    growth *= 1 + annual_return\ngeometric_average = growth ** (1 / len(annual_returns)) - 1\n\nlines = [\n    \"Average Return Calculator\",\n    \"-\" * len(\"Average Return Calculator\"),\n    \"Arithmetic average: \" + format_percent(arithmetic_average),\n    \"Geometric average: \" + format_percent(geometric_average),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Investment",
    "pagePath": "/financial-calculators/average-return-calculator/"
  },
  {
    "id": "irr-calculator",
    "title": "IRR Calculator",
    "category": "Investment",
    "summary": "Estimate an internal rate of return from an ordered sequence of cash flows.",
    "tags": [
      "irr",
      "cashflow",
      "investment"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate an internal rate of return from an ordered sequence of cash flows. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for IRR Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Annualized IRR:"
      }
    ],
    "routeSlug": "irr-calculator",
    "seoTitle": "IRR Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate an internal rate of return from an ordered sequence of cash flows. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# IRR Calculator\n# Edit: cashflows.\n# Assumptions: cashflows are monthly and the first value is the initial investment.\n# Limitations: uses bisection and assumes a single economically meaningful IRR.\n# Output: prints the estimated monthly and annual IRR.\n\ncashflows = [-25000, 4000, 5200, 6200, 7000, 8300]\n\n\ndef format_percent(value):\n    return \"{:.2f}%\".format(value * 100)\n\n\ndef solve_rate(target_function, low=0.0, high=1.0, steps=80):\n    lower = low\n    upper = high\n\n    while target_function(upper) < 0:\n        upper *= 2\n        if upper > 100:\n            break\n\n    for _ in range(steps):\n        midpoint = (lower + upper) / 2\n        value = target_function(midpoint)\n\n        if value == 0:\n            return midpoint\n\n        if value > 0:\n            upper = midpoint\n        else:\n            lower = midpoint\n\n    return (lower + upper) / 2\n\n\ndef npv(monthly_rate):\n    total = 0.0\n    for index, cashflow in enumerate(cashflows):\n        total += cashflow / ((1 + monthly_rate) ** index)\n    return total\n\nmonthly_irr = solve_rate(npv, low=-0.99, high=0.5)\nannual_irr = (1 + monthly_irr) ** 12 - 1\n\nlines = [\n    \"IRR Calculator\",\n    \"-\" * len(\"IRR Calculator\"),\n    \"Monthly IRR: \" + format_percent(monthly_irr),\n    \"Annualized IRR: \" + format_percent(annual_irr),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Investment",
    "pagePath": "/financial-calculators/irr-calculator/"
  },
  {
    "id": "roi-calculator",
    "title": "ROI Calculator",
    "category": "Investment",
    "summary": "Compute a simple return on investment from cost and ending value.",
    "tags": [
      "roi",
      "investment",
      "return"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Compute a simple return on investment from cost and ending value. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for ROI Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Return on investment:"
      }
    ],
    "routeSlug": "roi-calculator",
    "seoTitle": "ROI Calculator Python Script | SharePython.com",
    "seoDescription": "Compute a simple return on investment from cost and ending value. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# ROI Calculator\n# Edit: initial_cost and ending_value.\n# Assumptions: ROI is calculated as net gain divided by initial cost.\n# Limitations: does not annualize or time-weight the result.\n# Output: prints total gain and ROI.\n\ninitial_cost = 18500\nending_value = 24600\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef format_percent(value):\n    return \"{:.2f}%\".format(value * 100)\n\n\nnet_gain = ending_value - initial_cost\nroi = net_gain / initial_cost\n\nlines = [\n    \"ROI Calculator\",\n    \"-\" * len(\"ROI Calculator\"),\n    \"Net gain: \" + format_currency(net_gain),\n    \"Return on investment: \" + format_percent(roi),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Investment",
    "pagePath": "/financial-calculators/roi-calculator/"
  },
  {
    "id": "payback-period-calculator",
    "title": "Payback Period Calculator",
    "category": "Investment",
    "summary": "Estimate the year in which cumulative cash flow turns positive.",
    "tags": [
      "payback",
      "cashflow",
      "investment"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate the year in which cumulative cash flow turns positive. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Payback Period Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Payback year:"
      }
    ],
    "routeSlug": "payback-period-calculator",
    "seoTitle": "Payback Period Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate the year in which cumulative cash flow turns positive. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Payback Period Calculator\n# Edit: initial_investment and annual_cashflows.\n# Assumptions: payback ignores discounting.\n# Limitations: does not estimate value after payback.\n# Output: prints the year in which cumulative cash flow turns positive.\n\ninitial_investment = 40000\nannual_cashflows = [8500, 9200, 9700, 10100, 10400]\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ncumulative = -initial_investment\npayback_year = None\n\nfor year_index, cashflow in enumerate(annual_cashflows, start=1):\n    cumulative += cashflow\n    if cumulative >= 0 and payback_year is None:\n        payback_year = year_index\n\nlines = [\n    \"Payback Period Calculator\",\n    \"-\" * len(\"Payback Period Calculator\"),\n    \"Initial investment: \" + format_currency(initial_investment),\n    \"Payback year: \" + str(payback_year),\n    \"Ending cumulative cash flow: \" + format_currency(cumulative),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Investment",
    "pagePath": "/financial-calculators/payback-period-calculator/"
  },
  {
    "id": "present-value-calculator",
    "title": "Present Value Calculator",
    "category": "Investment",
    "summary": "Discount a future cash amount back to a present value.",
    "tags": [
      "present-value",
      "discounting",
      "finance"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Discount a future cash amount back to a present value. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Present Value Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Present value:"
      }
    ],
    "routeSlug": "present-value-calculator",
    "seoTitle": "Present Value Calculator Python Script | SharePython.com",
    "seoDescription": "Discount a future cash amount back to a present value. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Present Value Calculator\n# Edit: future_value, annual_discount_rate, and years.\n# Assumptions: discounting uses annual compounding.\n# Limitations: assumes one future cash flow.\n# Output: prints the present value of the target future amount.\n\nfuture_value = 95000\nannual_discount_rate = 0.06\nyears = 9\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\npresent_value = future_value / ((1 + annual_discount_rate) ** years)\n\nlines = [\n    \"Present Value Calculator\",\n    \"-\" * len(\"Present Value Calculator\"),\n    \"Present value: \" + format_currency(present_value),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Investment",
    "pagePath": "/financial-calculators/present-value-calculator/"
  },
  {
    "id": "future-value-calculator",
    "title": "Future Value Calculator",
    "category": "Investment",
    "summary": "Project a present amount forward with an annual growth rate.",
    "tags": [
      "future-value",
      "growth",
      "finance"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Project a present amount forward with an annual growth rate. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Future Value Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Future value:"
      }
    ],
    "routeSlug": "future-value-calculator",
    "seoTitle": "Future Value Calculator Python Script | SharePython.com",
    "seoDescription": "Project a present amount forward with an annual growth rate. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Future Value Calculator\n# Edit: present_value, annual_growth_rate, and years.\n# Assumptions: growth compounds annually.\n# Limitations: assumes a single constant annual rate.\n# Output: prints the projected future value.\n\npresent_value = 42000\nannual_growth_rate = 0.055\nyears = 11\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\nfuture_value = present_value * ((1 + annual_growth_rate) ** years)\n\nlines = [\n    \"Future Value Calculator\",\n    \"-\" * len(\"Future Value Calculator\"),\n    \"Future value: \" + format_currency(future_value),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Investment",
    "pagePath": "/financial-calculators/future-value-calculator/"
  },
  {
    "id": "retirement-calculator",
    "title": "Retirement Calculator",
    "category": "Retirement",
    "summary": "Project a retirement balance from contributions, growth, and time until retirement.",
    "tags": [
      "retirement",
      "savings",
      "projection"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Project a retirement balance from contributions, growth, and time until retirement. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Retirement Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Projected balance:"
      }
    ],
    "routeSlug": "retirement-calculator",
    "seoTitle": "Retirement Calculator Python Script | SharePython.com",
    "seoDescription": "Project a retirement balance from contributions, growth, and time until retirement. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Retirement Calculator\n# Edit: starting_balance, annual_return_rate, years, monthly_contribution, and annual_fee_rate.\n# Assumptions: returns compound monthly and contributions are made at month end.\n# Limitations: uses a constant rate of return and fee rate.\n# Output: prints the ending balance and total contributions.\n\nstarting_balance = 85000\nannual_return_rate = 6.5\nyears = 25\nmonthly_contribution = 550\nannual_fee_rate = 0\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef project_balance(starting_balance, annual_return_percent, years, monthly_contribution=0.0):\n    monthly_rate = (annual_return_percent / 100) / 12\n    months = int(years * 12)\n    balance = starting_balance\n\n    for _ in range(months):\n        balance = balance * (1 + monthly_rate) + monthly_contribution\n\n    return balance\n\n\nnet_annual_return = annual_return_rate - annual_fee_rate\nending_balance = project_balance(\n    starting_balance,\n    net_annual_return,\n    years,\n    monthly_contribution=monthly_contribution,\n)\ntotal_contributions = starting_balance + (monthly_contribution * int(years * 12))\n\nlines = [\n    \"Retirement Calculator\",\n    \"-\" * len(\"Retirement Calculator\"),\n    \"Ending balance: \" + format_currency(ending_balance),\n    \"Total contributed: \" + format_currency(total_contributions),\n    \"Investment growth: \" + format_currency(ending_balance - total_contributions),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Retirement",
    "pagePath": "/financial-calculators/retirement-calculator/"
  },
  {
    "id": "401k-calculator",
    "title": "401K Calculator",
    "category": "Retirement",
    "summary": "Project a 401(k) balance including a simple employer match.",
    "tags": [
      "401k",
      "retirement",
      "match"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Project a 401(k) balance including a simple employer match. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for 401K Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Projected balance:"
      }
    ],
    "routeSlug": "401k-calculator",
    "seoTitle": "401K Calculator Python Script | SharePython.com",
    "seoDescription": "Project a 401(k) balance including a simple employer match. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# 401K Calculator\n# Edit: annual_salary, employee_contribution_rate, employer_match_rate, annual_return_rate, and years.\n# Assumptions: contributions are made evenly through the year.\n# Limitations: ignores contribution caps and tax law changes.\n# Output: prints the ending balance and estimated employer contributions.\n\nannual_salary = 92000\nemployee_contribution_rate = 0.10\nemployer_match_rate = 0.04\nannual_return_rate = 0.07\nyears = 25\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef project_balance(starting_balance, annual_return_percent, years, monthly_contribution=0.0):\n    monthly_rate = (annual_return_percent / 100) / 12\n    months = int(years * 12)\n    balance = starting_balance\n\n    for _ in range(months):\n        balance = balance * (1 + monthly_rate) + monthly_contribution\n\n    return balance\n\n\nmonthly_employee = (annual_salary * employee_contribution_rate) / 12\nmonthly_match = (annual_salary * employer_match_rate) / 12\nending_balance = project_balance(\n    0.0,\n    annual_return_rate,\n    years,\n    monthly_contribution=monthly_employee + monthly_match,\n)\n\nlines = [\n    \"401K Calculator\",\n    \"-\" * len(\"401K Calculator\"),\n    \"Monthly employee contribution: \" + format_currency(monthly_employee),\n    \"Monthly employer match: \" + format_currency(monthly_match),\n    \"Projected balance: \" + format_currency(ending_balance),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Retirement",
    "pagePath": "/financial-calculators/401k-calculator/"
  },
  {
    "id": "pension-calculator",
    "title": "Pension Calculator",
    "category": "Retirement",
    "summary": "Estimate a pension benefit from service years, salary, and accrual rate.",
    "tags": [
      "pension",
      "retirement",
      "income"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate a pension benefit from service years, salary, and accrual rate. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Pension Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Monthly pension:"
      }
    ],
    "routeSlug": "pension-calculator",
    "seoTitle": "Pension Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate a pension benefit from service years, salary, and accrual rate. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Pension Calculator\n# Edit: final_average_salary, years_of_service, and accrual_rate.\n# Assumptions: pension benefit follows a simple final-salary accrual formula.\n# Limitations: does not model COLAs or plan-specific offsets.\n# Output: prints the estimated annual and monthly pension.\n\nfinal_average_salary = 98000\nyears_of_service = 28\naccrual_rate = 0.018\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\nannual_pension = final_average_salary * years_of_service * accrual_rate\nmonthly_pension = annual_pension / 12\n\nlines = [\n    \"Pension Calculator\",\n    \"-\" * len(\"Pension Calculator\"),\n    \"Annual pension: \" + format_currency(annual_pension),\n    \"Monthly pension: \" + format_currency(monthly_pension),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Retirement",
    "pagePath": "/financial-calculators/pension-calculator/"
  },
  {
    "id": "social-security-calculator",
    "title": "Social Security Calculator",
    "category": "Retirement",
    "summary": "Estimate a simplified Social Security monthly benefit from a PIA and claim age.",
    "tags": [
      "social-security",
      "retirement",
      "benefit"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate a simplified Social Security monthly benefit from a PIA and claim age. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Social Security Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Estimated monthly benefit:"
      }
    ],
    "routeSlug": "social-security-calculator",
    "seoTitle": "Social Security Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate a simplified Social Security monthly benefit from a PIA and claim age. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Social Security Calculator\n# Edit: primary_insurance_amount and claim_age.\n# Assumptions: claiming adjustments use a simplified early-reduction and delayed-credit model.\n# Limitations: does not model spouse benefits, earnings tests, or COLAs.\n# Output: prints the estimated monthly Social Security benefit.\n\nprimary_insurance_amount = 2400\nclaim_age = 68\nfull_retirement_age = 67\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef format_percent(value):\n    return \"{:.2f}%\".format(value * 100)\n\n\nif claim_age < full_retirement_age:\n    monthly_adjustment = max(0, (full_retirement_age - claim_age) * 12) * 0.005\n    benefit_factor = 1 - monthly_adjustment\nelse:\n    delayed_months = min((claim_age - full_retirement_age) * 12, (70 - full_retirement_age) * 12)\n    benefit_factor = 1 + delayed_months * (2 / 3) / 100\n\nestimated_benefit = primary_insurance_amount * benefit_factor\n\nlines = [\n    \"Social Security Calculator\",\n    \"-\" * len(\"Social Security Calculator\"),\n    \"Benefit factor: \" + format_percent(benefit_factor),\n    \"Estimated monthly benefit: \" + format_currency(estimated_benefit),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Retirement",
    "pagePath": "/financial-calculators/social-security-calculator/"
  },
  {
    "id": "annuity-calculator",
    "title": "Annuity Calculator",
    "category": "Retirement",
    "summary": "Project the future value of a stream of annuity-style contributions.",
    "tags": [
      "annuity",
      "retirement",
      "savings"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Project the future value of a stream of annuity-style contributions. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Annuity Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Future value:"
      }
    ],
    "routeSlug": "annuity-calculator",
    "seoTitle": "Annuity Calculator Python Script | SharePython.com",
    "seoDescription": "Project the future value of a stream of annuity-style contributions. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Annuity Calculator\n# Edit: monthly_contribution, annual_return_rate, and years.\n# Assumptions: annuity savings are modeled as end-of-month contributions.\n# Limitations: does not distinguish qualified vs. non-qualified annuities.\n# Output: prints the estimated future value of the contribution stream.\n\nmonthly_contribution = 450\nannual_return_rate = 5.0\nyears = 18\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef project_balance(starting_balance, annual_return_percent, years, monthly_contribution=0.0):\n    monthly_rate = (annual_return_percent / 100) / 12\n    months = int(years * 12)\n    balance = starting_balance\n\n    for _ in range(months):\n        balance = balance * (1 + monthly_rate) + monthly_contribution\n\n    return balance\n\n\nfuture_value = project_balance(\n    0.0,\n    annual_return_rate,\n    years,\n    monthly_contribution=monthly_contribution,\n)\n\nlines = [\n    \"Annuity Calculator\",\n    \"-\" * len(\"Annuity Calculator\"),\n    \"Future value: \" + format_currency(future_value),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Retirement",
    "pagePath": "/financial-calculators/annuity-calculator/"
  },
  {
    "id": "annuity-payout-calculator",
    "title": "Annuity Payout Calculator",
    "category": "Retirement",
    "summary": "Estimate a level monthly payout from an annuity balance over a fixed term.",
    "tags": [
      "annuity",
      "payout",
      "retirement"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate a level monthly payout from an annuity balance over a fixed term. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Annuity Payout Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Estimated monthly payout:"
      }
    ],
    "routeSlug": "annuity-payout-calculator",
    "seoTitle": "Annuity Payout Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate a level monthly payout from an annuity balance over a fixed term. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Annuity Payout Calculator\n# Edit: account_balance, annual_return_rate, and payout_years.\n# Assumptions: payouts are level monthly distributions from an invested balance.\n# Limitations: does not include taxes or insurer guarantees.\n# Output: prints the estimated monthly payout.\n\naccount_balance = 425000\nannual_return_rate = 4.25\npayout_years = 25\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef monthly_payment(principal, annual_rate_percent, years):\n    payment_count = int(years * 12)\n    monthly_rate = (annual_rate_percent / 100) / 12\n\n    if monthly_rate == 0:\n        return principal / payment_count\n\n    growth = (1 + monthly_rate) ** payment_count\n    return principal * (monthly_rate * growth) / (growth - 1)\n\n\nmonthly_rate = (annual_return_rate / 100) / 12\npayment_count = int(payout_years * 12)\n\nif monthly_rate == 0:\n    monthly_payout = account_balance / payment_count\nelse:\n    discount = (1 - (1 / ((1 + monthly_rate) ** payment_count))) / monthly_rate\n    monthly_payout = account_balance / discount\n\nlines = [\n    \"Annuity Payout Calculator\",\n    \"-\" * len(\"Annuity Payout Calculator\"),\n    \"Estimated monthly payout: \" + format_currency(monthly_payout),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Retirement",
    "pagePath": "/financial-calculators/annuity-payout-calculator/"
  },
  {
    "id": "roth-ira-calculator",
    "title": "Roth IRA Calculator",
    "category": "Retirement",
    "summary": "Project Roth IRA growth from annual returns and monthly contributions.",
    "tags": [
      "roth-ira",
      "retirement",
      "investment"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Project Roth IRA growth from annual returns and monthly contributions. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Roth IRA Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Ending balance:"
      }
    ],
    "routeSlug": "roth-ira-calculator",
    "seoTitle": "Roth IRA Calculator Python Script | SharePython.com",
    "seoDescription": "Project Roth IRA growth from annual returns and monthly contributions. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Roth IRA Calculator\n# Edit: starting_balance, annual_return_rate, years, monthly_contribution, and annual_fee_rate.\n# Assumptions: returns compound monthly and contributions are made at month end.\n# Limitations: uses a constant rate of return and fee rate.\n# Output: prints the ending balance and total contributions.\n\nstarting_balance = 12000\nannual_return_rate = 7\nyears = 25\nmonthly_contribution = 500\nannual_fee_rate = 0\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef project_balance(starting_balance, annual_return_percent, years, monthly_contribution=0.0):\n    monthly_rate = (annual_return_percent / 100) / 12\n    months = int(years * 12)\n    balance = starting_balance\n\n    for _ in range(months):\n        balance = balance * (1 + monthly_rate) + monthly_contribution\n\n    return balance\n\n\nnet_annual_return = annual_return_rate - annual_fee_rate\nending_balance = project_balance(\n    starting_balance,\n    net_annual_return,\n    years,\n    monthly_contribution=monthly_contribution,\n)\ntotal_contributions = starting_balance + (monthly_contribution * int(years * 12))\n\nlines = [\n    \"Roth IRA Calculator\",\n    \"-\" * len(\"Roth IRA Calculator\"),\n    \"Ending balance: \" + format_currency(ending_balance),\n    \"Total contributed: \" + format_currency(total_contributions),\n    \"Investment growth: \" + format_currency(ending_balance - total_contributions),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Retirement",
    "pagePath": "/financial-calculators/roth-ira-calculator/"
  },
  {
    "id": "ira-calculator",
    "title": "IRA Calculator",
    "category": "Retirement",
    "summary": "Project traditional IRA growth with ongoing monthly contributions.",
    "tags": [
      "ira",
      "retirement",
      "investment"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Project traditional IRA growth with ongoing monthly contributions. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for IRA Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Ending balance:"
      }
    ],
    "routeSlug": "ira-calculator",
    "seoTitle": "IRA Calculator Python Script | SharePython.com",
    "seoDescription": "Project traditional IRA growth with ongoing monthly contributions. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# IRA Calculator\n# Edit: starting_balance, annual_return_rate, years, monthly_contribution, and annual_fee_rate.\n# Assumptions: returns compound monthly and contributions are made at month end.\n# Limitations: uses a constant rate of return and fee rate.\n# Output: prints the ending balance and total contributions.\n\nstarting_balance = 18000\nannual_return_rate = 6.6\nyears = 20\nmonthly_contribution = 450\nannual_fee_rate = 0\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef project_balance(starting_balance, annual_return_percent, years, monthly_contribution=0.0):\n    monthly_rate = (annual_return_percent / 100) / 12\n    months = int(years * 12)\n    balance = starting_balance\n\n    for _ in range(months):\n        balance = balance * (1 + monthly_rate) + monthly_contribution\n\n    return balance\n\n\nnet_annual_return = annual_return_rate - annual_fee_rate\nending_balance = project_balance(\n    starting_balance,\n    net_annual_return,\n    years,\n    monthly_contribution=monthly_contribution,\n)\ntotal_contributions = starting_balance + (monthly_contribution * int(years * 12))\n\nlines = [\n    \"IRA Calculator\",\n    \"-\" * len(\"IRA Calculator\"),\n    \"Ending balance: \" + format_currency(ending_balance),\n    \"Total contributed: \" + format_currency(total_contributions),\n    \"Investment growth: \" + format_currency(ending_balance - total_contributions),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Retirement",
    "pagePath": "/financial-calculators/ira-calculator/"
  },
  {
    "id": "rmd-calculator",
    "title": "RMD Calculator",
    "category": "Retirement",
    "summary": "Estimate a required minimum distribution using an editable divisor table.",
    "tags": [
      "rmd",
      "retirement",
      "distribution"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate a required minimum distribution using an editable divisor table. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for RMD Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Estimated RMD:"
      }
    ],
    "routeSlug": "rmd-calculator",
    "seoTitle": "RMD Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate a required minimum distribution using an editable divisor table. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# RMD Calculator\n# Edit: account_balance and owner_age.\n# Assumptions: uses a small subset of IRS uniform lifetime divisors.\n# Limitations: for demonstration only and not a tax or legal reference.\n# Output: prints the estimated required minimum distribution.\n\naccount_balance = 615000\nowner_age = 75\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\nuniform_lifetime_divisors = {\n    73: 26.5,\n    74: 25.5,\n    75: 24.6,\n    76: 23.7,\n    77: 22.9,\n    78: 22.0,\n    79: 21.1,\n    80: 20.2,\n}\n\ndivisor = uniform_lifetime_divisors.get(owner_age, uniform_lifetime_divisors[max(uniform_lifetime_divisors)])\nrmd_amount = account_balance / divisor\n\nlines = [\n    \"RMD Calculator\",\n    \"-\" * len(\"RMD Calculator\"),\n    \"Distribution divisor: \" + \"{:.1f}\".format(divisor),\n    \"Estimated RMD: \" + format_currency(rmd_amount),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Retirement",
    "pagePath": "/financial-calculators/rmd-calculator/"
  },
  {
    "id": "income-tax-calculator",
    "title": "Income Tax Calculator",
    "category": "Tax and Salary",
    "summary": "Estimate income tax from an editable progressive bracket table.",
    "tags": [
      "income-tax",
      "tax",
      "salary"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate income tax from an editable progressive bracket table. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Income Tax Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Estimated tax:"
      }
    ],
    "routeSlug": "income-tax-calculator",
    "seoTitle": "Income Tax Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate income tax from an editable progressive bracket table. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Income Tax Calculator\n# Edit: taxable_income and brackets.\n# Assumptions: uses a simple progressive bracket table entered directly in the script.\n# Limitations: not a jurisdiction-specific tax engine.\n# Output: prints the estimated tax bill and effective rate.\n\ntaxable_income = 98000\nbrackets = [\n    (11600, 0.10),\n    (47150, 0.12),\n    (100525, 0.22),\n    (191950, 0.24),\n]\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef format_percent(value):\n    return \"{:.2f}%\".format(value * 100)\n\n\ndef estimate_progressive_tax(taxable_income, brackets):\n    remaining = taxable_income\n    previous_ceiling = 0\n    total_tax = 0.0\n\n    for ceiling, rate in brackets:\n        slice_amount = min(max(remaining, 0), ceiling - previous_ceiling)\n        total_tax += slice_amount * rate\n        remaining -= slice_amount\n        previous_ceiling = ceiling\n\n    if remaining > 0:\n        total_tax += remaining * brackets[-1][1]\n\n    return total_tax\n\n\ntax_bill = estimate_progressive_tax(taxable_income, brackets)\neffective_rate = tax_bill / taxable_income\n\nlines = [\n    \"Income Tax Calculator\",\n    \"-\" * len(\"Income Tax Calculator\"),\n    \"Estimated tax: \" + format_currency(tax_bill),\n    \"Effective rate: \" + format_percent(effective_rate),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Tax and Salary",
    "pagePath": "/financial-calculators/income-tax-calculator/"
  },
  {
    "id": "salary-calculator",
    "title": "Salary Calculator",
    "category": "Tax and Salary",
    "summary": "Convert an hourly rate into weekly, monthly, and annual salary figures.",
    "tags": [
      "salary",
      "pay",
      "income"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Convert an hourly rate into weekly, monthly, and annual salary figures. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Salary Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Annual pay:"
      }
    ],
    "routeSlug": "salary-calculator",
    "seoTitle": "Salary Calculator Python Script | SharePython.com",
    "seoDescription": "Convert an hourly rate into weekly, monthly, and annual salary figures. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Salary Calculator\n# Edit: hourly_rate, hours_per_week, and weeks_per_year.\n# Assumptions: uses a plain hourly-to-annual conversion.\n# Limitations: ignores overtime and unpaid leave.\n# Output: prints hourly, weekly, monthly, and annual salary equivalents.\n\nhourly_rate = 34.5\nhours_per_week = 40\nweeks_per_year = 50\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\nweekly_pay = hourly_rate * hours_per_week\nannual_pay = weekly_pay * weeks_per_year\nmonthly_pay = annual_pay / 12\n\nlines = [\n    \"Salary Calculator\",\n    \"-\" * len(\"Salary Calculator\"),\n    \"Weekly pay: \" + format_currency(weekly_pay),\n    \"Monthly pay: \" + format_currency(monthly_pay),\n    \"Annual pay: \" + format_currency(annual_pay),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Tax and Salary",
    "pagePath": "/financial-calculators/salary-calculator/"
  },
  {
    "id": "marriage-tax-calculator",
    "title": "Marriage Tax Calculator",
    "category": "Tax and Salary",
    "summary": "Compare simplified tax estimates for two single filers versus one married return.",
    "tags": [
      "marriage-tax",
      "tax",
      "filing"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Compare simplified tax estimates for two single filers versus one married return. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Marriage Tax Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Marriage tax difference:"
      }
    ],
    "routeSlug": "marriage-tax-calculator",
    "seoTitle": "Marriage Tax Calculator Python Script | SharePython.com",
    "seoDescription": "Compare simplified tax estimates for two single filers versus one married return. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Marriage Tax Calculator\n# Edit: partner_a_income, partner_b_income, single_brackets, and married_brackets.\n# Assumptions: tax is estimated from editable bracket tables only.\n# Limitations: not a legal or filing-status recommendation.\n# Output: prints the estimated tax difference between single and married filing.\n\npartner_a_income = 88000\npartner_b_income = 72000\nsingle_brackets = [\n    (11600, 0.10),\n    (47150, 0.12),\n    (100525, 0.22),\n]\nmarried_brackets = [\n    (23200, 0.10),\n    (94300, 0.12),\n    (201050, 0.22),\n]\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef estimate_progressive_tax(taxable_income, brackets):\n    remaining = taxable_income\n    previous_ceiling = 0\n    total_tax = 0.0\n\n    for ceiling, rate in brackets:\n        slice_amount = min(max(remaining, 0), ceiling - previous_ceiling)\n        total_tax += slice_amount * rate\n        remaining -= slice_amount\n        previous_ceiling = ceiling\n\n    if remaining > 0:\n        total_tax += remaining * brackets[-1][1]\n\n    return total_tax\n\n\nsingle_tax = estimate_progressive_tax(partner_a_income, single_brackets) + estimate_progressive_tax(\n    partner_b_income,\n    single_brackets,\n)\nmarried_tax = estimate_progressive_tax(partner_a_income + partner_b_income, married_brackets)\nmarriage_tax = married_tax - single_tax\n\nlines = [\n    \"Marriage Tax Calculator\",\n    \"-\" * len(\"Marriage Tax Calculator\"),\n    \"Combined tax as two singles: \" + format_currency(single_tax),\n    \"Combined tax as married: \" + format_currency(married_tax),\n    \"Marriage tax difference: \" + format_currency(marriage_tax),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Tax and Salary",
    "pagePath": "/financial-calculators/marriage-tax-calculator/"
  },
  {
    "id": "estate-tax-calculator",
    "title": "Estate Tax Calculator",
    "category": "Tax and Salary",
    "summary": "Estimate a simple estate tax bill from a gross estate, exemption, and flat tax rate.",
    "tags": [
      "estate-tax",
      "tax",
      "estate"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate a simple estate tax bill from a gross estate, exemption, and flat tax rate. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Estate Tax Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Estimated estate tax:"
      }
    ],
    "routeSlug": "estate-tax-calculator",
    "seoTitle": "Estate Tax Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate a simple estate tax bill from a gross estate, exemption, and flat tax rate. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Estate Tax Calculator\n# Edit: gross_estate_value, exemption_amount, and tax_rate.\n# Assumptions: tax applies only to the amount above the chosen exemption.\n# Limitations: uses a single flat rate instead of a jurisdiction-specific schedule.\n# Output: prints the taxable estate and estimated estate tax.\n\ngross_estate_value = 16500000\nexemption_amount = 13000000\ntax_rate = 0.40\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ntaxable_estate = max(0.0, gross_estate_value - exemption_amount)\nestate_tax = taxable_estate * tax_rate\n\nlines = [\n    \"Estate Tax Calculator\",\n    \"-\" * len(\"Estate Tax Calculator\"),\n    \"Taxable estate: \" + format_currency(taxable_estate),\n    \"Estimated estate tax: \" + format_currency(estate_tax),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Tax and Salary",
    "pagePath": "/financial-calculators/estate-tax-calculator/"
  },
  {
    "id": "take-home-paycheck-calculator",
    "title": "Take-Home-Paycheck Calculator",
    "category": "Tax and Salary",
    "summary": "Estimate take-home pay from gross salary and a set of flat withholding rates.",
    "tags": [
      "take-home",
      "paycheck",
      "salary"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate take-home pay from gross salary and a set of flat withholding rates. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Take-Home-Paycheck Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Estimated take-home pay:"
      }
    ],
    "routeSlug": "take-home-paycheck-calculator",
    "seoTitle": "Take-Home-Paycheck Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate take-home pay from gross salary and a set of flat withholding rates. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Take-Home-Paycheck Calculator\n# Edit: gross_annual_salary, retirement_contribution_rate, federal_rate, state_rate, and fica_rate.\n# Assumptions: taxes are modeled with simple flat withholding rates.\n# Limitations: does not calculate real payroll withholding tables.\n# Output: prints the monthly gross pay, deductions, and take-home pay.\n\ngross_annual_salary = 96000\nretirement_contribution_rate = 0.06\nfederal_rate = 0.16\nstate_rate = 0.05\nfica_rate = 0.0765\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ngross_monthly_pay = gross_annual_salary / 12\nretirement_contribution = gross_monthly_pay * retirement_contribution_rate\ntaxable_monthly_pay = gross_monthly_pay - retirement_contribution\nwithholding = taxable_monthly_pay * (federal_rate + state_rate + fica_rate)\ntake_home_pay = taxable_monthly_pay - withholding\n\nlines = [\n    \"Take-Home-Paycheck Calculator\",\n    \"-\" * len(\"Take-Home-Paycheck Calculator\"),\n    \"Monthly gross pay: \" + format_currency(gross_monthly_pay),\n    \"Retirement contribution: \" + format_currency(retirement_contribution),\n    \"Estimated withholding: \" + format_currency(withholding),\n    \"Estimated take-home pay: \" + format_currency(take_home_pay),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Tax and Salary",
    "pagePath": "/financial-calculators/take-home-paycheck-calculator/"
  },
  {
    "id": "loan-calculator",
    "title": "Loan Calculator",
    "category": "Other",
    "summary": "Estimate a generic fixed-rate loan payment, total paid, and total interest.",
    "tags": [
      "loan",
      "payment",
      "finance"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate a generic fixed-rate loan payment, total paid, and total interest. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Loan Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Monthly payment:"
      }
    ],
    "routeSlug": "loan-calculator",
    "seoTitle": "Loan Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate a generic fixed-rate loan payment, total paid, and total interest. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Loan Calculator\n# Edit: loan_amount, annual_interest_rate, and loan_term_years.\n# Assumptions: fixed-rate amortizing loan with equal monthly payments.\n# Limitations: excludes taxes, insurance, fees, and irregular payment schedules.\n# Output: prints the monthly payment, total paid, and total interest.\n\nloan_amount = 25000\nannual_interest_rate = 8.2\nloan_term_years = 5\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef monthly_payment(principal, annual_rate_percent, years):\n    payment_count = int(years * 12)\n    monthly_rate = (annual_rate_percent / 100) / 12\n\n    if monthly_rate == 0:\n        return principal / payment_count\n\n    growth = (1 + monthly_rate) ** payment_count\n    return principal * (monthly_rate * growth) / (growth - 1)\n\n\npayment = monthly_payment(loan_amount, annual_interest_rate, loan_term_years)\npayment_count = int(loan_term_years * 12)\ntotal_paid = payment * payment_count\ntotal_interest = total_paid - loan_amount\n\nlines = [\n    \"Loan payment summary\",\n    \"-\" * len(\"Loan payment summary\"),\n    \"Monthly payment: \" + format_currency(payment),\n    \"Total paid: \" + format_currency(total_paid),\n    \"Total interest: \" + format_currency(total_interest),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Other",
    "pagePath": "/financial-calculators/loan-calculator/"
  },
  {
    "id": "payment-calculator",
    "title": "Payment Calculator",
    "category": "Other",
    "summary": "Estimate the payment needed to amortize a balance over a chosen term and rate.",
    "tags": [
      "payment",
      "loan",
      "amortization"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate the payment needed to amortize a balance over a chosen term and rate. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Payment Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Monthly payment:"
      }
    ],
    "routeSlug": "payment-calculator",
    "seoTitle": "Payment Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate the payment needed to amortize a balance over a chosen term and rate. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Payment Calculator\n# Edit: loan_amount, annual_interest_rate, and loan_term_years.\n# Assumptions: fixed-rate amortizing loan with equal monthly payments.\n# Limitations: excludes taxes, insurance, fees, and irregular payment schedules.\n# Output: prints the monthly payment, total paid, and total interest.\n\nloan_amount = 15000\nannual_interest_rate = 7.8\nloan_term_years = 4\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef monthly_payment(principal, annual_rate_percent, years):\n    payment_count = int(years * 12)\n    monthly_rate = (annual_rate_percent / 100) / 12\n\n    if monthly_rate == 0:\n        return principal / payment_count\n\n    growth = (1 + monthly_rate) ** payment_count\n    return principal * (monthly_rate * growth) / (growth - 1)\n\n\npayment = monthly_payment(loan_amount, annual_interest_rate, loan_term_years)\npayment_count = int(loan_term_years * 12)\ntotal_paid = payment * payment_count\ntotal_interest = total_paid - loan_amount\n\nlines = [\n    \"Payment calculator summary\",\n    \"-\" * len(\"Payment calculator summary\"),\n    \"Monthly payment: \" + format_currency(payment),\n    \"Total paid: \" + format_currency(total_paid),\n    \"Total interest: \" + format_currency(total_interest),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Other",
    "pagePath": "/financial-calculators/payment-calculator/"
  },
  {
    "id": "currency-calculator",
    "title": "Currency Calculator",
    "category": "Other",
    "summary": "Convert a USD amount using editable exchange rates entered directly in the script.",
    "tags": [
      "currency",
      "exchange-rate",
      "conversion"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Convert a USD amount using editable exchange rates entered directly in the script. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Currency Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "EUR equivalent:"
      }
    ],
    "routeSlug": "currency-calculator",
    "seoTitle": "Currency Calculator Python Script | SharePython.com",
    "seoDescription": "Convert a USD amount using editable exchange rates entered directly in the script. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Currency Calculator\n# Edit: base_amount, usd_to_eur_rate, and usd_to_gbp_rate.\n# Assumptions: exchange rates are entered manually in the script.\n# Limitations: does not fetch live market data.\n# Output: prints the converted values in each target currency.\n\nbase_amount_usd = 2500\nusd_to_eur_rate = 0.92\nusd_to_gbp_rate = 0.79\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\nlines = [\n    \"Currency Calculator\",\n    \"-\" * len(\"Currency Calculator\"),\n    \"EUR equivalent: \" + format_currency(base_amount_usd * usd_to_eur_rate),\n    \"GBP equivalent: \" + format_currency(base_amount_usd * usd_to_gbp_rate),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Other",
    "pagePath": "/financial-calculators/currency-calculator/"
  },
  {
    "id": "inflation-calculator",
    "title": "Inflation Calculator",
    "category": "Other",
    "summary": "Project a future cost and today-value comparison from a simple inflation rate.",
    "tags": [
      "inflation",
      "purchasing-power",
      "finance"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Project a future cost and today-value comparison from a simple inflation rate. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Inflation Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Inflated future cost:"
      }
    ],
    "routeSlug": "inflation-calculator",
    "seoTitle": "Inflation Calculator Python Script | SharePython.com",
    "seoDescription": "Project a future cost and today-value comparison from a simple inflation rate. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Inflation Calculator\n# Edit: current_cost, annual_inflation_rate, and years.\n# Assumptions: inflation compounds at one constant annual rate.\n# Limitations: does not use CPI history or regional series.\n# Output: prints the inflated future cost and the real-value adjustment.\n\ncurrent_cost = 1800\nannual_inflation_rate = 0.03\nyears = 8\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\nfuture_cost = current_cost * ((1 + annual_inflation_rate) ** years)\nreal_value = current_cost / ((1 + annual_inflation_rate) ** years)\n\nlines = [\n    \"Inflation Calculator\",\n    \"-\" * len(\"Inflation Calculator\"),\n    \"Inflated future cost: \" + format_currency(future_cost),\n    \"Today's equivalent of the future cost: \" + format_currency(real_value),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Other",
    "pagePath": "/financial-calculators/inflation-calculator/"
  },
  {
    "id": "sales-tax-calculator",
    "title": "Sales Tax Calculator",
    "category": "Other",
    "summary": "Compute a sales tax amount and a tax-inclusive price from a base amount.",
    "tags": [
      "sales-tax",
      "tax",
      "purchase"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Compute a sales tax amount and a tax-inclusive price from a base amount. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Sales Tax Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Tax-inclusive price:"
      }
    ],
    "routeSlug": "sales-tax-calculator",
    "seoTitle": "Sales Tax Calculator Python Script | SharePython.com",
    "seoDescription": "Compute a sales tax amount and a tax-inclusive price from a base amount. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Sales Tax Calculator\n# Edit: pre_tax_price and tax_rate.\n# Assumptions: sales tax is applied as a flat percentage.\n# Limitations: does not model exemptions or multiple tax layers.\n# Output: prints the tax amount and tax-inclusive price.\n\npre_tax_price = 84.99\ntax_rate = 0.0825\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef format_percent(value):\n    return \"{:.2f}%\".format(value * 100)\n\n\ntax_amount = pre_tax_price * tax_rate\nafter_tax_price = pre_tax_price + tax_amount\n\nlines = [\n    \"Sales Tax Calculator\",\n    \"-\" * len(\"Sales Tax Calculator\"),\n    \"Sales tax rate: \" + format_percent(tax_rate),\n    \"Sales tax amount: \" + format_currency(tax_amount),\n    \"Tax-inclusive price: \" + format_currency(after_tax_price),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Other",
    "pagePath": "/financial-calculators/sales-tax-calculator/"
  },
  {
    "id": "credit-card-calculator",
    "title": "Credit Card Calculator",
    "category": "Other",
    "summary": "Estimate credit card payoff time and interest from a fixed monthly payment.",
    "tags": [
      "credit-card",
      "debt",
      "payoff"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate credit card payoff time and interest from a fixed monthly payment. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Credit Card Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Estimated payoff months:"
      }
    ],
    "routeSlug": "credit-card-calculator",
    "seoTitle": "Credit Card Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate credit card payoff time and interest from a fixed monthly payment. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Credit Card Calculator\n# Edit: balance, annual_interest_rate, and fixed_monthly_payment.\n# Assumptions: interest compounds monthly and the payment stays fixed.\n# Limitations: does not model late fees, new charges, or penalty rates.\n# Output: prints the payoff month count and total interest paid.\n\nbalance = 8700\nannual_interest_rate = 0.219\nfixed_monthly_payment = 265\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\nmonthly_rate = annual_interest_rate / 12\nmonth = 0\ntotal_interest = 0.0\nremaining_balance = balance\n\nwhile remaining_balance > 0.01 and month < 1200:\n    month += 1\n    interest = remaining_balance * monthly_rate\n    total_interest += interest\n    principal_paid = max(0.0, fixed_monthly_payment - interest)\n    remaining_balance = max(0.0, remaining_balance - principal_paid)\n\nlines = [\n    \"Credit Card Calculator\",\n    \"-\" * len(\"Credit Card Calculator\"),\n    \"Estimated payoff months: \" + str(month),\n    \"Total interest paid: \" + format_currency(total_interest),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Other",
    "pagePath": "/financial-calculators/credit-card-calculator/"
  },
  {
    "id": "credit-cards-payoff-calculator",
    "title": "Credit Cards Payoff Calculator",
    "category": "Other",
    "summary": "Rank multiple cards for an avalanche payoff plan and summarize the combined minimum payment.",
    "tags": [
      "credit-cards",
      "payoff",
      "debt"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Rank multiple cards for an avalanche payoff plan and summarize the combined minimum payment. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Credit Cards Payoff Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Next target debt:"
      }
    ],
    "routeSlug": "credit-cards-payoff-calculator",
    "seoTitle": "Credit Cards Payoff Calculator Python Script | SharePython.com",
    "seoDescription": "Rank multiple cards for an avalanche payoff plan and summarize the combined minimum payment. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Credit Cards Payoff Calculator\n# Edit: debts.\n# Assumptions: avalanche ordering is based on the current balances and APRs only.\n# Limitations: does not model new charges or promotional balance transfers.\n# Output: prints the next target debt and combined minimum payments.\n\ndebts = [\n    {\"name\": \"card_a\", \"balance\": 4600, \"apr\": 0.249, \"minimum_payment\": 150},\n    {\"name\": \"card_b\", \"balance\": 1800, \"apr\": 0.189, \"minimum_payment\": 60},\n    {\"name\": \"card_c\", \"balance\": 7200, \"apr\": 0.159, \"minimum_payment\": 210},\n]\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\nordered_debts = sorted(\n    debts,\n    key=lambda debt: (\n        debt[\"balance\"] if \"avalanche\" == \"snowball\" else -debt[\"apr\"],\n        debt[\"balance\"],\n    ),\n)\ntotal_balance = sum(debt[\"balance\"] for debt in debts)\ntotal_minimum = sum(debt[\"minimum_payment\"] for debt in debts)\nnext_target = ordered_debts[0]\n\nlines = [\n    \"Credit Cards Payoff Calculator\",\n    \"-\" * len(\"Credit Cards Payoff Calculator\"),\n    \"Total balance: \" + format_currency(total_balance),\n    \"Combined minimum payment: \" + format_currency(total_minimum),\n    \"Next target debt: {} ({})\".format(next_target[\"name\"], format_currency(next_target[\"balance\"])),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Other",
    "pagePath": "/financial-calculators/credit-cards-payoff-calculator/"
  },
  {
    "id": "debt-payoff-calculator",
    "title": "Debt Payoff Calculator",
    "category": "Other",
    "summary": "Rank multiple debts for a simplified snowball payoff plan.",
    "tags": [
      "debt",
      "payoff",
      "snowball"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Rank multiple debts for a simplified snowball payoff plan. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Debt Payoff Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Next target debt:"
      }
    ],
    "routeSlug": "debt-payoff-calculator",
    "seoTitle": "Debt Payoff Calculator Python Script | SharePython.com",
    "seoDescription": "Rank multiple debts for a simplified snowball payoff plan. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Debt Payoff Calculator\n# Edit: debts.\n# Assumptions: snowball ordering is based on the current balances and APRs only.\n# Limitations: does not model new charges or promotional balance transfers.\n# Output: prints the next target debt and combined minimum payments.\n\ndebts = [\n    {\"name\": \"card_a\", \"balance\": 4600, \"apr\": 0.249, \"minimum_payment\": 150},\n    {\"name\": \"card_b\", \"balance\": 1800, \"apr\": 0.189, \"minimum_payment\": 60},\n    {\"name\": \"card_c\", \"balance\": 7200, \"apr\": 0.159, \"minimum_payment\": 210},\n]\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\nordered_debts = sorted(\n    debts,\n    key=lambda debt: (\n        debt[\"balance\"] if \"snowball\" == \"snowball\" else -debt[\"apr\"],\n        debt[\"balance\"],\n    ),\n)\ntotal_balance = sum(debt[\"balance\"] for debt in debts)\ntotal_minimum = sum(debt[\"minimum_payment\"] for debt in debts)\nnext_target = ordered_debts[0]\n\nlines = [\n    \"Debt Payoff Calculator\",\n    \"-\" * len(\"Debt Payoff Calculator\"),\n    \"Total balance: \" + format_currency(total_balance),\n    \"Combined minimum payment: \" + format_currency(total_minimum),\n    \"Next target debt: {} ({})\".format(next_target[\"name\"], format_currency(next_target[\"balance\"])),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Other",
    "pagePath": "/financial-calculators/debt-payoff-calculator/"
  },
  {
    "id": "debt-consolidation-calculator",
    "title": "Debt Consolidation Calculator",
    "category": "Other",
    "summary": "Compare a weighted average debt rate against a new consolidated loan offer.",
    "tags": [
      "debt-consolidation",
      "loan",
      "comparison"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Compare a weighted average debt rate against a new consolidated loan offer. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Debt Consolidation Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Consolidated monthly payment:"
      }
    ],
    "routeSlug": "debt-consolidation-calculator",
    "seoTitle": "Debt Consolidation Calculator Python Script | SharePython.com",
    "seoDescription": "Compare a weighted average debt rate against a new consolidated loan offer. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Debt Consolidation Calculator\n# Edit: current_debts, new_annual_rate, and new_term_years.\n# Assumptions: the consolidated loan pays off all listed debts immediately.\n# Limitations: does not include fees or changes in credit score.\n# Output: prints the current weighted rate and the new consolidated payment.\n\ncurrent_debts = [\n    {\"balance\": 5200, \"annual_rate\": 0.239},\n    {\"balance\": 9100, \"annual_rate\": 0.149},\n    {\"balance\": 4700, \"annual_rate\": 0.189},\n]\nnew_annual_rate = 0.109\nnew_term_years = 4\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef format_percent(value):\n    return \"{:.2f}%\".format(value * 100)\n\n\ndef monthly_payment(principal, annual_rate_percent, years):\n    payment_count = int(years * 12)\n    monthly_rate = (annual_rate_percent / 100) / 12\n\n    if monthly_rate == 0:\n        return principal / payment_count\n\n    growth = (1 + monthly_rate) ** payment_count\n    return principal * (monthly_rate * growth) / (growth - 1)\n\n\ntotal_balance = sum(item[\"balance\"] for item in current_debts)\nweighted_rate = sum(item[\"balance\"] * item[\"annual_rate\"] for item in current_debts) / total_balance\nnew_payment = monthly_payment(total_balance, new_annual_rate * 100, new_term_years)\n\nlines = [\n    \"Debt Consolidation Calculator\",\n    \"-\" * len(\"Debt Consolidation Calculator\"),\n    \"Combined balance: \" + format_currency(total_balance),\n    \"Current weighted rate: \" + format_percent(weighted_rate),\n    \"Consolidated monthly payment: \" + format_currency(new_payment),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Other",
    "pagePath": "/financial-calculators/debt-consolidation-calculator/"
  },
  {
    "id": "repayment-calculator",
    "title": "Repayment Calculator",
    "category": "Other",
    "summary": "Print a compact repayment schedule summary and opening amortization rows.",
    "tags": [
      "repayment",
      "loan",
      "schedule"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Print a compact repayment schedule summary and opening amortization rows. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Repayment Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Estimated payoff month:"
      }
    ],
    "routeSlug": "repayment-calculator",
    "seoTitle": "Repayment Calculator Python Script | SharePython.com",
    "seoDescription": "Print a compact repayment schedule summary and opening amortization rows. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Repayment Calculator\n# Edit: loan_amount, annual_interest_rate, loan_term_years, and extra_monthly_payment.\n# Assumptions: fixed-rate loan and monthly extra payments applied directly to principal.\n# Limitations: shows only a summary plus the first three scheduled payments.\n# Output: prints payment details, payoff month count, and the opening schedule rows.\n\nloan_amount = 18000\nannual_interest_rate = 7.25\nloan_term_years = 5\nextra_monthly_payment = 100\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef monthly_payment(principal, annual_rate_percent, years):\n    payment_count = int(years * 12)\n    monthly_rate = (annual_rate_percent / 100) / 12\n\n    if monthly_rate == 0:\n        return principal / payment_count\n\n    growth = (1 + monthly_rate) ** payment_count\n    return principal * (monthly_rate * growth) / (growth - 1)\n\n\npayment = monthly_payment(loan_amount, annual_interest_rate, loan_term_years)\nmonthly_rate = (annual_interest_rate / 100) / 12\nbalance = loan_amount\nschedule = []\nmonth = 0\n\nwhile balance > 0.01 and month < 1000:\n    month += 1\n    interest = balance * monthly_rate\n    principal_paid = min(balance, payment + extra_monthly_payment - interest)\n    balance = max(0.0, balance - principal_paid)\n\n    if month <= 3:\n        schedule.append(\n            \"Month {:>2}: principal {} | interest {} | balance {}\".format(\n                month,\n                format_currency(principal_paid),\n                format_currency(interest),\n                format_currency(balance),\n            )\n        )\n\nlines = [\n    \"Repayment Calculator\",\n    \"-\" * len(\"Repayment Calculator\"),\n    \"Scheduled payment: \" + format_currency(payment),\n    \"Extra monthly payment: \" + format_currency(extra_monthly_payment),\n    \"Estimated payoff month: \" + str(month),\n    \"\",\n] + schedule\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Other",
    "pagePath": "/financial-calculators/repayment-calculator/"
  },
  {
    "id": "student-loan-calculator",
    "title": "Student Loan Calculator",
    "category": "Other",
    "summary": "Estimate a fixed student loan payment, total paid, and total interest.",
    "tags": [
      "student-loan",
      "loan",
      "education"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate a fixed student loan payment, total paid, and total interest. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Student Loan Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Monthly payment:"
      }
    ],
    "routeSlug": "student-loan-calculator",
    "seoTitle": "Student Loan Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate a fixed student loan payment, total paid, and total interest. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Student Loan Calculator\n# Edit: loan_amount, annual_interest_rate, and loan_term_years.\n# Assumptions: fixed-rate amortizing loan with equal monthly payments.\n# Limitations: excludes taxes, insurance, fees, and irregular payment schedules.\n# Output: prints the monthly payment, total paid, and total interest.\n\nloan_amount = 42000\nannual_interest_rate = 5.5\nloan_term_years = 10\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef monthly_payment(principal, annual_rate_percent, years):\n    payment_count = int(years * 12)\n    monthly_rate = (annual_rate_percent / 100) / 12\n\n    if monthly_rate == 0:\n        return principal / payment_count\n\n    growth = (1 + monthly_rate) ** payment_count\n    return principal * (monthly_rate * growth) / (growth - 1)\n\n\npayment = monthly_payment(loan_amount, annual_interest_rate, loan_term_years)\npayment_count = int(loan_term_years * 12)\ntotal_paid = payment * payment_count\ntotal_interest = total_paid - loan_amount\n\nlines = [\n    \"Student loan payment summary\",\n    \"-\" * len(\"Student loan payment summary\"),\n    \"Monthly payment: \" + format_currency(payment),\n    \"Total paid: \" + format_currency(total_paid),\n    \"Total interest: \" + format_currency(total_interest),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Other",
    "pagePath": "/financial-calculators/student-loan-calculator/"
  },
  {
    "id": "college-cost-calculator",
    "title": "College Cost Calculator",
    "category": "Other",
    "summary": "Project future college costs with inflation and compare them to current savings growth.",
    "tags": [
      "college-cost",
      "education",
      "savings"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Project future college costs with inflation and compare them to current savings growth. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for College Cost Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Ending balance:"
      }
    ],
    "routeSlug": "college-cost-calculator",
    "seoTitle": "College Cost Calculator Python Script | SharePython.com",
    "seoDescription": "Project future college costs with inflation and compare them to current savings growth. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# College Cost Calculator\n# Edit: starting_balance, annual_return_rate, years, monthly_contribution, and annual_fee_rate.\n# Assumptions: returns compound monthly and contributions are made at month end.\n# Limitations: uses a constant rate of return and fee rate.\n# Output: prints the ending balance and total contributions.\n\nstarting_balance = 12000\nannual_return_rate = 5\nyears = 12\nmonthly_contribution = 250\nannual_fee_rate = 0\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef project_balance(starting_balance, annual_return_percent, years, monthly_contribution=0.0):\n    monthly_rate = (annual_return_percent / 100) / 12\n    months = int(years * 12)\n    balance = starting_balance\n\n    for _ in range(months):\n        balance = balance * (1 + monthly_rate) + monthly_contribution\n\n    return balance\n\n\nnet_annual_return = annual_return_rate - annual_fee_rate\nending_balance = project_balance(\n    starting_balance,\n    net_annual_return,\n    years,\n    monthly_contribution=monthly_contribution,\n)\ntotal_contributions = starting_balance + (monthly_contribution * int(years * 12))\n\nlines = [\n    \"College cost funding projection\",\n    \"-\" * len(\"College cost funding projection\"),\n    \"Ending balance: \" + format_currency(ending_balance),\n    \"Total contributed: \" + format_currency(total_contributions),\n    \"Investment growth: \" + format_currency(ending_balance - total_contributions),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Other",
    "pagePath": "/financial-calculators/college-cost-calculator/"
  },
  {
    "id": "vat-calculator",
    "title": "VAT Calculator",
    "category": "Other",
    "summary": "Compute VAT and a VAT-inclusive price from a pre-tax amount.",
    "tags": [
      "vat",
      "tax",
      "purchase"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Compute VAT and a VAT-inclusive price from a pre-tax amount. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for VAT Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Tax-inclusive price:"
      }
    ],
    "routeSlug": "vat-calculator",
    "seoTitle": "VAT Calculator Python Script | SharePython.com",
    "seoDescription": "Compute VAT and a VAT-inclusive price from a pre-tax amount. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# VAT Calculator\n# Edit: pre_tax_price and tax_rate.\n# Assumptions: vat is applied as a flat percentage.\n# Limitations: does not model exemptions or multiple tax layers.\n# Output: prints the tax amount and tax-inclusive price.\n\npre_tax_price = 84.99\ntax_rate = 0.2\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef format_percent(value):\n    return \"{:.2f}%\".format(value * 100)\n\n\ntax_amount = pre_tax_price * tax_rate\nafter_tax_price = pre_tax_price + tax_amount\n\nlines = [\n    \"VAT Calculator\",\n    \"-\" * len(\"VAT Calculator\"),\n    \"VAT rate: \" + format_percent(tax_rate),\n    \"VAT amount: \" + format_currency(tax_amount),\n    \"Tax-inclusive price: \" + format_currency(after_tax_price),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Other",
    "pagePath": "/financial-calculators/vat-calculator/"
  },
  {
    "id": "depreciation-calculator",
    "title": "Depreciation Calculator",
    "category": "Other",
    "summary": "Compare straight-line depreciation with a first-year double-declining estimate.",
    "tags": [
      "depreciation",
      "asset",
      "accounting"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Compare straight-line depreciation with a first-year double-declining estimate. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Depreciation Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Annual straight-line depreciation:"
      }
    ],
    "routeSlug": "depreciation-calculator",
    "seoTitle": "Depreciation Calculator Python Script | SharePython.com",
    "seoDescription": "Compare straight-line depreciation with a first-year double-declining estimate. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Depreciation Calculator\n# Edit: asset_cost, salvage_value, and useful_life_years.\n# Assumptions: compares straight-line depreciation with one year of double-declining balance.\n# Limitations: does not handle tax conventions or partial years.\n# Output: prints the annual straight-line depreciation and first-year double-declining amount.\n\nasset_cost = 28500\nsalvage_value = 4500\nuseful_life_years = 5\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\nstraight_line = (asset_cost - salvage_value) / useful_life_years\ndouble_declining_year_one = asset_cost * (2 / useful_life_years)\n\nlines = [\n    \"Depreciation Calculator\",\n    \"-\" * len(\"Depreciation Calculator\"),\n    \"Annual straight-line depreciation: \" + format_currency(straight_line),\n    \"Year-one double-declining depreciation: \" + format_currency(double_declining_year_one),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Other",
    "pagePath": "/financial-calculators/depreciation-calculator/"
  },
  {
    "id": "margin-calculator",
    "title": "Margin Calculator",
    "category": "Other",
    "summary": "Compute gross profit, margin, and markup from selling price and cost.",
    "tags": [
      "margin",
      "markup",
      "pricing"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Compute gross profit, margin, and markup from selling price and cost. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Margin Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Gross margin:"
      }
    ],
    "routeSlug": "margin-calculator",
    "seoTitle": "Margin Calculator Python Script | SharePython.com",
    "seoDescription": "Compute gross profit, margin, and markup from selling price and cost. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Margin Calculator\n# Edit: selling_price and cost_of_goods_sold.\n# Assumptions: gross margin and markup are calculated from one sale price and one cost figure.\n# Limitations: does not allocate overhead.\n# Output: prints gross profit, margin, and markup.\n\nselling_price = 125\ncost_of_goods_sold = 72\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef format_percent(value):\n    return \"{:.2f}%\".format(value * 100)\n\n\ngross_profit = selling_price - cost_of_goods_sold\ngross_margin = gross_profit / selling_price\nmarkup = gross_profit / cost_of_goods_sold\n\nlines = [\n    \"Margin Calculator\",\n    \"-\" * len(\"Margin Calculator\"),\n    \"Gross profit: \" + format_currency(gross_profit),\n    \"Gross margin: \" + format_percent(gross_margin),\n    \"Markup: \" + format_percent(markup),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Other",
    "pagePath": "/financial-calculators/margin-calculator/"
  },
  {
    "id": "discount-calculator",
    "title": "Discount Calculator",
    "category": "Other",
    "summary": "Compute savings and a discounted price from a list price and discount rate.",
    "tags": [
      "discount",
      "pricing",
      "sale"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Compute savings and a discounted price from a list price and discount rate. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Discount Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Discounted price:"
      }
    ],
    "routeSlug": "discount-calculator",
    "seoTitle": "Discount Calculator Python Script | SharePython.com",
    "seoDescription": "Compute savings and a discounted price from a list price and discount rate. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Discount Calculator\n# Edit: list_price and discount_rate.\n# Assumptions: discount is applied as a flat percent off the list price.\n# Limitations: does not stack coupons or taxes.\n# Output: prints the savings amount and discounted price.\n\nlist_price = 149.99\ndiscount_rate = 0.18\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef format_percent(value):\n    return \"{:.2f}%\".format(value * 100)\n\n\nsavings = list_price * discount_rate\ndiscounted_price = list_price - savings\n\nlines = [\n    \"Discount Calculator\",\n    \"-\" * len(\"Discount Calculator\"),\n    \"Discount rate: \" + format_percent(discount_rate),\n    \"Savings: \" + format_currency(savings),\n    \"Discounted price: \" + format_currency(discounted_price),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Other",
    "pagePath": "/financial-calculators/discount-calculator/"
  },
  {
    "id": "business-loan-calculator",
    "title": "Business Loan Calculator",
    "category": "Other",
    "summary": "Estimate a business loan payment, total paid, and total interest.",
    "tags": [
      "business-loan",
      "loan",
      "payment"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate a business loan payment, total paid, and total interest. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Business Loan Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Monthly payment:"
      }
    ],
    "routeSlug": "business-loan-calculator",
    "seoTitle": "Business Loan Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate a business loan payment, total paid, and total interest. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Business Loan Calculator\n# Edit: loan_amount, annual_interest_rate, and loan_term_years.\n# Assumptions: fixed-rate amortizing loan with equal monthly payments.\n# Limitations: excludes taxes, insurance, fees, and irregular payment schedules.\n# Output: prints the monthly payment, total paid, and total interest.\n\nloan_amount = 95000\nannual_interest_rate = 9.1\nloan_term_years = 7\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef monthly_payment(principal, annual_rate_percent, years):\n    payment_count = int(years * 12)\n    monthly_rate = (annual_rate_percent / 100) / 12\n\n    if monthly_rate == 0:\n        return principal / payment_count\n\n    growth = (1 + monthly_rate) ** payment_count\n    return principal * (monthly_rate * growth) / (growth - 1)\n\n\npayment = monthly_payment(loan_amount, annual_interest_rate, loan_term_years)\npayment_count = int(loan_term_years * 12)\ntotal_paid = payment * payment_count\ntotal_interest = total_paid - loan_amount\n\nlines = [\n    \"Business loan payment summary\",\n    \"-\" * len(\"Business loan payment summary\"),\n    \"Monthly payment: \" + format_currency(payment),\n    \"Total paid: \" + format_currency(total_paid),\n    \"Total interest: \" + format_currency(total_interest),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Other",
    "pagePath": "/financial-calculators/business-loan-calculator/"
  },
  {
    "id": "personal-loan-calculator",
    "title": "Personal Loan Calculator",
    "category": "Other",
    "summary": "Estimate a personal loan payment, total paid, and total interest.",
    "tags": [
      "personal-loan",
      "loan",
      "payment"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate a personal loan payment, total paid, and total interest. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Personal Loan Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Monthly payment:"
      }
    ],
    "routeSlug": "personal-loan-calculator",
    "seoTitle": "Personal Loan Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate a personal loan payment, total paid, and total interest. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Personal Loan Calculator\n# Edit: loan_amount, annual_interest_rate, and loan_term_years.\n# Assumptions: fixed-rate amortizing loan with equal monthly payments.\n# Limitations: excludes taxes, insurance, fees, and irregular payment schedules.\n# Output: prints the monthly payment, total paid, and total interest.\n\nloan_amount = 18000\nannual_interest_rate = 10.8\nloan_term_years = 4\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef monthly_payment(principal, annual_rate_percent, years):\n    payment_count = int(years * 12)\n    monthly_rate = (annual_rate_percent / 100) / 12\n\n    if monthly_rate == 0:\n        return principal / payment_count\n\n    growth = (1 + monthly_rate) ** payment_count\n    return principal * (monthly_rate * growth) / (growth - 1)\n\n\npayment = monthly_payment(loan_amount, annual_interest_rate, loan_term_years)\npayment_count = int(loan_term_years * 12)\ntotal_paid = payment * payment_count\ntotal_interest = total_paid - loan_amount\n\nlines = [\n    \"Personal loan payment summary\",\n    \"-\" * len(\"Personal loan payment summary\"),\n    \"Monthly payment: \" + format_currency(payment),\n    \"Total paid: \" + format_currency(total_paid),\n    \"Total interest: \" + format_currency(total_interest),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Other",
    "pagePath": "/financial-calculators/personal-loan-calculator/"
  },
  {
    "id": "boat-loan-calculator",
    "title": "Boat Loan Calculator",
    "category": "Other",
    "summary": "Estimate a boat loan payment, total paid, and total interest.",
    "tags": [
      "boat-loan",
      "loan",
      "payment"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate a boat loan payment, total paid, and total interest. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Boat Loan Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Monthly payment:"
      }
    ],
    "routeSlug": "boat-loan-calculator",
    "seoTitle": "Boat Loan Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate a boat loan payment, total paid, and total interest. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Boat Loan Calculator\n# Edit: loan_amount, annual_interest_rate, and loan_term_years.\n# Assumptions: fixed-rate amortizing loan with equal monthly payments.\n# Limitations: excludes taxes, insurance, fees, and irregular payment schedules.\n# Output: prints the monthly payment, total paid, and total interest.\n\nloan_amount = 42000\nannual_interest_rate = 7.9\nloan_term_years = 10\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef monthly_payment(principal, annual_rate_percent, years):\n    payment_count = int(years * 12)\n    monthly_rate = (annual_rate_percent / 100) / 12\n\n    if monthly_rate == 0:\n        return principal / payment_count\n\n    growth = (1 + monthly_rate) ** payment_count\n    return principal * (monthly_rate * growth) / (growth - 1)\n\n\npayment = monthly_payment(loan_amount, annual_interest_rate, loan_term_years)\npayment_count = int(loan_term_years * 12)\ntotal_paid = payment * payment_count\ntotal_interest = total_paid - loan_amount\n\nlines = [\n    \"Boat loan payment summary\",\n    \"-\" * len(\"Boat loan payment summary\"),\n    \"Monthly payment: \" + format_currency(payment),\n    \"Total paid: \" + format_currency(total_paid),\n    \"Total interest: \" + format_currency(total_interest),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Other",
    "pagePath": "/financial-calculators/boat-loan-calculator/"
  },
  {
    "id": "lease-calculator",
    "title": "Lease Calculator",
    "category": "Other",
    "summary": "Estimate a simplified lease payment from cost, residual value, and money factor.",
    "tags": [
      "lease",
      "payment",
      "vehicle"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate a simplified lease payment from cost, residual value, and money factor. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Lease Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Pretax monthly payment:"
      }
    ],
    "routeSlug": "lease-calculator",
    "seoTitle": "Lease Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate a simplified lease payment from cost, residual value, and money factor. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Lease Calculator\n# Edit: negotiated_price, residual_value, money_factor, lease_term_months, and sales_tax_rate.\n# Assumptions: lease payment uses a simplified depreciation-plus-finance formula.\n# Limitations: excludes fees, rebates, and local tax quirks.\n# Output: prints the estimated pretax and after-tax monthly lease payment.\n\nnegotiated_price = 39200\nresidual_value = 22100\nmoney_factor = 0.0021\nlease_term_months = 36\nsales_tax_rate = 0.0725\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\nmonthly_depreciation = (negotiated_price - residual_value) / lease_term_months\nmonthly_finance_charge = (negotiated_price + residual_value) * money_factor\npretax_payment = monthly_depreciation + monthly_finance_charge\nafter_tax_payment = pretax_payment * (1 + sales_tax_rate)\n\nlines = [\n    \"Lease Calculator\",\n    \"-\" * len(\"Lease Calculator\"),\n    \"Pretax monthly payment: \" + format_currency(pretax_payment),\n    \"After-tax monthly payment: \" + format_currency(after_tax_payment),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Other",
    "pagePath": "/financial-calculators/lease-calculator/"
  },
  {
    "id": "budget-calculator",
    "title": "Budget Calculator",
    "category": "Other",
    "summary": "Summarize monthly spending, surplus, and the largest expense category.",
    "tags": [
      "budget",
      "spending",
      "cash-flow"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Summarize monthly spending, surplus, and the largest expense category. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Budget Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Monthly surplus:"
      }
    ],
    "routeSlug": "budget-calculator",
    "seoTitle": "Budget Calculator Python Script | SharePython.com",
    "seoDescription": "Summarize monthly spending, surplus, and the largest expense category. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Budget Calculator\n# Edit: monthly_income and expense_categories.\n# Assumptions: budget categories are entered as monthly amounts.\n# Limitations: does not model sinking funds or debt strategy.\n# Output: prints total spending, surplus, and the largest category.\n\nmonthly_income = 6400\nexpense_categories = {\n    \"housing\": 1850,\n    \"food\": 700,\n    \"transportation\": 420,\n    \"insurance\": 360,\n    \"debt\": 525,\n    \"other\": 680,\n}\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ntotal_spending = sum(expense_categories.values())\nmonthly_surplus = monthly_income - total_spending\nlargest_category = max(expense_categories, key=expense_categories.get)\n\nlines = [\n    \"Budget Calculator\",\n    \"-\" * len(\"Budget Calculator\"),\n    \"Total spending: \" + format_currency(total_spending),\n    \"Monthly surplus: \" + format_currency(monthly_surplus),\n    \"Largest category: {} ({})\".format(\n        largest_category,\n        format_currency(expense_categories[largest_category]),\n    ),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Other",
    "pagePath": "/financial-calculators/budget-calculator/"
  },
  {
    "id": "commission-calculator",
    "title": "Commission Calculator",
    "category": "Other",
    "summary": "Compute commission pay from sales volume, commission rate, and base pay.",
    "tags": [
      "commission",
      "sales",
      "pay"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Compute commission pay from sales volume, commission rate, and base pay. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated financial calculator page for Commission Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Commission amount:"
      }
    ],
    "routeSlug": "commission-calculator",
    "seoTitle": "Commission Calculator Python Script | SharePython.com",
    "seoDescription": "Compute commission pay from sales volume, commission rate, and base pay. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Commission Calculator\n# Edit: sales_amount, commission_rate, and base_pay.\n# Assumptions: commission is a flat percentage of sales.\n# Limitations: does not model tiers or clawbacks.\n# Output: prints the commission amount and total pay.\n\nsales_amount = 58000\ncommission_rate = 0.07\nbase_pay = 3200\n\n\ndef format_currency(amount):\n    rounded_cents = int(round(amount * 100))\n    dollars = rounded_cents // 100\n    cents = rounded_cents % 100\n    groups = []\n\n    while dollars >= 1000:\n        groups.append(\"{:03d}\".format(dollars % 1000))\n        dollars //= 1000\n\n    groups.append(str(dollars))\n    return \"$\" + \"{}.{:02d}\".format(\",\".join(reversed(groups)), cents)\n\n\ndef format_percent(value):\n    return \"{:.2f}%\".format(value * 100)\n\n\ncommission_amount = sales_amount * commission_rate\ntotal_pay = base_pay + commission_amount\n\nlines = [\n    \"Commission Calculator\",\n    \"-\" * len(\"Commission Calculator\"),\n    \"Commission rate: \" + format_percent(commission_rate),\n    \"Commission amount: \" + format_currency(commission_amount),\n    \"Total pay: \" + format_currency(total_pay),\n]\n\nprint(\"\\n\".join(lines))\n",
    "pageGroup": "Finance",
    "pageSection": "Other",
    "pagePath": "/financial-calculators/commission-calculator/"
  },
  {
    "id": "scientific-calculator",
    "title": "Scientific Calculator",
    "category": "Arithmetic",
    "summary": "Evaluate a math expression with common scientific functions and constants.",
    "tags": [
      "scientific",
      "expression",
      "math"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Evaluate a math expression with common scientific functions and constants. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated math calculator page for Scientific Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Result:"
      }
    ],
    "routeSlug": "scientific-calculator",
    "seoTitle": "Scientific Calculator Python Script | SharePython.com",
    "seoDescription": "Evaluate a math expression with common scientific functions and constants. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Scientific Calculator\n# Edit: expression.\n# Assumptions: the expression uses Python math syntax with functions from the math module.\n# Limitations: supports only the functions explicitly exposed to eval.\n# Output: prints the expression and the computed result.\n\nimport math\n\nexpression = \"sin(radians(35)) + sqrt(81) / 3\"\n\n\ndef format_number(value, digits=6):\n    if isinstance(value, int):\n        return str(value)\n\n    rounded = round(value, digits)\n    text = \"{:.6f}\".format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\nallowed_names = {\n    \"sin\": math.sin,\n    \"cos\": math.cos,\n    \"tan\": math.tan,\n    \"sqrt\": math.sqrt,\n    \"log\": math.log,\n    \"log10\": math.log10,\n    \"pi\": math.pi,\n    \"e\": math.e,\n    \"radians\": math.radians,\n    \"degrees\": math.degrees,\n    \"abs\": abs,\n}\n\nresult = eval(expression, {\"__builtins__\": {}}, allowed_names)\n\nprint(\"Scientific calculator\")\nprint(\"---------------------\")\nprint(\"Expression:\", expression)\nprint(\"Result:\", format_number(result))\n",
    "pageGroup": "Math",
    "pageSection": "Arithmetic",
    "pagePath": "/math-calculators/scientific-calculator/"
  },
  {
    "id": "fraction-calculator",
    "title": "Fraction Calculator",
    "category": "Arithmetic",
    "summary": "Simplify two fractions and print the four basic operations.",
    "tags": [
      "fraction",
      "ratio",
      "arithmetic"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Simplify two fractions and print the four basic operations. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated math calculator page for Fraction Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Decimal sum:"
      }
    ],
    "routeSlug": "fraction-calculator",
    "seoTitle": "Fraction Calculator Python Script | SharePython.com",
    "seoDescription": "Simplify two fractions and print the four basic operations. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Fraction Calculator\n# Edit: left_numerator, left_denominator, right_numerator, and right_denominator.\n# Assumptions: fractions use integer numerators and denominators.\n# Limitations: prints the four basic operations for exactly two fractions.\n# Output: prints simplified fraction results and decimal approximations.\n\nleft_numerator = 3\nleft_denominator = 4\nright_numerator = 5\nright_denominator = 6\n\n\ndef gcd(a, b):\n    left = abs(int(a))\n    right = abs(int(b))\n\n    while right:\n        left, right = right, left % right\n\n    return left\n\ndef lcm(a, b):\n    return abs(int(a) * int(b)) // gcd(a, b)\n\n\ndef format_number(value, digits=6):\n    if isinstance(value, int):\n        return str(value)\n\n    rounded = round(value, digits)\n    text = \"{:.6f}\".format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\ndef simplify(numerator, denominator):\n    divisor = gcd(numerator, denominator)\n    return numerator // divisor, denominator // divisor\n\ndef format_fraction(numerator, denominator):\n    simple_numerator, simple_denominator = simplify(numerator, denominator)\n    return \"{}/{}\".format(simple_numerator, simple_denominator)\n\nsum_numerator = left_numerator * right_denominator + right_numerator * left_denominator\nsum_denominator = left_denominator * right_denominator\nproduct_numerator = left_numerator * right_numerator\nproduct_denominator = left_denominator * right_denominator\ndifference_numerator = left_numerator * right_denominator - right_numerator * left_denominator\nquotient_numerator = left_numerator * right_denominator\nquotient_denominator = left_denominator * right_numerator\n\nprint(\"Fraction calculator\")\nprint(\"-------------------\")\nprint(\"Left fraction:\", format_fraction(left_numerator, left_denominator))\nprint(\"Right fraction:\", format_fraction(right_numerator, right_denominator))\nprint(\"Sum:\", format_fraction(sum_numerator, sum_denominator))\nprint(\"Difference:\", format_fraction(difference_numerator, sum_denominator))\nprint(\"Product:\", format_fraction(product_numerator, product_denominator))\nprint(\"Quotient:\", format_fraction(quotient_numerator, quotient_denominator))\nprint(\"Decimal sum:\", format_number(sum_numerator / sum_denominator))\n",
    "pageGroup": "Math",
    "pageSection": "Arithmetic",
    "pagePath": "/math-calculators/fraction-calculator/"
  },
  {
    "id": "percentage-calculator",
    "title": "Percentage Calculator",
    "category": "Arithmetic",
    "summary": "Compute common percentage relationships such as percent-of and percent change.",
    "tags": [
      "percentage",
      "percent",
      "arithmetic"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Compute common percentage relationships such as percent-of and percent change. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated math calculator page for Percentage Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Percent change:"
      }
    ],
    "routeSlug": "percentage-calculator",
    "seoTitle": "Percentage Calculator Python Script | SharePython.com",
    "seoDescription": "Compute common percentage relationships such as percent-of and percent change. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Percentage Calculator\n# Edit: part, whole, starting_value, and ending_value.\n# Assumptions: whole and starting_value are non-zero.\n# Limitations: focuses on the most common percentage questions.\n# Output: prints percent of whole, whole from percent, and percent change.\n\npart = 45\nwhole = 180\nstarting_value = 240\nending_value = 315\n\n\ndef format_number(value, digits=6):\n    if isinstance(value, int):\n        return str(value)\n\n    rounded = round(value, digits)\n    text = \"{:.6f}\".format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\npercent_of_whole = (part / whole) * 100\nvalue_at_18_percent = 0.18 * whole\npercent_change = ((ending_value - starting_value) / starting_value) * 100\n\nprint(\"Percentage calculator\")\nprint(\"---------------------\")\nprint(\"Part as a percent of whole:\", format_number(percent_of_whole) + \"%\")\nprint(\"18% of the whole:\", format_number(value_at_18_percent))\nprint(\"Percent change:\", format_number(percent_change) + \"%\")\n",
    "pageGroup": "Math",
    "pageSection": "Arithmetic",
    "pagePath": "/math-calculators/percentage-calculator/"
  },
  {
    "id": "random-number-generator",
    "title": "Random Number Generator",
    "category": "Arithmetic",
    "summary": "Generate a repeatable list of random integers within a chosen range.",
    "tags": [
      "random",
      "integer",
      "sampling"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Generate a repeatable list of random integers within a chosen range. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated math calculator page for Random Number Generator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Generated values:"
      }
    ],
    "routeSlug": "random-number-generator",
    "seoTitle": "Random Number Generator Python Script | SharePython.com",
    "seoDescription": "Generate a repeatable list of random integers within a chosen range. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Random Number Generator\n# Edit: minimum_value, maximum_value, count, and seed_value.\n# Assumptions: minimum_value is less than or equal to maximum_value.\n# Limitations: generates integer samples only.\n# Output: prints a repeatable list of random integers.\n\nimport random\n\nminimum_value = 10\nmaximum_value = 99\ncount = 6\nseed_value = 42\n\nrandom.seed(seed_value)\nnumbers = [random.randint(minimum_value, maximum_value) for _ in range(count)]\n\nprint(\"Random number generator\")\nprint(\"-----------------------\")\nprint(\"Seed:\", seed_value)\nprint(\"Generated values:\", \", \".join(str(number) for number in numbers))\n",
    "pageGroup": "Math",
    "pageSection": "Arithmetic",
    "pagePath": "/math-calculators/random-number-generator/"
  },
  {
    "id": "percent-error-calculator",
    "title": "Percent Error Calculator",
    "category": "Arithmetic",
    "summary": "Measure how far an experimental value is from a theoretical value.",
    "tags": [
      "percent-error",
      "measurement",
      "science"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Measure how far an experimental value is from a theoretical value. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated math calculator page for Percent Error Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Percent error:"
      }
    ],
    "routeSlug": "percent-error-calculator",
    "seoTitle": "Percent Error Calculator Python Script | SharePython.com",
    "seoDescription": "Measure how far an experimental value is from a theoretical value. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Percent Error Calculator\n# Edit: experimental_value and theoretical_value.\n# Assumptions: theoretical_value is non-zero.\n# Limitations: uses the standard absolute percent-error formula.\n# Output: prints the absolute difference and percent error.\n\nexperimental_value = 9.74\ntheoretical_value = 10.0\n\n\ndef format_number(value, digits=6):\n    if isinstance(value, int):\n        return str(value)\n\n    rounded = round(value, digits)\n    text = \"{:.6f}\".format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\ndifference = abs(experimental_value - theoretical_value)\npercent_error = (difference / abs(theoretical_value)) * 100\n\nprint(\"Percent error calculator\")\nprint(\"------------------------\")\nprint(\"Absolute difference:\", format_number(difference))\nprint(\"Percent error:\", format_number(percent_error) + \"%\")\n",
    "pageGroup": "Math",
    "pageSection": "Arithmetic",
    "pagePath": "/math-calculators/percent-error-calculator/"
  },
  {
    "id": "exponent-calculator",
    "title": "Exponent Calculator",
    "category": "Arithmetic",
    "summary": "Raise a base to a chosen exponent and print the power result.",
    "tags": [
      "power",
      "exponent",
      "math"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Raise a base to a chosen exponent and print the power result. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated math calculator page for Exponent Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Power result:"
      }
    ],
    "routeSlug": "exponent-calculator",
    "seoTitle": "Exponent Calculator Python Script | SharePython.com",
    "seoDescription": "Raise a base to a chosen exponent and print the power result. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Exponent Calculator\n# Edit: base_value and exponent_value.\n# Assumptions: inputs use numeric values.\n# Limitations: shows one exponent operation at a time.\n# Output: prints the power value and its scientific notation.\n\nbase_value = 12\nexponent_value = 4\n\n\ndef format_number(value, digits=6):\n    if isinstance(value, int):\n        return str(value)\n\n    rounded = round(value, digits)\n    text = \"{:.6f}\".format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\nresult = base_value ** exponent_value\n\nprint(\"Exponent calculator\")\nprint(\"-------------------\")\nprint(\"Base:\", base_value)\nprint(\"Exponent:\", exponent_value)\nprint(\"Power result:\", format_number(result))\nprint(\"Scientific notation:\", \"{:.4e}\".format(result))\n",
    "pageGroup": "Math",
    "pageSection": "Arithmetic",
    "pagePath": "/math-calculators/exponent-calculator/"
  },
  {
    "id": "binary-calculator",
    "title": "Binary Calculator",
    "category": "Arithmetic",
    "summary": "Convert a binary string to decimal and back again.",
    "tags": [
      "binary",
      "conversion",
      "base"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Convert a binary string to decimal and back again. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated math calculator page for Binary Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Decimal value:"
      }
    ],
    "routeSlug": "binary-calculator",
    "seoTitle": "Binary Calculator Python Script | SharePython.com",
    "seoDescription": "Convert a binary string to decimal and back again. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Binary Calculator\n# Edit: value_text.\n# Assumptions: value_text is valid for the selected base.\n# Limitations: converts between decimal and one non-decimal base only.\n# Output: prints the parsed decimal value and the converted base form.\n\nvalue_text = \"101101\"\n\n\ndef format_number(value, digits=6):\n    if isinstance(value, int):\n        return str(value)\n\n    rounded = round(value, digits)\n    text = \"{:.6f}\".format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\nif \"binary\" == \"binary\":\n    decimal_value = int(value_text, 2)\n    converted_value = bin(decimal_value)\nelse:\n    decimal_value = int(value_text, 16)\n    converted_value = hex(decimal_value).upper()\n\nprint(\"Binary Calculator\")\nprint(\"----------------------\")\nprint(\"Input value:\", value_text)\nprint(\"Decimal value:\", format_number(decimal_value))\nprint(\"Converted form:\", converted_value)\n",
    "pageGroup": "Math",
    "pageSection": "Arithmetic",
    "pagePath": "/math-calculators/binary-calculator/"
  },
  {
    "id": "hex-calculator",
    "title": "Hex Calculator",
    "category": "Arithmetic",
    "summary": "Convert a hexadecimal string to decimal and back again.",
    "tags": [
      "hex",
      "conversion",
      "base"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Convert a hexadecimal string to decimal and back again. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated math calculator page for Hex Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Converted form:"
      }
    ],
    "routeSlug": "hex-calculator",
    "seoTitle": "Hex Calculator Python Script | SharePython.com",
    "seoDescription": "Convert a hexadecimal string to decimal and back again. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Hex Calculator\n# Edit: value_text.\n# Assumptions: value_text is valid for the selected base.\n# Limitations: converts between decimal and one non-decimal base only.\n# Output: prints the parsed decimal value and the converted base form.\n\nvalue_text = \"2AF\"\n\n\ndef format_number(value, digits=6):\n    if isinstance(value, int):\n        return str(value)\n\n    rounded = round(value, digits)\n    text = \"{:.6f}\".format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\nif \"hex\" == \"binary\":\n    decimal_value = int(value_text, 2)\n    converted_value = bin(decimal_value)\nelse:\n    decimal_value = int(value_text, 16)\n    converted_value = hex(decimal_value).upper()\n\nprint(\"Hex Calculator\")\nprint(\"----------------------\")\nprint(\"Input value:\", value_text)\nprint(\"Decimal value:\", format_number(decimal_value))\nprint(\"Converted form:\", converted_value)\n",
    "pageGroup": "Math",
    "pageSection": "Arithmetic",
    "pagePath": "/math-calculators/hex-calculator/"
  },
  {
    "id": "half-life-calculator",
    "title": "Half-Life Calculator",
    "category": "Arithmetic",
    "summary": "Estimate the remaining amount after a chosen number of half-lives.",
    "tags": [
      "half-life",
      "decay",
      "science"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate the remaining amount after a chosen number of half-lives. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated math calculator page for Half-Life Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Remaining amount:"
      }
    ],
    "routeSlug": "half-life-calculator",
    "seoTitle": "Half-Life Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate the remaining amount after a chosen number of half-lives. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Half-Life Calculator\n# Edit: starting_amount, half_life_hours, and elapsed_hours.\n# Assumptions: decay follows exponential half-life behavior.\n# Limitations: ignores external replenishment or multi-stage decay.\n# Output: prints the number of half-lives and remaining amount.\n\nstarting_amount = 250\nhalf_life_hours = 6\nelapsed_hours = 18\n\n\ndef format_number(value, digits=6):\n    if isinstance(value, int):\n        return str(value)\n\n    rounded = round(value, digits)\n    text = \"{:.6f}\".format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\nhalf_life_count = elapsed_hours / half_life_hours\nremaining_amount = starting_amount * (0.5 ** half_life_count)\n\nprint(\"Half-life calculator\")\nprint(\"--------------------\")\nprint(\"Half-lives elapsed:\", format_number(half_life_count))\nprint(\"Remaining amount:\", format_number(remaining_amount))\n",
    "pageGroup": "Math",
    "pageSection": "Arithmetic",
    "pagePath": "/math-calculators/half-life-calculator/"
  },
  {
    "id": "quadratic-formula-calculator",
    "title": "Quadratic Formula Calculator",
    "category": "Arithmetic",
    "summary": "Solve a quadratic equation and print its real roots when they exist.",
    "tags": [
      "quadratic",
      "roots",
      "algebra"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Solve a quadratic equation and print its real roots when they exist. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated math calculator page for Quadratic Formula Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Discriminant:"
      }
    ],
    "routeSlug": "quadratic-formula-calculator",
    "seoTitle": "Quadratic Formula Calculator Python Script | SharePython.com",
    "seoDescription": "Solve a quadratic equation and print its real roots when they exist. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Quadratic Formula Calculator\n# Edit: a_value, b_value, and c_value.\n# Assumptions: a_value is non-zero.\n# Limitations: prints real roots only when the discriminant is non-negative.\n# Output: prints the discriminant and either real roots or a no-real-roots note.\n\nimport math\n\na_value = 1\nb_value = -5\nc_value = 6\n\n\ndef format_number(value, digits=6):\n    if isinstance(value, int):\n        return str(value)\n\n    rounded = round(value, digits)\n    text = \"{:.6f}\".format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\ndiscriminant = b_value ** 2 - 4 * a_value * c_value\n\nprint(\"Quadratic formula calculator\")\nprint(\"----------------------------\")\nprint(\"Discriminant:\", format_number(discriminant))\n\nif discriminant < 0:\n    print(\"Real roots: none\")\nelse:\n    root_one = (-b_value + math.sqrt(discriminant)) / (2 * a_value)\n    root_two = (-b_value - math.sqrt(discriminant)) / (2 * a_value)\n    print(\"Root 1:\", format_number(root_one))\n    print(\"Root 2:\", format_number(root_two))\n",
    "pageGroup": "Math",
    "pageSection": "Arithmetic",
    "pagePath": "/math-calculators/quadratic-formula-calculator/"
  },
  {
    "id": "log-calculator",
    "title": "Log Calculator",
    "category": "Arithmetic",
    "summary": "Compare natural, common, and custom-base logarithms for one value.",
    "tags": [
      "logarithm",
      "math",
      "algebra"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Compare natural, common, and custom-base logarithms for one value. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated math calculator page for Log Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Natural log:"
      }
    ],
    "routeSlug": "log-calculator",
    "seoTitle": "Log Calculator Python Script | SharePython.com",
    "seoDescription": "Compare natural, common, and custom-base logarithms for one value. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Log Calculator\n# Edit: value_text and base_value.\n# Assumptions: value_text and base_value are positive and base_value is not 1.\n# Limitations: focuses on common, natural, and custom-base logs.\n# Output: prints the natural log, common log, and custom-base log.\n\nimport math\n\nvalue_text = 250\nbase_value = 3\n\n\ndef format_number(value, digits=6):\n    if isinstance(value, int):\n        return str(value)\n\n    rounded = round(value, digits)\n    text = \"{:.6f}\".format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\nprint(\"Log calculator\")\nprint(\"--------------\")\nprint(\"Natural log:\", format_number(math.log(value_text)))\nprint(\"Common log:\", format_number(math.log10(value_text)))\nprint(\"Base-\" + str(base_value) + \" log:\", format_number(math.log(value_text, base_value)))\n",
    "pageGroup": "Math",
    "pageSection": "Arithmetic",
    "pagePath": "/math-calculators/log-calculator/"
  },
  {
    "id": "ratio-calculator",
    "title": "Ratio Calculator",
    "category": "Arithmetic",
    "summary": "Simplify a two-term ratio and print equivalent per-one comparisons.",
    "tags": [
      "ratio",
      "proportion",
      "math"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Simplify a two-term ratio and print equivalent per-one comparisons. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated math calculator page for Ratio Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Simplified ratio:"
      }
    ],
    "routeSlug": "ratio-calculator",
    "seoTitle": "Ratio Calculator Python Script | SharePython.com",
    "seoDescription": "Simplify a two-term ratio and print equivalent per-one comparisons. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Ratio Calculator\n# Edit: left_value and right_value.\n# Assumptions: both inputs are integers.\n# Limitations: simplifies one two-term ratio at a time.\n# Output: prints the simplified ratio and equivalent per-one comparison.\n\nleft_value = 84\nright_value = 126\n\n\ndef gcd(a, b):\n    left = abs(int(a))\n    right = abs(int(b))\n\n    while right:\n        left, right = right, left % right\n\n    return left\n\ndef lcm(a, b):\n    return abs(int(a) * int(b)) // gcd(a, b)\n\n\ndef format_number(value, digits=6):\n    if isinstance(value, int):\n        return str(value)\n\n    rounded = round(value, digits)\n    text = \"{:.6f}\".format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\ndivisor = gcd(left_value, right_value)\nsimple_left = left_value // divisor\nsimple_right = right_value // divisor\n\nprint(\"Ratio calculator\")\nprint(\"----------------\")\nprint(\"Simplified ratio:\", str(simple_left) + \":\" + str(simple_right))\nprint(\"Left per 1 right:\", format_number(left_value / right_value))\nprint(\"Right per 1 left:\", format_number(right_value / left_value))\n",
    "pageGroup": "Math",
    "pageSection": "Arithmetic",
    "pagePath": "/math-calculators/ratio-calculator/"
  },
  {
    "id": "root-calculator",
    "title": "Root Calculator",
    "category": "Arithmetic",
    "summary": "Compute the principal nth root of a number and verify it by re-raising.",
    "tags": [
      "root",
      "nth-root",
      "math"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Compute the principal nth root of a number and verify it by re-raising. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated math calculator page for Root Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Root value:"
      }
    ],
    "routeSlug": "root-calculator",
    "seoTitle": "Root Calculator Python Script | SharePython.com",
    "seoDescription": "Compute the principal nth root of a number and verify it by re-raising. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Root Calculator\n# Edit: radicand and root_degree.\n# Assumptions: radicand is non-negative for even roots.\n# Limitations: prints the principal real root only.\n# Output: prints the root value and a power check.\n\nradicand = 625\nroot_degree = 4\n\n\ndef format_number(value, digits=6):\n    if isinstance(value, int):\n        return str(value)\n\n    rounded = round(value, digits)\n    text = \"{:.6f}\".format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\nroot_value = radicand ** (1 / root_degree)\n\nprint(\"Root calculator\")\nprint(\"---------------\")\nprint(\"Root value:\", format_number(root_value))\nprint(\"Power check:\", format_number(root_value ** root_degree))\n",
    "pageGroup": "Math",
    "pageSection": "Arithmetic",
    "pagePath": "/math-calculators/root-calculator/"
  },
  {
    "id": "least-common-multiple-calculator",
    "title": "Least Common Multiple Calculator",
    "category": "Arithmetic",
    "summary": "Find the least common multiple of two integers.",
    "tags": [
      "lcm",
      "multiple",
      "number-theory"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Find the least common multiple of two integers. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated math calculator page for Least Common Multiple Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Least common multiple:"
      }
    ],
    "routeSlug": "least-common-multiple-calculator",
    "seoTitle": "Least Common Multiple Calculator Python Script | SharePython.com",
    "seoDescription": "Find the least common multiple of two integers. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Least Common Multiple Calculator\n# Edit: left_value and right_value.\n# Assumptions: inputs are integers.\n# Limitations: uses exactly two numbers.\n# Output: prints the least common multiple.\n\nleft_value = 18\nright_value = 24\n\n\ndef gcd(a, b):\n    left = abs(int(a))\n    right = abs(int(b))\n\n    while right:\n        left, right = right, left % right\n\n    return left\n\ndef lcm(a, b):\n    return abs(int(a) * int(b)) // gcd(a, b)\n\n\nprint(\"Least common multiple calculator\")\nprint(\"-------------------------------\")\nprint(\"Least common multiple:\", lcm(left_value, right_value))\n",
    "pageGroup": "Math",
    "pageSection": "Arithmetic",
    "pagePath": "/math-calculators/least-common-multiple-calculator/"
  },
  {
    "id": "greatest-common-factor-calculator",
    "title": "Greatest Common Factor Calculator",
    "category": "Arithmetic",
    "summary": "Find the greatest common factor of two integers.",
    "tags": [
      "gcf",
      "gcd",
      "number-theory"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Find the greatest common factor of two integers. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated math calculator page for Greatest Common Factor Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Greatest common factor:"
      }
    ],
    "routeSlug": "greatest-common-factor-calculator",
    "seoTitle": "Greatest Common Factor Calculator Python Script | SharePython.com",
    "seoDescription": "Find the greatest common factor of two integers. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Greatest Common Factor Calculator\n# Edit: left_value and right_value.\n# Assumptions: inputs are integers.\n# Limitations: uses exactly two numbers.\n# Output: prints the greatest common factor.\n\nleft_value = 84\nright_value = 126\n\n\ndef gcd(a, b):\n    left = abs(int(a))\n    right = abs(int(b))\n\n    while right:\n        left, right = right, left % right\n\n    return left\n\ndef lcm(a, b):\n    return abs(int(a) * int(b)) // gcd(a, b)\n\n\nprint(\"Greatest common factor calculator\")\nprint(\"--------------------------------\")\nprint(\"Greatest common factor:\", gcd(left_value, right_value))\n",
    "pageGroup": "Math",
    "pageSection": "Arithmetic",
    "pagePath": "/math-calculators/greatest-common-factor-calculator/"
  },
  {
    "id": "factor-calculator",
    "title": "Factor Calculator",
    "category": "Arithmetic",
    "summary": "List all factors of a number and break it into prime factors.",
    "tags": [
      "factor",
      "prime-factors",
      "number-theory"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "List all factors of a number and break it into prime factors. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated math calculator page for Factor Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Prime factors:"
      }
    ],
    "routeSlug": "factor-calculator",
    "seoTitle": "Factor Calculator Python Script | SharePython.com",
    "seoDescription": "List all factors of a number and break it into prime factors. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Factor Calculator\n# Edit: target_value.\n# Assumptions: target_value is a positive integer.\n# Limitations: prints factors and prime factorization for one value.\n# Output: prints all factors and the prime factors.\n\ntarget_value = 84\n\nfactors = []\nprime_factors = []\nremaining = target_value\ncandidate = 2\n\nfor candidate in range(1, target_value + 1):\n    if target_value % candidate == 0:\n        factors.append(candidate)\n\ncandidate = 2\nwhile candidate * candidate <= remaining:\n    while remaining % candidate == 0:\n        prime_factors.append(candidate)\n        remaining //= candidate\n    candidate += 1\n\nif remaining > 1:\n    prime_factors.append(remaining)\n\nprint(\"Factor calculator\")\nprint(\"-----------------\")\nprint(\"Factors:\", \", \".join(str(factor) for factor in factors))\nprint(\"Prime factors:\", \" x \".join(str(factor) for factor in prime_factors))\n",
    "pageGroup": "Math",
    "pageSection": "Arithmetic",
    "pagePath": "/math-calculators/factor-calculator/"
  },
  {
    "id": "rounding-calculator",
    "title": "Rounding Calculator",
    "category": "Arithmetic",
    "summary": "Round a number to a chosen precision and compare up/down rounding.",
    "tags": [
      "rounding",
      "decimal",
      "math"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Round a number to a chosen precision and compare up/down rounding. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated math calculator page for Rounding Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Rounded value:"
      }
    ],
    "routeSlug": "rounding-calculator",
    "seoTitle": "Rounding Calculator Python Script | SharePython.com",
    "seoDescription": "Round a number to a chosen precision and compare up/down rounding. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Rounding Calculator\n# Edit: value_to_round and decimal_places.\n# Assumptions: rounding follows Python rounding behavior.\n# Limitations: prints a small set of related rounding values.\n# Output: prints the rounded value, floor, and ceiling.\n\nimport math\n\nvalue_to_round = 18.7654\ndecimal_places = 2\n\n\ndef format_number(value, digits=6):\n    if isinstance(value, int):\n        return str(value)\n\n    rounded = round(value, digits)\n    text = \"{:.6f}\".format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\nrounded_value = round(value_to_round, decimal_places)\nfactor = 10 ** decimal_places\nrounded_up = math.ceil(value_to_round * factor) / factor\nrounded_down = math.floor(value_to_round * factor) / factor\n\nprint(\"Rounding calculator\")\nprint(\"-------------------\")\nprint(\"Rounded value:\", format_number(rounded_value))\nprint(\"Rounded up:\", format_number(rounded_up))\nprint(\"Rounded down:\", format_number(rounded_down))\n",
    "pageGroup": "Math",
    "pageSection": "Arithmetic",
    "pagePath": "/math-calculators/rounding-calculator/"
  },
  {
    "id": "matrix-calculator",
    "title": "Matrix Calculator",
    "category": "Arithmetic",
    "summary": "Add and multiply two 2x2 matrices and compute a determinant.",
    "tags": [
      "matrix",
      "linear-algebra",
      "math"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Add and multiply two 2x2 matrices and compute a determinant. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated math calculator page for Matrix Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Determinant:"
      }
    ],
    "routeSlug": "matrix-calculator",
    "seoTitle": "Matrix Calculator Python Script | SharePython.com",
    "seoDescription": "Add and multiply two 2x2 matrices and compute a determinant. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Matrix Calculator\n# Edit: matrix_a and matrix_b.\n# Assumptions: both matrices are 2x2.\n# Limitations: prints 2x2 addition, multiplication, and determinant only.\n# Output: prints the added matrix, product matrix, and determinant of matrix_a.\n\nmatrix_a = [[2, 3], [1, 4]]\nmatrix_b = [[5, 2], [0, 1]]\n\ndef add_matrices(left, right):\n    return [\n        [left[row][column] + right[row][column] for column in range(2)]\n        for row in range(2)\n    ]\n\ndef multiply_matrices(left, right):\n    return [\n        [\n            left[row][0] * right[0][column] + left[row][1] * right[1][column]\n            for column in range(2)\n        ]\n        for row in range(2)\n    ]\n\ndef determinant(matrix):\n    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]\n\nprint(\"Matrix calculator\")\nprint(\"-----------------\")\nprint(\"Added matrix:\", add_matrices(matrix_a, matrix_b))\nprint(\"Product matrix:\", multiply_matrices(matrix_a, matrix_b))\nprint(\"Determinant:\", determinant(matrix_a))\n",
    "pageGroup": "Math",
    "pageSection": "Arithmetic",
    "pagePath": "/math-calculators/matrix-calculator/"
  },
  {
    "id": "scientific-notation-calculator",
    "title": "Scientific Notation Calculator",
    "category": "Arithmetic",
    "summary": "Convert a value into scientific notation and parse it back.",
    "tags": [
      "scientific-notation",
      "formatting",
      "math"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Convert a value into scientific notation and parse it back. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated math calculator page for Scientific Notation Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Scientific notation:"
      }
    ],
    "routeSlug": "scientific-notation-calculator",
    "seoTitle": "Scientific Notation Calculator Python Script | SharePython.com",
    "seoDescription": "Convert a value into scientific notation and parse it back. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Scientific Notation Calculator\n# Edit: value_to_convert.\n# Assumptions: value_to_convert is numeric.\n# Limitations: shows one decimal-to-scientific conversion.\n# Output: prints scientific notation and the parsed float value.\n\nvalue_to_convert = 4825000\n\nscientific_text = \"{:.6e}\".format(value_to_convert)\nparsed_value = float(scientific_text)\n\nprint(\"Scientific notation calculator\")\nprint(\"------------------------------\")\nprint(\"Scientific notation:\", scientific_text)\nprint(\"Parsed value:\", parsed_value)\n",
    "pageGroup": "Math",
    "pageSection": "Arithmetic",
    "pagePath": "/math-calculators/scientific-notation-calculator/"
  },
  {
    "id": "big-number-calculator",
    "title": "Big Number Calculator",
    "category": "Arithmetic",
    "summary": "Summarize a very large integer with digit count and notation formats.",
    "tags": [
      "big-number",
      "formatting",
      "math"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Summarize a very large integer with digit count and notation formats. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated math calculator page for Big Number Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Digit count:"
      }
    ],
    "routeSlug": "big-number-calculator",
    "seoTitle": "Big Number Calculator Python Script | SharePython.com",
    "seoDescription": "Summarize a very large integer with digit count and notation formats. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Big Number Calculator\n# Edit: value_text.\n# Assumptions: value_text is a base-10 integer string.\n# Limitations: prints summary information for one large integer.\n# Output: prints digit count, comma formatting, and scientific notation.\n\nvalue_text = \"987654321098765432109876543210\"\n\nbig_value = int(value_text)\n\nprint(\"Big number calculator\")\nprint(\"---------------------\")\nprint(\"Digit count:\", len(value_text))\nprint(\"Comma format:\", format(big_value, \",\"))\nprint(\"Scientific notation:\", \"{:.6e}\".format(big_value))\n",
    "pageGroup": "Math",
    "pageSection": "Arithmetic",
    "pagePath": "/math-calculators/big-number-calculator/"
  },
  {
    "id": "standard-deviation-calculator",
    "title": "Standard Deviation Calculator",
    "category": "Statistics",
    "summary": "Compute population and sample standard deviation for a small dataset.",
    "tags": [
      "standard-deviation",
      "statistics",
      "data"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Compute population and sample standard deviation for a small dataset. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated math calculator page for Standard Deviation Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Sample standard deviation:"
      }
    ],
    "routeSlug": "standard-deviation-calculator",
    "seoTitle": "Standard Deviation Calculator Python Script | SharePython.com",
    "seoDescription": "Compute population and sample standard deviation for a small dataset. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Standard Deviation Calculator\n# Edit: numbers.\n# Assumptions: numbers contains at least two numeric values.\n# Limitations: prints both population and sample standard deviation.\n# Output: prints the mean and both standard deviation variants.\n\nnumbers = [12, 16, 19, 23, 23, 27, 31]\n\n\ndef format_number(value, digits=6):\n    if isinstance(value, int):\n        return str(value)\n\n    rounded = round(value, digits)\n    text = \"{:.6f}\".format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\ndef mean(numbers):\n    return sum(numbers) / len(numbers)\n\ndef median(numbers):\n    ordered = sorted(numbers)\n    midpoint = len(ordered) // 2\n\n    if len(ordered) % 2 == 1:\n        return ordered[midpoint]\n\n    return (ordered[midpoint - 1] + ordered[midpoint]) / 2\n\ndef mode(numbers):\n    counts = {}\n    for number in numbers:\n        counts[number] = counts.get(number, 0) + 1\n\n    highest = max(counts.values())\n    return sorted([number for number, count in counts.items() if count == highest])\n\ndef variance(numbers, sample=False):\n    avg = mean(numbers)\n    divisor = len(numbers) - 1 if sample and len(numbers) > 1 else len(numbers)\n    return sum((number - avg) ** 2 for number in numbers) / divisor\n\ndef std_dev(numbers, sample=False):\n    return variance(numbers, sample) ** 0.5\n\ndef quartiles(numbers):\n    ordered = sorted(numbers)\n    midpoint = len(ordered) // 2\n    lower = ordered[:midpoint]\n    upper = ordered[midpoint + (len(ordered) % 2):]\n    return median(lower), median(ordered), median(upper)\n\n\nprint(\"Standard deviation calculator\")\nprint(\"-----------------------------\")\nprint(\"Mean:\", format_number(mean(numbers)))\nprint(\"Population standard deviation:\", format_number(std_dev(numbers)))\nprint(\"Sample standard deviation:\", format_number(std_dev(numbers, True)))\n",
    "pageGroup": "Math",
    "pageSection": "Statistics",
    "pagePath": "/math-calculators/standard-deviation-calculator/"
  },
  {
    "id": "number-sequence-calculator",
    "title": "Number Sequence Calculator",
    "category": "Statistics",
    "summary": "Generate arithmetic or geometric sequences and summarize the first terms.",
    "tags": [
      "sequence",
      "arithmetic",
      "geometric"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Generate arithmetic or geometric sequences and summarize the first terms. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated math calculator page for Number Sequence Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Partial sum:"
      }
    ],
    "routeSlug": "number-sequence-calculator",
    "seoTitle": "Number Sequence Calculator Python Script | SharePython.com",
    "seoDescription": "Generate arithmetic or geometric sequences and summarize the first terms. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Number Sequence Calculator\n# Edit: sequence_type, first_term, step_value, and number_of_terms.\n# Assumptions: sequence_type is arithmetic or geometric.\n# Limitations: supports only arithmetic and geometric sequences.\n# Output: prints the generated terms, nth term, and partial sum.\n\nsequence_type = \"geometric\"\nfirst_term = 3\nstep_value = 2\nnumber_of_terms = 6\n\nterms = []\ncurrent = first_term\n\nfor _ in range(number_of_terms):\n    terms.append(current)\n    if sequence_type == \"arithmetic\":\n        current += step_value\n    else:\n        current *= step_value\n\nprint(\"Number sequence calculator\")\nprint(\"--------------------------\")\nprint(\"Terms:\", \", \".join(str(term) for term in terms))\nprint(\"Nth term:\", terms[-1])\nprint(\"Partial sum:\", sum(terms))\n",
    "pageGroup": "Math",
    "pageSection": "Statistics",
    "pagePath": "/math-calculators/number-sequence-calculator/"
  },
  {
    "id": "sample-size-calculator",
    "title": "Sample Size Calculator",
    "category": "Statistics",
    "summary": "Estimate a survey sample size from confidence, margin of error, and population.",
    "tags": [
      "sample-size",
      "survey",
      "statistics"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate a survey sample size from confidence, margin of error, and population. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated math calculator page for Sample Size Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Finite population sample size:"
      }
    ],
    "routeSlug": "sample-size-calculator",
    "seoTitle": "Sample Size Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate a survey sample size from confidence, margin of error, and population. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Sample Size Calculator\n# Edit: confidence_z, margin_of_error, estimated_proportion, and population_size.\n# Assumptions: margin_of_error is expressed as a decimal.\n# Limitations: uses a proportion-based sample-size estimate with finite-population correction.\n# Output: prints the infinite-population estimate and corrected finite-population sample size.\n\nconfidence_z = 1.96\nmargin_of_error = 0.05\nestimated_proportion = 0.5\npopulation_size = 12000\n\n\ndef format_number(value, digits=6):\n    if isinstance(value, int):\n        return str(value)\n\n    rounded = round(value, digits)\n    text = \"{:.6f}\".format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\nbase_sample = (\n    (confidence_z ** 2) * estimated_proportion * (1 - estimated_proportion)\n) / (margin_of_error ** 2)\n\nfinite_population_sample = base_sample / (\n    1 + ((base_sample - 1) / population_size)\n)\n\nprint(\"Sample size calculator\")\nprint(\"----------------------\")\nprint(\"Infinite population estimate:\", format_number(base_sample))\nprint(\"Finite population sample size:\", format_number(finite_population_sample))\n",
    "pageGroup": "Math",
    "pageSection": "Statistics",
    "pagePath": "/math-calculators/sample-size-calculator/"
  },
  {
    "id": "probability-calculator",
    "title": "Probability Calculator",
    "category": "Statistics",
    "summary": "Model union, complement, and conditional probability for two events.",
    "tags": [
      "probability",
      "statistics",
      "events"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Model union, complement, and conditional probability for two events. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated math calculator page for Probability Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "P(A given B):"
      }
    ],
    "routeSlug": "probability-calculator",
    "seoTitle": "Probability Calculator Python Script | SharePython.com",
    "seoDescription": "Model union, complement, and conditional probability for two events. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Probability Calculator\n# Edit: probability_a, probability_b, and probability_intersection.\n# Assumptions: all probability inputs are decimals between 0 and 1.\n# Limitations: models two events and their overlap only.\n# Output: prints union, complement, and conditional probability.\n\nprobability_a = 0.45\nprobability_b = 0.35\nprobability_intersection = 0.18\n\n\ndef format_number(value, digits=6):\n    if isinstance(value, int):\n        return str(value)\n\n    rounded = round(value, digits)\n    text = \"{:.6f}\".format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\nprobability_union = probability_a + probability_b - probability_intersection\nprobability_a_given_b = probability_intersection / probability_b\nprobability_not_a = 1 - probability_a\n\nprint(\"Probability calculator\")\nprint(\"----------------------\")\nprint(\"P(A or B):\", format_number(probability_union))\nprint(\"P(not A):\", format_number(probability_not_a))\nprint(\"P(A given B):\", format_number(probability_a_given_b))\n",
    "pageGroup": "Math",
    "pageSection": "Statistics",
    "pagePath": "/math-calculators/probability-calculator/"
  },
  {
    "id": "statistics-calculator",
    "title": "Statistics Calculator",
    "category": "Statistics",
    "summary": "Print a compact descriptive summary for a list of numbers.",
    "tags": [
      "statistics",
      "quartiles",
      "summary"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Print a compact descriptive summary for a list of numbers. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated math calculator page for Statistics Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Quartiles:"
      }
    ],
    "routeSlug": "statistics-calculator",
    "seoTitle": "Statistics Calculator Python Script | SharePython.com",
    "seoDescription": "Print a compact descriptive summary for a list of numbers. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Statistics Calculator\n# Edit: numbers.\n# Assumptions: numbers contains at least one numeric value.\n# Limitations: prints a compact descriptive-statistics summary.\n# Output: prints count, sum, mean, quartiles, and standard deviation.\n\nnumbers = [9, 12, 15, 16, 19, 23, 27, 31, 34]\n\n\ndef format_number(value, digits=6):\n    if isinstance(value, int):\n        return str(value)\n\n    rounded = round(value, digits)\n    text = \"{:.6f}\".format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\ndef mean(numbers):\n    return sum(numbers) / len(numbers)\n\ndef median(numbers):\n    ordered = sorted(numbers)\n    midpoint = len(ordered) // 2\n\n    if len(ordered) % 2 == 1:\n        return ordered[midpoint]\n\n    return (ordered[midpoint - 1] + ordered[midpoint]) / 2\n\ndef mode(numbers):\n    counts = {}\n    for number in numbers:\n        counts[number] = counts.get(number, 0) + 1\n\n    highest = max(counts.values())\n    return sorted([number for number, count in counts.items() if count == highest])\n\ndef variance(numbers, sample=False):\n    avg = mean(numbers)\n    divisor = len(numbers) - 1 if sample and len(numbers) > 1 else len(numbers)\n    return sum((number - avg) ** 2 for number in numbers) / divisor\n\ndef std_dev(numbers, sample=False):\n    return variance(numbers, sample) ** 0.5\n\ndef quartiles(numbers):\n    ordered = sorted(numbers)\n    midpoint = len(ordered) // 2\n    lower = ordered[:midpoint]\n    upper = ordered[midpoint + (len(ordered) % 2):]\n    return median(lower), median(ordered), median(upper)\n\n\nq1, q2, q3 = quartiles(numbers)\n\nprint(\"Statistics calculator\")\nprint(\"---------------------\")\nprint(\"Count:\", len(numbers))\nprint(\"Sum:\", format_number(sum(numbers)))\nprint(\"Mean:\", format_number(mean(numbers)))\nprint(\"Quartiles:\", format_number(q1) + \", \" + format_number(q2) + \", \" + format_number(q3))\nprint(\"Sample standard deviation:\", format_number(std_dev(numbers, True)))\n",
    "pageGroup": "Math",
    "pageSection": "Statistics",
    "pagePath": "/math-calculators/statistics-calculator/"
  },
  {
    "id": "mean-median-mode-range-calculator",
    "title": "Mean, Median, Mode, Range Calculator",
    "category": "Statistics",
    "summary": "Compute the basic summary statistics most often needed in class or analysis.",
    "tags": [
      "mean",
      "median",
      "mode"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Compute the basic summary statistics most often needed in class or analysis. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated math calculator page for Mean, Median, Mode, Range Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Mode:"
      }
    ],
    "routeSlug": "mean-median-mode-range-calculator",
    "seoTitle": "Mean, Median, Mode, Range Calculator Python Script | SharePython.com",
    "seoDescription": "Compute the basic summary statistics most often needed in class or analysis. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Mean, Median, Mode, Range Calculator\n# Edit: numbers.\n# Assumptions: numbers contains at least one numeric value.\n# Limitations: prints a basic one-dimensional summary only.\n# Output: prints the mean, median, mode set, and range.\n\nnumbers = [4, 6, 9, 9, 11, 13, 14]\n\n\ndef format_number(value, digits=6):\n    if isinstance(value, int):\n        return str(value)\n\n    rounded = round(value, digits)\n    text = \"{:.6f}\".format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\ndef mean(numbers):\n    return sum(numbers) / len(numbers)\n\ndef median(numbers):\n    ordered = sorted(numbers)\n    midpoint = len(ordered) // 2\n\n    if len(ordered) % 2 == 1:\n        return ordered[midpoint]\n\n    return (ordered[midpoint - 1] + ordered[midpoint]) / 2\n\ndef mode(numbers):\n    counts = {}\n    for number in numbers:\n        counts[number] = counts.get(number, 0) + 1\n\n    highest = max(counts.values())\n    return sorted([number for number, count in counts.items() if count == highest])\n\ndef variance(numbers, sample=False):\n    avg = mean(numbers)\n    divisor = len(numbers) - 1 if sample and len(numbers) > 1 else len(numbers)\n    return sum((number - avg) ** 2 for number in numbers) / divisor\n\ndef std_dev(numbers, sample=False):\n    return variance(numbers, sample) ** 0.5\n\ndef quartiles(numbers):\n    ordered = sorted(numbers)\n    midpoint = len(ordered) // 2\n    lower = ordered[:midpoint]\n    upper = ordered[midpoint + (len(ordered) % 2):]\n    return median(lower), median(ordered), median(upper)\n\n\nprint(\"Mean, median, mode, range calculator\")\nprint(\"------------------------------------\")\nprint(\"Mean:\", format_number(mean(numbers)))\nprint(\"Median:\", format_number(median(numbers)))\nprint(\"Mode:\", \", \".join(format_number(value) for value in mode(numbers)))\nprint(\"Range:\", format_number(max(numbers) - min(numbers)))\n",
    "pageGroup": "Math",
    "pageSection": "Statistics",
    "pagePath": "/math-calculators/mean-median-mode-range-calculator/"
  },
  {
    "id": "permutation-and-combination-calculator",
    "title": "Permutation and Combination Calculator",
    "category": "Statistics",
    "summary": "Count permutations and combinations without repetition.",
    "tags": [
      "permutation",
      "combination",
      "counting"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Count permutations and combinations without repetition. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated math calculator page for Permutation and Combination Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Combinations:"
      }
    ],
    "routeSlug": "permutation-and-combination-calculator",
    "seoTitle": "Permutation and Combination Calculator Python Script | SharePython.com",
    "seoDescription": "Count permutations and combinations without repetition. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Permutation and Combination Calculator\n# Edit: item_count and selection_count.\n# Assumptions: item_count and selection_count are non-negative integers with item_count >= selection_count.\n# Limitations: prints permutations and combinations without repetition.\n# Output: prints the permutation count and combination count.\n\nitem_count = 10\nselection_count = 4\n\n\ndef factorial(value):\n    total = 1\n    for number in range(2, int(value) + 1):\n        total *= number\n    return total\n\n\npermutations = factorial(item_count) // factorial(item_count - selection_count)\ncombinations = permutations // factorial(selection_count)\n\nprint(\"Permutation and combination calculator\")\nprint(\"--------------------------------------\")\nprint(\"Permutations:\", permutations)\nprint(\"Combinations:\", combinations)\n",
    "pageGroup": "Math",
    "pageSection": "Statistics",
    "pagePath": "/math-calculators/permutation-and-combination-calculator/"
  },
  {
    "id": "z-score-calculator",
    "title": "Z-score Calculator",
    "category": "Statistics",
    "summary": "Translate a raw score into standard deviation units from the mean.",
    "tags": [
      "z-score",
      "statistics",
      "normal"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Translate a raw score into standard deviation units from the mean. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated math calculator page for Z-score Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Z-score:"
      }
    ],
    "routeSlug": "z-score-calculator",
    "seoTitle": "Z-score Calculator Python Script | SharePython.com",
    "seoDescription": "Translate a raw score into standard deviation units from the mean. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Z-score Calculator\n# Edit: raw_value, mean_value, and standard_deviation.\n# Assumptions: standard_deviation is positive.\n# Limitations: calculates one z-score at a time.\n# Output: prints the z-score and the distance from the mean.\n\nraw_value = 82\nmean_value = 70\nstandard_deviation = 6\n\n\ndef format_number(value, digits=6):\n    if isinstance(value, int):\n        return str(value)\n\n    rounded = round(value, digits)\n    text = \"{:.6f}\".format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\nz_score = (raw_value - mean_value) / standard_deviation\n\nprint(\"Z-score calculator\")\nprint(\"------------------\")\nprint(\"Distance from mean:\", format_number(raw_value - mean_value))\nprint(\"Z-score:\", format_number(z_score))\n",
    "pageGroup": "Math",
    "pageSection": "Statistics",
    "pagePath": "/math-calculators/z-score-calculator/"
  },
  {
    "id": "confidence-interval-calculator",
    "title": "Confidence Interval Calculator",
    "category": "Statistics",
    "summary": "Estimate a normal-approximation confidence interval from sample statistics.",
    "tags": [
      "confidence-interval",
      "statistics",
      "margin-of-error"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate a normal-approximation confidence interval from sample statistics. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated math calculator page for Confidence Interval Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Margin of error:"
      }
    ],
    "routeSlug": "confidence-interval-calculator",
    "seoTitle": "Confidence Interval Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate a normal-approximation confidence interval from sample statistics. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Confidence Interval Calculator\n# Edit: sample_mean, standard_deviation, sample_size, and confidence_z.\n# Assumptions: sample_size is positive and confidence_z matches the desired confidence level.\n# Limitations: uses the normal approximation rather than a t distribution.\n# Output: prints the margin of error and confidence interval.\n\nsample_mean = 24.6\nstandard_deviation = 4.8\nsample_size = 36\nconfidence_z = 1.96\n\n\ndef format_number(value, digits=6):\n    if isinstance(value, int):\n        return str(value)\n\n    rounded = round(value, digits)\n    text = \"{:.6f}\".format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\nmargin_of_error = confidence_z * (standard_deviation / (sample_size ** 0.5))\nlower_bound = sample_mean - margin_of_error\nupper_bound = sample_mean + margin_of_error\n\nprint(\"Confidence interval calculator\")\nprint(\"------------------------------\")\nprint(\"Margin of error:\", format_number(margin_of_error))\nprint(\n    \"Confidence interval:\",\n    \"[\" + format_number(lower_bound) + \", \" + format_number(upper_bound) + \"]\",\n)\n",
    "pageGroup": "Math",
    "pageSection": "Statistics",
    "pagePath": "/math-calculators/confidence-interval-calculator/"
  },
  {
    "id": "triangle-calculator",
    "title": "Triangle Calculator",
    "category": "Geometry",
    "summary": "Compute perimeter and area for a triangle given three sides.",
    "tags": [
      "triangle",
      "geometry",
      "heron"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Compute perimeter and area for a triangle given three sides. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated math calculator page for Triangle Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Area:"
      }
    ],
    "routeSlug": "triangle-calculator",
    "seoTitle": "Triangle Calculator Python Script | SharePython.com",
    "seoDescription": "Compute perimeter and area for a triangle given three sides. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Triangle Calculator\n# Edit: side_a, side_b, and side_c.\n# Assumptions: the side lengths form a valid triangle.\n# Limitations: uses side-side-side input only.\n# Output: prints the perimeter, semiperimeter, and area.\n\nimport math\n\nside_a = 7\nside_b = 8\nside_c = 9\n\n\ndef format_number(value, digits=6):\n    if isinstance(value, int):\n        return str(value)\n\n    rounded = round(value, digits)\n    text = \"{:.6f}\".format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\nperimeter = side_a + side_b + side_c\nsemiperimeter = perimeter / 2\narea = (\n    semiperimeter\n    * (semiperimeter - side_a)\n    * (semiperimeter - side_b)\n    * (semiperimeter - side_c)\n) ** 0.5\n\nprint(\"Triangle calculator\")\nprint(\"-------------------\")\nprint(\"Perimeter:\", format_number(perimeter))\nprint(\"Semiperimeter:\", format_number(semiperimeter))\nprint(\"Area:\", format_number(area))\n",
    "pageGroup": "Math",
    "pageSection": "Geometry",
    "pagePath": "/math-calculators/triangle-calculator/"
  },
  {
    "id": "volume-calculator",
    "title": "Volume Calculator",
    "category": "Geometry",
    "summary": "Estimate volume for a box, sphere, or cylinder.",
    "tags": [
      "volume",
      "geometry",
      "solid"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate volume for a box, sphere, or cylinder. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated math calculator page for Volume Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Volume:"
      }
    ],
    "routeSlug": "volume-calculator",
    "seoTitle": "Volume Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate volume for a box, sphere, or cylinder. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Volume Calculator\n# Edit: shape_name and the matching dimensions.\n# Assumptions: shape_name is box, sphere, or cylinder.\n# Limitations: supports three common solid shapes.\n# Output: prints the computed volume for the chosen shape.\n\nimport math\n\nshape_name = \"cylinder\"\nlength = 6\nwidth = 4\nheight = 10\nradius = 3\n\n\ndef format_number(value, digits=6):\n    if isinstance(value, int):\n        return str(value)\n\n    rounded = round(value, digits)\n    text = \"{:.6f}\".format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\nif shape_name == \"box\":\n    volume = length * width * height\nelif shape_name == \"sphere\":\n    volume = (4 / 3) * math.pi * (radius ** 3)\nelse:\n    volume = math.pi * (radius ** 2) * height\n\nprint(\"Volume calculator\")\nprint(\"-----------------\")\nprint(\"Shape:\", shape_name)\nprint(\"Volume:\", format_number(volume))\n",
    "pageGroup": "Math",
    "pageSection": "Geometry",
    "pagePath": "/math-calculators/volume-calculator/"
  },
  {
    "id": "slope-calculator",
    "title": "Slope Calculator",
    "category": "Geometry",
    "summary": "Compute rise, run, and slope between two points.",
    "tags": [
      "slope",
      "geometry",
      "coordinate"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Compute rise, run, and slope between two points. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated math calculator page for Slope Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Slope:"
      }
    ],
    "routeSlug": "slope-calculator",
    "seoTitle": "Slope Calculator Python Script | SharePython.com",
    "seoDescription": "Compute rise, run, and slope between two points. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Slope Calculator\n# Edit: x1, y1, x2, and y2.\n# Assumptions: x1 and x2 are different.\n# Limitations: uses two Cartesian points only.\n# Output: prints rise, run, and slope.\n\nx1 = 2\ny1 = 5\nx2 = 8\ny2 = 17\n\n\ndef format_number(value, digits=6):\n    if isinstance(value, int):\n        return str(value)\n\n    rounded = round(value, digits)\n    text = \"{:.6f}\".format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\nrise = y2 - y1\nrun = x2 - x1\nslope = rise / run\n\nprint(\"Slope calculator\")\nprint(\"----------------\")\nprint(\"Rise:\", rise)\nprint(\"Run:\", run)\nprint(\"Slope:\", format_number(slope))\n",
    "pageGroup": "Math",
    "pageSection": "Geometry",
    "pagePath": "/math-calculators/slope-calculator/"
  },
  {
    "id": "area-calculator",
    "title": "Area Calculator",
    "category": "Geometry",
    "summary": "Estimate area for a rectangle, circle, or triangle.",
    "tags": [
      "area",
      "geometry",
      "shape"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate area for a rectangle, circle, or triangle. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated math calculator page for Area Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Area:"
      }
    ],
    "routeSlug": "area-calculator",
    "seoTitle": "Area Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate area for a rectangle, circle, or triangle. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Area Calculator\n# Edit: shape_name and the matching dimensions.\n# Assumptions: shape_name is rectangle, circle, or triangle.\n# Limitations: supports three common two-dimensional shapes.\n# Output: prints the computed area for the chosen shape.\n\nimport math\n\nshape_name = \"triangle\"\nlength = 12\nwidth = 8\nradius = 5\nbase = 10\nheight = 6\n\n\ndef format_number(value, digits=6):\n    if isinstance(value, int):\n        return str(value)\n\n    rounded = round(value, digits)\n    text = \"{:.6f}\".format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\nif shape_name == \"rectangle\":\n    area = length * width\nelif shape_name == \"circle\":\n    area = math.pi * (radius ** 2)\nelse:\n    area = 0.5 * base * height\n\nprint(\"Area calculator\")\nprint(\"---------------\")\nprint(\"Shape:\", shape_name)\nprint(\"Area:\", format_number(area))\n",
    "pageGroup": "Math",
    "pageSection": "Geometry",
    "pagePath": "/math-calculators/area-calculator/"
  },
  {
    "id": "distance-calculator",
    "title": "Distance Calculator",
    "category": "Geometry",
    "summary": "Measure straight-line distance between two points.",
    "tags": [
      "distance",
      "geometry",
      "coordinate"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Measure straight-line distance between two points. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated math calculator page for Distance Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Distance:"
      }
    ],
    "routeSlug": "distance-calculator",
    "seoTitle": "Distance Calculator Python Script | SharePython.com",
    "seoDescription": "Measure straight-line distance between two points. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Distance Calculator\n# Edit: x1, y1, x2, and y2.\n# Assumptions: coordinates use a flat Cartesian plane.\n# Limitations: prints straight-line distance only.\n# Output: prints the horizontal change, vertical change, and distance.\n\nx1 = -2\ny1 = 4\nx2 = 7\ny2 = 10\n\n\ndef format_number(value, digits=6):\n    if isinstance(value, int):\n        return str(value)\n\n    rounded = round(value, digits)\n    text = \"{:.6f}\".format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\nhorizontal_change = x2 - x1\nvertical_change = y2 - y1\ndistance = (horizontal_change ** 2 + vertical_change ** 2) ** 0.5\n\nprint(\"Distance calculator\")\nprint(\"-------------------\")\nprint(\"Horizontal change:\", format_number(horizontal_change))\nprint(\"Vertical change:\", format_number(vertical_change))\nprint(\"Distance:\", format_number(distance))\n",
    "pageGroup": "Math",
    "pageSection": "Geometry",
    "pagePath": "/math-calculators/distance-calculator/"
  },
  {
    "id": "circle-calculator",
    "title": "Circle Calculator",
    "category": "Geometry",
    "summary": "Compute diameter, circumference, and area from a radius.",
    "tags": [
      "circle",
      "geometry",
      "radius"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Compute diameter, circumference, and area from a radius. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated math calculator page for Circle Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Circumference:"
      }
    ],
    "routeSlug": "circle-calculator",
    "seoTitle": "Circle Calculator Python Script | SharePython.com",
    "seoDescription": "Compute diameter, circumference, and area from a radius. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Circle Calculator\n# Edit: radius.\n# Assumptions: radius is positive.\n# Limitations: prints the most common derived circle measures.\n# Output: prints diameter, circumference, and area.\n\nimport math\n\nradius = 5.5\n\n\ndef format_number(value, digits=6):\n    if isinstance(value, int):\n        return str(value)\n\n    rounded = round(value, digits)\n    text = \"{:.6f}\".format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\ndiameter = radius * 2\ncircumference = 2 * math.pi * radius\narea = math.pi * radius ** 2\n\nprint(\"Circle calculator\")\nprint(\"-----------------\")\nprint(\"Diameter:\", format_number(diameter))\nprint(\"Circumference:\", format_number(circumference))\nprint(\"Area:\", format_number(area))\n",
    "pageGroup": "Math",
    "pageSection": "Geometry",
    "pagePath": "/math-calculators/circle-calculator/"
  },
  {
    "id": "surface-area-calculator",
    "title": "Surface Area Calculator",
    "category": "Geometry",
    "summary": "Estimate surface area for a cube, sphere, or cylinder.",
    "tags": [
      "surface-area",
      "geometry",
      "solid"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate surface area for a cube, sphere, or cylinder. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated math calculator page for Surface Area Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Surface area:"
      }
    ],
    "routeSlug": "surface-area-calculator",
    "seoTitle": "Surface Area Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate surface area for a cube, sphere, or cylinder. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Surface Area Calculator\n# Edit: shape_name and the matching dimensions.\n# Assumptions: shape_name is cube, sphere, or cylinder.\n# Limitations: supports three common solid shapes.\n# Output: prints the computed surface area for the chosen shape.\n\nimport math\n\nshape_name = \"cylinder\"\nside_length = 4\nradius = 3\nheight = 10\n\n\ndef format_number(value, digits=6):\n    if isinstance(value, int):\n        return str(value)\n\n    rounded = round(value, digits)\n    text = \"{:.6f}\".format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\nif shape_name == \"cube\":\n    surface_area = 6 * (side_length ** 2)\nelif shape_name == \"sphere\":\n    surface_area = 4 * math.pi * (radius ** 2)\nelse:\n    surface_area = 2 * math.pi * radius * (radius + height)\n\nprint(\"Surface area calculator\")\nprint(\"-----------------------\")\nprint(\"Shape:\", shape_name)\nprint(\"Surface area:\", format_number(surface_area))\n",
    "pageGroup": "Math",
    "pageSection": "Geometry",
    "pagePath": "/math-calculators/surface-area-calculator/"
  },
  {
    "id": "pythagorean-theorem-calculator",
    "title": "Pythagorean Theorem Calculator",
    "category": "Geometry",
    "summary": "Solve for the hypotenuse of a right triangle from the two legs.",
    "tags": [
      "pythagorean",
      "triangle",
      "geometry"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Solve for the hypotenuse of a right triangle from the two legs. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated math calculator page for Pythagorean Theorem Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Hypotenuse:"
      }
    ],
    "routeSlug": "pythagorean-theorem-calculator",
    "seoTitle": "Pythagorean Theorem Calculator Python Script | SharePython.com",
    "seoDescription": "Solve for the hypotenuse of a right triangle from the two legs. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Pythagorean Theorem Calculator\n# Edit: leg_a and leg_b.\n# Assumptions: legs describe a right triangle.\n# Limitations: solves for the hypotenuse only.\n# Output: prints the hypotenuse length.\n\nleg_a = 9\nleg_b = 12\n\n\ndef format_number(value, digits=6):\n    if isinstance(value, int):\n        return str(value)\n\n    rounded = round(value, digits)\n    text = \"{:.6f}\".format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\nhypotenuse = (leg_a ** 2 + leg_b ** 2) ** 0.5\n\nprint(\"Pythagorean theorem calculator\")\nprint(\"------------------------------\")\nprint(\"Hypotenuse:\", format_number(hypotenuse))\n",
    "pageGroup": "Math",
    "pageSection": "Geometry",
    "pagePath": "/math-calculators/pythagorean-theorem-calculator/"
  },
  {
    "id": "right-triangle-calculator",
    "title": "Right Triangle Calculator",
    "category": "Geometry",
    "summary": "Solve a right triangle from one angle and the hypotenuse.",
    "tags": [
      "right-triangle",
      "geometry",
      "trigonometry"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Solve a right triangle from one angle and the hypotenuse. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated math calculator page for Right Triangle Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Adjacent side:"
      }
    ],
    "routeSlug": "right-triangle-calculator",
    "seoTitle": "Right Triangle Calculator Python Script | SharePython.com",
    "seoDescription": "Solve a right triangle from one angle and the hypotenuse. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Right Triangle Calculator\n# Edit: hypotenuse and angle_degrees.\n# Assumptions: angle_degrees is one acute angle of a right triangle.\n# Limitations: solves one right triangle from a hypotenuse and one angle.\n# Output: prints the adjacent and opposite side lengths.\n\nimport math\n\nhypotenuse = 15\nangle_degrees = 32\n\n\ndef format_number(value, digits=6):\n    if isinstance(value, int):\n        return str(value)\n\n    rounded = round(value, digits)\n    text = \"{:.6f}\".format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\nangle_radians = math.radians(angle_degrees)\nadjacent = hypotenuse * math.cos(angle_radians)\nopposite = hypotenuse * math.sin(angle_radians)\n\nprint(\"Right triangle calculator\")\nprint(\"-------------------------\")\nprint(\"Adjacent side:\", format_number(adjacent))\nprint(\"Opposite side:\", format_number(opposite))\n",
    "pageGroup": "Math",
    "pageSection": "Geometry",
    "pagePath": "/math-calculators/right-triangle-calculator/"
  },
  {
    "id": "bmi-calculator",
    "title": "BMI Calculator",
    "category": "Fitness",
    "summary": "Estimate body mass index and print a broad BMI category.",
    "tags": [
      "bmi",
      "weight",
      "health"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate body mass index and print a broad BMI category. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated health calculator page for BMI Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "BMI:"
      }
    ],
    "routeSlug": "bmi-calculator",
    "seoTitle": "BMI Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate body mass index and print a broad BMI category. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# BMI Calculator\n# Edit: weight_kg and height_m.\n# Assumptions: weight and height use metric units.\n# Limitations: BMI is only a screening estimate and does not measure body composition.\n# Output: prints the BMI value and a broad BMI category.\n\nweight_kg = 78\nheight_m = 1.78\n\n\ndef format_number(value, digits=2):\n    rounded = round(value, digits)\n    text = (\"{:.\" + str(digits) + \"f}\").format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\nbmi = weight_kg / (height_m ** 2)\n\nif bmi < 18.5:\n    category = \"Underweight\"\nelif bmi < 25:\n    category = \"Healthy range\"\nelif bmi < 30:\n    category = \"Overweight\"\nelse:\n    category = \"Obesity range\"\n\nprint(\"BMI calculator\")\nprint(\"--------------\")\nprint(\"BMI:\", format_number(bmi))\nprint(\"Category:\", category)\n",
    "pageGroup": "Health",
    "pageSection": "Fitness",
    "pagePath": "/health-calculators/bmi-calculator/"
  },
  {
    "id": "calorie-calculator",
    "title": "Calorie Calculator",
    "category": "Fitness",
    "summary": "Estimate maintenance calories from age, sex, size, and activity level.",
    "tags": [
      "calories",
      "nutrition",
      "tdee"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate maintenance calories from age, sex, size, and activity level. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated health calculator page for Calorie Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Maintenance calories:"
      }
    ],
    "routeSlug": "calorie-calculator",
    "seoTitle": "Calorie Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate maintenance calories from age, sex, size, and activity level. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Calorie Calculator\n# Edit: sex, age_years, height_cm, weight_kg, and activity_factor.\n# Assumptions: activity_factor is a daily multiplier for average activity.\n# Limitations: estimates maintenance calories from the Mifflin-St Jeor equation.\n# Output: prints BMR, maintenance calories, and a mild-cut target.\n\nsex = \"female\"\nage_years = 34\nheight_cm = 168\nweight_kg = 68\nactivity_factor = 1.55\n\n\ndef format_number(value, digits=2):\n    rounded = round(value, digits)\n    text = (\"{:.\" + str(digits) + \"f}\").format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\ndef mifflin_st_jeor(sex, age_years, height_cm, weight_kg):\n    base = 10 * weight_kg + 6.25 * height_cm - 5 * age_years\n    return base + 5 if sex == \"male\" else base - 161\n\n\nbmr = mifflin_st_jeor(sex, age_years, height_cm, weight_kg)\nmaintenance_calories = bmr * activity_factor\ncut_target = maintenance_calories - 300\n\nprint(\"Calorie calculator\")\nprint(\"------------------\")\nprint(\"Estimated BMR:\", format_number(bmr))\nprint(\"Maintenance calories:\", format_number(maintenance_calories))\nprint(\"Mild-cut target:\", format_number(cut_target))\n",
    "pageGroup": "Health",
    "pageSection": "Fitness",
    "pagePath": "/health-calculators/calorie-calculator/"
  },
  {
    "id": "body-fat-calculator",
    "title": "Body Fat Calculator",
    "category": "Fitness",
    "summary": "Estimate body-fat percentage from body measurements using the Navy formula.",
    "tags": [
      "body-fat",
      "measurements",
      "fitness"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate body-fat percentage from body measurements using the Navy formula. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated health calculator page for Body Fat Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Estimated body fat:"
      }
    ],
    "routeSlug": "body-fat-calculator",
    "seoTitle": "Body Fat Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate body-fat percentage from body measurements using the Navy formula. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Body Fat Calculator\n# Edit: sex, height_cm, neck_cm, waist_cm, and hip_cm when needed.\n# Assumptions: measurements use the U.S. Navy-style body-fat estimate.\n# Limitations: this is an estimate and can differ from lab-based measurements.\n# Output: prints the estimated body-fat percentage.\n\nimport math\n\nsex = \"female\"\nheight_cm = 168\nneck_cm = 33\nwaist_cm = 78\nhip_cm = 98\n\n\ndef format_number(value, digits=2):\n    rounded = round(value, digits)\n    text = (\"{:.\" + str(digits) + \"f}\").format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\nif sex == \"male\":\n    body_fat = 495 / (\n        1.0324 - 0.19077 * math.log10(waist_cm - neck_cm) + 0.15456 * math.log10(height_cm)\n    ) - 450\nelse:\n    body_fat = 495 / (\n        1.29579\n        - 0.35004 * math.log10(waist_cm + hip_cm - neck_cm)\n        + 0.22100 * math.log10(height_cm)\n    ) - 450\n\nprint(\"Body Fat Calculator\")\nprint(\"--------------------\")\nprint(\"Estimated body fat:\", format_number(body_fat) + \"%\")\n",
    "pageGroup": "Health",
    "pageSection": "Fitness",
    "pagePath": "/health-calculators/body-fat-calculator/"
  },
  {
    "id": "bmr-calculator",
    "title": "BMR Calculator",
    "category": "Fitness",
    "summary": "Estimate basal metabolic rate from age, size, and sex.",
    "tags": [
      "bmr",
      "metabolism",
      "calories"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate basal metabolic rate from age, size, and sex. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated health calculator page for BMR Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Estimated BMR:"
      }
    ],
    "routeSlug": "bmr-calculator",
    "seoTitle": "BMR Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate basal metabolic rate from age, size, and sex. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# BMR Calculator\n# Edit: sex, age_years, height_cm, and weight_kg.\n# Assumptions: uses the Mifflin-St Jeor resting-energy formula.\n# Limitations: estimates resting needs only and ignores activity.\n# Output: prints the estimated basal metabolic rate.\n\nsex = \"male\"\nage_years = 38\nheight_cm = 182\nweight_kg = 84\n\n\ndef format_number(value, digits=2):\n    rounded = round(value, digits)\n    text = (\"{:.\" + str(digits) + \"f}\").format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\ndef mifflin_st_jeor(sex, age_years, height_cm, weight_kg):\n    base = 10 * weight_kg + 6.25 * height_cm - 5 * age_years\n    return base + 5 if sex == \"male\" else base - 161\n\n\nbmr = mifflin_st_jeor(sex, age_years, height_cm, weight_kg)\n\nprint(\"BMR calculator\")\nprint(\"--------------\")\nprint(\"Estimated BMR:\", format_number(bmr))\n",
    "pageGroup": "Health",
    "pageSection": "Fitness",
    "pagePath": "/health-calculators/bmr-calculator/"
  },
  {
    "id": "ideal-weight-calculator",
    "title": "Ideal Weight Calculator",
    "category": "Fitness",
    "summary": "Estimate a heuristic ideal weight from height and sex.",
    "tags": [
      "ideal-weight",
      "weight",
      "fitness"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate a heuristic ideal weight from height and sex. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated health calculator page for Ideal Weight Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Ideal weight:"
      }
    ],
    "routeSlug": "ideal-weight-calculator",
    "seoTitle": "Ideal Weight Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate a heuristic ideal weight from height and sex. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Ideal Weight Calculator\n# Edit: sex and height_cm.\n# Assumptions: uses the Devine formula.\n# Limitations: ideal-weight formulas are heuristic and not a complete health target.\n# Output: prints the estimated ideal weight in kilograms.\n\nsex = \"female\"\nheight_cm = 168\n\n\ndef format_number(value, digits=2):\n    rounded = round(value, digits)\n    text = (\"{:.\" + str(digits) + \"f}\").format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\nheight_in = height_cm / 2.54\nbase_weight = 50 if sex == \"male\" else 45.5\nideal_weight = base_weight + max(0, height_in - 60) * 2.3\n\nprint(\"Ideal weight calculator\")\nprint(\"-----------------------\")\nprint(\"Ideal weight:\", format_number(ideal_weight) + \" kg\")\n",
    "pageGroup": "Health",
    "pageSection": "Fitness",
    "pagePath": "/health-calculators/ideal-weight-calculator/"
  },
  {
    "id": "army-body-fat-calculator",
    "title": "Army Body Fat Calculator",
    "category": "Fitness",
    "summary": "Estimate body-fat percentage with a measurement-based military-style screening formula.",
    "tags": [
      "army-body-fat",
      "body-fat",
      "fitness"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate body-fat percentage with a measurement-based military-style screening formula. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated health calculator page for Army Body Fat Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Army screening note:"
      }
    ],
    "routeSlug": "army-body-fat-calculator",
    "seoTitle": "Army Body Fat Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate body-fat percentage with a measurement-based military-style screening formula. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Army Body Fat Calculator\n# Edit: sex, height_cm, neck_cm, waist_cm, and hip_cm when needed.\n# Assumptions: measurements use the U.S. Navy-style body-fat estimate.\n# Limitations: this is an estimate and can differ from lab-based measurements.\n# Output: prints the estimated body-fat percentage.\n\nimport math\n\nsex = \"female\"\nheight_cm = 168\nneck_cm = 33\nwaist_cm = 78\nhip_cm = 98\n\n\ndef format_number(value, digits=2):\n    rounded = round(value, digits)\n    text = (\"{:.\" + str(digits) + \"f}\").format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\nif sex == \"male\":\n    body_fat = 495 / (\n        1.0324 - 0.19077 * math.log10(waist_cm - neck_cm) + 0.15456 * math.log10(height_cm)\n    ) - 450\nelse:\n    body_fat = 495 / (\n        1.29579\n        - 0.35004 * math.log10(waist_cm + hip_cm - neck_cm)\n        + 0.22100 * math.log10(height_cm)\n    ) - 450\n\nprint(\"Army Body Fat Calculator\")\nprint(\"--------------------\")\nprint(\"Estimated body fat:\", format_number(body_fat) + \"%\")\nprint(\"Army screening note:\", \"Use local service standards before relying on this estimate.\")\n",
    "pageGroup": "Health",
    "pageSection": "Fitness",
    "pagePath": "/health-calculators/army-body-fat-calculator/"
  },
  {
    "id": "lean-body-mass-calculator",
    "title": "Lean Body Mass Calculator",
    "category": "Fitness",
    "summary": "Estimate lean body mass from height, weight, and sex.",
    "tags": [
      "lean-body-mass",
      "fitness",
      "weight"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate lean body mass from height, weight, and sex. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated health calculator page for Lean Body Mass Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Lean body mass:"
      }
    ],
    "routeSlug": "lean-body-mass-calculator",
    "seoTitle": "Lean Body Mass Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate lean body mass from height, weight, and sex. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Lean Body Mass Calculator\n# Edit: sex, height_cm, and weight_kg.\n# Assumptions: uses the Boer lean-body-mass estimate.\n# Limitations: result is an estimate rather than a direct measurement.\n# Output: prints the estimated lean body mass.\n\nsex = \"male\"\nheight_cm = 180\nweight_kg = 82\n\n\ndef format_number(value, digits=2):\n    rounded = round(value, digits)\n    text = (\"{:.\" + str(digits) + \"f}\").format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\nif sex == \"male\":\n    lean_body_mass = 0.407 * weight_kg + 0.267 * height_cm - 19.2\nelse:\n    lean_body_mass = 0.252 * weight_kg + 0.473 * height_cm - 48.3\n\nprint(\"Lean body mass calculator\")\nprint(\"-------------------------\")\nprint(\"Lean body mass:\", format_number(lean_body_mass) + \" kg\")\n",
    "pageGroup": "Health",
    "pageSection": "Fitness",
    "pagePath": "/health-calculators/lean-body-mass-calculator/"
  },
  {
    "id": "healthy-weight-calculator",
    "title": "Healthy Weight Calculator",
    "category": "Fitness",
    "summary": "Estimate the weight range tied to a common healthy-BMI band.",
    "tags": [
      "healthy-weight",
      "bmi",
      "weight"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate the weight range tied to a common healthy-BMI band. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated health calculator page for Healthy Weight Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Suggested range:"
      }
    ],
    "routeSlug": "healthy-weight-calculator",
    "seoTitle": "Healthy Weight Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate the weight range tied to a common healthy-BMI band. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Healthy Weight Calculator\n# Edit: height_m.\n# Assumptions: uses the common BMI range of 18.5 to 24.9.\n# Limitations: healthy weight is broader than BMI alone.\n# Output: prints the weight range associated with a common BMI target range.\n\nheight_m = 1.78\n\n\ndef format_number(value, digits=2):\n    rounded = round(value, digits)\n    text = (\"{:.\" + str(digits) + \"f}\").format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\nlower_weight = 18.5 * (height_m ** 2)\nupper_weight = 24.9 * (height_m ** 2)\n\nprint(\"Healthy weight calculator\")\nprint(\"-------------------------\")\nprint(\"Suggested range:\", format_number(lower_weight) + \" kg to \" + format_number(upper_weight) + \" kg\")\n",
    "pageGroup": "Health",
    "pageSection": "Fitness",
    "pagePath": "/health-calculators/healthy-weight-calculator/"
  },
  {
    "id": "calories-burned-calculator",
    "title": "Calories Burned Calculator",
    "category": "Fitness",
    "summary": "Estimate workout calories burned from MET, weight, and workout time.",
    "tags": [
      "calories-burned",
      "exercise",
      "fitness"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate workout calories burned from MET, weight, and workout time. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated health calculator page for Calories Burned Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Estimated calories burned:"
      }
    ],
    "routeSlug": "calories-burned-calculator",
    "seoTitle": "Calories Burned Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate workout calories burned from MET, weight, and workout time. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Calories Burned Calculator\n# Edit: met_value, weight_kg, and workout_minutes.\n# Assumptions: met_value matches the chosen activity intensity.\n# Limitations: uses the standard MET-based calories-burned estimate.\n# Output: prints the estimated calories burned.\n\nmet_value = 8.3\nweight_kg = 72\nworkout_minutes = 45\n\n\ndef format_number(value, digits=2):\n    rounded = round(value, digits)\n    text = (\"{:.\" + str(digits) + \"f}\").format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\nhours = workout_minutes / 60\ncalories_burned = met_value * weight_kg * hours\n\nprint(\"Calories burned calculator\")\nprint(\"--------------------------\")\nprint(\"Estimated calories burned:\", format_number(calories_burned))\n",
    "pageGroup": "Health",
    "pageSection": "Fitness",
    "pagePath": "/health-calculators/calories-burned-calculator/"
  },
  {
    "id": "one-rep-max-calculator",
    "title": "One Rep Max Calculator",
    "category": "Fitness",
    "summary": "Estimate a one-rep max from a lifted weight and repetition count.",
    "tags": [
      "one-rep-max",
      "strength",
      "fitness"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate a one-rep max from a lifted weight and repetition count. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated health calculator page for One Rep Max Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Estimated 1RM:"
      }
    ],
    "routeSlug": "one-rep-max-calculator",
    "seoTitle": "One Rep Max Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate a one-rep max from a lifted weight and repetition count. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# One Rep Max Calculator\n# Edit: weight_lifted and repetition_count.\n# Assumptions: uses the Epley one-rep-max estimate.\n# Limitations: estimate is most reliable for moderate rep counts.\n# Output: prints the estimated one-rep max.\n\nweight_lifted = 185\nrepetition_count = 5\n\n\ndef format_number(value, digits=2):\n    rounded = round(value, digits)\n    text = (\"{:.\" + str(digits) + \"f}\").format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\none_rep_max = weight_lifted * (1 + repetition_count / 30)\n\nprint(\"One rep max calculator\")\nprint(\"----------------------\")\nprint(\"Estimated 1RM:\", format_number(one_rep_max))\n",
    "pageGroup": "Health",
    "pageSection": "Fitness",
    "pagePath": "/health-calculators/one-rep-max-calculator/"
  },
  {
    "id": "target-heart-rate-calculator",
    "title": "Target Heart Rate Calculator",
    "category": "Fitness",
    "summary": "Estimate a training heart-rate zone from age and resting heart rate.",
    "tags": [
      "heart-rate",
      "cardio",
      "fitness"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate a training heart-rate zone from age and resting heart rate. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated health calculator page for Target Heart Rate Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Target zone:"
      }
    ],
    "routeSlug": "target-heart-rate-calculator",
    "seoTitle": "Target Heart Rate Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate a training heart-rate zone from age and resting heart rate. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Target Heart Rate Calculator\n# Edit: age_years, resting_heart_rate, and intensity range.\n# Assumptions: uses the Karvonen target-heart-rate method.\n# Limitations: training zones are estimates and not medical advice.\n# Output: prints the estimated max heart rate and target exercise zone.\n\nage_years = 36\nresting_heart_rate = 62\nlower_intensity = 0.6\nupper_intensity = 0.8\n\n\ndef format_number(value, digits=2):\n    rounded = round(value, digits)\n    text = (\"{:.\" + str(digits) + \"f}\").format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\nmax_heart_rate = 220 - age_years\nheart_rate_reserve = max_heart_rate - resting_heart_rate\nlower_target = heart_rate_reserve * lower_intensity + resting_heart_rate\nupper_target = heart_rate_reserve * upper_intensity + resting_heart_rate\n\nprint(\"Target heart rate calculator\")\nprint(\"----------------------------\")\nprint(\"Estimated max heart rate:\", format_number(max_heart_rate))\nprint(\"Target zone:\", format_number(lower_target) + \" to \" + format_number(upper_target) + \" bpm\")\n",
    "pageGroup": "Health",
    "pageSection": "Fitness",
    "pagePath": "/health-calculators/target-heart-rate-calculator/"
  },
  {
    "id": "pregnancy-calculator",
    "title": "Pregnancy Calculator",
    "category": "Pregnancy",
    "summary": "Estimate gestational age and due date from the first day of the last period.",
    "tags": [
      "pregnancy",
      "due-date",
      "dates"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate gestational age and due date from the first day of the last period. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated health calculator page for Pregnancy Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Estimated due date:"
      }
    ],
    "routeSlug": "pregnancy-calculator",
    "seoTitle": "Pregnancy Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate gestational age and due date from the first day of the last period. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Pregnancy Calculator\n# Edit: last_period_start and today.\n# Assumptions: gestational age is estimated from the first day of the last period.\n# Limitations: cycle variation means this is an estimate rather than medical guidance.\n# Output: prints the estimated gestational age and due date.\n\nfrom datetime import date, timedelta\n\nlast_period_start = date(2026, 1, 12)\ntoday = date(2026, 3, 31)\ncycle_length_days = 28\ndue_date = last_period_start + timedelta(days=280)\novulation_date = last_period_start + timedelta(days=cycle_length_days - 14)\nconception_date = ovulation_date\n\n\ngestational_days = (today - last_period_start).days\ngestational_weeks = gestational_days // 7\nremaining_days = gestational_days % 7\n\nprint(\"Pregnancy calculator\")\nprint(\"--------------------\")\nprint(\"Estimated gestational age:\", str(gestational_weeks) + \" weeks \" + str(remaining_days) + \" days\")\nprint(\"Estimated due date:\", due_date.isoformat())\n",
    "pageGroup": "Health",
    "pageSection": "Pregnancy",
    "pagePath": "/health-calculators/pregnancy-calculator/"
  },
  {
    "id": "pregnancy-weight-gain-calculator",
    "title": "Pregnancy Weight Gain Calculator",
    "category": "Pregnancy",
    "summary": "Estimate a broad pregnancy weight-gain range from pre-pregnancy BMI.",
    "tags": [
      "pregnancy",
      "weight-gain",
      "health"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate a broad pregnancy weight-gain range from pre-pregnancy BMI. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated health calculator page for Pregnancy Weight Gain Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Suggested total gain range:"
      }
    ],
    "routeSlug": "pregnancy-weight-gain-calculator",
    "seoTitle": "Pregnancy Weight Gain Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate a broad pregnancy weight-gain range from pre-pregnancy BMI. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Pregnancy Weight Gain Calculator\n# Edit: pre_pregnancy_bmi and trimester_number.\n# Assumptions: uses broad BMI-based pregnancy weight-gain guidance ranges.\n# Limitations: clinical guidance can vary by pregnancy history and other factors.\n# Output: prints a broad recommended total gain range.\n\npre_pregnancy_bmi = 23.4\ntrimester_number = 2\n\nif pre_pregnancy_bmi < 18.5:\n    recommended_range = \"28 to 40 lb\"\nelif pre_pregnancy_bmi < 25:\n    recommended_range = \"25 to 35 lb\"\nelif pre_pregnancy_bmi < 30:\n    recommended_range = \"15 to 25 lb\"\nelse:\n    recommended_range = \"11 to 20 lb\"\n\nprint(\"Pregnancy weight gain calculator\")\nprint(\"-------------------------------\")\nprint(\"Trimester:\", trimester_number)\nprint(\"Suggested total gain range:\", recommended_range)\n",
    "pageGroup": "Health",
    "pageSection": "Pregnancy",
    "pagePath": "/health-calculators/pregnancy-weight-gain-calculator/"
  },
  {
    "id": "pregnancy-conception-calculator",
    "title": "Pregnancy Conception Calculator",
    "category": "Pregnancy",
    "summary": "Estimate likely ovulation and conception dates from last period timing.",
    "tags": [
      "pregnancy",
      "conception",
      "ovulation"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate likely ovulation and conception dates from last period timing. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated health calculator page for Pregnancy Conception Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Estimated conception date:"
      }
    ],
    "routeSlug": "pregnancy-conception-calculator",
    "seoTitle": "Pregnancy Conception Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate likely ovulation and conception dates from last period timing. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Pregnancy Conception Calculator\n# Edit: last_period_start and cycle_length_days.\n# Assumptions: conception is estimated near ovulation.\n# Limitations: true conception timing can differ from this estimate.\n# Output: prints the estimated ovulation and conception dates.\n\nfrom datetime import date, timedelta\n\nlast_period_start = date(2026, 1, 12)\ntoday = date(2026, 3, 31)\ncycle_length_days = 28\ndue_date = last_period_start + timedelta(days=280)\novulation_date = last_period_start + timedelta(days=cycle_length_days - 14)\nconception_date = ovulation_date\n\n\nprint(\"Pregnancy conception calculator\")\nprint(\"-------------------------------\")\nprint(\"Estimated ovulation date:\", ovulation_date.isoformat())\nprint(\"Estimated conception date:\", conception_date.isoformat())\n",
    "pageGroup": "Health",
    "pageSection": "Pregnancy",
    "pagePath": "/health-calculators/pregnancy-conception-calculator/"
  },
  {
    "id": "due-date-calculator",
    "title": "Due Date Calculator",
    "category": "Pregnancy",
    "summary": "Estimate a due date by adding 280 days to the start of the last period.",
    "tags": [
      "due-date",
      "pregnancy",
      "dates"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate a due date by adding 280 days to the start of the last period. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated health calculator page for Due Date Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Estimated due date:"
      }
    ],
    "routeSlug": "due-date-calculator",
    "seoTitle": "Due Date Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate a due date by adding 280 days to the start of the last period. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Due Date Calculator\n# Edit: last_period_start.\n# Assumptions: adds 280 days to the first day of the last period.\n# Limitations: actual due dates can vary from this estimate.\n# Output: prints the estimated due date.\n\nfrom datetime import date, timedelta\n\nlast_period_start = date(2026, 1, 12)\ntoday = date(2026, 3, 31)\ncycle_length_days = 28\ndue_date = last_period_start + timedelta(days=280)\novulation_date = last_period_start + timedelta(days=cycle_length_days - 14)\nconception_date = ovulation_date\n\n\nprint(\"Due date calculator\")\nprint(\"-------------------\")\nprint(\"Estimated due date:\", due_date.isoformat())\n",
    "pageGroup": "Health",
    "pageSection": "Pregnancy",
    "pagePath": "/health-calculators/due-date-calculator/"
  },
  {
    "id": "ovulation-calculator",
    "title": "Ovulation Calculator",
    "category": "Pregnancy",
    "summary": "Estimate ovulation date and fertile window from cycle timing.",
    "tags": [
      "ovulation",
      "fertility",
      "dates"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate ovulation date and fertile window from cycle timing. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated health calculator page for Ovulation Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Estimated fertile window:"
      }
    ],
    "routeSlug": "ovulation-calculator",
    "seoTitle": "Ovulation Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate ovulation date and fertile window from cycle timing. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Ovulation Calculator\n# Edit: last_period_start and cycle_length_days.\n# Assumptions: ovulation is estimated at cycle_length_days - 14.\n# Limitations: real ovulation timing can vary from this cycle-rule estimate.\n# Output: prints the estimated ovulation date and fertile window.\n\nfrom datetime import date, timedelta\n\nlast_period_start = date(2026, 1, 12)\ntoday = date(2026, 3, 31)\ncycle_length_days = 28\ndue_date = last_period_start + timedelta(days=280)\novulation_date = last_period_start + timedelta(days=cycle_length_days - 14)\nconception_date = ovulation_date\n\n\nfertile_window_start = ovulation_date - timedelta(days=5)\nfertile_window_end = ovulation_date + timedelta(days=1)\n\nprint(\"Ovulation calculator\")\nprint(\"--------------------\")\nprint(\"Estimated ovulation date:\", ovulation_date.isoformat())\nprint(\n    \"Estimated fertile window:\",\n    fertile_window_start.isoformat() + \" to \" + fertile_window_end.isoformat(),\n)\n",
    "pageGroup": "Health",
    "pageSection": "Pregnancy",
    "pagePath": "/health-calculators/ovulation-calculator/"
  },
  {
    "id": "conception-calculator",
    "title": "Conception Calculator",
    "category": "Pregnancy",
    "summary": "Estimate a likely conception window from ovulation timing.",
    "tags": [
      "conception",
      "pregnancy",
      "dates"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate a likely conception window from ovulation timing. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated health calculator page for Conception Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Estimated conception window:"
      }
    ],
    "routeSlug": "conception-calculator",
    "seoTitle": "Conception Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate a likely conception window from ovulation timing. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Conception Calculator\n# Edit: last_period_start and cycle_length_days.\n# Assumptions: conception is estimated from the likely ovulation window.\n# Limitations: real conception timing can vary from this estimate.\n# Output: prints the likely conception window.\n\nfrom datetime import date, timedelta\n\nlast_period_start = date(2026, 1, 12)\ntoday = date(2026, 3, 31)\ncycle_length_days = 28\ndue_date = last_period_start + timedelta(days=280)\novulation_date = last_period_start + timedelta(days=cycle_length_days - 14)\nconception_date = ovulation_date\n\n\nwindow_start = ovulation_date - timedelta(days=1)\nwindow_end = ovulation_date + timedelta(days=1)\n\nprint(\"Conception calculator\")\nprint(\"---------------------\")\nprint(\"Estimated conception window:\", window_start.isoformat() + \" to \" + window_end.isoformat())\n",
    "pageGroup": "Health",
    "pageSection": "Pregnancy",
    "pagePath": "/health-calculators/conception-calculator/"
  },
  {
    "id": "period-calculator",
    "title": "Period Calculator",
    "category": "Pregnancy",
    "summary": "Project the next expected period dates from cycle length.",
    "tags": [
      "period",
      "cycle",
      "dates"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Project the next expected period dates from cycle length. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated health calculator page for Period Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Next expected period:"
      }
    ],
    "routeSlug": "period-calculator",
    "seoTitle": "Period Calculator Python Script | SharePython.com",
    "seoDescription": "Project the next expected period dates from cycle length. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Period Calculator\n# Edit: last_period_start and cycle_length_days.\n# Assumptions: next period is estimated from the cycle length.\n# Limitations: cycle irregularity can make the estimate inaccurate.\n# Output: prints the next expected period dates.\n\nfrom datetime import date, timedelta\n\nlast_period_start = date(2026, 1, 12)\ntoday = date(2026, 3, 31)\ncycle_length_days = 28\ndue_date = last_period_start + timedelta(days=280)\novulation_date = last_period_start + timedelta(days=cycle_length_days - 14)\nconception_date = ovulation_date\n\n\nnext_period = last_period_start + timedelta(days=cycle_length_days)\nfollowing_period = next_period + timedelta(days=cycle_length_days)\n\nprint(\"Period calculator\")\nprint(\"-----------------\")\nprint(\"Next expected period:\", next_period.isoformat())\nprint(\"Following period:\", following_period.isoformat())\n",
    "pageGroup": "Health",
    "pageSection": "Pregnancy",
    "pagePath": "/health-calculators/period-calculator/"
  },
  {
    "id": "macro-calculator",
    "title": "Macro Calculator",
    "category": "Nutrition",
    "summary": "Convert daily calories into carbohydrate, protein, and fat gram targets.",
    "tags": [
      "macros",
      "nutrition",
      "calories"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Convert daily calories into carbohydrate, protein, and fat gram targets. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated health calculator page for Macro Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Carbohydrates:"
      }
    ],
    "routeSlug": "macro-calculator",
    "seoTitle": "Macro Calculator Python Script | SharePython.com",
    "seoDescription": "Convert daily calories into carbohydrate, protein, and fat gram targets. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Macro Calculator\n# Edit: daily_calories and macro shares.\n# Assumptions: shares add up to 1.0.\n# Limitations: converts calories into grams for carbs, protein, and fat only.\n# Output: prints grams for carbohydrates, protein, and fat.\n\ndaily_calories = 2400\ncarb_share = 0.4\nprotein_share = 0.3\nfat_share = 0.3\n\n\ndef format_number(value, digits=2):\n    rounded = round(value, digits)\n    text = (\"{:.\" + str(digits) + \"f}\").format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\ncarb_grams = (daily_calories * carb_share) / 4\nprotein_grams = (daily_calories * protein_share) / 4\nfat_grams = (daily_calories * fat_share) / 9\n\nprint(\"Macro calculator\")\nprint(\"----------------\")\nprint(\"Carbohydrates:\", format_number(carb_grams) + \" g\")\nprint(\"Protein:\", format_number(protein_grams) + \" g\")\nprint(\"Fat:\", format_number(fat_grams) + \" g\")\n",
    "pageGroup": "Health",
    "pageSection": "Nutrition",
    "pagePath": "/health-calculators/macro-calculator/"
  },
  {
    "id": "carbohydrate-calculator",
    "title": "Carbohydrate Calculator",
    "category": "Nutrition",
    "summary": "Convert a carbohydrate calorie share into daily grams.",
    "tags": [
      "carbohydrates",
      "nutrition",
      "macros"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Convert a carbohydrate calorie share into daily grams. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated health calculator page for Carbohydrate Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Carbohydrate target:"
      }
    ],
    "routeSlug": "carbohydrate-calculator",
    "seoTitle": "Carbohydrate Calculator Python Script | SharePython.com",
    "seoDescription": "Convert a carbohydrate calorie share into daily grams. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Carbohydrate Calculator\n# Edit: daily_calories and macro_share.\n# Assumptions: macro_share is a decimal percentage of daily calories.\n# Limitations: prints one macro target at a time.\n# Output: prints the estimated grams for the chosen macro.\n\ndaily_calories = 2200\nmacro_share = 0.45\n\n\ndef format_number(value, digits=2):\n    rounded = round(value, digits)\n    text = (\"{:.\" + str(digits) + \"f}\").format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\ntarget_grams = (daily_calories * macro_share) / 4\n\nprint(\"Carbohydrate Calculator\")\nprint(\"--------------------\")\nprint(\"Carbohydrate target:\", format_number(target_grams) + \" g\")\n",
    "pageGroup": "Health",
    "pageSection": "Nutrition",
    "pagePath": "/health-calculators/carbohydrate-calculator/"
  },
  {
    "id": "protein-calculator",
    "title": "Protein Calculator",
    "category": "Nutrition",
    "summary": "Convert a protein calorie share into daily grams.",
    "tags": [
      "protein",
      "nutrition",
      "macros"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Convert a protein calorie share into daily grams. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated health calculator page for Protein Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Protein target:"
      }
    ],
    "routeSlug": "protein-calculator",
    "seoTitle": "Protein Calculator Python Script | SharePython.com",
    "seoDescription": "Convert a protein calorie share into daily grams. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Protein Calculator\n# Edit: daily_calories and macro_share.\n# Assumptions: macro_share is a decimal percentage of daily calories.\n# Limitations: prints one macro target at a time.\n# Output: prints the estimated grams for the chosen macro.\n\ndaily_calories = 2200\nmacro_share = 0.25\n\n\ndef format_number(value, digits=2):\n    rounded = round(value, digits)\n    text = (\"{:.\" + str(digits) + \"f}\").format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\ntarget_grams = (daily_calories * macro_share) / 4\n\nprint(\"Protein Calculator\")\nprint(\"--------------------\")\nprint(\"Protein target:\", format_number(target_grams) + \" g\")\n",
    "pageGroup": "Health",
    "pageSection": "Nutrition",
    "pagePath": "/health-calculators/protein-calculator/"
  },
  {
    "id": "fat-intake-calculator",
    "title": "Fat Intake Calculator",
    "category": "Nutrition",
    "summary": "Convert a fat calorie share into daily grams.",
    "tags": [
      "fat",
      "nutrition",
      "macros"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Convert a fat calorie share into daily grams. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated health calculator page for Fat Intake Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Fat target:"
      }
    ],
    "routeSlug": "fat-intake-calculator",
    "seoTitle": "Fat Intake Calculator Python Script | SharePython.com",
    "seoDescription": "Convert a fat calorie share into daily grams. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Fat Intake Calculator\n# Edit: daily_calories and macro_share.\n# Assumptions: macro_share is a decimal percentage of daily calories.\n# Limitations: prints one macro target at a time.\n# Output: prints the estimated grams for the chosen macro.\n\ndaily_calories = 2200\nmacro_share = 0.28\n\n\ndef format_number(value, digits=2):\n    rounded = round(value, digits)\n    text = (\"{:.\" + str(digits) + \"f}\").format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\ntarget_grams = (daily_calories * macro_share) / 9\n\nprint(\"Fat Intake Calculator\")\nprint(\"--------------------\")\nprint(\"Fat target:\", format_number(target_grams) + \" g\")\n",
    "pageGroup": "Health",
    "pageSection": "Nutrition",
    "pagePath": "/health-calculators/fat-intake-calculator/"
  },
  {
    "id": "tdee-calculator",
    "title": "TDEE Calculator",
    "category": "Nutrition",
    "summary": "Estimate total daily energy expenditure from BMR and activity level.",
    "tags": [
      "tdee",
      "calories",
      "nutrition"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate total daily energy expenditure from BMR and activity level. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated health calculator page for TDEE Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Estimated TDEE:"
      }
    ],
    "routeSlug": "tdee-calculator",
    "seoTitle": "TDEE Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate total daily energy expenditure from BMR and activity level. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# TDEE Calculator\n# Edit: sex, age_years, height_cm, weight_kg, and activity_factor.\n# Assumptions: activity_factor reflects a typical daily activity level.\n# Limitations: TDEE is an estimate based on BMR and a single multiplier.\n# Output: prints BMR and total daily energy expenditure.\n\nsex = \"female\"\nage_years = 31\nheight_cm = 170\nweight_kg = 65\nactivity_factor = 1.65\n\n\ndef format_number(value, digits=2):\n    rounded = round(value, digits)\n    text = (\"{:.\" + str(digits) + \"f}\").format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\ndef mifflin_st_jeor(sex, age_years, height_cm, weight_kg):\n    base = 10 * weight_kg + 6.25 * height_cm - 5 * age_years\n    return base + 5 if sex == \"male\" else base - 161\n\n\nbmr = mifflin_st_jeor(sex, age_years, height_cm, weight_kg)\ntdee = bmr * activity_factor\n\nprint(\"TDEE calculator\")\nprint(\"---------------\")\nprint(\"Estimated BMR:\", format_number(bmr))\nprint(\"Estimated TDEE:\", format_number(tdee))\n",
    "pageGroup": "Health",
    "pageSection": "Nutrition",
    "pagePath": "/health-calculators/tdee-calculator/"
  },
  {
    "id": "body-surface-area-calculator",
    "title": "Body Surface Area Calculator",
    "category": "Nutrition",
    "summary": "Estimate body surface area using the Mosteller equation.",
    "tags": [
      "body-surface-area",
      "health",
      "formula"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate body surface area using the Mosteller equation. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated health calculator page for Body Surface Area Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Body surface area:"
      }
    ],
    "routeSlug": "body-surface-area-calculator",
    "seoTitle": "Body Surface Area Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate body surface area using the Mosteller equation. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# Body Surface Area Calculator\n# Edit: height_cm and weight_kg.\n# Assumptions: uses the Mosteller body-surface-area estimate.\n# Limitations: estimate only and not a clinical recommendation by itself.\n# Output: prints the estimated body surface area in square meters.\n\nheight_cm = 172\nweight_kg = 70\n\n\ndef format_number(value, digits=2):\n    rounded = round(value, digits)\n    text = (\"{:.\" + str(digits) + \"f}\").format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\nbody_surface_area = ((height_cm * weight_kg) / 3600) ** 0.5\n\nprint(\"Body surface area calculator\")\nprint(\"----------------------------\")\nprint(\"Body surface area:\", format_number(body_surface_area) + \" m^2\")\n",
    "pageGroup": "Health",
    "pageSection": "Nutrition",
    "pagePath": "/health-calculators/body-surface-area-calculator/"
  },
  {
    "id": "gfr-calculator",
    "title": "GFR Calculator",
    "category": "Other",
    "summary": "Estimate glomerular filtration rate from age, sex, and serum creatinine.",
    "tags": [
      "gfr",
      "kidney",
      "health"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate glomerular filtration rate from age, sex, and serum creatinine. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated health calculator page for GFR Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Estimated GFR:"
      }
    ],
    "routeSlug": "gfr-calculator",
    "seoTitle": "GFR Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate glomerular filtration rate from age, sex, and serum creatinine. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# GFR Calculator\n# Edit: sex, age_years, and serum_creatinine_mg_dl.\n# Assumptions: uses the 2021 CKD-EPI creatinine equation with serum creatinine in mg/dL.\n# Limitations: this is an estimate only and should not replace clinical interpretation.\n# Output: prints the estimated GFR in mL/min/1.73m^2 and a broad kidney-function note.\n\nsex = \"female\"\nage_years = 58\nserum_creatinine_mg_dl = 1.08\n\n\ndef format_number(value, digits=2):\n    rounded = round(value, digits)\n    text = (\"{:.\" + str(digits) + \"f}\").format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\nif sex == \"female\":\n    kappa = 0.7\n    alpha = -0.241\n    sex_factor = 1.012\nelse:\n    kappa = 0.9\n    alpha = -0.302\n    sex_factor = 1.0\n\ncreatinine_ratio = serum_creatinine_mg_dl / kappa\ngfr = (\n    142\n    * min(creatinine_ratio, 1) ** alpha\n    * max(creatinine_ratio, 1) ** -1.2\n    * (0.9938 ** age_years)\n    * sex_factor\n)\n\nif gfr >= 90:\n    kidney_note = \"Typical range or mildly reduced estimate\"\nelif gfr >= 60:\n    kidney_note = \"Mildly reduced estimate\"\nelif gfr >= 45:\n    kidney_note = \"Mild to moderate reduction estimate\"\nelif gfr >= 30:\n    kidney_note = \"Moderate to severe reduction estimate\"\nelse:\n    kidney_note = \"Severely reduced estimate\"\n\nprint(\"GFR calculator\")\nprint(\"--------------\")\nprint(\"Estimated GFR:\", format_number(gfr) + \" mL/min/1.73m^2\")\nprint(\"Kidney-function note:\", kidney_note)\n",
    "pageGroup": "Health",
    "pageSection": "Other",
    "pagePath": "/health-calculators/gfr-calculator/"
  },
  {
    "id": "bac-calculator",
    "title": "BAC Calculator",
    "category": "Other",
    "summary": "Estimate blood alcohol concentration from drinks, weight, time, and sex.",
    "tags": [
      "bac",
      "alcohol",
      "estimate"
    ],
    "runtime": "fast",
    "difficulty": "beginner",
    "description": "Estimate blood alcohol concentration from drinks, weight, time, and sex. Edit the constants at the top of the script and rerun it in the browser.",
    "issueContext": "Generated health calculator page for BAC Calculator.",
    "featured": false,
    "checks": [
      {
        "type": "includes",
        "value": "Estimated BAC:"
      }
    ],
    "routeSlug": "bac-calculator",
    "seoTitle": "BAC Calculator Python Script | SharePython.com",
    "seoDescription": "Estimate blood alcohol concentration from drinks, weight, time, and sex. Edit the Python script and run it in your browser with no sign-in.",
    "script": "# BAC Calculator\n# Edit: sex, body_weight_lb, standard_drinks, and hours_since_first_drink.\n# Assumptions: uses a simplified Widmark-style estimate with standard U.S. drinks.\n# Limitations: BAC estimates can differ materially from real measurements and local legal rules.\n# Output: prints the estimated BAC and a broad caution note.\n\nsex = \"male\"\nbody_weight_lb = 180\nstandard_drinks = 3\nhours_since_first_drink = 2.5\n\n\ndef format_number(value, digits=2):\n    rounded = round(value, digits)\n    text = (\"{:.\" + str(digits) + \"f}\").format(rounded)\n    return text.rstrip(\"0\").rstrip(\".\")\n\n\ndistribution_ratio = 0.73 if sex == \"male\" else 0.66\nestimated_bac = (\n    (standard_drinks * 5.14) / (body_weight_lb * distribution_ratio)\n) - (0.015 * hours_since_first_drink)\nestimated_bac = max(0, estimated_bac)\n\nif estimated_bac >= 0.08:\n    caution_note = \"At or above a common legal-driving threshold\"\nelif estimated_bac >= 0.05:\n    caution_note = \"Meaningful impairment may be present\"\nelse:\n    caution_note = \"Alcohol effects can still vary by person\"\n\nprint(\"BAC calculator\")\nprint(\"--------------\")\nprint(\"Estimated BAC:\", format_number(estimated_bac, 3))\nprint(\"Caution note:\", caution_note)\n",
    "pageGroup": "Health",
    "pageSection": "Other",
    "pagePath": "/health-calculators/bac-calculator/"
  }
];
