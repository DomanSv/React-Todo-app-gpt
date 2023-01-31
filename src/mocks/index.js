export async function prepareMocks() {
  // if (import.meta.env.MODE === "development") {
  const { worker } = await import("./browser");
  return worker.start({
    onUnhandledRequest(req, print) {
      if (req.url.pathname.search(/(vite|src)/i) > -1) return;
      print.warning();
    },
  });
  // }
  // return Promise.resolve();
}
