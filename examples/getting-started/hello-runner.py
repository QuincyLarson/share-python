# Hello Runner
# ------------
# What this script does:
#   Prints a short personalized summary so learners can see the edit-and-rerun
#   workflow without needing any extra concepts.
#
# Which variables to edit:
#   - name
#   - hours_saved
#   - favorite_task
#
# Assumptions and limitations:
#   - This is just a starter example.
#   - It only prints text.
#
# Expected output shape:
#   A few lines of terminal-style text.

name = "Avery"
hours_saved = 3.5
favorite_task = "budget planning"

print("freeCodeCamp Python Runner")
print("---------------------------")
print(f"Hello, {name}!")
print(f"This tiny script says you saved about {hours_saved:.1f} hours.")
print(f"Next up: use Python to automate more of your {favorite_task}.")
