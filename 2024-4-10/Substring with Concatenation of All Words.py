from collections import defaultdict

class Solution:
    def findSubstring(self, s: str, words: List[str]) -> List[int]:
        result = []
        length = len(words[0])
        word_counts = defaultdict(int)
        for word in words:
            word_counts[word] += 1
        for offset in range(length):
            size = 0
            seen = defaultdict(int)
            for i in range(offset, len(s) - length + 1, length):
                sub = s[i:i+length]

                if sub not in word_counts:
                    seen.clear()
                    size = 0
                    continue

                seen[sub] += 1
                size += 1
                while seen[sub] > word_counts[sub]:
                    first = s[i - (size - 1) * length: i - (size - 2) * length]
                    seen[first] -= 1
                    size -= 1
                if size == len(words):
                    result.append(i - (size - 1) * length)

        return result
