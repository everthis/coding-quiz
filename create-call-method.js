/*

Function.prototype.call is very useful when we want to alter the this of a function.

Can you implement your own myCall, which returns the same result as Function.prototype.call?

For the newest ECMAScript spec, thisArg are not transformed. And not replaced with window in Strict Mode.

Your implementation should follow above spec and do what non Strict Mode does.

Function.prototype.call/apply/bind and Reflect.apply should not be used.

*/


Function.prototype.mycall = function(thisArg, ...args) {
  // your code here
  if(thisArg == null) thisArg = window
  thisArg = Object(thisArg)
  const syb = Symbol()
  thisArg[syb] = this
  let res = thisArg[syb](...args)
  delete thisArg[syb]
  return res
}
