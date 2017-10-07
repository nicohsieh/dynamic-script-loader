
export default class ScriptLoader {
  constructor () {
    this.scripts = (this.isBrowser() && window.ScriptLoader)
      ? window.ScriptLoader : {}
  }

  /**
   * isBrowser
   * @return {Boolean}
   */
  isBrowser () {
    return typeof window === 'object'
  }

  /**
   * load
   *
   * arguments:
   *   options = {
   *   
   *   }
   *
   *   callback = () => {}
   *
   * @param  {Object}
   * @param  {Function}
   * @return {Promise}
   */
  load (options = {}, callback) {
    if (this.hasScriptBeenLoaded(options.src)) {
      return Promise.resolve()
    }

    this.setScript(options.src)

    return this.getScriptLoaderPromise(options.src, options.async, callback)
  }

  /**
   * appendScript
   * @param  {[type]}  src        [description]
   * @param  {Boolean} asyncronus [description]
   * @param  {[type]}  success    [description]
   * @param  {[type]}  failure    [description]
   * @return {[type]}             [description]
   */
  appendScript(src, asyncronus = true, success, failure) {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = src
    script.async = asyncronus
    script.onload = success
    script.onerror = failure
    document.head.appendChild(script)
  }

  hasScriptBeenLoaded (src) {
    return this.scripts[src]
  }

  setScript (src) {
    this.scripts[src] = true
  }

  getScriptLoaderPromise (src, async, callback) {
    return new Promise(this.promiseFunction(src, async, callback))
  }

  promiseFunction (src, async, callback) {
    return (resolve, reject) => {
      this.appendScript(src, async, function success () {
        resolve(callback())
      }, function onError () {
        reject('error')
      })
    }
  }

}
