////// -----------------------------------------------------------------------------------------------------------------
/*//// -----------------------------------------------------------------------------------------------------------------

This file is an "Ambient declarations file". The types defined here are available globally.
More info here: https://stackoverflow.com/a/73389225/985454

Don't use `import` and `export` in this file directly! It breaks ambience.
To import external types in an ambient declarations file (this file) use the following:

*//**
* @example
* declare type React = import('react')
*//*

To contribute ambient declarations from any file, even non-ambient ones, use this:

*//**
* @example
* declare global {
*   interface Window {
*     ethereum: any
*   }
* }
*//*

/*//// -----------------------------------------------------------------------------------------------------------------
////// -----------------------------------------------------------------------------------------------------------------


type AnyObject<T = any> = Record<string, T>
type AnyFunction = (...args: any[]) => any
type AnyAsyncFunction = (...args: any[]) => Promise<any>


// Window and library interfaces overrides -------------------------------------------------------------------------------------

interface Window {
  d: any // ebug/inspect object, put anything here without TypeScript complaining about "Property 'd' does not exist on Window."
}
