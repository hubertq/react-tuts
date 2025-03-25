// export const extractErrorMessage = (error: any) =>

import { isAxiosError } from "axios"

//   error.response?.data?.message || error.message || error.toString()
export const extractErrorMessage = (error: any) => {
  if (isAxiosError(error)) {
    return {
      code: error.code || null,
      message:
        error.response?.data.message || error.message || error.toString(),
    }
  } else {
    return {
      code: null,
      message: error.message,
    }
  }
}
