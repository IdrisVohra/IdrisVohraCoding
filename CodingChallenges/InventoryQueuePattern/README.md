# Inventory Queue Pattern (min insertions to reach a repeating "abc")

**Problem:** Given `processingQueue`, a string of `'a'`, `'b'`, `'c'`, find the
minimum number of single-character insertions needed to turn it into a string
that is some number of repetitions of `"abc"` (e.g. `"abc"`, `"abcabc"`, ...).
Existing characters can't be removed or reordered.

**Approach:** Walk the input while tracking a pointer that cycles through the
expected pattern `a -> b -> c -> a ...`.

- If the current character doesn't match what the cycle currently expects,
  an insertion is required to advance the cycle to that character; count it
  and move the pointer forward.
- Once it matches, consume the character and advance the pointer.
- After the scan, if the pointer hasn't returned to the start of a cycle,
  the trailing partial `"abc"` needs to be completed with the remaining
  characters.

This runs in O(n) time since the pointer only ever advances (at most 2 extra
steps per input character before a match), and O(1) extra space.

Verified against the samples from the assessment (`"aa"` -> 4, `"ac"` -> 1)
and against a brute-force subsequence check over thousands of random inputs.
