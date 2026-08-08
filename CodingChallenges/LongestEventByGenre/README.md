# Longest Event By Organizer + Genre

**Problem:** Given a string `organizer` and a string `genre`, query the paginated
event API at `https://jsonmock.hackerrank.com/api/events` (filterable via
`?organized_by=<organizer>&page=<num>`) and return the `id` of the event with
the longest `duration` that is organized by `organizer` and includes `genre`
in its `genres` list. On a tie, return the alphabetically smaller `id`. If no
such event exists, return `"-1"`.

**Approach:**

1. Request pages starting at `page=1`, reading `total_pages` from each
   response to know when to stop.
2. Filter events client-side on `organized_by === organizer` (defense in
   depth, in case the API's query filtering isn't a strict match) and
   `genres.includes(genre)`.
3. Track the best (`duration`, `id`) seen so far: replace it when a strictly
   longer duration is found, or when a duration tie has a lexicographically
   smaller `id`.
4. Return the best `id`, or `"-1"` if nothing matched.

Runs in O(total_pages) HTTP requests and O(total events on those pages) work.

Verified against the given sample case (`"empower integrated markets"` +
`"Reggae"` -> `cf52291f-dbcf-4f88-9fd9-1eb0e8ab3c4a`) and against mocked
multi-page / tie-break / no-match scenarios, since this sandbox doesn't have
network access to the live HackerRank mock API.
