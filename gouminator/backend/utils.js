async function getVolume(radius) {
  // Just to simulate a long running task
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const volume = (4 / 3) * Math.PI * Math.pow(radius, 3);
      resolve(volume);
    }, 1000);
  });
}

const getVolumes = async (radii = []) => {
  return Promise.all(
    radii.map(async (radius) => {
      return {
        radius: radius,
        volume: await getVolume(radius),
      };
    })
  );
};

module.exports = {
  getVolume,
  getVolumes,
};
