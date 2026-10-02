const formatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'long',
  timeZone: 'UTC',
})

// Article dates are plain `YYYY-MM-DD` strings, which `Date` parses as UTC
// midnight. Formatting in UTC keeps the day a reader sees identical to the day
// in the front matter, and keeps the server and client output identical.
export function formatDate(date: string | Date) {
  return formatter.format(new Date(date))
}
