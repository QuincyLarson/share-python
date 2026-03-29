# JSON Pretty Printer
# -------------------
# What this script does:
#   Parses an inline JSON string and prints a nicely formatted version so it is
#   easier to inspect.
#
# Which variables to edit:
#   - raw_json
#
# Assumptions and limitations:
#   - Input must already be valid JSON.
#   - The tool only prints text output.
#
# Expected output shape:
#   Indented JSON text in the terminal panel.

import json

raw_json = '{"name":"freeCodeCamp","topics":["python","algorithms","data"],"launched":2014}'

parsed = json.loads(raw_json)

print("Formatted JSON")
print("--------------")
print(json.dumps(parsed, indent=2, sort_keys=True))
