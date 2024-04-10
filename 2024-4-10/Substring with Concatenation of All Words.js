class Solution {
    findSubstring(s, words) {
        const result = [];
        const map = new Map();
        const length = words[0].length;

        map.clear();
        for (const word of words) {
            map.set(word, (map.get(word) || 0) + 1);
        }

        for (let offset = 0; offset < length; ++offset) {
            let size = 0;
            const seen = new Map();
            for (let i = offset; i + length <= s.length; i += length) {
                const sub = s.substr(i, length);

                if (!map.has(sub)) {
                    seen.clear();
                    size = 0;
                    continue;
                }

                seen.set(sub, (seen.get(sub) || 0) + 1);
                size++;
                while (seen.get(sub) > map.get(sub)) {
                    const first = s.substr(i - (size - 1) * length, length);
                    seen.set(first, seen.get(first) - 1);
                    size--;
                }

                if (size === words.length) {
                    result.push(i - (size - 1) * length);
                }
            }
        }

        return result;
    }
}
