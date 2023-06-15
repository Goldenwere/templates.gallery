/**
 * Scrolls element into view
 * @param event the event that called this function
 * @param id the element's selector to scroll into view
 */
export const scrollTo = (event: Event, id: string) => {
  event.preventDefault()
  document.querySelector(id)?.scrollIntoView()
}
