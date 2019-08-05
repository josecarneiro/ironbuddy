class PromiseBuffer {
  constructor(loader, options = {}) {
    this._options = options;
    this._resolvers = [];
    this._resolving = false;
    this._loader = loader;
    this._result = undefined;
  }

  load(input) {
    if (!this._resolving) this._resolve();
    return new Promise((resolve, reject) => {
      this._resolvers.push({
        resolve,
        reject
      });
    });
  }

  async _resolve() {
    this._resolving = true;
    try {
      let result;
      if (this._result) {
        result = this._result;
      } else {
        result = await this._loader();
        this._result = result;
      }
      const resolveList = this._resolvers.map(({ resolve }) => resolve);
      for (let resolve of resolveList) resolve(result);
    } catch (error) {
      const rejectList = this._resolvers.map(({ reject }) => reject);
      for (let reject of rejectList) reject(error);
    } finally {
      this._resolvers = [];
      this._resolving = false;
    }
  }
}

const delay = (duration = 0) => new Promise((resolve, reject) => setTimeout(resolve, duration));

const requestBuffer = new PromiseBuffer(async () => {
  await delay(4000);
  return {
    code: 'success'
  };
});

(async () => {
  console.log('Asking');
  const data = await requestBuffer.load();
  console.log('got', data);
  await delay(2000);
  console.log('Asking again');
  const repeated = await requestBuffer.load();
  console.log(repeated);
})();
