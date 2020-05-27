export function toArray(a: string | string[] | undefined): string[] {
   if (!(a instanceof Array) && typeof a !== "string") {
      return []
   }
   if (a instanceof Array) {
      return a
   } else {
      return [a]
   }
}

export function inArray(element: any, array: any[]): boolean {
   return array.indexOf(element) > -1
}