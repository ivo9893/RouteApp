// Helper: Haversine Distance (Same as before)
const toRad = (value) => (value * Math.PI) / 180;

const getDistance = (pt1, pt2) => {
  const R = 6371000; 
  const dLat = toRad(pt2.lat - pt1.lat);
  const dLon = toRad(pt2.long - pt1.long);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(pt1.lat)) * Math.cos(toRad(pt2.lat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; 
};

/**
 * Applies a "Moving Average" filter to smooth out elevation noise.
 * windowSize: Number of points to average (e.g., 5 means average current point with 2 before and 2 after).
 */
const smoothElevations = (points, windowSize = 5) => {
  if (points.length < windowSize) return points;

  return points.map((point, index) => {
    // Determine the window range
    const start = Math.max(0, index - Math.floor(windowSize / 2));
    const end = Math.min(points.length, index + Math.floor(windowSize / 2) + 1);
    
    // Get slice of points
    const windowPoints = points.slice(start, end);
    
    // Calculate average elevation
    const sum = windowPoints.reduce((acc, p) => acc + (p.ele || 0), 0);
    const avgEle = sum / windowPoints.length;

    // Return new point object with smoothed elevation
    return { ...point, ele: avgEle };
  });
};

export const calculateRouteStats = (rawPoints) => {
  // 1. First, smooth the data to remove jitter
  const smoothedPoints = smoothElevations(rawPoints, 5); // Window size of 5 is standard

  let totalDistance = 0;
  let elevationGain = 0;
  
  // 2. Define a Threshold (Hysteresis)
  // We only count a climb if it accumulates more than X meters (e.g., 3m) 
  // to avoid counting a speedbump as a hill.
  const THRESHOLD = 3.0; 
  let currentBaseEle = smoothedPoints[0].ele;

  // Loop through SMOOTHED points
  for (let i = 0; i < smoothedPoints.length - 1; i++) {
    const current = smoothedPoints[i];
    const next = smoothedPoints[i + 1];

    // Distance Calculation (Standard)
    totalDistance += getDistance(current, next);

    // Advanced Elevation Calculation
    const diff = next.ele - current.ele;

    // Logic: We simply accumulate positive differences, 
    // BUT because we smoothed the data first, most noise is already gone.
    // For very strict counting, you can check if (diff > 0)
    if (diff > 0) {
        elevationGain += diff;
    }
  }

  // Optional: Apply thresholding logic *instead* of simple sum if data is still noisy
  // But usually, smoothing + simple sum is accurate enough for web apps.

  return {
    distanceKm: (totalDistance / 1000).toFixed(2),
    elevationGain: Math.round(elevationGain),
    // Return the smoothed points if you want to plot a smoother graph
    routePoints: smoothedPoints 
  };
};