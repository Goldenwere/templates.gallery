interface folder {
  /**
   * A display name for the folder.
   * This is allowed to be the same as another folder within a gallery.
   * It is technically optional as the display name will fallback to id,
   * but id is not intended to be a user friendly value.
   */
  displayName?: string
  /**
   * An id for the folder.
   * This should be gallery-unique - no two folders should share an id.
   * The actual value is otherwise arbitrary and is used to match artwork to a folder while avoiding display name collisions.
   */
  id: string
  /**
   * Optional subfolders.
   */
  folders?: folder[]
}

export default folder
