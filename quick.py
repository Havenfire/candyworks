s = "1111122223333444"
mapping = {
  "1": "A",
  "2": "B",
  "3": "C",
  "4": "D"
}
result = []
for ch in s:
  result.append(mapping[ch])
print(result)  # prints ['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D']
