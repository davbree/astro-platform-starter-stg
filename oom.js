// oom.js
// Run: node --max-old-space-size=64 oom.js
// (lower max-old-space-size makes it fail faster)

const chunks = [];
const CHUNK_MB = 16; // each loop allocates ~16MB

console.log("Allocating until OOM…");

let i = 0;
setInterval(() => {
  // Allocate a big Buffer and keep a reference so GC can't free it
  const buf = Buffer.alloc(CHUNK_MB * 1024 * 1024, 0x61);
  chunks.push(buf);

  i++;
  const used = process.memoryUsage();
  console.log(
    `#${i} rss=${Math.round(used.rss / 1024 / 1024)}MB heapUsed=${Math.round(
      used.heapUsed / 1024 / 1024
    )}MB external=${Math.round(used.external / 1024 / 1024)}MB`
  );
}, 50);
