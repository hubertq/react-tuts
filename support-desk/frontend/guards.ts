import { ChangeEvent } from "react"

export const isTextInput = (
  e:
    | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    | ChangeEvent<HTMLSelectElement>,
): e is ChangeEvent<HTMLInputElement | HTMLTextAreaElement> => {
  return e.currentTarget.type === "text" || e.currentTarget.type === "textarea"
}

export const isSelectInput = (
  e:
    | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    | ChangeEvent<HTMLSelectElement>,
): e is ChangeEvent<HTMLSelectElement> => {
  return e.currentTarget.type === "select-one"
}
