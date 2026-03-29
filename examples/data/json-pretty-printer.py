# JSON pretty-printer
# Edit: raw_json_text by pasting a compact JSON string into the triple quotes.
# Assumptions: the input is valid JSON text and should be displayed readably.
# Limitations: this script only prints text and does not validate against schemas.
# Output: prints nicely indented JSON and a short structural summary.

import json

raw_json_text = """
{"name":"Ada","languages":["Python","JavaScript"],"active":true,"projects":3}
""".strip()

parsed = json.loads(raw_json_text)
formatted = json.dumps(parsed, indent=2, sort_keys=True)

print("Pretty JSON")
print("-" * 11)
print(formatted)
print("")
print(f"Top-level type: {type(parsed).__name__}")
print(f"Top-level keys: {len(parsed)}")

