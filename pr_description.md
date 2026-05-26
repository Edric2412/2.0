## ⚡ Optimize O(N^2) loops in NeuralPortrait via Spatial Partitions

💡 **What:**
Implemented a spatial grid partitioning system in `src/components/NeuralPortrait.tsx` to optimize distance calculations during node initialization and connection generation. Replaced the $O(N^2)$ distance checks across all nodes with localized 3x3 grid sweeps checking only nodes in adjacent grid cells.

🎯 **Why:**
The application suffered from heavy nested loops in the `initNetwork` component. On high-end configurations, or higher resolution node counts (e.g., 6000 nodes for desktop), this resulted in processing upwards of $3.6 \times 10^7$ iterations twice: once to calculate point density, and once to link connected nodes together.

By partitioning points spatially, we significantly reduce iteration bounds, converting performance from roughly $O(N^2)$ to $O(N)$.

📊 **Measured Improvement:**
I established benchmarks mimicking the core distance and density calculations against an array of 6000 nodes to measure base timings.
* **Density Computation Baseline:** 242.13 ms -> **Optimized:** 15.58 ms (~15.5x faster)
* **Connections Computation Baseline:** 286.80 ms -> **Optimized:** 28.31 ms (~10x faster)

Overall setup times roughly shrink by 10x-15x allowing smoother interaction initialization for dense point sets.
